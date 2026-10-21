/** <module> PlantExpert Enterprise - Servidor y Motor de Inferencia en SWI-Prolog
 *
 * Motor de inferencia y evaluación clínica agronómica para cultivos de tomate.
 * Integra:
 *   - Base de conocimiento fitopatológica (cláusulas de Horn)
 *   - Encadenamiento hacia adelante (forward chaining: responder/4)
 *   - Encadenamiento hacia atrás (backward chaining: ejemplo_hacia_atras/3)
 *   - Detección de incompatibilidades / conflictos lógicos
 *   - Servidor HTTP con endpoints POST /diagnosticar y POST /encadenamiento_atras
 */

:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_json)).
:- use_module(library(http/http_cors)).

% Habilitar CORS para peticiones desde cualquier origen
:- set_setting(http:cors, [*]).

% Enrutadores HTTP
:- http_handler(root(diagnosticar), manejar_diagnostico, [method(post), methods([post, options])]).
:- http_handler(root(encadenamiento_atras), manejar_encadenamiento_atras, [method(post), methods([post, options])]).
:- http_handler(root(salud), manejar_salud, [method(get)]).

%% -------------------------------------------------------------
%% Base de Conocimiento — Reglas de Diagnóstico Agronómico
%% -------------------------------------------------------------
% regla(Causa, ListaDeHechosNecesarios, ReglaID).

regla(alternariosis,
      [manchas_marrones, anillos_concentricos],
      'R1_ALT').
regla(alternariosis,
      [manchas_marrones_negras, anillos_concentricos],
      'R1_ALT').

regla(oidio,
      [manchas_amarillas, crecimiento_blanco_enves],
      'R2_OID').
regla(oidio,
      [amarilleo_hojas, crecimiento_blanco_hojas],
      'R2_OID').

regla(mildiu_tardio,
      [lesiones_irregulares_acuosas, crecimiento_blanco_enves],
      'R3_MIL_1').
regla(mildiu_tardio,
      [lesiones_irregulares_acuosas, avance_rapido, tiempo_reciente_humedo],
      'R3_MIL_2').

regla(mancha_bacteriana,
      [manchas_pequenas_oscuras, halo_amarillo],
      'R4_BAC_1').
regla(mancha_bacteriana,
      [lesiones_fruto_asperas_oscuras],
      'R4_BAC_2').

regla(estres_por_falta_de_agua,
      [marchitez, suelo_seco],
      'R5_SEQ').

regla(posible_exceso_de_agua_o_problema_radicular,
      [marchitez, suelo_encharcado],
      'R6_EXC').

regla(problema_nutricional_a_investigar,
      [amarilleo, patron_amarilleo_entre_hojas],
      'R7_NUT').

%% -------------------------------------------------------------
%% Motor de Inferencia — Encadenamiento hacia adelante
%% -------------------------------------------------------------

todos_presentes([], _).
todos_presentes([H|T], Hechos) :-
    memberchk(H, Hechos),
    todos_presentes(T, Hechos).

hipotesis_activada(Hechos, hipotesis(Causa, Requisitos, ReglaID)) :-
    regla(Causa, Requisitos, ReglaID),
    todos_presentes(Requisitos, Hechos).

% Detección de inconsistencias / conflictos en hechos
detectar_conflictos(Hechos, Conflictos) :-
    findall(C, conflicto_hechos(Hechos, C), Conflictos).

conflicto_hechos(Hechos, "El suelo no puede estar simultáneamente seco y encharcado.") :-
    member(suelo_seco, Hechos),
    member(suelo_encharcado, Hechos).

responder_motor(HechosSi, Desconocidos, NoComprobados, Estado, HipotesisAgrupadas, Pendientes, Conflictos) :-
    detectar_conflictos(HechosSi, Conflictos),
    (   Conflictos \= []
    ->  Estado = respuestas_incompatibles,
        HipotesisAgrupadas = [],
        Pendientes = []
    ;   findall(hipotesis(C, Req, RId), hipotesis_activada(HechosSi, hipotesis(C, Req, RId)), Todas),
        agrupar_hipotesis(Todas, HipotesisAgrupadas),
        append(Desconocidos, NoComprobados, P0),
        sort(P0, Pendientes),
        determinar_estado(HipotesisAgrupadas, Pendientes, Estado)
    ).

determinar_estado([_], _, hipotesis_generada) :- !.
determinar_estado([_,_|_], _, diagnostico_diferencial) :- !.
determinar_estado(Hipotesis, _, hipotesis_generada) :-
    Hipotesis \= [],
    !.
determinar_estado([], Pendientes, informacion_insuficiente) :-
    Pendientes \= [],
    !.
determinar_estado([], [], ninguna_regla_encaja).

%% Agrupa reglas alternativas que conducen a la misma causa
agrupar_hipotesis(ListaCruda, Agrupadas) :-
    findall(Causa, member(hipotesis(Causa, _, _), ListaCruda), CausasDuplicadas),
    sort(CausasDuplicadas, CausasUnicas),
    maplist(combinar_para_causa(ListaCruda), CausasUnicas, Agrupadas).

