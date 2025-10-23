import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Section from "../components/Section";
import FeeTable from "../components/FeeTable";
import Alert from "../components/Alert";
import Seo from "../components/Seo";
import apiService from "../api/client";
import type { FeeCategory } from "../types";

export default function Fees() {
  const { t } = useTranslation();
  const [fees, setFees] = useState<FeeCategory[]>([]);

  useEffect(() => {
    apiService
      .getFees()
      .then(setFees)
      .catch(() => {
        // Fallback com dados estáticos se a API falhar
        const staticFees: FeeCategory[] = [
          {
            category: "Estudante de Graduação",
            windows: [
              { label: "Early Bird", value: 150.0 },
              { label: "Regular", value: 200.0 },
              { label: "Late", value: 250.0 },
            ],
          },
          {
            category: "Estudante de Pós-Graduação",
            windows: [
              { label: "Early Bird", value: 200.0 },
              { label: "Regular", value: 250.0 },
              { label: "Late", value: 300.0 },
            ],
          },
          {
            category: "Profissional",
            windows: [
              { label: "Early Bird", value: 300.0 },
              { label: "Regular", value: 400.0 },
              { label: "Late", value: 500.0 },
            ],
          },
          {
            category: "Professor/Pesquisador",
            windows: [
              { label: "Early Bird", value: 250.0 },
              { label: "Regular", value: 300.0 },
              { label: "Late", value: 350.0 },
            ],
          },
        ];
        setFees(staticFees);
      });
  }, []);

  return (
    <>
      <Seo title={t("nav.fees")} description={t("fees.description")} />

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
            {t("fees.title")}
          </h1>
        </div>
      </div>

      <Section>
        <div className="max-w-4xl mx-auto mb-12">
          <Alert type="info">
            <p className="font-semibold">{t("fees.notice")}</p>
          </Alert>
        </div>

        {/* Destaque: Formas de Pagamento */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="relative bg-gradient-to-br from-[#e0a085] via-[#e8a98f] to-[#f4c490] rounded-2xl shadow-2xl overflow-hidden">
            {/* Efeito de brilho no canto */}
            <div className="absolute top-0 right-0 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-white/10 rounded-full blur-3xl -mr-16 sm:-mr-24 md:-mr-32 -mt-16 sm:-mt-24 md:-mt-32"></div>
            <div className="absolute bottom-0 left-0 w-24 sm:w-36 md:w-48 h-24 sm:h-36 md:h-48 bg-white/10 rounded-full blur-3xl -ml-12 sm:-ml-18 md:-ml-24 -mb-12 sm:-mb-18 md:-mb-24"></div>
          </div>
        </div>

        <FeeTable fees={fees} />

        {/* Deploy trigger - $(Get-Date) */}

        <div className="mt-12 max-w-4xl mx-auto prose prose-lg">
          <h3>{t("fees.included")}</h3>
          <ul>
            <li>{t("fees.includedItem1")}</li>
            <li>{t("fees.includedItem2")}</li>
            <li>{t("fees.includedItem3")}</li>
            <li>{t("fees.includedItem4")}</li>
            <li>{t("fees.includedItem5")}</li>
          </ul>

          <h3>{t("fees.notIncluded")}</h3>
          <ul>
            <li>{t("fees.notIncludedItem1")}</li>
            <li>{t("fees.notIncludedItem2")}</li>
          </ul>
        </div>

        <div className="mt-12 max-w-5xl mx-auto bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8 border-l-4 border-[#e0a085]">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-[#e0a085] text-center sm:text-left">
            {t("fees.payment")}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {/* PIX - Seção preparada */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4 flex items-center justify-center sm:justify-start gap-2">
                <span className="text-xl sm:text-2xl">💳</span>
                Pagamento via PIX
              </h3>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-3 sm:p-4 rounded">
                <p className="text-sm sm:text-base font-semibold text-blue-900 mb-2 text-center sm:text-left">
                  📢 Informações serão divulgadas em breve
                </p>
                <p className="text-xs sm:text-sm text-blue-800 text-center sm:text-left">
                  Instruções de pagamento via PIX serão disponibilizadas em breve.
                </p>
              </div>
            </div>

            {/* Outras formas - Seção preparada */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4 flex items-center justify-center sm:justify-start gap-2">
                <span className="text-xl sm:text-2xl">🏦</span>
                Outras Formas de Pagamento
              </h3>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-3 sm:p-4 rounded">
                <p className="text-sm sm:text-base font-semibold text-blue-900 mb-2 text-center sm:text-left">
                  📢 Informações serão divulgadas em breve
                </p>
                <p className="text-xs sm:text-sm text-blue-800 text-center sm:text-left">
                  {t("fees.paymentInfo")}
                </p>
              </div>
            </div>
          </div>

          {/* Comentários mantidos para quando houver informações
          <div className="mt-6 text-sm text-gray-500 italic border-t pt-4">
            <p>💡 <strong>Desenvolvedor:</strong> Quando tiver as informações de pagamento:</p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Para PIX: adicione o QR Code em /public/pix-qrcode.png e a chave PIX</li>
              <li>Para outras formas: adicione link de pagamento ou dados bancários</li>
              <li>Remova os alertas "em breve" e descomente as seções preparadas acima</li>
            </ul>
          </div>
          */}
        </div>
      </Section>
    </>
  );
}
