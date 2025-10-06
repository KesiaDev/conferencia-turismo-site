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
    apiService.getFees().then(setFees);
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
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -ml-24 -mb-24"></div>

            <div className="relative p-8 md:p-10">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-5xl shadow-lg border border-white/30">
                    💳
                  </div>
                </div>

                <div className="flex-1">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white drop-shadow-lg">
                    Formas de Pagamento
                  </h2>

                  <div className="bg-white rounded-xl shadow-xl p-6 border-2 border-white/50">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-2xl">
                        📢
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          Informações sobre pagamento serão divulgadas em breve.
                        </h3>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border-l-4 border-blue-500">
                      <p className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-lg">ℹ️</span>
                        <span>
                          Instruções detalhadas serão enviadas por e-mail após o preenchimento do
                          formulário de inscrição.
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <FeeTable fees={fees} />

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

        <div className="mt-12 max-w-5xl mx-auto bg-white rounded-lg shadow-md p-8 border-l-4 border-[#e0a085]">
          <h2 className="text-2xl font-bold mb-6 text-[#e0a085]">{t("fees.payment")}</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* PIX - Seção preparada */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">💳</span>
                Pagamento via PIX
              </h3>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <p className="text-base font-semibold text-blue-900 mb-2">
                  📢 Informações serão divulgadas em breve
                </p>
                <p className="text-sm text-blue-800">
                  Instruções de pagamento via PIX serão disponibilizadas em breve.
                </p>
              </div>
            </div>

            {/* Outras formas - Seção preparada */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">🏦</span>
                Outras Formas de Pagamento
              </h3>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <p className="text-base font-semibold text-blue-900 mb-2">
                  📢 Informações serão divulgadas em breve
                </p>
                <p className="text-sm text-blue-800">{t("fees.paymentInfo")}</p>
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
