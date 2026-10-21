import React from 'react';
import { FlaskConical, Play, CheckCircle2, AlertOctagon, Sparkles } from 'lucide-react';
import { CASOS_PRUEBA_MANUALES } from '../config/symptomsData';
import { CasoPruebaManual } from '../types/plantexpert';

interface ManualTestsBarProps {
  onCargarCaso: (caso: CasoPruebaManual, autoEjecutar: boolean) => void;
  onEjecutarErrorApi: () => void;
  ejecutandoConsulta: boolean;
}

export const ManualTestsBar: React.FC<ManualTestsBarProps> = ({
  onCargarCaso,
  onEjecutarErrorApi,
  ejecutandoConsulta,
}) => {
  return (
    <section aria-labelledby="tests-title" className="bg-[#FFFFFF] border border-[#52796F]/20 rounded-xl p-5 sm:p-7 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#52796F]/15 pb-3.5 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 bg-[#FAFBF7] border border-[#52796F]/25 rounded-md text-[#2D5A46]">
            <FlaskConical className="w-4 h-4" aria-hidden="true" />
          </div>
          <div>
            <h2 id="tests-title" className="text-base font-serif font-bold text-[#1D3B2F]">
              Batería de Pruebas Académicas
            </h2>
            <p className="text-[11px] text-[#52796F]">
              Casos de verificación rápida de la base de conocimiento en SWI-Prolog
            </p>
          </div>
        </div>
        <span className="text-xs text-[#52796F] font-mono">
          7 casos obligatorios
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {CASOS_PRUEBA_MANUALES.map((caso) => {
          const isErrorCaso = caso.id === 'caso_error_api';

          return (
            <div
              key={caso.id}
              className={`border rounded-lg p-4 flex flex-col justify-between transition-all ${
                isErrorCaso
                  ? 'border-[#B46536]/30 bg-[#FBF0E8]/40 hover:bg-[#FBF0E8]/70'
                  : 'border-[#52796F]/20 bg-[#FAFBF7] hover:bg-[#F0F2EB]'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <h3 className="text-xs font-bold text-[#1D3B2F] font-serif">
                    {caso.titulo}
                  </h3>
                  {isErrorCaso ? (
                    <AlertOctagon className="w-4 h-4 text-[#B46536] shrink-0 mt-0.5" aria-hidden="true" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 text-[#2D5A46] shrink-0 mt-0.5" aria-hidden="true" />
                  )}
                </div>
                <p className="text-xs text-[#465E55] mb-2.5 leading-snug">
                  {caso.descripcion}
                </p>

                <div className="text-[11px] text-[#52796F] font-mono mb-3 space-y-0.5">
                  <span className="text-[#1D3B2F] font-sans font-medium text-[11px] block">Hechos evaluados:</span>
                  <div className="text-[#2D5A46] truncate">
                    {caso.hechosEsperados.join(' + ')}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2.5 border-t border-[#52796F]/15">
                <button
                  type="button"
                  disabled={ejecutandoConsulta}
                  onClick={() => {
                    if (isErrorCaso) {
                      onEjecutarErrorApi();
                    } else {
                      onCargarCaso(caso, false);
                    }
                  }}
                  className="flex-1 px-2.5 py-1.5 text-xs font-medium text-[#2D5A46] bg-white border border-[#52796F]/25 rounded hover:bg-[#FAFBF7] disabled:opacity-50 cursor-pointer transition-colors"
                >
                  Cargar
                </button>
                <button
                  type="button"
                  disabled={ejecutandoConsulta}
                  onClick={() => {
                    if (isErrorCaso) {
                      onEjecutarErrorApi();
                    } else {
                      onCargarCaso(caso, true);
                    }
                  }}
                  title="Cargar y consultar inmediatamente a la API"
                  className={`px-3 py-1.5 text-xs font-semibold rounded text-white flex items-center justify-center gap-1 disabled:opacity-50 cursor-pointer transition-colors ${
                    isErrorCaso
                      ? 'bg-[#B46536] hover:bg-[#974E24]'
                      : 'bg-[#1D3B2F] hover:bg-[#142B22]'
                  }`}
                >
                  <Play className="w-3 h-3 fill-current" aria-hidden="true" />
                  <span>Probar</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
