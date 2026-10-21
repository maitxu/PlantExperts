import React from 'react';
import { X, BookOpen, AlertTriangle, CloudRain, ShieldCheck } from 'lucide-react';
import { EXPERT_SYSTEM_INFO } from '../config/expertSystemInfo';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-[#142B22]/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="bg-[#FFFFFF] border border-[#52796F]/25 rounded-xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#52796F]/15 bg-[#FAFBF7]">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#52796F]">
              Documentación Académica
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

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 space-y-6 text-sm text-[#2D5A46] leading-relaxed">
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

          {/* Contexto Geográfico y Euskadi */}
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
            <p className="text-xs text-[#465E55]">
              {EXPERT_SYSTEM_INFO.contextoEuskadi.vulnerabilidades}
            </p>

            <div className="mt-2 bg-[#FAFBF7] border border-[#52796F]/20 rounded-lg p-4">
              <h4 className="text-xs font-bold text-[#1D3B2F] mb-2 font-mono uppercase tracking-wider">
                Buenas prácticas culturales preventivas en huertos atlánticos:
              </h4>
              <ul className="list-disc pl-5 space-y-1 text-xs text-[#465E55]">
                {EXPERT_SYSTEM_INFO.contextoEuskadi.practicasRecomendadas.map((practica, idx) => (
                  <li key={idx}>{practica}</li>
                ))}
              </ul>
            </div>
          </section>

          {/* Alcance del Sistema Experto */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-[#1D3B2F] font-serif font-bold border-b border-[#52796F]/15 pb-2 text-base">
              <BookOpen className="w-4 h-4 text-[#2D5A46]" aria-hidden="true" />
              <h3>Alcance del Sistema</h3>
            </div>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#465E55]">
              {EXPERT_SYSTEM_INFO.alcance.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>

          {/* Limitaciones Estrictas */}
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

          {/* Fuentes Científicas e Institucionales */}
          <section className="space-y-3">
            <h3 className="font-serif font-bold text-[#1D3B2F] border-b border-[#52796F]/15 pb-2 text-base">
              Fuentes Científicas y Referencias Agronómicas
            </h3>
            <div className="space-y-2.5">
              {EXPERT_SYSTEM_INFO.fuentes.map((fuente, idx) => (
                <div key={idx} className="p-3.5 border border-[#52796F]/20 rounded-lg bg-[#FAFBF7]">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-xs font-bold text-[#1D3B2F]">
                      {fuente.nombre}
                    </h4>
                    <span className="text-[10px] font-mono text-[#2D5A46] shrink-0 font-medium bg-[#E8ECE2] px-2 py-0.5 rounded">
                      {fuente.entidad}
                    </span>
                  </div>
                  <p className="text-xs text-[#5A736A] mt-1">
                    {fuente.descripcion}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Especificaciones Técnicas SWI-Prolog */}
          <section className="p-4 bg-[#FAFBF7] border border-[#52796F]/20 rounded-lg space-y-2">
            <h4 className="text-xs font-bold text-[#1D3B2F] uppercase font-mono tracking-wider">
              Arquitectura de Inferencia SWI-Prolog
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-[#52796F] font-medium">Motor: </span>
                <span className="font-mono text-[#1D3B2F]">{EXPERT_SYSTEM_INFO.especificacionesTecnicas.motorInferencia}</span>
              </div>
              <div>
                <span className="text-[#52796F] font-medium">Paradigma: </span>
                <span className="text-[#1D3B2F]">{EXPERT_SYSTEM_INFO.especificacionesTecnicas.paradigma}</span>
              </div>
              <div>
                <span className="text-[#52796F] font-medium">Protocolo: </span>
                <span className="font-mono text-[#1D3B2F]">{EXPERT_SYSTEM_INFO.especificacionesTecnicas.protocolo}</span>
              </div>
              <div>
                <span className="text-[#52796F] font-medium">Enfoque: </span>
                <span className="text-[#1D3B2F]">{EXPERT_SYSTEM_INFO.especificacionesTecnicas.enfoqueEtico}</span>
              </div>
            </div>
          </section>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-[#52796F]/15 bg-[#FAFBF7] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-[#1D3B2F] bg-white border border-[#52796F]/25 rounded-md hover:bg-[#F0F2EB] transition-colors cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
