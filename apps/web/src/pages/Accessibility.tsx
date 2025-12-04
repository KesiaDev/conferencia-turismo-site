import Section from "../components/Section";
import Seo from "../components/Seo";

export default function Accessibility() {
  return (
    <>
      <Seo
        title="Acessibilidade"
        description="Informações sobre acessibilidade da III Conferência Internacional sobre Turismo Literário e Cinematográfico"
      />

      <div className="w-full aspect-[16/5]">
        <img
          src="/hero-novo.png"
          alt="Banner da Conferência"
          className="w-full h-full object-cover block"
        />
      </div>

      <div className="py-8 bg-[#e0a085]">
        <div className="container-custom">
          <h1 className="text-2xl md:text-3xl font-semibold text-center text-white">
            ♿ Acessibilidade
          </h1>
        </div>
      </div>

      <Section>
        <div className="max-w-4xl mx-auto">
          {/* Introdução */}
          <div className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed text-justify">
              A III Conferência Internacional sobre Turismo Literário e Cinematográfico está
              comprometida em proporcionar um ambiente inclusivo e acessível para todos os
              participantes. Esta página contém informações sobre as medidas de acessibilidade
              implementadas no evento e no website.
            </p>
          </div>

          {/* Acessibilidade do Evento */}
          <div className="mb-12 bg-gradient-to-r from-[#e0a085]/10 to-white p-8 rounded-xl border-l-4 border-[#e0a085]">
            <h2 className="text-2xl font-bold mb-6 text-[#e0a085] flex items-center gap-3">
              <span className="text-3xl">🏛️</span>
              Acessibilidade no Local do Evento
            </h2>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 flex items-center gap-2">
                  <span className="text-2xl">♿</span>
                  Acessibilidade Física
                </h3>
                <ul className="space-y-3 text-base text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold text-xl">✓</span>
                    <span>Rampas de acesso em todas as entradas do edifício</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold text-xl">✓</span>
                    <span>Elevadores adaptados para cadeirantes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold text-xl">✓</span>
                    <span>Banheiros acessíveis em todos os andares</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold text-xl">✓</span>
                    <span>Vagas de estacionamento para pessoas com deficiência</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold text-xl">✓</span>
                    <span>Auditórios com espaços reservados para cadeirantes</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 flex items-center gap-2">
                  <span className="text-2xl">👂</span>
                  Recursos para Pessoas com Deficiência Auditiva
                </h3>
                <ul className="space-y-3 text-base text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold text-xl">✓</span>
                    <span>
                      Intérpretes de LIBRAS (Língua Brasileira de Sinais) nas palestras principais
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold text-xl">✓</span>
                    <span>Sistema de amplificação sonora em todos os auditórios</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold text-xl">ℹ️</span>
                    <span>Legendas ao vivo disponíveis mediante solicitação prévia</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 flex items-center gap-2">
                  <span className="text-2xl">👁️</span>
                  Recursos para Pessoas com Deficiência Visual
                </h3>
                <ul className="space-y-3 text-base text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold text-xl">✓</span>
                    <span>Materiais impressos em braille disponíveis mediante solicitação</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold text-xl">✓</span>
                    <span>Audiodescrição nas sessões principais</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold text-xl">✓</span>
                    <span>Sinalização tátil nas áreas comuns</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold text-xl">✓</span>
                    <span>Permissão para cães-guia em todas as áreas do evento</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Acessibilidade do Website */}
          <div className="mb-12 bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl border-l-4 border-blue-500">
            <h2 className="text-2xl font-bold mb-6 text-blue-900 flex items-center gap-3">
              <span className="text-3xl">💻</span>
              Acessibilidade do Website
            </h2>

            <div className="space-y-6">
              <p className="text-base text-gray-700 leading-relaxed">
                Este website foi desenvolvido seguindo as diretrizes de acessibilidade web (WCAG
                2.1) para garantir que todos possam acessar as informações da conferência.
              </p>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">
                  Recursos Implementados:
                </h3>
                <ul className="space-y-3 text-base text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold text-xl">✓</span>
                    <span>
                      <strong>Navegação por teclado:</strong> Todas as funcionalidades podem ser
                      acessadas usando apenas o teclado
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold text-xl">✓</span>
                    <span>
                      <strong>Contraste adequado:</strong> Cores escolhidas para garantir
                      legibilidade (WCAG AA)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold text-xl">✓</span>
                    <span>
                      <strong>Textos alternativos:</strong> Todas as imagens possuem descrições para
                      leitores de tela
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold text-xl">✓</span>
                    <span>
                      <strong>Estrutura semântica:</strong> HTML semântico para melhor navegação com
                      tecnologias assistivas
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold text-xl">✓</span>
                    <span>
                      <strong>Skip links:</strong> Atalhos para pular para o conteúdo principal
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold text-xl">✓</span>
                    <span>
                      <strong>Formulários acessíveis:</strong> Labels claros e mensagens de erro
                      descritivas
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold text-xl">✓</span>
                    <span>
                      <strong>Responsivo:</strong> Adaptado para diferentes tamanhos de tela e
                      dispositivos
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold text-xl">✓</span>
                    <span>
                      <strong>Zoom:</strong> Suporte para zoom de até 200% sem perda de
                      funcionalidade
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                <h4 className="font-semibold text-yellow-900 mb-2">Atalhos de Teclado:</h4>
                <ul className="space-y-2 text-sm text-yellow-800">
                  <li>
                    <kbd className="bg-white px-2 py-1 rounded border">Tab</kbd> - Navegar entre
                    elementos
                  </li>
                  <li>
                    <kbd className="bg-white px-2 py-1 rounded border">Enter</kbd> ou{" "}
                    <kbd className="bg-white px-2 py-1 rounded border">Espaço</kbd> - Ativar links e
                    botões
                  </li>
                  <li>
                    <kbd className="bg-white px-2 py-1 rounded border">Esc</kbd> - Fechar modais e
                    menus
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Solicitações Especiais */}
          <div className="mb-12 bg-white p-8 rounded-xl shadow-lg border-2 border-[#e0a085]">
            <h2 className="text-2xl font-bold mb-6 text-[#e0a085] flex items-center gap-3">
              <span className="text-3xl">📝</span>
              Solicitações Especiais
            </h2>

            <p className="text-base text-gray-700 leading-relaxed mb-6">
              Se você necessita de algum recurso de acessibilidade específico não mencionado acima,
              ou tem necessidades especiais que gostaria de nos informar, por favor entre em contato
              conosco com antecedência.
            </p>

            <div className="bg-gradient-to-r from-[#e0a085]/10 to-white p-6 rounded-lg border border-[#e0a085]/30">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Como Solicitar:</h3>
              <ul className="space-y-3 text-base text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-[#e0a085] font-bold">1.</span>
                  <span>
                    Envie um e-mail para{" "}
                    <a
                      href="mailto:litfilmtourismconferenceucs@gmail.com"
                      className="text-[#e0a085] font-semibold hover:underline"
                      rel="noopener noreferrer"
                    >
                      litfilmtourismconferenceucs@gmail.com
                    </a>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#e0a085] font-bold">2.</span>
                  <span>
                    Informe suas necessidades específicas com pelo menos 15 dias de antecedência
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#e0a085] font-bold">3.</span>
                  <span>Nossa equipe entrará em contato para confirmar o atendimento</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 p-4 bg-green-50 border-l-4 border-green-500 rounded">
              <p className="text-base text-green-800">
                <strong>💚 Nosso compromisso:</strong> Faremos todo o possível para garantir que
                todos os participantes tenham uma experiência plena e inclusiva em nossa
                conferência.
              </p>
            </div>
          </div>

          {/* Feedback */}
          <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-3">
              <span className="text-3xl">💬</span>
              Feedback sobre Acessibilidade
            </h2>

            <p className="text-base text-gray-700 leading-relaxed mb-4">
              Se você encontrou alguma barreira de acessibilidade em nosso site ou tem sugestões de
              como podemos melhorar, por favor nos informe:
            </p>

            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#e0a085] hover:bg-[#d49070] text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <span>Enviar Feedback</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          </div>

          {/* Informações Adicionais */}
          <div className="mt-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-lg font-bold mb-3 text-blue-900">📚 Recursos Adicionais</h3>
            <p className="text-base text-blue-800 mb-4">
              Para mais informações sobre acessibilidade na Universidade de Caxias do Sul (UCS),
              visite o site oficial da instituição ou entre em contato com a organização do evento.
            </p>
            <p className="text-sm text-blue-700">
              <strong>Email:</strong> litfilmtourismconferenceucs@gmail.com
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
