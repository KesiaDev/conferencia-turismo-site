import { useTranslation } from "react-i18next";
import Hero from "../components/Hero";
import Section from "../components/Section";
import Seo from "../components/Seo";

export default function Contact() {
  const { t } = useTranslation();

  return (
    <>
      <Seo title={t("nav.contact")} description={t("contact.description")} />

      <Hero title={t("contact.title")} height="medium" />

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
                    className="text-primary hover:underline"
                  >
                    litfilmtourismconferenceucs@gmail.com
                  </a>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">{t("contact.address")}</h3>
                  <p className="text-gray-700">
                    Universidade de Caxias do Sul<br />
                    Rua Francisco Getúlio Vargas, 1130<br />
                    Bairro Petrópolis<br />
                    Caxias do Sul/RS, Brasil<br />
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
              <h2 className="text-2xl font-bold mb-6">{t("contact.sendMessage")}</h2>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block font-semibold mb-2">
                    {t("contact.name")}
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full border border-gray-300 rounded-lg p-3"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block font-semibold mb-2">
                    {t("contact.emailLabel")}
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full border border-gray-300 rounded-lg p-3"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block font-semibold mb-2">
                    {t("contact.message")}
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full border border-gray-300 rounded-lg p-3"
                  />
                </div>

                <button type="submit" className="btn-primary w-full">
                  {t("contact.send")}
                </button>
              </form>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

