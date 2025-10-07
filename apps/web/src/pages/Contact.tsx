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
          src="/hero.png"
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

                <div>
                  <h3 className="font-semibold text-lg mb-2">{t("contact.social")}</h3>
                  <p className="text-gray-700">{t("contact.socialText")}</p>
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
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-[#e0a085]">
            Como Chegar à UCS
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#e0a085]">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Endereço do Evento</h3>
              <p className="text-gray-700 mb-4">
                <strong>Universidade de Caxias do Sul</strong>
                <br />
                Blocos H, E e F
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
