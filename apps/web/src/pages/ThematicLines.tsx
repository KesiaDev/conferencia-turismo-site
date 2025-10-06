import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Section from "../components/Section";
import Seo from "../components/Seo";

export default function ThematicLines() {
  const { t } = useTranslation();

  const thematicLines = [
    "Envolvimento da comunidade local no turismo literário e cinematográfico",
    "O papel das Film Commissions",
    "Turismo Literário/Cinematográfico e Economia Criativa",
    "A contribuição do turismo literário e cinematográfico para o bem-estar da comunidade de acolhimento (criação de emprego, oportunidades educativas)",
    "Estudos de casos de modelos bem sucedidos ou pouco explorados de desenvolvimento territorial orientado para o turismo literário/cinematográfico",
    "Estratégias para promover a sustentabilidade e o desenvolvimento regional por meio do patrimônio literário e das produções cinematográficas",
    "Narração de histórias e comunidades locais no turismo literário e cinematográfico",
    "Governança e planeamento estratégico: colaboração das partes interessadas, mecanismos de financiamento, quadros regulamentares, governos locais, instituições culturais e conselhos de turismo",
    "Preservação do patrimônio literário e cultural e da autenticidade",
    "Desenvolvimento de projetos em zonas rurais",
    "Percepções das comunidades locais sobre o turismo literário e cinematográfico",
    "Interfaces turístico-pedagógicas",
    "Representação cinematográfica/literária das comunidades locais",
    "Paisagens literárias e representações fílmicas como catalisadores de identificação regional",
    "O papel dos autores literários, dos cineastas e das comunidades locais na formação das experiências turísticas",
    "Roteiros e rotas/passeios literários e cinematográficos",
    "Inovação, tendências e propostas",
  ];

  return (
    <>
      <Seo
        title={t("nav.thematicLines")}
        description="Conheça as linhas temáticas da III Conferência Internacional"
      />

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
            {t("nav.thematicLines")}
          </h1>
        </div>
      </div>

      <Section>
        <div className="max-w-4xl mx-auto mb-12">
          <p className="text-lg text-gray-700 text-center leading-relaxed">
            As linhas temáticas abordam os principais eixos da conferência, proporcionando
            discussões aprofundadas sobre turismo literário, cinematográfico e desenvolvimento
            territorial.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="space-y-4">
            {thematicLines.map((line, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors duration-200"
              >
                <span className="bg-[#e0a085] text-white font-bold text-sm rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                  {index + 1}
                </span>
                <span className="text-gray-800 leading-relaxed">{line}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-4">Submeta seu Trabalho</h2>
          <p className="text-center text-gray-700 max-w-3xl mx-auto mb-6">
            As submissões de trabalhos podem ser realizadas em qualquer uma das linhas temáticas.
            Escolha a linha que melhor se alinha com sua pesquisa e contribua para as discussões
            durante o evento.
          </p>
          <div className="text-center">
            <Link
              to="/call"
              className="inline-flex items-center gap-2 bg-[#e0a085] text-white px-6 py-3 rounded-lg hover:bg-[#e0a085]/90 transition-colors duration-200 font-medium text-lg"
            >
              <span>Acessar Formulário de Submissão</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
