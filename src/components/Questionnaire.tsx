import React, { useState } from 'react';
import {
  CATEGORIAS,
  PREGUNTAS_SINTOMAS,
} from '../config/symptomsData';
import {
  CategoriaSintoma,
  RespuestaValor,
  HumedadSueloValor,
  DiagnosticarRequest,
} from '../types/plantexpert';
import {
  Check,
  X,
  HelpCircle,
  Droplets,
  RotateCcw,
  Send,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  LayoutList,
  Sparkles,
  Layers,
} from 'lucide-react';

interface QuestionnaireProps {
  respuestas: Record<string, RespuestaValor>;
  setRespuestas: React.Dispatch<React.SetStateAction<Record<string, RespuestaValor>>>;
  humedadSuelo: HumedadSueloValor;
  setHumedadSuelo: (val: HumedadSueloValor) => void;
  onSubmit: (requestPayload: DiagnosticarRequest) => void;
  isLoading: boolean;
  onReset: () => void;
}

export const Questionnaire: React.FC<QuestionnaireProps> = ({
  respuestas,
  setRespuestas,
  humedadSuelo,
  setHumedadSuelo,
  onSubmit,
  isLoading,
  onReset,
}) => {
  // Modo de visualización: 'por_pasos' (wizard recomendado en el mock) o 'todo_junto'
  const [modoVisualizacion, setModoVisualizacion] = useState<'por_pasos' | 'todo_junto'>('por_pasos');
  const [pasoActual, setPasoActual] = useState<number>(0);

  const handleRespuestaChange = (preguntaId: string, valor: RespuestaValor) => {
    setRespuestas((prev) => ({
      ...prev,
      [preguntaId]: prev[preguntaId] === valor ? 'sin_comprobar' : valor,
    }));
  };

  /**
   * Construye el JSON formal para SWI-Prolog
   */
  const construirPayload = (): DiagnosticarRequest => {
    const si: string[] = [];
    const desconocidos: string[] = [];
    const no_comprobados: string[] = [];

    for (const preg of PREGUNTAS_SINTOMAS) {
      const resp = respuestas[preg.id] || 'sin_comprobar';
      if (resp === 'si') {
        si.push(preg.id);
      } else if (resp === 'no_se') {
        desconocidos.push(preg.id);
      } else if (resp === 'sin_comprobar') {
        no_comprobados.push(preg.id);
      }
    }

    if (humedadSuelo === 'seca') {
      si.push('suelo_seco');
    } else if (humedadSuelo === 'humeda') {
      si.push('suelo_humedo');
    } else if (humedadSuelo === 'empapada') {
      si.push('suelo_empapado');
    } else if (humedadSuelo === 'no_lo_se') {
      desconocidos.push('humedad_suelo');
    } else {
      no_comprobados.push('humedad_suelo');
    }

    return { si, desconocidos, no_comprobados };
  };

  const payload = construirPayload();
  const totalPreguntas = PREGUNTAS_SINTOMAS.length + 1; // +1 por selector de humedad
  const totalRespondidas =
    Object.values(respuestas).filter((r) => r !== 'sin_comprobar').length +
    (humedadSuelo !== '' ? 1 : 0);

  const porcentajeProgreso = Math.round((totalRespondidas / totalPreguntas) * 100);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(payload);
  };

  const categoriaActualConfig = CATEGORIAS[pasoActual];
  const preguntasPasoActual = PREGUNTAS_SINTOMAS.filter(
    (p) => p.categoria === categoriaActualConfig.id
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Barra de Navegación de Pasos y Modos */}
      <div className="bg-[#FFFFFF] border border-[#52796F]/20 rounded-xl p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Indicador de pasos botánicos */}
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center justify-between max-w-md">
              <span className="text-xs font-mono uppercase tracking-wider text-[#52796F]">
                {modoVisualizacion === 'por_pasos' ? (
                  <>Paso {pasoActual + 1} de {CATEGORIAS.length}: <strong className="text-[#1D3B2F] font-semibold">{categoriaActualConfig.titulo}</strong></>
                ) : (
                  <>Vista completa del cuestionario</>
                )}
              </span>
              <span className="text-xs font-mono font-bold text-[#1D3B2F]">
                {porcentajeProgreso}% completado
              </span>
            </div>

            {/* Barra de progreso de laboratorio */}
            <div className="w-full max-w-md bg-[#E8ECE2] h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-[#2D5A46] h-full transition-all duration-300 rounded-full"
                style={{ width: `${porcentajeProgreso}%` }}
              />
            </div>

            <div className="text-[11px] text-[#5A736A] pt-0.5">
              <span>{totalRespondidas} de {totalPreguntas} observaciones registradas</span>
              <span className="mx-1.5" aria-hidden="true">·</span>
              <span className="text-[#2D5A46] font-medium">{payload.si.length} hechos afirmativos</span>
            </div>
          </div>

          {/* Selector de modo y botones de cambio de paso rápido */}
          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
            {/* Botones de pasos en modo wizard */}
            {modoVisualizacion === 'por_pasos' && (
              <div className="hidden md:flex items-center gap-1 p-1 bg-[#FAFBF7] border border-[#52796F]/20 rounded-lg">
                {CATEGORIAS.map((cat, idx) => {
                  const estaActivo = idx === pasoActual;
                  const respondidasCat = PREGUNTAS_SINTOMAS.filter(
                    (p) => p.categoria === cat.id && respuestas[p.id] && respuestas[p.id] !== 'sin_comprobar'
                  ).length + (cat.id === 'riego_nutricion' && humedadSuelo !== '' ? 1 : 0);

                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setPasoActual(idx)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                        estaActivo
                          ? 'bg-[#1D3B2F] text-white shadow-xs'
                          : 'text-[#465E55] hover:text-[#1D3B2F] hover:bg-[#F0F2EB]'
                      }`}
                    >
                      <span className="w-4 h-4 rounded-full text-[10px] flex items-center justify-center border border-current font-mono">
                        {idx + 1}
                      </span>
                      <span>{cat.titulo.split(' ')[0]}</span>
                      {respondidasCat > 0 && (
                        <span className={`text-[10px] px-1 rounded ${estaActivo ? 'bg-white/20' : 'bg-[#E8ECE2]'}`}>
                          {respondidasCat}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Alternar modo de visualización */}
            <button
              type="button"
              onClick={() => setModoVisualizacion(modoVisualizacion === 'por_pasos' ? 'todo_junto' : 'por_pasos')}
              className="px-3 py-2 text-xs font-medium text-[#2D5A46] bg-[#FAFBF7] hover:bg-[#F0F2EB] border border-[#52796F]/25 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {modoVisualizacion === 'por_pasos' ? (
                <>
                  <LayoutList className="w-3.5 h-3.5" aria-hidden="true" />
                  <span className="hidden sm:inline">Ver todo</span>
                </>
              ) : (
                <>
                  <Layers className="w-3.5 h-3.5" aria-hidden="true" />
                  <span className="hidden sm:inline">Modo por pasos</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* RENDERIZADO: MODO POR PASOS (WIZARD BOTÁNICO) */}
      {modoVisualizacion === 'por_pasos' && (
        <div className="bg-[#FFFFFF] border border-[#52796F]/20 rounded-xl overflow-hidden shadow-xs">
          {/* Cabecera del paso actual */}
          <div className="p-6 bg-[#FAFBF7] border-b border-[#52796F]/15">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#52796F] mb-1">
              <span>Sección {pasoActual + 1} de {CATEGORIAS.length}</span>
              <span aria-hidden="true">·</span>
              <span>{categoriaActualConfig.id}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1D3B2F]">
              {categoriaActualConfig.titulo}
            </h2>
            <p className="text-xs sm:text-sm text-[#465E55] mt-1 max-w-2xl">
              {categoriaActualConfig.descripcion}
            </p>
          </div>

          <div className="p-5 sm:p-7 space-y-5 divide-y divide-[#52796F]/10">
            {/* Ítem especial: Selector de Humedad de Suelo si es el paso de Riego */}
            {categoriaActualConfig.id === 'riego_nutricion' && (
              <div className="pb-5 pt-1">
                <div className="space-y-2 mb-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#1D3B2F]">
                    <Droplets className="w-4 h-4 text-[#2D5A46]" aria-hidden="true" />
                    <span>Humedad del suelo (Selector único excluyente)</span>
                  </div>
                  <p className="text-xs text-[#465E55]">
                    Compruebe con la mano a 5 cm de profundidad en la base de la mata de tomate.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5" role="radiogroup" aria-label="Humedad del suelo">
                  <button
                    type="button"
                    role="radio"
                    aria-checked={humedadSuelo === 'seca'}
                    onClick={() => setHumedadSuelo(humedadSuelo === 'seca' ? '' : 'seca')}
                    className={`p-3 text-left rounded-lg border transition-all cursor-pointer flex flex-col justify-between ${
                      humedadSuelo === 'seca'
                        ? 'bg-[#B46536] text-white border-[#B46536] shadow-xs'
                        : 'bg-[#FAFBF7] text-[#1D3B2F] border-[#52796F]/25 hover:bg-[#F0F2EB]'
                    }`}
                  >
                    <span className="font-semibold text-xs block">Seca</span>
                    <span className={`text-[10px] mt-1 block leading-tight ${humedadSuelo === 'seca' ? 'text-white/80' : 'text-[#6E887E]'}`}>
                      Tierra polvorienta o suelta sin humedad perceptible
                    </span>
                  </button>

                  <button
                    type="button"
                    role="radio"
                    aria-checked={humedadSuelo === 'humeda'}
                    onClick={() => setHumedadSuelo(humedadSuelo === 'humeda' ? '' : 'humeda')}
                    className={`p-3 text-left rounded-lg border transition-all cursor-pointer flex flex-col justify-between ${
                      humedadSuelo === 'humeda'
                        ? 'bg-[#1D3B2F] text-white border-[#1D3B2F] shadow-xs'
                        : 'bg-[#FAFBF7] text-[#1D3B2F] border-[#52796F]/25 hover:bg-[#F0F2EB]'
                    }`}
                  >
                    <span className="font-semibold text-xs block">Húmeda (Tempero)</span>
                    <span className={`text-[10px] mt-1 block leading-tight ${humedadSuelo === 'humeda' ? 'text-white/80' : 'text-[#6E887E]'}`}>
                      Humedad óptima de campo, fresca al tacto
                    </span>
                  </button>

                  <button
                    type="button"
                    role="radio"
                    aria-checked={humedadSuelo === 'empapada'}
                    onClick={() => setHumedadSuelo(humedadSuelo === 'empapada' ? '' : 'empapada')}
                    className={`p-3 text-left rounded-lg border transition-all cursor-pointer flex flex-col justify-between ${
                      humedadSuelo === 'empapada'
                        ? 'bg-[#2E5E7A] text-white border-[#2E5E7A] shadow-xs'
                        : 'bg-[#FAFBF7] text-[#1D3B2F] border-[#52796F]/25 hover:bg-[#F0F2EB]'
                    }`}
                  >
                    <span className="font-semibold text-xs block">Empapada</span>
                    <span className={`text-[10px] mt-1 block leading-tight ${humedadSuelo === 'empapada' ? 'text-white/80' : 'text-[#6E887E]'}`}>
                      Suelo anegado, encharcado o brillante de agua
                    </span>
                  </button>

                  <button
                    type="button"
                    role="radio"
                    aria-checked={humedadSuelo === 'no_lo_se'}
                    onClick={() => setHumedadSuelo(humedadSuelo === 'no_lo_se' ? '' : 'no_lo_se')}
                    className={`p-3 text-left rounded-lg border transition-all cursor-pointer flex flex-col justify-between ${
                      humedadSuelo === 'no_lo_se'
                        ? 'bg-[#465E55] text-white border-[#465E55] shadow-xs'
                        : 'bg-[#FAFBF7] text-[#1D3B2F] border-[#52796F]/25 hover:bg-[#F0F2EB]'
                    }`}
                  >
                    <span className="font-semibold text-xs block">No lo sé</span>
                    <span className={`text-[10px] mt-1 block leading-tight ${humedadSuelo === 'no_lo_se' ? 'text-white/80' : 'text-[#6E887E]'}`}>
                      No se ha comprobado el estado del suelo
                    </span>
                  </button>
                </div>
              </div>
            )}

            {/* Preguntas de síntomas de la sección actual */}
            {preguntasPasoActual.map((preg) => {
              const valorActual = respuestas[preg.id] || 'sin_comprobar';

              return (
                <div
                  key={preg.id}
                  className="pt-4 pb-2 flex flex-col md:flex-row md:items-start justify-between gap-4"
                >
                  <div className="space-y-1.5 max-w-xl">
                    <label className="text-sm font-semibold text-[#1D3B2F] leading-snug block">
                      {preg.texto}
                    </label>
                    <p className="text-xs text-[#465E55] leading-normal">
                      {preg.aclaracion}
                    </p>
                    <p className="text-[11px] font-mono text-[#52796F]">
                      Significado agronómico: {preg.significadoAgronomico}
                    </p>
                  </div>

                  {/* Botones accesibles Sí / No / No lo sé */}
                  <div
                    className="flex items-center gap-1.5 shrink-0 bg-[#FAFBF7] p-1.5 rounded-lg border border-[#52796F]/20 self-start"
                    role="group"
                    aria-label={preg.texto}
                  >
                    <button
                      type="button"
                      onClick={() => handleRespuestaChange(preg.id, 'si')}
                      className={`px-3.5 py-2 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 cursor-pointer min-w-[64px] justify-center ${
                        valorActual === 'si'
                          ? 'bg-[#1D3B2F] text-white shadow-xs font-semibold'
                          : 'text-[#1D3B2F] hover:bg-[#E8ECE2]'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Sí</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleRespuestaChange(preg.id, 'no')}
                      className={`px-3.5 py-2 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 cursor-pointer min-w-[64px] justify-center ${
                        valorActual === 'no'
                          ? 'bg-[#3D4F46] text-white shadow-xs font-semibold'
                          : 'text-[#1D3B2F] hover:bg-[#E8ECE2]'
                      }`}
                    >
                      <X className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>No</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleRespuestaChange(preg.id, 'no_se')}
                      className={`px-3.5 py-2 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 cursor-pointer min-w-[76px] justify-center ${
                        valorActual === 'no_se'
                          ? 'bg-[#B46536] text-white shadow-xs font-semibold'
                          : 'text-[#1D3B2F] hover:bg-[#E8ECE2]'
                      }`}
                    >
                      <HelpCircle className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>No lo sé</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navegación entre pasos en el pie de la tarjeta */}
          <div className="p-4 sm:p-6 bg-[#FAFBF7] border-t border-[#52796F]/15 flex items-center justify-between">
            <button
              type="button"
              disabled={pasoActual === 0}
              onClick={() => setPasoActual((p) => Math.max(0, p - 1))}
              className="px-4 py-2 text-xs font-medium text-[#2D5A46] bg-white border border-[#52796F]/25 rounded-md hover:bg-[#F0F2EB] disabled:opacity-40 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Anterior</span>
            </button>

            <span className="text-xs text-[#52796F] font-mono hidden sm:inline">
              Paso {pasoActual + 1} de {CATEGORIAS.length}
            </span>

            {pasoActual < CATEGORIAS.length - 1 ? (
              <button
                type="button"
                onClick={() => setPasoActual((p) => Math.min(CATEGORIAS.length - 1, p + 1))}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#1D3B2F] hover:bg-[#142B22] rounded-md transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>Siguiente Paso</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isLoading}
                className="px-5 py-2 text-xs font-semibold text-white bg-[#1D3B2F] hover:bg-[#142B22] rounded-md transition-colors shadow-xs flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
                    <span>Consultando SWI-Prolog...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Consultar Diagnóstico</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      )}

      {/* RENDERIZADO: MODO VISTA COMPLETA (TODAS LAS SECCIONES) */}
      {modoVisualizacion === 'todo_junto' && (
        <div className="space-y-5">
          {CATEGORIAS.map((cat, idx) => {
            const preguntasSeccion = PREGUNTAS_SINTOMAS.filter((p) => p.categoria === cat.id);
            const esRiego = cat.id === 'riego_nutricion';

            return (
              <div
                key={cat.id}
                className="bg-[#FFFFFF] border border-[#52796F]/20 rounded-xl overflow-hidden shadow-xs"
              >
                <div className="p-4 sm:p-5 bg-[#FAFBF7] border-b border-[#52796F]/15">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#52796F] block mb-0.5">
                    Sección {idx + 1} de {CATEGORIAS.length}
                  </span>
                  <h3 className="text-lg font-serif font-bold text-[#1D3B2F]">
                    {cat.titulo}
                  </h3>
                  <p className="text-xs text-[#465E55] mt-0.5">{cat.descripcion}</p>
                </div>

                <div className="p-4 sm:p-6 divide-y divide-[#52796F]/10 space-y-4">
                  {esRiego && (
                    <div className="pb-4 pt-1">
                      <div className="space-y-1 mb-3">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-[#1D3B2F]">
                          <Droplets className="w-4 h-4 text-[#2D5A46]" aria-hidden="true" />
                          <span>Humedad del suelo (Selector único)</span>
                        </div>
                        <p className="text-xs text-[#465E55]">
                          Determine la humedad a unos 5 cm en la base de la planta.
                        </p>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {['seca', 'humeda', 'empapada', 'no_lo_se'].map((val) => (
                          <button
                            key={val}
                            type="button"
                            onClick={() => setHumedadSuelo(humedadSuelo === val ? '' : (val as HumedadSueloValor))}
                            className={`p-2.5 text-xs font-medium rounded-md border transition-all text-center cursor-pointer capitalize ${
                              humedadSuelo === val
                                ? 'bg-[#1D3B2F] text-white border-[#1D3B2F] shadow-xs'
                                : 'bg-[#FAFBF7] text-[#1D3B2F] border-[#52796F]/25 hover:bg-[#F0F2EB]'
                            }`}
                          >
                            {val === 'no_lo_se' ? 'No lo sé' : val}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {preguntasSeccion.map((preg) => {
                    const valorActual = respuestas[preg.id] || 'sin_comprobar';
                    return (
                      <div key={preg.id} className="pt-3.5 pb-2 flex flex-col md:flex-row md:items-start justify-between gap-3">
                        <div className="space-y-1 max-w-xl">
                          <label className="text-xs sm:text-sm font-semibold text-[#1D3B2F] block">
                            {preg.texto}
                          </label>
                          <p className="text-xs text-[#465E55]">{preg.aclaracion}</p>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0 bg-[#FAFBF7] p-1 rounded-md border border-[#52796F]/20 self-start">
                          <button
                            type="button"
                            onClick={() => handleRespuestaChange(preg.id, 'si')}
                            className={`px-3 py-1.5 text-xs font-medium rounded transition-all cursor-pointer ${
                              valorActual === 'si' ? 'bg-[#1D3B2F] text-white' : 'text-[#1D3B2F] hover:bg-[#E8ECE2]'
                            }`}
                          >
                            Sí
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRespuestaChange(preg.id, 'no')}
                            className={`px-3 py-1.5 text-xs font-medium rounded transition-all cursor-pointer ${
                              valorActual === 'no' ? 'bg-[#3D4F46] text-white' : 'text-[#1D3B2F] hover:bg-[#E8ECE2]'
                            }`}
                          >
                            No
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRespuestaChange(preg.id, 'no_se')}
                            className={`px-3 py-1.5 text-xs font-medium rounded transition-all cursor-pointer ${
                              valorActual === 'no_se' ? 'bg-[#B46536] text-white' : 'text-[#1D3B2F] hover:bg-[#E8ECE2]'
                            }`}
                          >
                            No lo sé
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Validación y aviso si no hay hechos positivos */}
      {payload.si.length === 0 && (
        <div className="p-3.5 bg-[#FAFBF7] border border-[#52796F]/25 rounded-lg text-xs text-[#2D5A46] flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-[#B46536] shrink-0 mt-0.5" aria-hidden="true" />
          <span>
            Aún no se han registrado síntomas afirmativos. Puede marcar los signos visibles en la tomatera o cargar un caso de prueba de la barra superior.
          </span>
        </div>
      )}

      {/* Barra de envío y reinicio */}
      <div className="bg-[#FFFFFF] border border-[#52796F]/20 rounded-xl p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 sticky bottom-4 z-20">
        <button
          type="button"
          onClick={onReset}
          disabled={isLoading}
          className="px-4 py-2 text-xs font-medium text-[#465E55] bg-[#FAFBF7] hover:bg-[#F0F2EB] border border-[#52796F]/25 rounded-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
        >
          <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Reiniciar Cuestionario</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto px-6 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#1D3B2F] hover:bg-[#142B22] rounded-md transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
                <span>Consultando SWI-Prolog...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" aria-hidden="true" />
                <span>Consultar Diagnóstico Experto</span>
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};
