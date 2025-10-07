import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Section from "../components/Section";
import ProgramTable from "../components/ProgramTable";
import Seo from "../components/Seo";
import apiService from "../api/client";
import type { ProgramDay } from "../types";

export default function Program() {
  const { t } = useTranslation();
  const [program, setProgram] = useState<ProgramDay[]>([]);

  useEffect(() => {
    apiService
      .getProgram()
      .then(setProgram)
      .catch(() => {
        // Fallback com dados estáticos se a API falhar
        const staticProgram: ProgramDay[] = [
          {
            day: "2026-03-26",
            slots: [
              {
                time: "08:30 - 09:00",
                title: "Credenciamento e Welcome Coffee",
                location: "Hall de Entrada",
                kind: "service",
              },
              {
                time: "09:00 - 09:30",
                title: "Cerimônia de Abertura",
                description: "Abertura oficial do evento com autoridades e organizadores",
                location: "Auditório Principal",
                kind: "plenary",
              },
              {
                time: "09:30 - 10:30",
                title: "Palestra Magna",
                description:
                  "O impacto regional do turismo literário e cinematográfico no território",
                speaker: "Diomira Maria Cicci Pinto Faria (UFMG)",
                location: "Auditório Principal",
                kind: "keynote",
              },
              {
                time: "10:30 - 11:00",
                title: "Coffee Break",
                location: "Hall de Entrada",
                kind: "break",
              },
              {
                time: "11:00 - 12:30",
                title: "Mesa Internacional",
                description:
                  "Perspectivas internacionais sobre turismo literário e cinematográfico",
                speaker:
                  "Deborah Castro-Mariño (RUG), Jordi Arcos-Pumarola (CETT-UB), Rita Baleiro (UAlg)",
                location: "Auditório Principal",
                kind: "plenary",
              },
              {
                time: "12:30 - 14:00",
                title: "Almoço",
                location: "Restaurante Universitário",
                kind: "break",
              },
              {
                time: "14:00 - 15:30",
                title: "Sessões Paralelas",
                description: "Comunicações científicas",
                track: "Track A: Turismo Literário",
                location: "Sala 101",
                kind: "sessions",
              },
              {
                time: "14:00 - 15:30",
                title: "Sessões Paralelas",
                description: "Comunicações científicas",
                track: "Track B: Turismo Cinematográfico",
                location: "Sala 102",
                kind: "sessions",
              },
              {
                time: "15:30 - 16:00",
                title: "Coffee Break",
                location: "Hall de Entrada",
                kind: "break",
              },
              {
                time: "16:00 - 17:30",
                title: "Sessões Paralelas",
                description: "Comunicações científicas",
                track: "Track C: Desenvolvimento Territorial",
                location: "Sala 103",
                kind: "sessions",
              },
            ],
          },
          {
            day: "2026-03-27",
            slots: [
              {
                time: "08:30 - 09:00",
                title: "Welcome Coffee",
                location: "Hall de Entrada",
                kind: "service",
              },
              {
                time: "09:00 - 10:00",
                title: "Keynote",
                description: "Políticas públicas para turismo cultural",
                speaker: "Palestrante a definir (Embratur/Ancine)",
                location: "Auditório Principal",
                kind: "keynote",
              },
              {
                time: "10:00 - 10:30",
                title: "Coffee Break",
                location: "Hall de Entrada",
                kind: "break",
              },
              {
                time: "10:30 - 12:00",
                title: "Sessões Paralelas",
                description: "Comunicações científicas",
                track: "Track A: Turismo Literário",
                location: "Sala 101",
                kind: "sessions",
              },
              {
                time: "10:30 - 12:00",
                title: "Sessões Paralelas",
                description: "Comunicações científicas",
                track: "Track B: Turismo Cinematográfico",
                location: "Sala 102",
                kind: "sessions",
              },
              {
                time: "12:00 - 14:00",
                title: "Almoço",
                location: "Restaurante Universitário",
                kind: "break",
              },
              {
                time: "14:00 - 15:30",
                title: "Painel Especial",
                description:
                  "Turismo Cinematográfico e Film Commissions como vetores da economia do turismo",
                speaker: "André Riani Costa Perinotto (UFDPar), Lissandro Stallivieri (UCS)",
                location: "Auditório Principal",
                kind: "panel",
              },
              {
                time: "15:30 - 16:00",
                title: "Coffee Break",
                location: "Hall de Entrada",
                kind: "break",
              },
              {
                time: "16:00 - 17:30",
                title: "Sessões Paralelas",
                description: "Comunicações científicas",
                track: "Track C: Desenvolvimento Territorial",
                location: "Sala 103",
                kind: "sessions",
              },
            ],
          },
          {
            day: "2026-03-28",
            slots: [
              {
                time: "08:30 - 09:00",
                title: "Welcome Coffee",
                location: "Hall de Entrada",
                kind: "service",
              },
              {
                time: "09:00 - 10:30",
                title: "Sessões Paralelas",
                description: "Comunicações científicas",
                track: "Track A: Turismo Literário",
                location: "Sala 101",
                kind: "sessions",
              },
              {
                time: "09:00 - 10:30",
                title: "Sessões Paralelas",
                description: "Comunicações científicas",
                track: "Track B: Turismo Cinematográfico",
                location: "Sala 102",
                kind: "sessions",
              },
              {
                time: "10:30 - 11:00",
                title: "Coffee Break",
                location: "Hall de Entrada",
                kind: "break",
              },
              {
                time: "11:00 - 12:30",
                title: "Sessão de Encerramento",
                description: "Apresentação dos resultados e perspectivas futuras",
                location: "Auditório Principal",
                kind: "plenary",
              },
              {
                time: "12:30 - 13:00",
                title: "Cerimônia de Encerramento",
                description: "Encerramento oficial do evento",
                location: "Auditório Principal",
                kind: "plenary",
              },
              {
                time: "13:00 - 14:00",
                title: "Almoço de Confraternização",
                location: "Restaurante Universitário",
                kind: "networking",
              },
            ],
          },
        ];
        setProgram(staticProgram);
      });
  }, []);

  return (
    <>
      <Seo title={t("nav.program")} description={t("program.description")} />

      <div className="w-full aspect-[16/5]">
        <img
          src="/hero.png"
          alt="Banner da Conferência"
          className="w-full h-full object-cover block"
        />
      </div>

      <div className="py-8 bg-[#e0a085]">
        <div className="container-custom">
          <h1 className="text-2xl md:text-3xl font-semibold text-center text-white">
            {t("program.title")}
          </h1>
        </div>
      </div>

      <Section>
        <div className="max-w-4xl mx-auto mb-12">
          <p className="text-lg text-gray-700 text-center leading-relaxed">{t("program.intro")}</p>
        </div>

        {program.length > 0 && <ProgramTable program={program} />}
      </Section>
    </>
  );
}
