import { FeeCategory } from "../types";
import { useTranslation } from "react-i18next";

interface FeeTableProps {
  fees: FeeCategory[];
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
            {fees[0].windows.map((window, i) => (
              <th key={i} className="text-center p-4 font-semibold">
                {window.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {fees.map((fee, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
              <td className="p-4 font-medium">{fee.category}</td>
              {fee.windows.map((window, i) => (
                <td key={i} className="text-center p-4">
                  <span className="text-lg font-bold text-accent">
                    R$ {window.value.toFixed(2)}
                  </span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
