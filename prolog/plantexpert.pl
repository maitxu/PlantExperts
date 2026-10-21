/** <module> PlantExpert - Servidor de Diagnóstico en SWI-Prolog
 * 
 * Sistema experto académico para diagnóstico de problemas en tomateras
 * de huertos domésticos en Euskadi.
 *
 * Para ejecutar el servidor:
 *   swipl prolog/plantexpert.pl
 * O en la consola de SWI-Prolog:
 *   ?- server(8000).
 */

:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_json)).
:- use_module(library(http/http_cors)).

% Habilitar CORS para permitir peticiones desde la interfaz React
:- set_setting(http:cors, [*]).

% Enrutador de la API
:- http_handler(root(diagnosticar), manejar_diagnostico, [method(post), methods([post, options])]).

%% Iniciar el servidor HTTP en el puerto indicado (por defecto 8000)
server(Port) :-
    http_server(http_dispatch, [port(Port)]),
    format('~n[PlantExpert] Servidor SWI-Prolog iniciado en http://localhost:~w/~n', [Port]),
    format('[PlantExpert] Endpoint de diagnostico: POST http://localhost:~w/diagnosticar~n~n', [Port]).

% Si se carga directamente el archivo desde la línea de comandos, iniciar en 8000
:- initialization(server(8000), main).

%% Manejador para pre-flight CORS OPTIONS y POST
manejar_diagnostico(Request) :-
    option(method(options), Request), !,
    cors_enable(Request, [methods([post, options])]),
    format('Content-type: text/plain~n~n', []).

manejar_diagnostico(Request) :-
    cors_enable(Request, [methods([post, options])]),
    http_read_json_dict(Request, DatosEntrada),
    procesar_consulta(DatosEntrada, RespuestaDict),
    reply_json_dict(RespuestaDict).

%% Procesar consulta a partir de los hechos suministrados
procesar_consulta(Dict, Respuesta) :-
    Si = Dict.get(si, []),
    Desc = Dict.get(desconocidos, []),
    NoComp = Dict.get(no_comprobados, []),

    % 1. Detectar conflictos / inconsistencias lógicas
    (   detectar_conflictos(Si, Conflictos), Conflictos \= []
    ->  Respuesta = _{
            estado: respuestas_incompatibles,
            conflictos: Conflictos,
            aviso: "Se han detectado observaciones contradictorias en las respuestas del cuestionario."
        }
    % 2. Evaluar reglas de diagnóstico patológico y fisiopático
    ;   evaluar_todas_reglas(Si, HipotesisDetectadas),
        (   % Caso: Reglas activadas
            HipotesisDetectadas \= []
        ->  agrupar_hipotesis(HipotesisDetectadas, HipotesisAgrupadas),
            (   length(HipotesisAgrupadas, 1)
            ->  Estado = hipotesis_generada,
                Aviso = "El sistema ha identificado una hipotesis explicativa solida acorde a las reglas academicas."
            ;   Estado = diagnostico_diferencial,
                Aviso = "Existen multiples posibilidades diferenciales compatibles. Examine los signos especificos de cada afeccion para discriminar."
            ),
            Respuesta = _{
                estado: Estado,
                hipotesis: HipotesisAgrupadas,
                aviso: Aviso
            }
        % Caso: Marchitez presente pero falta dato de humedad del suelo o cuello
        ;   member("marchitez", Si),
            ( member("humedad_suelo", Desc) ; member("humedad_suelo", NoComp) )
        ->  Respuesta = _{
                estado: informacion_insuficiente,
                datos_pendientes: ["humedad_suelo", "pudricion_cuello_raiz"],
                aviso: "La marchitez requiere discriminar la condicion del sustrato (sequedad, encharcamiento o afeccion del cuello) para formular una hipotesis valida."
            }
        % Caso: Ninguna regla encaja
        ;   Respuesta = _{
                estado: ninguna_regla_encaja,
                aviso: "Los sintomas reportados no satisfacen ninguna regla patologica o fisiopatica del sistema experto."
            }
        )
    ).

%% -------------------------------------------------------------
%% Base de Conocimiento y Reglas Formales (Cláusulas de Horn)
%% -------------------------------------------------------------

% Regla R_ALT_01: Alternariosis
regla('R_ALT_01', 'Alternariosis (Negron del tomate)', 'Alternaria solani',
      ["manchas_marrones_negras", "anillos_concentricos"]).

