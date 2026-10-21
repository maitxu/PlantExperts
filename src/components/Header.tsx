import React from 'react';
import { Server, HelpCircle, FlaskConical, Sprout } from 'lucide-react';

interface HeaderProps {
  onOpenInfo: () => void;
  onOpenConnection: () => void;
  onOpenTests: () => void;
  activeTab: 'cuestionario' | 'pruebas' | 'info';
  setActiveTab: (tab: 'cuestionario' | 'pruebas' | 'info') => void;
  apiBaseUrl: string;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenInfo,
  onOpenConnection,
  onOpenTests,
  activeTab,
  setActiveTab,
  apiBaseUrl,
}) => {
  return (
    <header className="border-b border-[#52796F]/20 bg-[#FFFFFF] sticky top-0 z-30 shadow-xs">
      {/* Top Bar Contract: 3 zones separated by gap-8 */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('cuestionario')}
            className="text-left group cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#1D3B2F] rounded-sm flex items-center gap-2.5"
          >
            <div className="w-7 h-7 rounded-md bg-[#1D3B2F] flex items-center justify-center text-[#FAFBF7] shadow-xs">
              <Sprout className="w-4 h-4" aria-hidden="true" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-[#1D3B2F] font-serif block leading-none">
                PlantExpert
              </span>
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#52796F] block mt-0.5">
                Laboratorio Euskadi
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation Links (concise, single-line) */}
        <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-[#465E55]" aria-label="Navegación principal">
          <button
            onClick={() => setActiveTab('cuestionario')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 ${
              activeTab === 'cuestionario'
                ? 'text-[#1D3B2F] font-semibold border-b-2 border-[#1D3B2F]'
                : 'hover:text-[#1D3B2F]'
            }`}
          >
            Diagnóstico
          </button>
          <button
            onClick={() => {
              setActiveTab('pruebas');
              onOpenTests();
            }}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 flex items-center gap-1.5 ${
              activeTab === 'pruebas'
                ? 'text-[#1D3B2F] font-semibold border-b-2 border-[#1D3B2F]'
                : 'hover:text-[#1D3B2F]'
            }`}
          >
            <FlaskConical className="w-4 h-4 text-[#2D5A46]" aria-hidden="true" />
            <span>Casos de Prueba</span>
          </button>
          <button
            onClick={onOpenInfo}
            className="whitespace-nowrap shrink-0 transition-colors hover:text-[#1D3B2F] cursor-pointer py-1 flex items-center gap-1.5"
          >
            <HelpCircle className="w-4 h-4 text-[#52796F]" aria-hidden="true" />
            <span>Ámbito y Fuentes</span>
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenConnection}
            title={`Configuración del endpoint SWI-Prolog (${apiBaseUrl})`}
            className="px-3.5 py-1.5 text-xs font-medium text-[#1D3B2F] bg-[#FAFBF7] border border-[#52796F]/25 rounded-md hover:bg-[#F0F2EB] transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#1D3B2F]"
          >
            <Server className="w-3.5 h-3.5 text-[#2D5A46] shrink-0" aria-hidden="true" />
            <span className="hidden sm:inline">Servicio SWI-Prolog</span>
            <span className="sm:hidden">API</span>
          </button>
        </div>
      </div>

      {/* Sub-header Contextual Ribbon */}
      <div className="bg-[#FAFBF7] border-t border-[#52796F]/15 px-4 py-1.5 text-xs text-[#465E55]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#1D3B2F]">Ámbito:</span>
            <span>Tomateras al aire libre (Solanum lycopersicum) en huertos domésticos de la vertiente atlántica vasca.</span>
          </div>
          <div className="text-[#B46536] font-medium whitespace-nowrap flex items-center gap-1 text-[11px]">
            <span>Carácter orientativo académico</span>
            <span aria-hidden="true">·</span>
            <span>Deducción en SWI-Prolog</span>
          </div>
        </div>
      </div>
    </header>
  );
};
