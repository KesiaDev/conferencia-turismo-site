import { FeeCategory } from "../types";
import { useTranslation } from "react-i18next";

interface FeeTableProps {
  fees: FeeCategory[];
}

// Período ativo: 18/02 até 23/03/2026
function isActiveWindow(label: string): boolean {
  return label.includes("18/02") && label.includes("23/03");
}

export default function FeeTable({ fees }: FeeTableProps) {
  const { t } = useTranslation();

  if (!fees.length) return null;

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-primary text-white">
            <th className="text-left p-4 font-semibold">{t("fees.category")}</th>
            {fees[0].windows.map((window, i) => {
              const active = isActiveWindow(window.label);
              return (
                <th
                  key={i}
                  className={`text-center p-4 font-semibold ${!active ? "opacity-50" : ""}`}
                >
                  {window.label}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {fees.map((fee, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
              <td className="p-4 font-medium">{fee.category}</td>
              {fee.windows.map((window, i) => {
                const active = isActiveWindow(window.label);
                return (
                  <td key={i} className={`text-center p-4 ${!active ? "opacity-50" : ""}`}>
                    <div className="flex flex-col items-center gap-2">
                      <span
                        className={`text-lg font-bold ${active ? "text-accent" : "text-gray-500"}`}
                      >
                        R$ {window.value.toFixed(2)}
                      </span>
                      {window.paymentUrl &&
                        (active ? (
                          <a
                            href={window.paymentUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-3 py-1.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                          >
                            <span className="mr-1">💳</span>
                            {t("fees.payNow", "Pagar Agora")}
                          </a>
                        ) : (
                          <span
                            className="inline-flex items-center px-3 py-1.5 bg-gray-300 text-gray-500 text-sm font-medium rounded-lg cursor-not-allowed"
                            title={t("fees.periodClosed", "Período encerrado")}
                          >
                            <span className="mr-1">💳</span>
                            {t("fees.payNow", "Pagar Agora")}
                          </span>
                        ))}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
