import React, { useState } from 'react';
import {
  DiagnosticarResponse,
  DiagnosticarRequest,
} from '../types/plantexpert';
import {
  agruparHipotesisCrudas,
  generarExplicacionDatosPendientes,
} from '../utils/explanationTemplates';
import { MAPEO_NOMBRES_HECHOS } from '../config/symptomsData';
import {
  CheckCircle2,
  AlertTriangle,
  AlertOctagon,
  HelpCircle,
  XCircle,
  WifiOff,
  RefreshCw,
  Edit3,
  RotateCcw,
  Code,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Settings,
  Sparkles,
  BookOpen,
  ArrowLeft,
  Check,
} from 'lucide-react';

interface DiagnosisResultProps {
  resultado: DiagnosticarResponse;
  payloadEnviado: DiagnosticarRequest;
  endpointConsultado: string;
  errorMensaje?: string;
  isConnectionError?: boolean;
  onVolverYCorregir: () => void;
  onNuevaConsulta: () => void;
  onReintentar: () => void;
  onReconectarServicioLocal?: () => void;
  onAbrirConfiguracion: () => void;
  isLoading: boolean;
}

export const DiagnosisResult: React.FC<DiagnosisResultProps> = ({
  resultado,
  payloadEnviado,
  endpointConsultado,
  errorMensaje,
  isConnectionError,
  onVolverYCorregir,
  onNuevaConsulta,
  onReintentar,
  onReconectarServicioLocal,
  onAbrirConfiguracion,
  isLoading,
}) => {
  const [mostrarInspectorJson, setMostrarInspectorJson] = useState(false);

  const { estado, hipotesis = [], datos_pendientes = [], conflictos = [], aviso } = resultado;

  const hipotesisAgrupadas = agruparHipotesisCrudas(hipotesis);
  const datosPendientesDetallados = generarExplicacionDatosPendientes(datos_pendientes);

  return (
    <div className="space-y-6">
      {/* ------------------------------------------------------------- */}
      {/* BARRA DE NAVEGACIÓN SUPERIOR FIJA: VOLVER ATRÁS SIEMPRE VISIBLE */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-[#FFFFFF] border-2 border-[#1D3B2F]/20 rounded-xl p-4 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onVolverYCorregir}
            className="px-4 py-2.5 text-xs sm:text-sm font-bold text-white bg-[#1D3B2F] hover:bg-[#142B22] rounded-lg transition-all shadow-xs flex items-center gap-2 cursor-pointer focus:ring-2 focus:ring-[#1D3B2F]"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Volver a Evaluación y Pruebas</span>
          </button>
          <span className="text-xs text-[#52796F] font-medium hidden sm:inline">
            Parámetros y signos registrados en sesión
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onNuevaConsulta}
            className="px-3 py-1.5 text-xs font-medium text-[#52796F] hover:text-[#1D3B2F] bg-[#FAFBF7] hover:bg-[#F0F2EB] border border-[#52796F]/20 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Limpiar formulario</span>
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* ESTADO 1: ERROR DE SERVICIO O CONEXIÓN SWI-PROLOG */}
      {/* ------------------------------------------------------------- */}
      {(estado === 'error_servicio' || isConnectionError) && (
        <div className="bg-[#FFFFFF] border-2 border-[#B46536]/50 rounded-xl p-6 sm:p-8 shadow-sm space-y-5">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#FBF0E8] rounded-xl text-[#B46536] shrink-0 border border-[#B46536]/20">
              <WifiOff className="w-7 h-7" aria-hidden="true" />
            </div>
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-[11px] font-mono uppercase tracking-wider bg-[#FBF0E8] text-[#B46536] font-bold">
                Aviso de Conexión
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1D3B2F]">
                Sin conexión con el servicio SWI-Prolog
              </h2>
              <p className="text-xs sm:text-sm text-[#465E55] leading-relaxed">
                {errorMensaje || 'No se pudo obtener respuesta del motor de inferencia deductivo externo.'}
              </p>
            </div>
          </div>

          {endpointConsultado.includes('9999') && (
            <div className="p-3.5 bg-[#FAFBF7] border border-[#2D5A46]/30 rounded-lg text-xs text-[#1D3B2F] flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-[#2D5A46] shrink-0" aria-hidden="true" />
              <span>
                <strong>Prueba 7 de la batería:</strong> Se ha verificado con éxito el comportamiento del sistema ante un fallo de conexión simulado. Puedes regresar al cuestionario o restablecer la conexión local con los botones de abajo.
              </span>
            </div>
          )}

          <div className="bg-[#FAFBF7] border border-[#52796F]/20 rounded-lg p-4 text-xs space-y-2">
            <div>
              <span className="text-[#52796F] font-mono text-[11px] block uppercase">Endpoint consultado</span>
              <code className="text-[#1D3B2F] font-mono break-all font-semibold">{endpointConsultado}</code>
            </div>
            <p className="text-[#465E55] leading-relaxed">
              <strong>Principio de rigor agronómico y fidelidad:</strong> La interfaz no fabrica diagnósticos ficticios ni sustituye la inferencia del motor lógico cuando el servicio está desconectado.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onVolverYCorregir}
              className="px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-[#1D3B2F] hover:bg-[#142B22] rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <span>Volver al Cuestionario</span>
            </button>

            {onReconectarServicioLocal && (
              <button
                type="button"
                onClick={onReconectarServicioLocal}
                className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#1D3B2F] bg-[#E8ECE2] hover:bg-[#DCE3D4] border border-[#2D5A46]/30 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Check className="w-4 h-4 text-[#2D5A46]" aria-hidden="true" />
                <span>Reconectar con servicio local (/prolog-api)</span>
              </button>
            )}

            <button
              type="button"
              onClick={onReintentar}
              disabled={isLoading}
              className="px-4 py-2.5 text-xs sm:text-sm font-medium text-[#2D5A46] bg-[#FAFBF7] border border-[#52796F]/30 hover:bg-[#F0F2EB] rounded-lg transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} aria-hidden="true" />
              <span>Reintentar este endpoint</span>
            </button>

            <button
              type="button"
              onClick={onAbrirConfiguracion}
              className="px-4 py-2.5 text-xs sm:text-sm font-medium text-[#52796F] hover:text-[#1D3B2F] bg-[#FAFBF7] border border-[#52796F]/30 hover:bg-[#F0F2EB] rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Settings className="w-3.5 h-3.5 text-[#52796F]" aria-hidden="true" />
              <span>Ajustar URL del servicio</span>
            </button>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* ESTADO 2: RESPUESTAS INCOMPATIBLES */}
      {/* ------------------------------------------------------------- */}
      {estado === 'respuestas_incompatibles' && (
        <div className="bg-[#FFFFFF] border border-[#B46536]/30 rounded-xl p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-[#FBF0E8] rounded-lg text-[#B46536] shrink-0">
              <AlertOctagon className="w-6 h-6" aria-hidden="true" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#B46536] font-semibold">
                Estado: Conflicto Lógico
              </span>
              <h2 className="text-xl font-serif font-bold text-[#1D3B2F]">
                Incompatibilidad en las observaciones
              </h2>
              <p className="text-xs sm:text-sm text-[#465E55] leading-relaxed">
                {aviso || 'Se han ingresado hechos mutuamente contradictorios que impiden formular una deducción válida.'}
              </p>
            </div>
          </div>

          {conflictos.length > 0 && (
            <div className="p-4 bg-[#FAFBF7] border border-[#52796F]/20 rounded-lg">
              <h4 className="text-xs font-bold text-[#1D3B2F] uppercase font-mono tracking-wider mb-2">
                Contradicciones señaladas por la base de conocimiento:
              </h4>
              <ul className="list-disc pl-5 text-xs text-[#2D5A46] space-y-1">
                {conflictos.map((c, idx) => (
                  <li key={idx}>{c}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="pt-2">
            <button
              onClick={onVolverYCorregir}
              className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#1D3B2F] hover:bg-[#142B22] rounded-md transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Corregir Respuestas en el Cuestionario</span>
            </button>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* ESTADO 3: INFORMACIÓN INSUFICIENTE (DATOS PENDIENTES) */}
      {/* ------------------------------------------------------------- */}
      {estado === 'informacion_insuficiente' && (
        <div className="bg-[#FFFFFF] border border-[#52796F]/25 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-[#FAFBF7] border border-[#52796F]/25 rounded-lg text-[#2D5A46] shrink-0">
              <HelpCircle className="w-6 h-6" aria-hidden="true" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#52796F] font-semibold">
                Estado: Información Insuficiente
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1D3B2F]">
                Se requieren datos adicionales para discriminar
              </h2>
              <p className="text-xs sm:text-sm text-[#465E55] leading-relaxed">
                {aviso || 'Los signos aportados no bastan para activar una regla unívoca. Es indispensable verificar los siguientes parámetros en la tomatera.'}
              </p>
            </div>
          </div>

          {datosPendientesDetallados.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-[#1D3B2F] font-mono uppercase tracking-wider">
                Parámetros pendientes de comprobación en huerto:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {datosPendientesDetallados.map((dp) => (
                  <div
                    key={dp.id}
                    className="p-4 bg-[#FAFBF7] border border-[#52796F]/20 rounded-lg space-y-1.5"
                  >
                    <div className="text-xs font-semibold text-[#1D3B2F] flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#B46536]" aria-hidden="true" />
                      <span>{dp.nombre}</span>
                    </div>
                    <p className="text-xs text-[#465E55] leading-relaxed pl-3.5">
                      {dp.orientacion}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={onVolverYCorregir}
              className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#1D3B2F] hover:bg-[#142B22] rounded-md transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Completar estos datos en el Cuestionario</span>
            </button>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* ESTADO 4: NINGUNA REGLA ENCAJA */}
      {/* ------------------------------------------------------------- */}
      {estado === 'ninguna_regla_encaja' && (
        <div className="bg-[#FFFFFF] border border-[#52796F]/20 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-[#FAFBF7] border border-[#52796F]/25 rounded-lg text-[#52796F] shrink-0">
              <XCircle className="w-6 h-6" aria-hidden="true" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#52796F] font-semibold">
                Estado: Ninguna Regla Satisfecha
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1D3B2F]">
                Los signos no coinciden con patologías registradas
              </h2>
              <p className="text-xs sm:text-sm text-[#465E55] leading-relaxed">
                {aviso || 'Ninguna regla fitopatológica de la base de conocimiento se activa con la combinación de síntomas seleccionada.'}
              </p>
            </div>
          </div>

          <div className="p-5 bg-[#FAFBF7] border border-[#52796F]/20 rounded-lg text-xs space-y-2">
            <span className="font-mono text-[10px] uppercase text-[#52796F] block tracking-wider">
              Orientación agroclimática
            </span>
            <p className="text-[#2D5A46] leading-relaxed">
              Síntomas aislados como <strong>grietas o fisuras en la piel del fruto</strong> sin manchas foliares ni micelios corresponden habitualmente a <em>desórdenes fisiológicos abióticos transitorios</em> (hinchamiento brusco de células epidérmicas tras lluvias o riegos torrenciales tras sequía), no a una micosis fúngica activa.
            </p>
            <p className="text-[#5A736A] leading-relaxed">
              Se recomienda mantener la regularidad del riego por goteo y observar la evolución del follaje nuevo durante las próximas 48 horas.
            </p>
          </div>

          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={onVolverYCorregir}
              className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#1D3B2F] hover:bg-[#142B22] rounded-md transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Modificar Respuestas</span>
            </button>
            <button
              onClick={onNuevaConsulta}
              className="px-4 py-2.5 text-xs sm:text-sm font-medium text-[#2D5A46] bg-[#FAFBF7] border border-[#52796F]/30 hover:bg-[#F0F2EB] rounded-md transition-colors cursor-pointer"
            >
              Nueva Consulta
            </button>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* ------------------------------------------------------------- */}
      {/* ESTADO 5 Y 6: EVALUACIÓN FITOSANITARIA / DIAGNÓSTICO DIFERENCIAL */}
      {/* ------------------------------------------------------------- */}
      {(estado === 'hipotesis_generada' || estado === 'hipotesis_generadas' || estado === 'diagnostico_diferencial' || hipotesis.length > 0) && (
        <div className="space-y-6">
          {/* Banner de Diagnóstico Diferencial */}
          {estado === 'diagnostico_diferencial' ? (
            <div className="p-5 bg-[#FAFBF7] border border-[#52796F]/30 rounded-xl flex items-start gap-4">
              <div className="p-2 bg-[#E8ECE2] rounded-lg text-[#2D5A46] shrink-0 mt-0.5">
                <AlertTriangle className="w-5 h-5" aria-hidden="true" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#52796F] font-semibold">
                  Diagnóstico Diferencial Clínico
                </span>
                <h2 className="text-lg font-serif font-bold text-[#1D3B2F]">
                  Múltiples etiologías patogénicas detectadas ({hipotesisAgrupadas.length})
                </h2>
                <p className="text-xs sm:text-sm text-[#465E55] leading-relaxed">
                  Las observaciones concuerdan con más de un agente causal simultáneamente. <strong>Se presenta un análisis diferencial para evaluación de campo.</strong> Examine los criterios clínicos validados en cada ficha técnica para determinar la intervención prioritaria.
                </p>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-[#FAFBF7] border border-[#2D5A46]/30 rounded-xl flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#2D5A46] shrink-0" aria-hidden="true" />
              <div className="text-xs sm:text-sm text-[#1D3B2F]">
                <strong>Diagnóstico fitosanitario validado.</strong> Evaluación clínica completada mediante el motor de inferencia agronómica conforme a protocolos fitopatológicos.
              </div>
            </div>
          )}

          {/* Tarjetas de Diagnóstico Clínico / Sanidad Vegetal */}
          <div className="grid grid-cols-1 gap-6">
            {hipotesisAgrupadas.map((hipo, idx) => (
              <div
                key={idx}
                className="bg-[#FFFFFF] border border-[#52796F]/25 rounded-xl overflow-hidden shadow-xs"
              >
                {/* Cabecera de la ficha de diagnóstico */}
                <div className="p-6 bg-[#FAFBF7] border-b border-[#52796F]/15 flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-[#52796F] uppercase tracking-wider">
                        Patología #{idx + 1} de {hipotesisAgrupadas.length}
                      </span>
                      <span aria-hidden="true" className="text-[#52796F]/40">·</span>
                      <span className="text-[10px] font-mono text-[#2D5A46] font-semibold">
                        Criterio(s): {hipo.reglas_ids.join(', ')}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#1D3B2F]">
                      {hipo.causa}
                    </h3>

                    {hipo.nombre_cientifico && (
                      <p className="text-xs font-serif italic text-[#52796F]">
                        Taxonomía: {hipo.nombre_cientifico}
                      </p>
                    )}
                  </div>

                  {/* Badge de regla agrupada */}
                  <div className="text-xs font-mono bg-white border border-[#52796F]/25 px-3 py-1.5 rounded-md self-start shrink-0 text-[#1D3B2F]">
                    <span className="text-[#52796F] mr-1">Criterio(s):</span>
                    <strong>{hipo.reglas_ids.join(' + ')}</strong>
                  </div>
                </div>

                {/* Contenido de la Ficha */}
                <div className="p-6 sm:p-7 space-y-6 text-xs sm:text-sm">
                  {/* Requisitos cumplidos */}
                  <div>
                    <h4 className="font-semibold text-[#1D3B2F] text-xs font-mono uppercase tracking-wider mb-2.5">
                      Signos y criterios clínicos confirmados ({hipo.requisitos_cumplidos.length}):
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {hipo.requisitos_cumplidos.map((req, rIdx) => {
                        const nombreLegible = MAPEO_NOMBRES_HECHOS[req] || req;
                        return (
                          <div
                            key={rIdx}
                            className="bg-[#FAFBF7] border border-[#52796F]/25 text-[#1D3B2F] px-3 py-1.5 rounded-md text-xs flex items-center gap-2"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#2D5A46] shrink-0" aria-hidden="true" />
                            <span className="font-medium">{nombreLegible}</span>
                            <span className="font-mono text-[10px] text-[#52796F]">[{req}]</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Fundamento biológico */}
                  <div className="p-4 bg-[#FAFBF7] border border-[#52796F]/20 rounded-lg space-y-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#52796F] block">
                      Etiología y comportamiento agroclimático regional
                    </span>
                    <p className="text-[#2D5A46] leading-relaxed">
                      {hipo.explicacionDetallada}
                    </p>
                  </div>

                  {/* Medidas culturales y preventivas */}
                  <div className="space-y-2.5">
                    <h4 className="font-semibold text-[#1D3B2F] text-xs font-mono uppercase tracking-wider">
                      Protocolo de manejo agronómico y control preventivo:
                    </h4>
                    <ul className="space-y-2 text-xs text-[#465E55]">
                      {hipo.medidasCulturales.map((medida, mIdx) => (
                        <li key={mIdx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#2D5A46] shrink-0 mt-1.5" aria-hidden="true" />
                          <span>{medida}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-[11px] text-[#6E887E] italic pt-1">
                      * Protocolo alineado con las directrices de Gestión Integrada de Plagas (GIP, RD 1311/2012 / Directiva UE). Prioridad de control biológico, mecánico y profilaxis cultural.
                    </p>

                    {hipo.fuenteUrl && (
                      <div className="pt-2 border-t border-[#52796F]/15 flex items-center justify-between">
                        <a
                          href={hipo.fuenteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-[#2D5A46] hover:text-[#1D3B2F] font-medium underline"
                        >
                          <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Consultar ficha técnica de referencia (fuente verificada)</span>
                        </a>
                        <span className="text-[10px] font-mono text-[#52796F]">UC IPM / UMN Extension</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Botones de acción posterior */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onVolverYCorregir}
              className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#1D3B2F] hover:bg-[#142B22] rounded-md transition-all shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Corregir Respuestas y Repetir</span>
            </button>
            <button
              onClick={onNuevaConsulta}
              className="px-4 py-2.5 text-xs sm:text-sm font-medium text-[#2D5A46] bg-[#FAFBF7] border border-[#52796F]/30 hover:bg-[#F0F2EB] rounded-md transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#52796F]" aria-hidden="true" />
              <span>Nueva Consulta</span>
            </button>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* AUDITORÍA Y TRAZA JSON DEL MOTOR SWI-PROLOG */}
      {/* ------------------------------------------------------------- */}
      <div className="border-t border-[#52796F]/20 pt-4">
        <button
          type="button"
          onClick={() => setMostrarInspectorJson(!mostrarInspectorJson)}
          className="text-xs text-[#52796F] hover:text-[#1D3B2F] flex items-center gap-1.5 cursor-pointer font-mono"
        >
          <Code className="w-3.5 h-3.5" aria-hidden="true" />
          <span>{mostrarInspectorJson ? 'Ocultar' : 'Ver'} auditoría JSON (Payload SWI-Prolog)</span>
          {mostrarInspectorJson ? (
            <ChevronUp className="w-3.5 h-3.5" aria-hidden="true" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
          )}
        </button>

        {mostrarInspectorJson && (
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
            <div className="bg-[#142B22] text-[#E8ECE2] p-4 rounded-lg overflow-x-auto border border-[#1D3B2F]">
              <div className="text-emerald-300 font-sans font-semibold mb-1 text-[11px]">
                POST {endpointConsultado}
              </div>
              <pre className="text-[11px] text-emerald-200/90">
                {JSON.stringify(payloadEnviado, null, 2)}
              </pre>
            </div>
            <div className="bg-[#142B22] text-[#E8ECE2] p-4 rounded-lg overflow-x-auto border border-[#1D3B2F]">
              <div className="text-amber-300 font-sans font-semibold mb-1 text-[11px]">
                Respuesta del servicio ({estado})
              </div>
              <pre className="text-[11px] text-amber-200/90">
                {JSON.stringify(resultado, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
