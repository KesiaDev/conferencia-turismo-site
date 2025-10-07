import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Section from "../components/Section";
import SpeakerCard from "../components/SpeakerCard";
import Seo from "../components/Seo";
import apiService from "../api/client";
import type { Speaker } from "../types";

export default function Keynotes() {
  const { t } = useTranslation();
  const [speakers, setSpeakers] = useState<Speaker[]>([]);

  useEffect(() => {
    apiService
      .getSpeakers()
      .then(setSpeakers)
      .catch(() => {
        // Fallback com dados estáticos se a API falhar
        const staticSpeakers: Speaker[] = [
          {
            id: "keynote-tbd",
            name: "Palestrante a definir (Embratur/Ancine)",
            affiliation: "Brasil",
            tags: ["Keynote", "Políticas públicas"],
            photo: "/speakers/Aguarde.png",
            bio: "Representante de órgão público brasileiro relacionado ao turismo e/ou cinema.",
          },
          {
            id: "diomira",
            name: "Diomira Maria Cicci Pinto Faria",
            affiliation: "UFMG",
            tags: [
              "Palestra Magna",
              "O impacto regional do turismo literário e cinematográfico no território",
            ],
            photo: "/speakers/diomira.png",
            photoModal: "/speakers/diomira-modal.png",
            bio: "Professora, Universidade Federal de Minas Gerais, Brasil. Possui graduação em Economia pela Universidade Católica de Minas Gerais (1982), especialização em Planejamento (Fundação João Pinheiro, 1983) e estatística (UFMG, 1998). Mestre em Turismo pela Universidad de Alicante, Espanha, e doutora em Economia pelo Cedeplar/UFMG e Universidad de Alicante (2012). É professora associada do Departamento de Geografia da UFMG, Curso de Turismo. Foi Diretora Científico-Cultural do Espaço do Conhecimento UFMG (2018–2022). Suas áreas de atuação incluem economia do turismo e da cultura, turismo e pobreza, turismo literário e viabilidade econômica de projetos, com foco atual na interface entre turismo e literatura.",
          },
          {
            id: "deborah",
            name: "Deborah Castro-Mariño",
            affiliation: "RUG (Países Baixos)",
            tags: ["Mesa Internacional"],
            photo: "/speakers/Deborah Castro.png",
            photoModal: "/speakers/Deborah Castro-modal.png",
            bio: "Professora Assistente de Estudos de Mídia na Universidade de Groningen, Holanda, e co-convocadora do grupo de pesquisa Culturas de Produção de Mídia. Possui doutorado em Comunicação pela Universidade Autônoma de Barcelona (2015), com períodos de pesquisa nos EUA. Atuou como pesquisadora e docente em Portugal e na Holanda, incluindo uma bolsa Marie Skłodowska-Curie. É presidente do Centro Erasmus de Conhecimento para Cinema, Patrimônio e Turismo. Também integra a ITI-LARSyS (Portugal). Participa da FitoTO, organização premiada internacionalmente por promover práticas sustentáveis e inclusivas no cinema e turismo. Sua trajetória combina pesquisa, ensino e inovação cultural.",
          },
          {
            id: "jordi",
            name: "Jordi Arcos-Pumarola",
            affiliation: "CETT-UB",
            tags: ["Mesa Internacional"],
            photo: "/speakers/Jordi.png",
            photoModal: "/speakers/Jordi-modal.png",
            bio: "Referência internacional em turismo cultural, literário e cinematográfico, Jordi Arcos-Pumarola é professor e pesquisador do CETT – Universidade de Barcelona, centro líder mundial em educação, pesquisa e inovação em turismo. Com ampla experiência em projetos que unem cultura, inovação territorial e desenvolvimento regional, atua na criação de metodologias e produtos turísticos baseadas em narrativas literárias e audiovisuais. Reconhecido por sua capacidade de aproximar academia e mercado, é hoje um dos principais nomes na Europa quando o tema é transformar histórias em experiências que movimentam destinos e fortalecem economias criativas.",
          },
          {
            id: "rita",
            name: "Rita Baleiro",
            affiliation: "UAlg (Portugal)",
            tags: ["Mesa Internacional"],
            photo: "/speakers/RitaBaleiro.png",
            photoModal: "/speakers/RitaBaleiro-modal.png",
            bio: "Investigadora e docente da Universidade do Algarve, Rita Baleiro é referência internacional em turismo literário e cinematográfico. Doutora em Estudos Anglo-Portugueses pela Universidade Nova de Lisboa, tem contribuído de forma decisiva para consolidar este campo de investigação, articulando literatura, cultura e turismo em projetos inovadores como o LITESCAPE.PT – Atlas of Literary Landscapes of Continental Portugal e a Rota Literária do Algarve. Autora e editora de obras fundamentais, incluindo Researching Literary Tourism: A Handbook for Students and Supervisors (2024) e Global Perspectives on Literary Tourism and Film-Induced Tourism (2022), integra redes internacionais como o TULE – Turismo Letterario. Sua produção científica e experiência em organização de conferências internacionais fazem dela uma das vozes mais influentes na valorização do patrimônio literário e cultural como motor de inovação, identidade e desenvolvimento de destinos turísticos.",
          },
          {
            id: "andre",
            name: "André Riani Costa Perinotto",
            affiliation: "UFDPar (Brasil)",
            tags: [
              "Painel Especial",
              "Turismo Cinematográfico e Film Commissions como vetores da economia do turismo",
            ],
            photo: "/speakers/Andre Peritonotto.png",
            photoModal: "/speakers/Andre Peritonotto-modal.png",
            bio: "Professor da UFDPar e UFPI / Film Commission Noronha 2B. Doutor em Ciências da Comunicação (UNISINOS) e Mestre em Geografia (UNESP), com especialização em Docência para o Ensino Superior (SENAC) e graduação em Turismo (UNIMEP). Professor da UFDPar desde 2008 e docente permanente dos mestrados em Turismo (UFPR) e Psicologia (UFDPar). Bolsista produtividade CNPq e Pesquisador Destaque ANPTUR 2022. Líder do grupo MiComT e colaborador em grupos nacionais e internacionais. Atuou em cargos de gestão e assessoria na UFDPar e na ABRATUR. Publica e pesquisa temas ligados a Turismo, Comunicação, Educação, Tecnologias e Imagens. Chefe editorial da EDUFDPar e membro de conselhos e governanças institucionais e estaduais.",
          },
          {
            id: "lissandro",
            name: "Lissandro Stallivieri",
            affiliation: "UCS (Brasil)",
            tags: [
              "Painel Especial",
              "Turismo Cinematográfico e Film Commissions como vetores da economia do turismo",
            ],
            photo: "/speakers/Lissandro.png",
            photoModal: "/speakers/Lissandro-modal.png",
            bio: "Cineasta e professor de cinema. É jornalista, produtor e diretor cinematográfico. Atuou por oito anos em jornal e televisão antes de fundar, em 2003, a Spaghetti Filmes, produtora brasileira especializada em comunicação digital. Dirigiu mais de 30 obras entre longas, curtas e médias-metragens, além de produzir mais de cem filmes comerciais, institucionais e publicitários. Especialista em artes plásticas com foco em arte digital e novas mídias, segue pesquisando fotografia e cinema. Atualmente é professor da Universidade de Caxias do Sul nos cursos de Produção Audiovisual – Cinema, Fotografia e Artes Visuais.",
          },
        ];
        setSpeakers(staticSpeakers);
      });
  }, []);

  return (
    <>
      <Seo title={t("nav.keynotes")} description={t("keynotes.description")} />

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
            {t("keynotes.title")}
          </h1>
        </div>
      </div>

      <Section>
        <div className="max-w-4xl mx-auto mb-8">
          <p className="text-base text-gray-600 text-center leading-relaxed">
            {t("keynotes.intro")}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10 max-w-7xl mx-auto px-4">
          {speakers.map((speaker) => (
            <SpeakerCard key={speaker.id} speaker={speaker} />
          ))}
        </div>
      </Section>
    </>
  );
}