combinar_para_causa(ListaCruda, Causa, DictResultado) :-
    findall(RId, member(hipotesis(Causa, _, RId), ListaCruda), ReglasIds0),
    sort(ReglasIds0, ReglasIds),
    findall(Req, member(hipotesis(Causa, Req, _), ListaCruda), ListasReqs),
    flatten(ListasReqs, ReqsAplanados),
    sort(ReqsAplanados, ReqsUnicos),
    DictResultado = _{
        causa: Causa,
        reglas_ids: ReglasIds,
        requisitos_cumplidos: ReqsUnicos
    }.

%% -------------------------------------------------------------
%% Motor de Inferencia — Encadenamiento hacia atrás
%% -------------------------------------------------------------

ejemplo_hacia_atras(Causa, Hechos, Resultado) :-
    findall(Req, regla(Causa, Req, _), Conjuntos),
    (   Conjuntos = []
    ->  Resultado = no_hay_regla_para_esa_causa
    ;   member(Req, Conjuntos),
        todos_presentes(Req, Hechos)
    ->  Resultado = respaldada(Req)
    ;   member(Req, Conjuntos),
        subtract(Req, Hechos, Faltan),
        Resultado = faltan_datos(Faltan, Req)
    ).

%% -------------------------------------------------------------
%% Controladores HTTP JSON
%% -------------------------------------------------------------

manejar_salud(Request) :-
    cors_enable(Request, [methods([get, options])]),
    reply_json_dict(_{
        estado: "ok",
        motor: "SWI-Prolog v9",
        sistema: "PlantExpert"
    }).

manejar_diagnostico(Request) :-
    option(method(options), Request), !,
    cors_enable(Request, [methods([post, options])]),
    format('Content-type: text/plain~n~n', []).

manejar_diagnostico(Request) :-
    cors_enable(Request, [methods([post, options])]),
    http_read_json_dict(Request, DatosEntrada),
    procesar_diagnostico_json(DatosEntrada, RespuestaDict),
    reply_json_dict(RespuestaDict).

procesar_diagnostico_json(Dict, Respuesta) :-
    convertir_a_atomos(Dict.get(si, []), Si),
    convertir_a_atomos(Dict.get(desconocidos, []), Desc),
    convertir_a_atomos(Dict.get(no_comprobados, []), NoComp),

    responder_motor(Si, Desc, NoComp, Estado, Hipotesis, Pendientes, Conflictos),

    (   Estado == respuestas_incompatibles
    ->  Respuesta = _{
            estado: respuestas_incompatibles,
            conflictos: Conflictos,
            aviso: "Se han detectado observaciones contradictorias en las respuestas del cuestionario."
        }
    ;   (Estado == hipotesis_generada ; Estado == diagnostico_diferencial ; Estado == hipotesis_generadas)
    ->  (   (Estado == diagnostico_diferencial ; length(Hipotesis, Len), Len > 1)
        ->  Aviso = "Evaluación fitosanitaria: se han identificado múltiples etiologías concurrentes. Se recomienda diagnóstico diferencial de campo."
        ;   Aviso = "Evaluación fitosanitaria completada. Patología identificada con alta correlación clínica según protocolo agronómico."
        ),
        Respuesta = _{
            estado: Estado,
            hipotesis: Hipotesis,
            datos_pendientes: Pendientes,
            aviso: Aviso
        }
    ;   Estado == informacion_insuficiente
    ->  Respuesta = _{
            estado: informacion_insuficiente,
            hipotesis: [],
            datos_pendientes: Pendientes,
            aviso: "Información clínica insuficiente para emitir un diagnóstico concluyente. Se requieren observaciones sintomáticas adicionales."
        }
    ;   Respuesta = _{
            estado: ninguna_regla_encaja,
            hipotesis: [],
            datos_pendientes: [],
            aviso: "El cuadro sintomático no coincide con los patrones patogénicos tabulados. Puede deberse a factores abióticos o estrés ambiental no catalogado."
        }
    ).

manejar_encadenamiento_atras(Request) :-
    cors_enable(Request, [methods([post, options])]),
    http_read_json_dict(Request, Dict),
    CausaAtom = Dict.get(causa),
    convertir_a_atomos(Dict.get(hechos, []), Hechos),
    ejemplo_hacia_atras(CausaAtom, Hechos, Res),
    (   Res = respaldada(Req)
    ->  Resp = _{ resultado: "respaldada", requisitos: Req }
    ;   Res = faltan_datos(Faltan, Req)
    ->  Resp = _{ resultado: "faltan_datos", faltan: Faltan, requisitos: Req }
    ;   Resp = _{ resultado: "no_hay_regla" }
    ),
    reply_json_dict(Resp).

convertir_a_atomos([], []).
convertir_a_atomos([H|T], [Atom|Resto]) :-
    atom_string(Atom, H),
    convertir_a_atomos(T, Resto).

%% Iniciar servidor HTTP en el puerto indicado
server(Port) :-
    (   http_current_server(Port, _)
    ->  format('~n[PlantExpert] Servidor SWI-Prolog ya activo en puerto ~w~n', [Port])
    ;   http_server(http_dispatch, [port(Port)]),
        format('~n[PlantExpert] Servidor SWI-Prolog iniciado en puerto ~w~n', [Port])
    ).
