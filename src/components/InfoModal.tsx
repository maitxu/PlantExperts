import React, { useState } from 'react';
import { X, BookOpen, AlertTriangle, CloudRain, ShieldCheck, Layers, Bot, ExternalLink } from 'lucide-react';
import { EXPERT_SYSTEM_INFO } from '../config/expertSystemInfo';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose }) => {
  const [seccionActiva, setSeccionActiva] = useState<'alcance' | 'componentes' | 'comparativa' | 'fuentes'>('alcance');

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-[#142B22]/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="bg-[#FFFFFF] border border-[#52796F]/25 rounded-xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#52796F]/15 bg-[#FAFBF7]">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#52796F]">
              Dossier Técnico y Arquitectura del Sistema
            </span>
            <h2 id="modal-title" className="text-lg sm:text-xl font-serif font-bold text-[#1D3B2F]">
              {EXPERT_SYSTEM_INFO.titulo}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar ventana"
            className="p-1.5 text-[#52796F] hover:text-[#1D3B2F] rounded-md hover:bg-[#F0F2EB] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Navigation tabs */}
        <div className="flex border-b border-[#52796F]/15 bg-[#FAFBF7] px-6 gap-2 overflow-x-auto text-xs font-medium">
          <button
            type="button"
            onClick={() => setSeccionActiva('alcance')}
            className={`py-3 px-3 border-b-2 whitespace-nowrap cursor-pointer transition-colors ${
              seccionActiva === 'alcance'
                ? 'border-[#1D3B2F] text-[#1D3B2F] font-bold'
                : 'border-transparent text-[#52796F] hover:text-[#1D3B2F]'
            }`}
          >
            Alcance y Límites
          </button>
          <button
            type="button"
            onClick={() => setSeccionActiva('componentes')}
            className={`py-3 px-3 border-b-2 whitespace-nowrap cursor-pointer transition-colors flex items-center gap-1.5 ${
              seccionActiva === 'componentes'
                ? 'border-[#1D3B2F] text-[#1D3B2F] font-bold'
                : 'border-transparent text-[#52796F] hover:text-[#1D3B2F]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Los 5 Componentes</span>
          </button>
          <button
            type="button"
            onClick={() => setSeccionActiva('comparativa')}
            className={`py-3 px-3 border-b-2 whitespace-nowrap cursor-pointer transition-colors flex items-center gap-1.5 ${
              seccionActiva === 'comparativa'
                ? 'border-[#1D3B2F] text-[#1D3B2F] font-bold'
                : 'border-transparent text-[#52796F] hover:text-[#1D3B2F]'
            }`}
          >
            <Bot className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Comparativa con LLM</span>
          </button>
          <button
            type="button"
            onClick={() => setSeccionActiva('fuentes')}
            className={`py-3 px-3 border-b-2 whitespace-nowrap cursor-pointer transition-colors flex items-center gap-1.5 ${
              seccionActiva === 'fuentes'
                ? 'border-[#1D3B2F] text-[#1D3B2F] font-bold'
                : 'border-transparent text-[#52796F] hover:text-[#1D3B2F]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Fuentes Técnicas</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 space-y-6 text-sm text-[#2D5A46] leading-relaxed">
          {/* TAB 1: Alcance y Límites */}
          {seccionActiva === 'alcance' && (
            <div className="space-y-6">
              {/* Aviso orientativo obligatorio */}
              <div className="p-4 bg-[#FBF0E8] border border-[#B46536]/30 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-[#B46536] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <h3 className="font-semibold text-[#8C3E14] text-xs uppercase tracking-wider mb-1 font-mono">
                      Aviso Agronómico Orientativo
                    </h3>
                    <p className="text-xs text-[#8C3E14]">
                      {EXPERT_SYSTEM_INFO.avisoLegal}
                    </p>
                  </div>
                </div>
              </div>

              {/* Contexto Geográfico */}
              <section className="space-y-3">
                <div className="flex items-center gap-2 text-[#1D3B2F] font-serif font-bold border-b border-[#52796F]/15 pb-2 text-base">
                  <CloudRain className="w-4 h-4 text-[#2D5A46]" aria-hidden="true" />
                  <h3>Ámbito y Climatología de Euskadi</h3>
                </div>
                <p className="text-xs text-[#465E55]">
                  <span className="font-semibold text-[#1D3B2F]">Zona de aplicación: </span>
                  {EXPERT_SYSTEM_INFO.ambitoGeografico}.
                </p>
                <p className="text-xs text-[#465E55]">
                  {EXPERT_SYSTEM_INFO.contextoEuskadi.climatologia}
                </p>

                <div className="mt-2 bg-[#FAFBF7] border border-[#52796F]/20 rounded-lg p-4">
                  <h4 className="text-xs font-bold text-[#1D3B2F] mb-2 font-mono uppercase tracking-wider">
                    Buenas prácticas preventivas en huertos atlánticos:
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-xs text-[#465E55]">
                    {EXPERT_SYSTEM_INFO.contextoEuskadi.practicasRecomendadas.map((practica, idx) => (
                      <li key={idx}>{practica}</li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* Alcance del Sistema */}
              <section className="space-y-3">
                <h3 className="font-serif font-bold text-[#1D3B2F] border-b border-[#52796F]/15 pb-2 text-base">
                  Alcance del Sistema Experto
                </h3>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#465E55]">
                  {EXPERT_SYSTEM_INFO.alcance.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </section>

              {/* Limitaciones */}
              <section className="space-y-3">
                <h3 className="font-serif font-bold text-[#1D3B2F] border-b border-[#52796F]/15 pb-2 text-base">
                  Limitaciones del Modelo
                </h3>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#465E55]">
                  {EXPERT_SYSTEM_INFO.limitaciones.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </section>
            </div>
          )}

          {/* TAB 2: Arquitectura del Sistema Experto */}
          {seccionActiva === 'componentes' && (
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="font-serif font-bold text-[#1D3B2F] text-base">
                  Arquitectura Integral de 5 Componentes Fitosanitarios
                </h3>
                <p className="text-xs text-[#5A736A]">
                  Diseño modular de grado industrial basado en sistemas de decisión clínica fitosanitaria:
                </p>
              </div>

              <div className="space-y-3">
                {EXPERT_SYSTEM_INFO.losCincoComponentes.map((comp) => (
                  <div key={comp.numero} className="p-4 bg-[#FAFBF7] border border-[#52796F]/20 rounded-lg space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-bold text-[#1D3B2F] text-sm">
                        {comp.numero}. {comp.nombre}
                      </span>
                      <span className="text-[10px] font-mono bg-white border border-[#52796F]/20 px-2 py-0.5 rounded text-[#2D5A46] font-semibold">
                        {comp.tecnologia}
                      </span>
                    </div>
                    <p className="text-xs text-[#465E55] leading-relaxed">
                      {comp.rol}
                    </p>
                  </div>
                ))}
              </div>

              <div className="p-3.5 bg-[#FAFBF7] border border-[#52796F]/25 rounded-lg text-xs space-y-1">
                <strong className="text-[#1D3B2F] font-mono text-[11px] uppercase block">
                  Módulo de Gobernanza y Validación de Reglas Fitosanitarias:
                </strong>
                <p className="text-[#465E55]">
                  El motor incorpora un protocolo estandarizado de validación de reglas agronómicas que exige contrastar fuentes fitopatológicas internacionales, calcular la consistencia semántica y garantizar la ausencia de contradicciones lógicas antes del despliegue en producción.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: Comparativa con LLM */}
          {seccionActiva === 'comparativa' && (
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="font-serif font-bold text-[#1D3B2F] text-base">
                  Evaluación Comparativa: Sistema Experto Determinista (SWI-Prolog) vs. Modelos Genéricos LLM
                </h3>
                <p className="text-xs text-[#5A736A]">
                  Análisis de idoneidad técnica en soporte a decisiones agronómicas críticas y fitosanitarias:
                </p>
              </div>

              <div className="border border-[#52796F]/20 rounded-lg overflow-hidden">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#FAFBF7] border-b border-[#52796F]/20 text-[#1D3B2F] font-serif font-semibold">
                      <th className="p-3">Aspecto evaluado</th>
                      <th className="p-3 bg-[#E8ECE2]/60">PlantExpert Pro (SWI-Prolog)</th>
                      <th className="p-3">LLM Genérico (ChatGPT / Gemini)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#52796F]/10 text-xs">
                    {EXPERT_SYSTEM_INFO.comparativaLLM.map((c, idx) => (
                      <tr key={idx} className="hover:bg-[#FAFBF7]/50">
                        <td className="p-3 font-semibold text-[#1D3B2F] align-top">{c.aspecto}</td>
                        <td className="p-3 bg-[#FAFBF7] text-[#1D3B2F] align-top font-medium">{c.sistemaExpertoProlog}</td>
                        <td className="p-3 text-[#5A736A] align-top">{c.modeloLLM}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: Fuentes Técnicas */}
          {seccionActiva === 'fuentes' && (
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="font-serif font-bold text-[#1D3B2F] text-base">
                  Organismos Fitosanitarios y Fuentes Técnicas de Referencia
                </h3>
                <p className="text-xs text-[#5A736A]">
                  Repositorios fitopatológicos y guías oficiales que sustentan la base de conocimiento:
                </p>
              </div>

              <div className="space-y-2.5">
                {EXPERT_SYSTEM_INFO.fuentes.map((fuente, idx) => (
                  <div key={idx} className="p-3.5 border border-[#52796F]/20 rounded-lg bg-[#FAFBF7] space-y-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h4 className="text-xs font-bold text-[#1D3B2F]">
                        {fuente.nombre}
                      </h4>
                      <span className="text-[10px] font-mono text-[#2D5A46] bg-[#E8ECE2] px-2 py-0.5 rounded self-start">
                        {fuente.entidad}
                      </span>
                    </div>
                    <p className="text-xs text-[#5A736A]">
                      {fuente.descripcion}
                    </p>
                    {fuente.url && (
                      <a
                        href={fuente.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] text-[#2D5A46] hover:text-[#1D3B2F] underline pt-0.5"
                      >
                        <span>Abrir recurso</span>
                        <ExternalLink className="w-3 h-3" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-[#52796F]/15 bg-[#FAFBF7] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-[#1D3B2F] bg-white border border-[#52796F]/25 rounded-md hover:bg-[#F0F2EB] transition-colors cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
