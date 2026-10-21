import React from 'react';
import { BotanicalIllustration } from './BotanicalIllustration';
import { ArrowRight, FlaskConical, ShieldAlert, BookOpen, Server, Edit2 } from 'lucide-react';

interface HeroBotanicaProps {
  onIniciarCuestionario: () => void;
  onAbrirPruebas: () => void;
  onAbrirInfo: () => void;
  onAbrirConfiguracion: () => void;
  apiBaseUrl: string;
}

export const HeroBotanica: React.FC<HeroBotanicaProps> = ({
  onIniciarCuestionario,
  onAbrirPruebas,
  onAbrirInfo,
  onAbrirConfiguracion,
  apiBaseUrl,
}) => {
  return (
    <section
      aria-label="Presentación del laboratorio botánico"
      className="bg-[#FFFFFF] border border-[#52796F]/20 rounded-xl p-6 sm:p-10 shadow-xs relative overflow-hidden"
    >
      {/* Delicate background specimen grid lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: 'radial-gradient(#1D3B2F 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />

      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Editorial Typography and Action Points (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Herbarium Plate Tag + Quick URL edit pill */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-[#52796F]">
              <span className="w-2 h-2 rounded-full bg-[#2D5A46]" aria-hidden="true" />
              <span>Plataforma de Diagnóstico Fitosanitario · Sanidad Vegetal</span>
            </div>

            {/* Direct button to change service URL */}
            <button
              type="button"
              onClick={onAbrirConfiguracion}
              title="Haz clic para cambiar la URL base del servicio SWI-Prolog"
              className="px-2.5 py-1 text-[11px] font-mono text-[#1D3B2F] bg-[#FAFBF7] hover:bg-[#F0F2EB] border border-[#52796F]/25 rounded-md flex items-center gap-1.5 transition-colors cursor-pointer group"
            >
              <Server className="w-3 h-3 text-[#2D5A46]" aria-hidden="true" />
              <span className="truncate max-w-[170px]">{apiBaseUrl}</span>
              <span className="text-[#52796F] group-hover:text-[#1D3B2F] underline text-[10px]">Cambiar URL</span>
            </button>
          </div>

          {/* Main Editorial Headline */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-[#1D3B2F] leading-[1.12]">
              Salud foliar. <br />
              <span className="italic font-normal text-[#2D5A46]">Precisión agronómica.</span>
            </h1>
            <p className="text-sm sm:text-base text-[#465E55] leading-relaxed max-w-xl">
              Plataforma profesional para la evaluación fitopatológica y etiológica en cultivos de tomate al aire libre (<em>Solanum lycopersicum</em>). Motor determinista de inferencia lógica basado en cláusulas de Horn y SWI-Prolog.
            </p>
          </div>

          {/* Field Specimen Keynotes */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
            <div className="p-3 bg-[#FAFBF7] border border-[#52796F]/15 rounded-md">
              <span className="text-[10px] uppercase font-mono text-[#52796F] block mb-0.5">Biotopo</span>
              <span className="font-semibold text-[#1D3B2F]">Clima Atlántico</span>
              <p className="text-[11px] text-[#5A736A] mt-0.5">Humedad &gt;85% y rocíos nocturnos.</p>
            </div>
            <div className="p-3 bg-[#FAFBF7] border border-[#52796F]/15 rounded-md">
              <span className="text-[10px] uppercase font-mono text-[#52796F] block mb-0.5">Inferencia</span>
              <span className="font-semibold text-[#1D3B2F]">SWI-Prolog</span>
              <p className="text-[11px] text-[#5A736A] mt-0.5">Deducción lógica determinista.</p>
            </div>
            <div className="p-3 bg-[#FAFBF7] border border-[#52796F]/15 rounded-md">
              <span className="text-[10px] uppercase font-mono text-[#52796F] block mb-0.5">Sostenibilidad</span>
              <span className="font-semibold text-[#1D3B2F]">Gestión GIP</span>
              <p className="text-[11px] text-[#5A736A] mt-0.5">Profilaxis y control biológico.</p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <button
              onClick={onIniciarCuestionario}
              className="px-5 py-3 text-xs sm:text-sm font-semibold text-[#FAFBF7] bg-[#1D3B2F] hover:bg-[#142B22] rounded-md transition-all shadow-xs flex items-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#1D3B2F]"
            >
              <span>Comenzar Evaluación Fitosanitaria</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>

            <button
              onClick={onAbrirPruebas}
              className="px-4 py-3 text-xs sm:text-sm font-medium text-[#2D5A46] bg-[#FAFBF7] hover:bg-[#F0F2EB] border border-[#52796F]/25 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <FlaskConical className="w-4 h-4 text-[#2D5A46]" aria-hidden="true" />
              <span>Cargar Casos Clínicos</span>
            </button>

            <button
              onClick={onAbrirInfo}
              className="px-3.5 py-3 text-xs font-medium text-[#52796F] hover:text-[#1D3B2F] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Dossier Técnico</span>
            </button>
          </div>

          {/* Disclaimer text */}
          <p className="text-[11px] text-[#6E887E] flex items-center gap-1.5 pt-1">
            <ShieldAlert className="w-3.5 h-3.5 text-[#B46536] shrink-0" aria-hidden="true" />
            <span>Sistema de soporte a la decisión agronómica (DSS) conforme a Gestión Integrada de Plagas.</span>
          </p>
        </div>

        {/* Right Column: Specimen Card & Botanical Illustration (5 cols) */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="w-full max-w-sm">
            <BotanicalIllustration />
          </div>
        </div>
      </div>
    </section>
  );
};
