import React, { useState } from 'react';
import { X, Server, Check, AlertCircle, RefreshCw, Terminal } from 'lucide-react';
import {
  DEFAULT_API_URL,
  getApiBaseUrl,
  setApiBaseUrl,
  resetApiBaseUrl,
  probarConexionApi,
} from '../services/prologApi';

interface ConnectionSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUrlChanged: (newUrl: string) => void;
}

export const ConnectionSettingsModal: React.FC<ConnectionSettingsModalProps> = ({
  isOpen,
  onClose,
  onUrlChanged,
}) => {
  const [currentUrl, setCurrentUrl] = useState<string>(getApiBaseUrl());
  const [testStatus, setTestStatus] = useState<{
    loading: boolean;
    tested: boolean;
    ok: boolean;
    mensaje: string;
    statusCode?: number;
  }>({
    loading: false,
    tested: false,
    ok: false,
    mensaje: '',
  });

  if (!isOpen) return null;

  const handleGuardar = () => {
    const trimmed = currentUrl.trim();
    setApiBaseUrl(trimmed);
    onUrlChanged(getApiBaseUrl());
    onClose();
  };

  const handleRestablecer = () => {
    resetApiBaseUrl();
    setCurrentUrl(DEFAULT_API_URL);
    onUrlChanged(DEFAULT_API_URL);
    setTestStatus({ loading: false, tested: false, ok: false, mensaje: '' });
  };

  const handleProbarConexion = async () => {
    setTestStatus({
      loading: true,
      tested: false,
      ok: false,
      mensaje: 'Contactando endpoint SWI-Prolog...',
    });

    const resultado = await probarConexionApi(currentUrl);
    setTestStatus({
      loading: false,
      tested: true,
      ok: resultado.ok,
      mensaje: resultado.mensaje,
      statusCode: resultado.status,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-[#142B22]/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="connection-modal-title"
    >
      <div className="bg-[#FFFFFF] border border-[#52796F]/25 rounded-xl max-w-xl w-full shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#52796F]/15 bg-[#FAFBF7]">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-[#FAFBF7] border border-[#52796F]/25 rounded-md text-[#2D5A46]">
              <Server className="w-4 h-4" aria-hidden="true" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#52796F]">
                Integración de Inferencia
              </span>
              <h2 id="connection-modal-title" className="text-base font-serif font-bold text-[#1D3B2F]">
                Servicio SWI-Prolog
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar ventana"
            className="p-1.5 text-[#52796F] hover:text-[#1D3B2F] rounded-md hover:bg-[#F0F2EB] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-sm text-[#2D5A46]">
          <div>
            <label htmlFor="api-url-input" className="block text-xs font-semibold text-[#1D3B2F] font-mono uppercase tracking-wider mb-1.5">
              URL Base del Servicio (`VITE_PLANTEXPERT_API_URL`)
            </label>
            <div className="flex gap-2">
              <input
                id="api-url-input"
                type="url"
                value={currentUrl}
                onChange={(e) => {
                  setCurrentUrl(e.target.value);
                  setTestStatus({ loading: false, tested: false, ok: false, mensaje: '' });
                }}
                placeholder="http://localhost:8000"
                className="flex-1 px-3 py-2 text-xs font-mono border border-[#52796F]/30 rounded-md focus:outline-hidden focus:ring-2 focus:ring-[#1D3B2F] bg-[#FAFBF7] text-[#1D3B2F]"
              />
              <button
                type="button"
                onClick={handleProbarConexion}
                disabled={testStatus.loading || !currentUrl.trim()}
                className="px-3.5 py-2 text-xs font-semibold text-[#1D3B2F] bg-[#FAFBF7] border border-[#52796F]/30 rounded-md hover:bg-[#F0F2EB] disabled:opacity-50 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5"
              >
                {testStatus.loading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" aria-hidden="true" />
                    <span>Probando...</span>
                  </>
                ) : (
                  <span>Probar Conexión</span>
                )}
              </button>
            </div>
            <p className="text-[11px] text-[#52796F] mt-1.5 font-mono">
              Endpoint: <span className="text-[#1D3B2F]">{currentUrl.replace(/\/+$/, '')}/diagnosticar</span>
            </p>
          </div>

          {/* Test status banner */}
          {testStatus.tested && (
            <div
              className={`p-3.5 rounded-lg border text-xs flex items-start gap-2.5 ${
                testStatus.ok
                  ? 'bg-[#FAFBF7] border-[#2D5A46]/40 text-[#1D3B2F]'
                  : 'bg-[#FBF0E8] border-[#B46536]/40 text-[#8C3E14]'
              }`}
            >
              {testStatus.ok ? (
                <Check className="w-4 h-4 text-[#2D5A46] shrink-0 mt-0.5" aria-hidden="true" />
              ) : (
                <AlertCircle className="w-4 h-4 text-[#B46536] shrink-0 mt-0.5" aria-hidden="true" />
              )}
              <div className="space-y-1">
                <p className="font-semibold">{testStatus.mensaje}</p>
                {!testStatus.ok && (
                  <p className="text-[11px] leading-normal opacity-90">
                    Asegúrese de que el proceso de SWI-Prolog esté iniciado en ese puerto o revise las cabeceras CORS.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Instrucciones de ejecución */}
          <div className="p-4 bg-[#142B22] text-[#E8ECE2] rounded-lg space-y-2 border border-[#1D3B2F]">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300">
              <Terminal className="w-4 h-4" aria-hidden="true" />
              <span>Cómo iniciar el servidor SWI-Prolog incluido</span>
            </div>
            <p className="text-xs text-emerald-100/90 leading-relaxed">
              El repositorio contiene el script completo del servidor con la base de reglas en <code className="text-emerald-300 font-mono">prolog/plantexpert.pl</code>:
            </p>
            <pre className="p-2 bg-[#0C1B15] border border-emerald-900/50 rounded font-mono text-xs text-emerald-300 overflow-x-auto">
              swipl prolog/plantexpert.pl
            </pre>
            <p className="text-[11px] text-emerald-400/80">
              Atiende peticiones en <span className="font-mono text-emerald-200">http://localhost:8000/diagnosticar</span>.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-[#52796F]/15 bg-[#FAFBF7] flex items-center justify-between">
          <button
            type="button"
            onClick={handleRestablecer}
            className="text-xs text-[#52796F] hover:text-[#1D3B2F] underline cursor-pointer"
          >
            Restablecer por defecto ({DEFAULT_API_URL})
          </button>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 text-xs font-medium text-[#2D5A46] bg-white border border-[#52796F]/25 rounded-md hover:bg-[#F0F2EB] cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleGuardar}
              className="px-4 py-1.5 text-xs font-semibold text-white bg-[#1D3B2F] hover:bg-[#142B22] rounded-md cursor-pointer transition-colors"
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
