/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { Header } from './components/Header';
import { HeroBotanica } from './components/HeroBotanica';
import { Questionnaire } from './components/Questionnaire';
import { DiagnosisResult } from './components/DiagnosisResult';
import { ManualTestsBar } from './components/ManualTestsBar';
import { InfoModal } from './components/InfoModal';
import { ConnectionSettingsModal } from './components/ConnectionSettingsModal';
import {
  RespuestaValor,
  HumedadSueloValor,
  DiagnosticarRequest,
  DiagnosticarResponse,
  CasoPruebaManual,
} from './types/plantexpert';
import {
  getApiBaseUrl,
  enviarDiagnostico,
} from './services/prologApi';
import { PREGUNTAS_SINTOMAS } from './config/symptomsData';

export default function App() {
  const [respuestas, setRespuestas] = useState<Record<string, RespuestaValor>>({});
  const [humedadSuelo, setHumedadSuelo] = useState<HumedadSueloValor>('');

  const [vistaActiva, setVistaActiva] = useState<'cuestionario' | 'resultado'>('cuestionario');
  const [activeTab, setActiveTab] = useState<'cuestionario' | 'pruebas' | 'info'>('cuestionario');
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [connectionModalOpen, setConnectionModalOpen] = useState(false);

  const [apiBaseUrl, setApiBaseUrlState] = useState<string>(getApiBaseUrl());

  const [isLoading, setIsLoading] = useState(false);
  const [resultado, setResultado] = useState<DiagnosticarResponse | null>(null);
  const [payloadEnviado, setPayloadEnviado] = useState<DiagnosticarRequest>({
    si: [],
    desconocidos: [],
    no_comprobados: [],
  });
  const [endpointConsultado, setEndpointConsultado] = useState<string>('');
  const [errorMensaje, setErrorMensaje] = useState<string>('');
  const [isConnectionError, setIsConnectionError] = useState(false);

  const questionnaireRef = useRef<HTMLDivElement>(null);

  // Ejecución de la consulta a la API SWI-Prolog
  const ejecutarConsulta = async (payload: DiagnosticarRequest, customUrl?: string) => {
    setIsLoading(true);
    setPayloadEnviado(payload);
    const targetUrl = customUrl || apiBaseUrl;
    setEndpointConsultado(`${targetUrl.replace(/\/+$/, '')}/diagnosticar`);

    const res = await enviarDiagnostico(payload, targetUrl);

    setIsLoading(false);

    if (res.success && res.data) {
      setResultado(res.data);
      setIsConnectionError(false);
      setErrorMensaje('');
    } else {
      setResultado({
        estado: 'error_servicio',
        aviso: res.error || 'Error de conexión con el servicio SWI-Prolog',
      });
      setErrorMensaje(res.error || 'No fue posible conectar con el servicio externo.');
      setIsConnectionError(res.isConnectionError);
    }

    setVistaActiva('resultado');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cargar caso de prueba manual
  const handleCargarCaso = (caso: CasoPruebaManual, autoEjecutar: boolean) => {
    const nuevoMapa: Record<string, RespuestaValor> = {};
    for (const preg of PREGUNTAS_SINTOMAS) {
      nuevoMapa[preg.id] = caso.respuestas[preg.id] || 'no';
    }
    setRespuestas(nuevoMapa);
    setHumedadSuelo(caso.humedadSuelo);

    if (autoEjecutar) {
      const si: string[] = [];
      const desconocidos: string[] = [];
      const no_comprobados: string[] = [];

      for (const preg of PREGUNTAS_SINTOMAS) {
        const val = nuevoMapa[preg.id];
        if (val === 'si') si.push(preg.id);
        else if (val === 'no_se') desconocidos.push(preg.id);
        else if (val === 'sin_comprobar') no_comprobados.push(preg.id);
      }

      if (caso.humedadSuelo === 'seca') si.push('suelo_seco');
      else if (caso.humedadSuelo === 'humeda') si.push('suelo_humedo');
      else if (caso.humedadSuelo === 'empapada') si.push('suelo_empapado');
      else if (caso.humedadSuelo === 'no_lo_se') desconocidos.push('humedad_suelo');
      else no_comprobados.push('humedad_suelo');

      ejecutarConsulta({ si, desconocidos, no_comprobados });
    } else {
      setVistaActiva('cuestionario');
      setActiveTab('cuestionario');
      if (questionnaireRef.current) {
        questionnaireRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Prueba 7: Error de API explícito (apuntando a puerto cerrado para verificar fidelidad)
  const handleEjecutarErrorApi = () => {
    const payloadFicticio: DiagnosticarRequest = {
      si: ['manchas_marrones_negras'],
      desconocidos: [],
      no_comprobados: [],
    };
    ejecutarConsulta(payloadFicticio, 'http://127.0.0.1:9999');
  };

  const handleReset = () => {
    setRespuestas({});
    setHumedadSuelo('');
    setResultado(null);
    setVistaActiva('cuestionario');
  };

  const scrollToQuestionnaire = () => {
    setVistaActiva('cuestionario');
    setActiveTab('cuestionario');
    setTimeout(() => {
      if (questionnaireRef.current) {
        questionnaireRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F8F4] font-sans text-[#1D2B24]">
      {/* Cabecera Principal */}
      <Header
        onOpenInfo={() => setInfoModalOpen(true)}
        onOpenConnection={() => setConnectionModalOpen(true)}
        onOpenTests={() => {
          setActiveTab('pruebas');
          setVistaActiva('cuestionario');
        }}
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'cuestionario') {
            setVistaActiva('cuestionario');
          }
        }}
        apiBaseUrl={apiBaseUrl}
      />

      {/* Contenedor Principal */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
        {/* Portada Botánica (Panel 1 y 4 del concepto de diseño) */}
        {vistaActiva === 'cuestionario' && (
          <HeroBotanica
            onIniciarCuestionario={scrollToQuestionnaire}
            onAbrirPruebas={() => {
              setActiveTab('pruebas');
            }}
            onAbrirInfo={() => setInfoModalOpen(true)}
            apiBaseUrl={apiBaseUrl}
          />
        )}

        {/* Panel de Pruebas Manuales */}
        {(activeTab === 'pruebas' || vistaActiva === 'cuestionario') && (
          <ManualTestsBar
            onCargarCaso={handleCargarCaso}
            onEjecutarErrorApi={handleEjecutarErrorApi}
            ejecutandoConsulta={isLoading}
          />
        )}

        {/* Contenido Dinámico: Cuestionario vs Resultados */}
        <div ref={questionnaireRef}>
          {vistaActiva === 'cuestionario' ? (
            <Questionnaire
              respuestas={respuestas}
              setRespuestas={setRespuestas}
              humedadSuelo={humedadSuelo}
              setHumedadSuelo={setHumedadSuelo}
              onSubmit={(payload) => ejecutarConsulta(payload)}
              isLoading={isLoading}
              onReset={handleReset}
            />
          ) : (
            resultado && (
              <DiagnosisResult
                resultado={resultado}
                payloadEnviado={payloadEnviado}
                endpointConsultado={endpointConsultado}
                errorMensaje={errorMensaje}
                isConnectionError={isConnectionError}
                onVolverYCorregir={() => setVistaActiva('cuestionario')}
                onNuevaConsulta={handleReset}
                onReintentar={() => ejecutarConsulta(payloadEnviado)}
                onAbrirConfiguracion={() => setConnectionModalOpen(true)}
                isLoading={isLoading}
              />
            )
          )}
        </div>
      </main>

      {/* Pie de Página de Laboratorio */}
      <footer className="border-t border-[#52796F]/20 bg-[#FFFFFF] py-8 mt-16 text-xs text-[#52796F]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <p className="font-serif font-bold text-[#1D3B2F] text-sm">
              PlantExpert · Laboratorio Botánico Contemporáneo
            </p>
            <p className="text-[11px] text-[#5A736A]">
              Sistema experto académico para tomateras de huertos domésticos en Euskadi (clima atlántico).
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs text-[#2D5A46]">
            <button
              onClick={() => setInfoModalOpen(true)}
              className="hover:text-[#1D3B2F] underline cursor-pointer"
            >
              Fuentes &amp; Referencias
            </button>
            <span aria-hidden="true" className="text-[#52796F]/40">·</span>
            <button
              onClick={() => setConnectionModalOpen(true)}
              className="hover:text-[#1D3B2F] underline cursor-pointer"
            >
              Servicio SWI-Prolog
            </button>
          </div>
        </div>
      </footer>

      {/* Modales */}
      <InfoModal
        isOpen={infoModalOpen}
        onClose={() => setInfoModalOpen(false)}
      />

      <ConnectionSettingsModal
        isOpen={connectionModalOpen}
        onClose={() => setConnectionModalOpen(false)}
        onUrlChanged={(newUrl) => setApiBaseUrlState(newUrl)}
      />
    </div>
  );
}
