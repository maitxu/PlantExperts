import {
  HipotesisRaw,
  HipotesisAgrupada,
} from '../types/plantexpert';
import { MAPEO_NOMBRES_HECHOS } from '../config/symptomsData';

export interface FuenteExplicacion {
  nombre: string;
  agente?: string;
  url: string;
  descripcionEtiologica: string;
  medidasCulturales: string[];
}

export const FUENTES_PROYECTO: Record<string, FuenteExplicacion> = {
  alternariosis: {
    nombre: 'Alternariosis o tizón temprano',
    agente: 'Alternaria solani',
    url: 'https://ipm.ucanr.edu/agriculture/tomato/early-blight/',
    descripcionEtiologica:
      'Infección fúngica necrótica caracterizada por manchas marrones o negras delimitadas que desarrollan anillos concéntricos en diana, producidas por las oleadas sucesivas de esporulación del patógeno.',
    medidasCulturales: [
      'Regar siempre en la base para evitar mojar el follaje.',
      'Mantener separación y entutorado adecuado para favorecer la ventilación.',
      'Retirar con cuidado las hojas muy afectadas y los restos vegetales enfermos.',
      'Evitar cultivar tomates repetidamente en el mismo lugar de la parcela (rotación de cultivos).',
    ],
  },
  oidio: {
    nombre: 'Oídio',
    agente: 'Oidium neolycopersici / Leveillula taurica',
    url: 'https://ipm.ucanr.edu/home-and-landscape/powdery-mildew-on-tomato/',
    descripcionEtiologica:
      'Micosis ectoparásita manifestada inicialmente por manchas amarillas irregulares en las hojas, seguida de un polvillo o eflorescencia blanquecina sobre las hojas que reduce la capacidad fotosintética.',
    medidasCulturales: [
      'Revisar periódicamente ambas caras de las hojas.',
      'Favorecer la ventilación cruzada y evitar el estrés de las plantas.',
      'Retirar hojas muy afectadas cuando proceda, sin eliminar excesivo follaje sano.',
      'Comprobar el diagnóstico antes de considerar cualquier tratamiento biológico autorizado.',
    ],
  },
  mildiu_tardio: {
    nombre: 'Mildiu tardío (mildiu del tomate)',
    agente: 'Phytophthora infestans (oomiceto)',
    url: 'https://ipm.ucanr.edu/agriculture/tomato/late-blight/',
    descripcionEtiologica:
      'Oomiceto destructivo que produce manchas irregulares de aspecto acuoso o aceitoso en hojas y tallos, tornándose marrones y con avance fulminante bajo alta humedad ambiental.',
    medidasCulturales: [
      'Vigilar con especial atención tras periodos de lluvia continua, niebla o rocío prolongado.',
      'Retirar y destruir de inmediato las plantas o ramas muy afectadas para evitar la propagación por esporas.',
      'Evitar mojar las hojas durante el riego y asegurar el secado rápido del follaje.',
    ],
  },
  mancha_bacteriana: {
    nombre: 'Mancha bacteriana',
    agente: 'Xanthomonas spp. (bacteriosis)',
    url: 'https://extension.umn.edu/agriculture/specialty-crops/vegetable-farming/disease-management/bacterial-spot-of-tomato-and-pepper',
    descripcionEtiologica:
      'Infección bacteriana foliar y de fruto caracterizada por pequeños puntos oscuros necróticos rodeados frecuentemente de un halo amarillo, o lesiones ásperas y costrosas en la piel del tomate.',
    medidasCulturales: [
      'No manipular ni podar las plantas cuando el follaje esté húmedo por lluvia o rocío para no dispersar la bacteria.',
      'Desinfectar las tijeras de poda entre plantas con alcohol o solución jabonosa.',
      'Retirar frutos con lesiones ásperas profundas y eliminar restos de cosecha afectados.',
    ],
  },
  estres_por_falta_de_agua: {
    nombre: 'Estrés por falta de agua (Sequía)',
    agente: 'Déficit hídrico abiótico',
    url: 'https://extension.umn.edu/garden-and-home/yard-and-garden/gardening-in-minnesota/yard-and-garden-problems/tomato-disorders',
    descripcionEtiologica:
      'Pérdida de presión de turgencia en los tejidos de la tomatera debido a que la evaporación y transpiración foliar superan la absorción radicular en un suelo seco.',
    medidasCulturales: [
      'Efectuar un riego regularizado y pausado a primeras horas del día.',
      'Aplicar un acolchado (mulch) de paja seca para conservar la humedad edáfica.',
      'Evitar fluctuaciones extremas entre sequedad acusada y encharcamientos súbitos.',
    ],
  },
  posible_exceso_de_agua_o_problema_radicular: {
    nombre: 'Posible exceso de agua o problema radicular',
    agente: 'Asfixia edáfica / Trastorno de drenaje',
    url: 'https://extension.umn.edu/garden-and-home/yard-and-garden/gardening-in-minnesota/yard-and-garden-problems/tomato-disorders',
    descripcionEtiologica:
      'Saturación continuada de los poros del suelo con agua que impide la respiración de las raíces (hipoxia radicular), manifestándose como marchitez paradójica con suelo empapado.',
    medidasCulturales: [
      'Suspender inmediatamente los riegos hasta que el suelo recupere el tempero normal.',
      'Comprobar el drenaje de la parcela o elevar el cultivo en caballones si la tierra es pesada o arcillosa.',
      'Escarificar con cuidado la superficie para facilitar el intercambio gaseoso.',
    ],
  },
  problema_nutricional_a_investigar: {
    nombre: 'Posible problema nutricional a investigar',
    agente: 'Desequilibrio mineral (carencia intervenal)',
    url: 'https://ipm.ucanr.edu/home-and-landscape/nutrient-deficiencies-vegetables/',
    descripcionEtiologica:
      'Esta regla sugiere investigar nutrición general: no identifica un nutriente concreto, pero el patrón de amarilleo entre nervaduras orienta hacia deficiencias de magnesio, hierro o desbalance de pH edáfico.',
    medidasCulturales: [
      'Revisar el historial de abonado y si se ha empleado estiércol poco maduro o compost equilibrado.',
      'Comprobar el pH del suelo si el amarilleo persiste a pesar de fertilizaciones habituales.',
      'Consultar la ficha de deficiencias nutricionales de UC IPM para discriminar entre micro y macronutrientes.',
    ],
  },
};

