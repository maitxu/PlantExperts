import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Server,
  Check,
  AlertCircle,
  RefreshCw,
  Terminal,
  RotateCcw,
  Star,
  CheckCircle2,
} from 'lucide-react';
import {
  FACTORY_DEFAULT_API_URL,
  getDefaultApiUrl,
  setDefaultApiUrl,
  resetDefaultApiUrlToFactory,
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
  const [defaultUrl, setDefaultUrlState] = useState<string>(getDefaultApiUrl());
  const [fijarComoPredeterminada, setFijarComoPredeterminada] = useState<boolean>(false);
  const [feedbackMensaje, setFeedbackMensaje] = useState<string>('');

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

  const inputRef = useRef<HTMLInputElement>(null);

  // Sincronizar el valor cada vez que se abre la ventana modal
  useEffect(() => {
    if (isOpen) {
      const active = getApiBaseUrl();
      const currentDef = getDefaultApiUrl();
      setCurrentUrl(active);
      setDefaultUrlState(currentDef);
      setFijarComoPredeterminada(false);
      setFeedbackMensaje('');
      setTestStatus({ loading: false, tested: false, ok: false, mensaje: '' });

      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          inputRef.current.select();
        }
      }, 50);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleGuardar = () => {
    const trimmed = currentUrl.trim();
    const finalUrl = trimmed || defaultUrl;

    if (fijarComoPredeterminada && trimmed) {
      // Guardar también como nuevo valor predeterminado
      setDefaultApiUrl(trimmed);
      setDefaultUrlState(trimmed);
    }

    setApiBaseUrl(finalUrl);
    onUrlChanged(finalUrl);
    onClose();
  };

  /**
   * Guarda directamente el valor del input como la nueva URL predeterminada
   */
  const handleEstablecerComoPredeterminado = () => {
    const trimmed = currentUrl.trim();
    if (!trimmed) return;

    setDefaultApiUrl(trimmed);
    setDefaultUrlState(trimmed);
    setApiBaseUrl(trimmed);
    onUrlChanged(trimmed);
    setFeedbackMensaje(`¡Guardado! Ahora "${trimmed}" es el valor predeterminado.`);
    setTimeout(() => setFeedbackMensaje(''), 4000);
  };

  /**
   * Restablece el valor del campo a la URL predeterminada actual
   */
  const handleRestablecerAPredeterminado = () => {
    const def = getDefaultApiUrl();
    resetApiBaseUrl();
    setCurrentUrl(def);
    onUrlChanged(def);
    setTestStatus({
      loading: false,
      tested: true,
      ok: true,
      mensaje: `Campo restablecido a la URL predeterminada: ${def}`,
    });
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  /**
   * Restablece completamente a los valores de fábrica (http://localhost:8000)
   */
  const handleRestablecerFabrica = () => {
    resetDefaultApiUrlToFactory();
    setCurrentUrl(FACTORY_DEFAULT_API_URL);
    setDefaultUrlState(FACTORY_DEFAULT_API_URL);
    onUrlChanged(FACTORY_DEFAULT_API_URL);
    setFeedbackMensaje(`Valores predeterminados restablecidos a fábrica (${FACTORY_DEFAULT_API_URL})`);
    setTestStatus({
      loading: false,
      tested: true,
      ok: true,
      mensaje: `Predeterminado restablecido al original de fábrica: ${FACTORY_DEFAULT_API_URL}`,
    });
    setTimeout(() => setFeedbackMensaje(''), 4000);
  };

  const handleAplicarPreset = (url: string) => {
    setCurrentUrl(url);
    setTestStatus({ loading: false, tested: false, ok: false, mensaje: '' });
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleLimpiarCampo = () => {
    setCurrentUrl('');
    setTestStatus({ loading: false, tested: false, ok: false, mensaje: '' });
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleProbarConexion = async () => {
    const urlAProbar = currentUrl.trim() || defaultUrl;
    setTestStatus({
      loading: true,
      tested: false,
      ok: false,
      mensaje: 'Contactando endpoint SWI-Prolog...',
    });

    const resultado = await probarConexionApi(urlAProbar);
    setTestStatus({
      loading: false,
      tested: true,
      ok: resultado.ok,
      mensaje: resultado.mensaje,
      statusCode: resultado.status,
    });
  };

  const esDiferenteDeFabrica = defaultUrl !== FACTORY_DEFAULT_API_URL;

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
                Configuración del Servicio
              </span>
              <h2 id="connection-modal-title" className="text-base font-serif font-bold text-[#1D3B2F]">
                URL Base y Valor Predeterminado
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
          {/* Tarjeta informativa del valor predeterminado actual */}
          <div className="p-3.5 bg-[#FAFBF7] border border-[#52796F]/25 rounded-lg space-y-2">
            <div className="flex items-center justify-between gap-2 text-xs">
              <span className="font-semibold text-[#1D3B2F] flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-[#B46536] fill-[#B46536]" aria-hidden="true" />
                <span>Valor Predeterminado (Default) Actual:</span>
              </span>
              <code className="font-mono text-[#1D3B2F] bg-white border border-[#52796F]/20 px-2 py-0.5 rounded font-semibold text-xs">
                {defaultUrl}
              </code>
            </div>
            <p className="text-[11px] text-[#5A736A] leading-relaxed">
              Este es el valor al que se regresa cuando se pulsa <em>«Restablecer por defecto»</em>. Puedes cambiarlo a cualquier dirección introduciéndola abajo y pulsando <em>«Guardar como nuevo predeterminado»</em>.
            </p>
          </div>

          {/* Feedback mensaje temporal */}
          {feedbackMensaje && (
            <div className="p-3 bg-[#E8ECE2] border border-[#2D5A46]/30 text-[#1D3B2F] rounded-lg text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#2D5A46] shrink-0" aria-hidden="true" />
              <span className="font-medium">{feedbackMensaje}</span>
            </div>
          )}

          {/* Campo de edición de URL */}
          <div>
            <label htmlFor="api-url-input" className="block text-xs font-semibold text-[#1D3B2F] font-mono uppercase tracking-wider mb-1.5">
              URL Base del Servicio (`VITE_PLANTEXPERT_API_URL`)
            </label>
            <div className="relative flex gap-2">
              <div className="relative flex-1">
                <input
                  ref={inputRef}
                  id="api-url-input"
                  type="url"
                  value={currentUrl}
                  onChange={(e) => {
                    setCurrentUrl(e.target.value);
                    setTestStatus({ loading: false, tested: false, ok: false, mensaje: '' });
                  }}
                  placeholder={defaultUrl}
                  className="w-full pl-3 pr-8 py-2 text-xs font-mono border border-[#52796F]/30 rounded-md focus:outline-hidden focus:ring-2 focus:ring-[#1D3B2F] bg-[#FAFBF7] text-[#1D3B2F]"
                />
                {currentUrl && (
                  <button
                    type="button"
                    onClick={handleLimpiarCampo}
                    title="Borrar texto del campo"
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-[#52796F] hover:text-[#1D3B2F] rounded cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={handleProbarConexion}
                disabled={testStatus.loading}
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

            <div className="flex items-center justify-between text-[11px] text-[#52796F] mt-1.5 font-mono">
              <span>
                Endpoint: <strong className="text-[#1D3B2F]">{currentUrl.trim() ? `${currentUrl.trim().replace(/\/+$/, '')}/diagnosticar` : `${defaultUrl}/diagnosticar`}</strong>
              </span>
            </div>
          </div>

          {/* Opciones para fijar como predeterminado */}
          <div className="p-3 bg-[#FAFBF7] border border-[#52796F]/20 rounded-lg space-y-2.5">
            <div className="flex items-center gap-2">
              <input
                id="fijar-default-check"
                type="checkbox"
                checked={fijarComoPredeterminada}
                onChange={(e) => setFijarComoPredeterminada(e.target.checked)}
                className="w-4 h-4 text-[#1D3B2F] rounded border-[#52796F]/30 focus:ring-[#1D3B2F]"
              />
              <label htmlFor="fijar-default-check" className="text-xs text-[#1D3B2F] font-medium cursor-pointer">
                Establecer esta URL como el nuevo valor predeterminado al guardar
              </label>
            </div>

            <div className="flex items-center gap-2 pt-1 border-t border-[#52796F]/15">
              <button
                type="button"
                onClick={handleEstablecerComoPredeterminado}
                disabled={!currentUrl.trim() || currentUrl.trim() === defaultUrl}
                className="px-2.5 py-1 text-xs font-medium text-[#1D3B2F] bg-white border border-[#52796F]/25 hover:bg-[#F0F2EB] disabled:opacity-40 rounded cursor-pointer transition-colors"
              >
                Fijar valor actual como predeterminado
              </button>
            </div>
          </div>

          {/* Atajos rápidos */}
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#52796F] block mb-1.5">
              Atajos recomendados:
            </span>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => handleAplicarPreset('/prolog-api')}
                className="px-2.5 py-1 text-xs font-mono bg-[#E8ECE2] hover:bg-[#D8E0CF] border border-[#2D5A46]/30 text-[#1D3B2F] font-semibold rounded cursor-pointer transition-colors"
              >
                /prolog-api (Proxy SWI-Prolog)
              </button>
              <button
                type="button"
                onClick={() => handleAplicarPreset('http://localhost:8001')}
                className="px-2.5 py-1 text-xs font-mono bg-[#FAFBF7] hover:bg-[#F0F2EB] border border-[#52796F]/25 text-[#1D3B2F] rounded cursor-pointer transition-colors"
              >
                http://localhost:8001
              </button>
              <button
                type="button"
                onClick={() => handleAplicarPreset('http://127.0.0.1:8001')}
                className="px-2.5 py-1 text-xs font-mono bg-[#FAFBF7] hover:bg-[#F0F2EB] border border-[#52796F]/25 text-[#1D3B2F] rounded cursor-pointer transition-colors"
              >
                http://127.0.0.1:8001
              </button>
              <button
                type="button"
                onClick={handleLimpiarCampo}
                className="px-2.5 py-1 text-xs text-[#52796F] hover:text-[#1D3B2F] bg-[#FAFBF7] border border-[#52796F]/20 rounded cursor-pointer transition-colors"
              >
                Limpiar campo
              </button>
            </div>
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
                    Compruebe que el servicio SWI-Prolog esté iniciado en ese host/puerto y que acepte peticiones HTTP POST en <code className="font-mono">/diagnosticar</code>.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Instrucciones de ejecución */}
          <div className="p-3.5 bg-[#142B22] text-[#E8ECE2] rounded-lg space-y-1.5 border border-[#1D3B2F]">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300">
              <Terminal className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Servidor SWI-Prolog activo en segundo plano</span>
            </div>
            <p className="text-[11px] text-[#A3B899]">
              El motor SWI-Prolog se ejecuta en el puerto interno 8001 y está conectado de forma transparente a través de la ruta <code className="text-emerald-300 font-mono">/prolog-api</code>.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-[#52796F]/15 bg-[#FAFBF7] flex items-center justify-end gap-2">
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
            className="px-5 py-1.5 text-xs font-semibold text-white bg-[#1D3B2F] hover:bg-[#142B22] rounded-md cursor-pointer transition-colors shadow-xs"
          >
            Guardar y Aplicar
          </button>
        </div>
      </div>
    </div>
  );
};
