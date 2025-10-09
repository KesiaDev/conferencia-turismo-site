import { Link } from "react-router-dom";
import Seo from "../components/Seo";

export default function NotFound() {
  return (
    <>
      <Seo title="Página não encontrada - 404" description="A página que você procura não existe" />

      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center max-w-2xl mx-auto">
          {/* Número 404 grande */}
          <div className="mb-8">
            <h1 className="text-9xl md:text-[200px] font-bold text-[#e0a085]/20 leading-none">
              404
            </h1>
          </div>

          {/* Mensagem */}
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Página não encontrada
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Desculpe, a página que você está procurando não existe ou foi movida.
            </p>
          </div>

          {/* Ações */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-[#e0a085] hover:bg-[#d49070] text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Voltar para a página inicial
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-[#e0a085] font-semibold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-[#e0a085]"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Entre em contato
            </Link>
          </div>

          {/* Links úteis */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-4">Você também pode acessar:</p>
            <div className="flex flex-wrap gap-4 justify-center text-sm">
              <Link to="/keynotes" className="text-[#e0a085] hover:underline font-medium">
                Palestrantes
              </Link>
              <Link to="/program" className="text-[#e0a085] hover:underline font-medium">
                Programação
              </Link>
              <Link to="/call" className="text-[#e0a085] hover:underline font-medium">
                Submeter Trabalho
              </Link>
              <Link to="/fees" className="text-[#e0a085] hover:underline font-medium">
                Inscrições
              </Link>
              <Link to="/thematic-lines" className="text-[#e0a085] hover:underline font-medium">
                Linhas Temáticas
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