% Regla R_OID_01: Oídio foliar
regla('R_OID_01', 'Oidio o Ceniza de la tomatera', 'Oidium neolycopersici / Leveillula taurica',
      ["amarilleo_hojas", "crecimiento_blanco_hojas"]).

% Regla R_MIL_01: Mildiu principal
regla('R_MIL_01', 'Mildiu de la tomatera', 'Phytophthora infestans',
      ["lesiones_irregulares_acuosas", "manchas_tallo", "tiempo_reciente_humedo"]).

% Regla R_MIL_02: Mildiu alternativa (frecuente en clima atlantico de Euskadi)
regla('R_MIL_02', 'Mildiu de la tomatera', 'Phytophthora infestans',
      ["lesiones_irregulares_acuosas", "avance_rapido", "tiempo_reciente_humedo"]).

% Regla R_BOT_01: Botrytis / Podredumbre gris
regla('R_BOT_01', 'Podredumbre gris o Botrytis', 'Botrytis cinerea',
      ["moho_gris_tallos", "tiempo_reciente_humedo"]).

% Regla R_BER_01: Necrosis apical / Peseta (vía riego irregular)
regla('R_BER_01', 'Podredumbre apical (Peseta / Blossom End Rot)', 'Fisiopatia nutricional-hidrica (deficit de calcio)',
      ["podredumbre_apical", "riego_irregular"]).

% Regla R_BER_02: Necrosis apical / Peseta (vía sequía)
regla('R_BER_02', 'Podredumbre apical (Peseta / Blossom End Rot)', 'Fisiopatia nutricional-hidrica (deficit de calcio)',
      ["podredumbre_apical", "suelo_seco"]).

% Regla R_ASF_01: Asfixia radicular
regla('R_ASF_01', 'Asfixia radicular y encharcamiento', 'Trastorno hipoxico radicular',
      ["marchitez", "suelo_empapado"]).

% Regla R_SEQ_01: Deficit hidrico acusado
regla('R_SEQ_01', 'Deficiencia hidrica severa (Sequia)', 'Estres hidrico abiotico',
      ["marchitez", "suelo_seco"]).

%% Evaluar todas las reglas frente a la lista de hechos positivos
evaluar_todas_reglas(Hechos, Hipotesis) :-
    findall(
        _{
            regla_id: ReglaId,
            causa: Causa,
            nombre_cientifico: NombreCientifico,
            requisitos_cumplidos: Req
        },
        (
            regla(ReglaId, Causa, NombreCientifico, Req),
            subset_atomos(Req, Hechos)
        ),
        Hipotesis
    ).

%% Comprobación de que todos los requisitos están contenidos en los hechos afirmados
subset_atomos([], _).
subset_atomos([H|T], Lista) :-
    member(H, Lista),
    subset_atomos(T, Lista).

%% Agrupar reglas alternativas que conducen a la misma causa
agrupar_hipotesis(ListaCruda, Agrupadas) :-
    findall(Causa, member(_{causa: Causa}, ListaCruda), CausasDuplicadas),
    sort(CausasDuplicadas, CausasUnicas),
    maplist(combinar_para_causa(ListaCruda), CausasUnicas, Agrupadas).

combinar_para_causa(ListaCruda, Causa, DictResultado) :-
    findall(RId, member(_{causa: Causa, regla_id: RId}, ListaCruda), ReglasIds),
    findall(Req, member(_{causa: Causa, requisitos_cumplidos: Req}, ListaCruda), ListasReqs),
    flatten(ListasReqs, ReqsAplanados),
    sort(ReqsAplanados, ReqsUnicos),
    member(_{causa: Causa, nombre_cientifico: NC}, ListaCruda),
    DictResultado = _{
        causa: Causa,
        nombre_cientifico: NC,
        reglas_ids: ReglasIds,
        requisitos_cumplidos: ReqsUnicos
    }.

%% Detección de incompatibilidades en respuestas
detectar_conflictos(Si, Conflictos) :-
    findall(Conflicto, conflicto(Si, Conflicto), Conflictos).

conflicto(Si, "El suelo no puede reportarse simultaneamente seco y empapado.") :-
    member("suelo_seco", Si),
    member("suelo_empapado", Si).
