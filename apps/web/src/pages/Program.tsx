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
                time: "08h00 – 09h30",
                title: "Credenciamento",
                location: "Hall Bloco F",
                kind: "service",
              },
              {
                time: "09h00 – 10h30",
                title: "Abertura Oficial",
                description:
                  "Representantes: Ministério do Turismo, Secretaria Estadual do Turismo/RS, Secretaria Municipal do Turismo de Caxias do Sul, Pró-Reitoria de Pós-Graduação UCS, Coordenações PPGTURH e PPGLET, Comissão Organizadora.",
                location: "UCS Teatro",
                kind: "plenary",
              },
              {
                time: "10h30 – 12h00",
                title: "Palestra de Abertura",
                description:
                  "Turismo Literário e Cinematográfico como vetor de desenvolvimento territorial, inovação e internacionalização do Brasil",
                speaker: "Representante da Embratur ou Ancine (a definir)",
                location: "UCS Teatro",
                kind: "keynote",
              },
              {
                time: "12h00 – 13h30",
                title: "Intervalo / Almoço livre",
                location: "—",
                kind: "break",
              },
              {
                time: "13h30 – 15h00",
                title: "Sessões Paralelas de Comunicação Científica",
                description: "Comunicações científicas",
                location: "Bloco F",
                kind: "sessions",
              },
              {
                time: "15h10 – 15h30",
                title: "Coffee break",
                location: "Hall do Bloco F",
                kind: "break",
              },
              {
                time: "15h35 – 17h00",
                title: "Sessões Paralelas de Comunicação Científica",
                description: "Comunicações científicas",
                location: "Bloco F",
                kind: "sessions",
              },
              {
                time: "17h15 – 18h45",
                title: "Palestra Magna",
                description:
                  "Entre palavras: o impacto regional do turismo literário e cinematográfico no território",
                speaker: "Profa. Diomira Maria Cicci Pinto Faria (UFMG)",
                location: "UCS Teatro",
                kind: "keynote",
              },
              {
                time: "19h30",
                title: "Jantar por adesão",
                description: "Churrascaria Imperador",
                location: "Churrascaria Imperador",
                kind: "networking",
              },
            ],
          },
          {
            day: "2026-03-27",
            slots: [
              {
                time: "09h00 – 10h30",
                title: "Sessões Paralelas de Comunicações Científicas",
                description: "Comunicações científicas",
                location: "Bloco F",
                kind: "sessions",
              },
              {
                time: "10h15 – 10h30",
                title: "Coffee break",
                location: "Hall do Bloco F",
                kind: "break",
              },
              {
                time: "10h30 – 12h00",
                title: "Mesa-Redonda Internacional",
                description: "Turismo literário, turismo cinematográfico e inovação territorial",
                speaker:
                  "Deborah Castro-Mariño (Univ. Groningen, Países Baixos), Jordi Arcos-Pumarola (CETT – Univ. Barcelona, Espanha), Rita Baleiro (Univ. Algarve, Portugal)",
                location: "Auditório Bloco H",
                kind: "plenary",
              },
              {
                time: "12h00 – 13h30",
                title: "Intervalo / Almoço livre",
                location: "—",
                kind: "break",
              },
              {
                time: "13h30 – 15h00",
                title: "Sessões Paralelas de Comunicação Científica",
                description: "Comunicações científicas",
                location: "Bloco F",
                kind: "sessions",
              },
              {
                time: "15h00 – 15h15",
                title: "Coffee break",
                location: "Hall do Bloco F",
                kind: "break",
              },
              {
                time: "15h20 – 17h00",
                title: "Painel Especial",
                description:
                  "Turismo Cinematográfico e Film Commissions como vetores da economia do turismo",
                speaker:
                  "Lissandro Stallivieri (cineasta, professor de cinema UCS, Spaghetti Films), Representante da Film Commission Porto Alegre (a confirmar), André Perinotto (UFPI / Film Commission Noronha 2B)",
                location: "Auditório Bloco H",
                kind: "panel",
              },
              {
                time: "17h15 – 18h00",
                title: "Encerramento das atividades acadêmicas + Networking",
                location: "UCS Teatro",
                kind: "networking",
              },
            ],
          },
          {
            day: "2026-03-28",
            slots: [
              {
                time: "09h00 – 12h00",
                title: "Tour cultural na Villa Dei Troni",
                description:
                  "O encerramento da conferência será marcado por uma experiência imersiva na Villa Dei Troni, um espaço que combina natureza, história, arte e gastronomia. Localizada em meio a vinhedos e jardins, a Villa oferece uma atmosfera única, que traduz a essência da Serra Gaúcha como território de hospitalidade e criatividade. Os participantes terão a oportunidade de vivenciar um ambiente de inspiração literária e cinematográfica, cercado por cenários que remetem à estética europeia, com arquitetura charmosa e vistas deslumbrantes. Além do tour guiado, haverá momentos de integração, degustação de produtos locais e a possibilidade de fotografias em cenários memoráveis. Esse passeio é mais do que um encerramento: é uma celebração da cultura, do território e das conexões que tornam o turismo literário e cinematográfico um diferencial estratégico para o desenvolvimento regional.",
                location: "Villa Dei Troni",
                kind: "tour",
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
