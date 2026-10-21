import {
  DiagnosticarRequest,
  DiagnosticarResponse,
} from '../types/plantexpert';

export const DEFAULT_API_URL =
  (import.meta.env.VITE_PLANTEXPERT_API_URL as string | undefined) ||
  'http://localhost:8000';

const STORAGE_KEY_API_URL = 'plantexpert_api_url_override';

export function getApiBaseUrl(): string {
  const custom = localStorage.getItem(STORAGE_KEY_API_URL);
  if (custom && custom.trim().length > 0) {
    return custom.trim().replace(/\/+$/, '');
  }
  return DEFAULT_API_URL.replace(/\/+$/, '');
}

export function setApiBaseUrl(url: string): void {
  if (!url || url.trim().length === 0) {
    localStorage.removeItem(STORAGE_KEY_API_URL);
  } else {
    localStorage.setItem(STORAGE_KEY_API_URL, url.trim().replace(/\/+$/, ''));
  }
}

export function resetApiBaseUrl(): void {
  localStorage.removeItem(STORAGE_KEY_API_URL);
}

export interface ApiCallResult {
  success: boolean;
  data?: DiagnosticarResponse;
  error?: string;
  isConnectionError: boolean;
  endpoint: string;
  statusCode?: number;
  payloadSent: DiagnosticarRequest;
}

/**
 * Envía la consulta al servicio externo SWI-Prolog
 * POST {API_URL}/diagnosticar
 * Payload: { "si": [...], "desconocidos": [...], "no_comprobados": [...] }
 * 
 * Regla estricta: No hardcodear resultados ni simular éxito si la API falla.
 */
export async function enviarDiagnostico(
  requestData: DiagnosticarRequest,
  customEndpoint?: string
): Promise<ApiCallResult> {
  const baseUrl = customEndpoint ? customEndpoint.replace(/\/+$/, '') : getApiBaseUrl();
  const endpoint = `${baseUrl}/diagnosticar`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 12000);

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(requestData),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      let errorBody = '';
      try {
        errorBody = await response.text();
      } catch {
        errorBody = response.statusText;
      }
      return {
        success: false,
        error: `El servicio SWI-Prolog respondió con código HTTP ${response.status}: ${errorBody || response.statusText}`,
        isConnectionError: response.status >= 500 || response.status === 404,
        endpoint,
        statusCode: response.status,
        payloadSent: requestData,
      };
    }

    const data: DiagnosticarResponse = await response.json();

    if (!data.estado) {
      return {
        success: false,
        error: 'La respuesta del servicio SWI-Prolog no contiene el campo obligatorio "estado".',
        isConnectionError: false,
        endpoint,
        statusCode: response.status,
        payloadSent: requestData,
      };
    }

    return {
      success: true,
      data,
      isConnectionError: false,
      endpoint,
      statusCode: response.status,
      payloadSent: requestData,
    };
  } catch (err: unknown) {
    clearTimeout(timeoutId);
    let errorMsg = 'No fue posible establecer conexión con el servicio SWI-Prolog.';
    if (err instanceof DOMException && err.name === 'AbortError') {
      errorMsg = 'Tiempo de espera agotado (timeout de 12 segundos) al conectar con el servicio SWI-Prolog.';
    } else if (err instanceof Error) {
      errorMsg = `Error de red o conexión: ${err.message}`;
    }

    return {
      success: false,
      error: errorMsg,
      isConnectionError: true,
      endpoint,
      payloadSent: requestData,
    };
  }
}

/**
 * Ping rápido para verificar la disponibilidad del endpoint de diagnóstico
 */
export async function probarConexionApi(url: string): Promise<{ ok: boolean; mensaje: string; status?: number }> {
  const endpoint = `${url.replace(/\/+$/, '')}/diagnosticar`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6000);

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ si: [], desconocidos: [], no_comprobados: [] }),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    if (res.ok) {
      return { ok: true, mensaje: 'Conexión exitosa con el servicio SWI-Prolog (HTTP 200).', status: res.status };
    }
    return {
      ok: false,
      mensaje: `El servidor respondió con código HTTP ${res.status} (${res.statusText}).`,
      status: res.status,
    };
  } catch (err: unknown) {
    clearTimeout(timeoutId);
    const msg = err instanceof Error ? err.message : 'Error desconocido';
    return { ok: false, mensaje: `Fallo de conexión al endpoint: ${msg}` };
  }
}
