import { useState } from "react";
import { useTranslation } from "react-i18next";
import Section from "../components/Section";
import Alert from "../components/Alert";
import Seo from "../components/Seo";
import apiService from "../api/client";

export default function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus("loading");

    try {
      await apiService.sendContactMessage(formData);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });

      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch (error) {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };

  return (
    <>
      <Seo title={t("nav.contact")} description={t("contact.description")} />

      <div className="w-full aspect-[16/5]">
        <img
          src="/hero-novo.gif"
          alt="Banner da Conferência"
          className="w-full h-full object-cover block"
        />
      </div>

      <div className="py-8 bg-[#e0a085]">
        <div className="container-custom">
          <h1 className="text-2xl md:text-3xl font-semibold text-center text-white">
            {t("contact.title")}
          </h1>
        </div>
      </div>

      <Section>
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-6">{t("contact.infoTitle")}</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">{t("contact.email")}</h3>
                  <a
                    href="mailto:litfilmtourismconferenceucs@gmail.com"
                    className="text-accent hover:underline"
                    rel="noopener noreferrer"
                  >
                    litfilmtourismconferenceucs@gmail.com
                  </a>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">{t("contact.address")}</h3>
                  <p className="text-gray-700">
                    Universidade de Caxias do Sul
                    <br />
                    Rua Francisco Getúlio Vargas, 1130
                    <br />
                    Bairro Petrópolis
                    <br />
                    Caxias do Sul/RS, Brasil
                    <br />
                    CEP 95070-560
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-6 text-[#e0a085]">{t("contact.sendMessage")}</h2>

              {submitStatus === "success" && (
                <Alert type="success">
                  <strong>Mensagem enviada!</strong>
                  <p>Recebemos sua mensagem e entraremos em contato em breve.</p>
                </Alert>
              )}

              {submitStatus === "error" && (
                <Alert type="error">
                  <strong>Erro ao enviar</strong>
                  <p>Ocorreu um erro. Por favor, tente novamente ou envie um email direto.</p>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                <div>
                  <label htmlFor="name" className="block font-semibold mb-2">
                    {t("contact.name")} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:border-[#e0a085] focus:ring-2 focus:ring-[#e0a085]/20 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block font-semibold mb-2">
                    {t("contact.emailLabel")} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:border-[#e0a085] focus:ring-2 focus:ring-[#e0a085]/20 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block font-semibold mb-2">
                    {t("contact.message")} *
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    required
                    minLength={10}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:border-[#e0a085] focus:ring-2 focus:ring-[#e0a085]/20 transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitStatus === "loading"}
                  className="w-full bg-[#e0a085] hover:bg-[#d49070] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitStatus === "loading" ? "Enviando..." : t("contact.send")}
                </button>
              </form>
            </div>
          </div>
        </div>
      </Section>

      <Section background="gray">
        <div className="max-w-6xl mx-auto">
          {/* Hotel Oficial - Blue Tree Towers - Onde se hospedar primeiro */}
          <div className="mb-12 bg-white rounded-lg shadow-md p-8 border-l-4 border-[#e0a085]">
            <h3 className="text-xl font-bold mb-4 text-[#e0a085]">
              Onde se hospedar – Hotel Oficial Blue Tree Towers
            </h3>
            <p className="text-gray-700 mb-4">
              Facilitamos sua estadia durante o evento! O Hotel Blue Tree Towers fica próximo à UCS
              e oferece excelente infraestrutura. Entre em contato diretamente e faça sua reserva.
            </p>
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <img
                src="/logos/blue-tree-towers.png"
                alt="Blue Tree Towers Caxias do Sul"
                className="h-16 md:h-20 object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <div className="flex-1 space-y-2">
                <p className="text-gray-700">
                  <strong>Blue Tree Towers Caxias do Sul</strong>
                  <br />
                  Rua Pinheiro Machado, 2867 • Caxias do Sul - RS • 95020-172
                </p>
                <a
                  href="https://wa.me/555432249000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors text-sm"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Ver informações no WhatsApp
                </a>
              </div>
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-[#e0a085]">
            Como Chegar à UCS
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#e0a085]">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Endereço do Evento</h3>
              <p className="text-gray-700 mb-4">
                <strong>Universidade de Caxias do Sul</strong>
                <br />
                Blocos F e H
                <br />
                Rua Francisco Getúlio Vargas, 1130
                <br />
                Bairro Petrópolis
                <br />
                Caxias do Sul/RS, Brasil
                <br />
                CEP 95070-560
              </p>

              <div className="space-y-3 mt-6">
                <div>
                  <h4 className="font-semibold text-[#e0a085] mb-2">🚗 De Carro</h4>
                  <p className="text-sm text-gray-600">
                    Estacionamento gratuito disponível no campus. Siga pela Av. Francisco Getúlio
                    Vargas.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-[#e0a085] mb-2">🚌 Transporte Público</h4>
                  <p className="text-sm text-gray-600">
                    Diversas linhas de ônibus levam ao campus. Consulte o transporte local.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-[#e0a085] mb-2">✈️ Do Aeroporto</h4>
                  <p className="text-sm text-gray-600">
                    Aeroporto de Caxias do Sul (aprox. 10km). Táxi ou aplicativo de transporte.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden shadow-lg border-4 border-white h-[450px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3484.4976548975697!2d-51.17899!3d-29.16833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x951eadf5a7e0e5d5%3A0x5c2b0c0c0c0c0c0c!2sUniversidade%20de%20Caxias%20do%20Sul%20-%20UCS!5e0!3m2!1spt-BR!2sbr!4v1234567890123!5m2!1spt-BR!2sbr"
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa de localização da UCS"
              />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