/**
 * Agrupa hipótesis devueltas por SWI-Prolog y les asocia la información documental oficial
 */
export function agruparHipotesisCrudas(hipotesisLista: HipotesisRaw[]): (HipotesisAgrupada & { fuenteUrl?: string })[] {
  const mapa = new Map<string, HipotesisAgrupada & { fuenteUrl?: string }>();

  for (const h of hipotesisLista) {
    const causaId = h.causa.trim();
    const reglasEntrantes: string[] = [];
    if (h.reglas_ids && Array.isArray(h.reglas_ids)) {
      reglasEntrantes.push(...h.reglas_ids);
    }
    if (h.regla_id && !reglasEntrantes.includes(h.regla_id)) {
      reglasEntrantes.push(h.regla_id);
    }

    const reqsEntrantes = h.requisitos_cumplidos || [];
    const infoFuente = FUENTES_PROYECTO[causaId];

    if (!mapa.has(causaId)) {
      mapa.set(causaId, {
        causa: infoFuente ? infoFuente.nombre : causaId,
        nombre_cientifico: infoFuente?.agente,
        reglas_ids: reglasEntrantes,
        requisitos_cumplidos: [...reqsEntrantes],
        explicacionDetallada: infoFuente?.descripcionEtiologica || h.explicacion || 'Diagnóstico validado conforme a los criterios y reglas fitopatológicas del motor agronómico.',
        medidasCulturales: infoFuente?.medidasCulturales || [
          'Mejorar la aireación del dosel foliar.',
          'Supervisar la humedad del sustrato y evitar mojar el follaje.',
        ],
        fuenteUrl: infoFuente?.url,
      });
    } else {
      const existente = mapa.get(causaId)!;
      for (const rId of reglasEntrantes) {
        if (!existente.reglas_ids.includes(rId)) {
          existente.reglas_ids.push(rId);
        }
      }
      for (const req of reqsEntrantes) {
        if (!existente.requisitos_cumplidos.includes(req)) {
          existente.requisitos_cumplidos.push(req);
        }
      }
    }
  }

  return Array.from(mapa.values());
}

/**
 * Explicación determinista para los datos pendientes solicitados por SWI-Prolog
 */
export function generarExplicacionDatosPendientes(datosPendientes: string[]): {
  id: string;
  nombre: string;
  orientacion: string;
}[] {
  return datosPendientes.map((datoId) => {
    const nombre = MAPEO_NOMBRES_HECHOS[datoId] || datoId;
    let orientacion = 'Compruebe este parámetro en la tomatera o el suelo para que el motor pueda concluir.';

    if (datoId === 'suelo_humedad_desconocida' || datoId === 'suelo_seco' || datoId === 'suelo_encharcado') {
      orientacion =
        'Introduzca los dedos unos 5 cm en la tierra: determine si está seca, fresca con humedad de tempero o totalmente encharcada/empapada.';
    } else if (datoId === 'anillos_concentricos') {
      orientacion =
        'Inspeccione de cerca las manchas marrones para comprobar si presentan anillos concéntricos en forma de diana.';
    } else if (datoId === 'crecimiento_blanco_enves') {
      orientacion =
        'Examine el envés (cara inferior) y el haz de las hojas en busca de polvillo o eflorescencia blanquecina.';
    } else if (datoId === 'halo_amarillo') {
      orientacion =
        'Compruebe si los puntos oscuros están rodeados por un borde o anillo amarillento.';
    } else if (datoId === 'patron_amarilleo_entre_hojas') {
      orientacion =
        'Revise si el amarilleo respeta las nervaduras principales de la hoja dejándolas verdes.';
    }

    return {
      id: datoId,
      nombre,
      orientacion,
    };
  });
}
