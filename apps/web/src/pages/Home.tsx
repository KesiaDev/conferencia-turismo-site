import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Section from "../components/Section";
import SpeakerCard from "../components/SpeakerCard";
import Seo from "../components/Seo";
import OptimizedImage from "../components/OptimizedImage";
import apiService from "../api/client";
import type { Speaker } from "../types";

export default function Home() {
  const { t } = useTranslation();
  const [speakers, setSpeakers] = useState<Speaker[]>([]);

  useEffect(() => {
    apiService
      .getSpeakers()
      .then((data) => setSpeakers(data.slice(0, 9)))
      .catch(() => {
        // Fallback com dados estáticos se a API falhar
        const staticSpeakers: Speaker[] = [
          {
            id: "keynote-tbd",
            name: "Palestrante a definir (Embratur/Ancine)",
            affiliation: "Brasil",
            tags: ["Keynote", "Políticas públicas"],
            photo: "/speakers/Embratur-Aguarde.gif",
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
            photo: "/speakers/diomira.gif",
            photoModal: "/speakers/diomira-modal.png",
            bio: "Professora, Universidade Federal de Minas Gerais, Brasil. Possui graduação em Economia pela Universidade Católica de Minas Gerais (1982), especialização em Planejamento (Fundação João Pinheiro, 1983) e estatística (UFMG, 1998). Mestre em Turismo pela Universidad de Alicante, Espanha, e doutora em Economia pelo Cedeplar/UFMG e Universidad de Alicante (2012). É professora associada do Departamento de Geografia da UFMG, Curso de Turismo. Foi Diretora Científico-Cultural do Espaço do Conhecimento UFMG (2018–2022). Suas áreas de atuação incluem economia do turismo e da cultura, turismo e pobreza, turismo literário e viabilidade econômica de projetos, com foco atual na interface entre turismo e literatura.",
          },
          {
            id: "deborah",
            name: "Deborah Castro-Mariño",
            affiliation: "RUG (Países Baixos)",
            tags: ["Mesa Internacional"],
            photo: "/speakers/Deborah Castro.gif",
            photoModal: "/speakers/Deborah Castro-modal.png",
            bio: "Professora Assistente de Estudos de Mídia na Universidade de Groningen, Holanda, e co-convocadora do grupo de pesquisa Culturas de Produção de Mídia. Possui doutorado em Comunicação pela Universidade Autônoma de Barcelona (2015), com períodos de pesquisa nos EUA. Atuou como pesquisadora e docente em Portugal e na Holanda, incluindo uma bolsa Marie Skłodowska-Curie. É presidente do Centro Erasmus de Conhecimento para Cinema, Patrimônio e Turismo. Também integra a ITI-LARSyS (Portugal). Participa da FitoTO, organização premiada internacionalmente por promover práticas sustentáveis e inclusivas no cinema e turismo. Sua trajetória combina pesquisa, ensino e inovação cultural.",
          },
          {
            id: "jordi",
            name: "Jordi Arcos-Pumarola",
            affiliation: "CETT-UB",
            tags: ["Mesa Internacional"],
            photo: "/speakers/Jordi.gif",
            photoModal: "/speakers/Jordi-modal.png",
            bio: "Referência internacional em turismo cultural, literário e cinematográfico, Jordi Arcos-Pumarola é professor e pesquisador do CETT – Universidade de Barcelona, centro líder mundial em educação, pesquisa e inovação em turismo. Com ampla experiência em projetos que unem cultura, inovação territorial e desenvolvimento regional, atua na criação de metodologias e produtos turísticos baseadas em narrativas literárias e audiovisuais. Reconhecido por sua capacidade de aproximar academia e mercado, é hoje um dos principais nomes na Europa quando o tema é transformar histórias em experiências que movimentam destinos e fortalecem economias criativas.",
          },
          {
            id: "rita",
            name: "Rita Baleiro",
            affiliation: "UAlg (Portugal)",
            tags: ["Mesa Internacional"],
            photo: "/speakers/RitaBaleiro.gif",
            photoModal: "/speakers/RitaBaleiro-modal.png",
            bio: "Rita Baleiro é professora coordenadora na Escola Superior de Gestão, Hotelaria e Turismo, da Universidade do Algarve (Portugal), é doutorada em Estudos Literários pela Universidade Nova de Lisboa e mestre em Estudos Anglo-Portugueses pela mesma universidade. É investigadora integrada no Centre for Research, Development and Innovation in Tourism (CITUR), e no Centro de Investigação sobre Turismo Literário (TULE). É coeditora da revista académica Journal of Tourism & Arts. Na última década, tem desenvolvido investigação na área dos estudos em turismo e literatura, organizado diversos encontros científicos sobre este tema e publicado trabalhos nesta área. É coeditora do E-Dictionary of Literary Tourism (2023). ORCID 0000-0002-3188-5150",
          },
          {
            id: "andre",
            name: "André Riani Costa Perinotto",
            affiliation: "UFDPar (Brasil)",
            tags: [
              "Painel Especial",
              "Turismo Cinematográfico e Film Commissions como vetores da economia do turismo",
            ],
            photo: "/speakers/Andre Peritonotto.gif",
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
            photo: "/speakers/Lissandro.gif",
            photoModal: "/speakers/Lissandro-modal.png",
            bio: "Cineasta e professor de cinema. É jornalista, produtor e diretor cinematográfico. Atuou por oito anos em jornal e televisão antes de fundar, em 2003, a Spaghetti Filmes, produtora brasileira especializada em comunicação digital. Dirigiu mais de 30 obras entre longas, curtas e médias-metragens, além de produzir mais de cem filmes comerciais, institucionais e publicitários. Especialista em artes plásticas com foco em arte digital e novas mídias, segue pesquisando fotografia e cinema. Atualmente é professor da Universidade de Caxias do Sul nos cursos de Produção Audiovisual – Cinema, Fotografia e Artes Visuais.",
          },
          {
            id: "ronaldo",
            name: "Ronaldo Leites Diaz",
            affiliation: "Doutorando PPGTURH - UCS (Brasil)",
            tags: [
              "Painel Especial",
              "Turismo Cinematográfico e Film Commissions como vetores da economia do turismo",
            ],
            photo: "/speakers/Ronaldo.gif",
            photoModal: "/speakers/Ronaldo-modal.gif",
            bio: "É doutorando e mestre em Turismo e Hospitalidade pelo Programa de Pós-Graduação em Turismo e Hospitalidade da Universidade de Caxias do Sul (UCS), onde também se graduou em Letras e em Gastronomia. Sua tese é voltada ao turismo Literário e Cinematográfico, com ênfase nos processos de representação e nas relações entre ficção, criação e realidade turística. É pesquisador do HOSPITUR – Grupo de Estudos sobre Hospitalidade, vinculado ao PPGTURH/UCS, e participa do Núcleo de Pesquisa em Desenvolvimento Humano e Social, Linguagens e Processos Educacionais, integrando o projeto Turismo essencialmente pedagógico, Cidades Educadoras e Hospitalidade (TEPHCE), voltado à reformulação de políticas públicas de turismo com foco no desenvolvimento humano e social. E-mail: rldiaz@ucs.br. ORCID: 0000-0001-5141-2505.",
          },
          {
            id: "duda-rocha",
            name: "Duda Rocha",
            affiliation: "UCS (Brasil)",
            tags: [
              "Painel Especial",
              "Turismo Cinematográfico e Film Commissions como vetores da economia do turismo",
            ],
            photo: "/speakers/DudaRocha.gif",
            photoModal: "/speakers/Duda-modal.gif",
            bio: "Duda Rocha é Bacharel, Mestra e Doutoranda em Turismo e Hospitalidade pela Universidade de Caxias do Sul (UCS), com formação em Comunicação Social – Publicidade e Propaganda. Possui especialização em Cultural Heritage Enhancement pela Università La Sapienza di Roma e realizou intercâmbio de pesquisa na Universidade de Coimbra (Portugal), com foco em turismo, território e patrimônio. Com mais de duas décadas de experiência nos campos da comunicação, cultura e turismo, consolidou trajetória em produção audiovisual, direção e curadoria de curtas-metragens e documentários, explorando narrativas que articulam memória, identidade e desenvolvimento regional. É pesquisadora dos grupos HOSPITUR – Turismo e Hospitalidade: Desenvolvimento Humano e Social, Linguagem e Processos Educacionais – e do Núcleo de Estudos Migratórios (CNPq/UCS), onde desenvolve estudos interdisciplinares sobre memória, etnicidade, hospitalidade e cultura, contribuindo para o debate contemporâneo sobre economia criativa e políticas culturais como dimensões estratégicas do desenvolvimento sustentável dos territórios.",
          },
        ];
        setSpeakers(staticSpeakers.slice(0, 9));
      });
  }, []);

  return (
    <>
      <Seo />

      <div className="w-full aspect-[16/5]">
        <OptimizedImage
          src="/hero.png"
          alt="Banner da Conferência"
          className="w-full h-full object-cover block"
          loading="eager"
          fetchPriority="high"
        />
      </div>

      <div className="py-8 md:py-12">
        <div className="container-custom text-center">
          <div className="flex gap-3 md:gap-4 justify-center flex-wrap px-4">
            <Link to="/call" className="btn-primary flex-1 sm:flex-initial min-w-[200px]">
              {t("home.submitWork")}
            </Link>
            <Link
              to="/fees"
              className="group relative inline-flex items-center justify-center gap-2 bg-white hover:bg-[#e0a085] text-[#e0a085] hover:text-white font-bold py-4 px-8 rounded-xl min-h-[56px] transition-all duration-300 shadow-xl hover:shadow-2xl border-2 border-[#e0a085] flex-1 sm:flex-initial min-w-[220px] transform hover:scale-105"
            >
              <span className="text-base md:text-lg">{t("home.register")}</span>
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <Section title={t("home.aboutTitle")}>
        <div className="max-w-4xl mx-auto prose prose-lg">
          <p className="text-justify text-gray-700 leading-relaxed">{t("home.aboutText")}</p>
        </div>
      </Section>

      <Section title={t("home.featuredSpeakers")} background="gray">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12 max-w-7xl mx-auto px-4">
          {speakers.map((speaker) => (
            <SpeakerCard key={speaker.id} speaker={speaker} />
          ))}
        </div>
      </Section>

      <Section title={t("home.importantDates")}>
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <span className="font-semibold">{t("home.submissionDeadline")}</span>
            <span className="text-accent font-bold">03/12/2025</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <span className="font-semibold">{t("home.earlyBird")}</span>
            <span className="text-accent font-bold">05 Jan 2026</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <span className="font-semibold">{t("home.conference")}</span>
            <span className="text-accent font-bold">26-28 Mar 2026</span>
          </div>
        </div>
      </Section>
    </>
  );
}
