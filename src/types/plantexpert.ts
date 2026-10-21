/**
 * Definiciones de tipos para PlantExpert
 * Sistema experto académico para diagnóstico de tomateras en huertos de Euskadi
 */

export type CategoriaSintoma = 'hojas' | 'lesiones' | 'frutos' | 'riego_nutricion';

export type RespuestaValor = 'si' | 'no' | 'no_se' | 'sin_comprobar';

export type HumedadSueloValor = 'seca' | 'humeda' | 'empapada' | 'no_lo_se' | '';

export interface PreguntaSintoma {
  id: string;
  categoria: CategoriaSintoma;
  texto: string;
  aclaracion: string;
  significadoAgronomico: string;
}

export interface CategoriaConfig {
  id: CategoriaSintoma;
  titulo: string;
  descripcion: string;
}

export interface DiagnosticarRequest {
  si: string[];
  desconocidos: string[];
  no_comprobados: string[];
}

export type EstadoDiagnostico =
  | 'hipotesis_generada'
  | 'diagnostico_diferencial'
  | 'informacion_insuficiente'
  | 'ninguna_regla_encaja'
  | 'respuestas_incompatibles'
  | 'error_servicio';

export interface HipotesisRaw {
  causa: string;
  nombre_comun?: string;
  nombre_cientifico?: string;
  regla_id?: string;
  reglas_ids?: string[];
  requisitos_cumplidos?: string[];
  explicacion?: string;
}

export interface HipotesisAgrupada {
  causa: string;
  nombre_cientifico?: string;
  reglas_ids: string[];
  requisitos_cumplidos: string[];
  explicacionDetallada: string;
  medidasCulturales: string[];
}

export interface DiagnosticarResponse {
  estado: EstadoDiagnostico;
  hipotesis?: HipotesisRaw[];
  datos_pendientes?: string[];
  conflictos?: string[];
  aviso?: string;
  error_detalle?: string;
}

export interface CasoPruebaManual {
  id: string;
  titulo: string;
  descripcion: string;
  hechosEsperados: string[];
  respuestas: Record<string, RespuestaValor>;
  humedadSuelo: HumedadSueloValor;
  resultadoEsperado: string;
}
