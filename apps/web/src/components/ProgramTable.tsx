import { useState } from "react";
import { ProgramDay } from "../types";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

interface ProgramTableProps {
  program: ProgramDay[];
}

export default function ProgramTable({ program }: ProgramTableProps) {
  const { t } = useTranslation();
  const [activeDay, setActiveDay] = useState(0);

  const getKindColor = (kind: string) => {
    const colors: Record<string, string> = {
      service: "bg-gray-100 text-gray-700",
      plenary: "bg-blue-100 text-blue-700",
      keynote: "bg-purple-100 text-purple-700",
      sessions: "bg-green-100 text-green-700",
      break: "bg-yellow-100 text-yellow-700",
      panel: "bg-indigo-100 text-indigo-700",
      networking: "bg-pink-100 text-pink-700",
      tour: "bg-orange-100 text-orange-700",
    };
    return colors[kind] || "bg-gray-100 text-gray-700";
  };

  return (
    <div>
      {/* Tabs */}
      <div className="flex border-b mb-6 overflow-x-auto">
        {program.map((day, index) => (
          <button
            key={index}
            onClick={() => setActiveDay(index)}
            className={`px-6 py-3 font-semibold whitespace-nowrap transition-colors ${
              activeDay === index
                ? "border-b-2 border-primary text-primary"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {dayjs(day.day).format("DD MMM")}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left p-4 font-semibold w-32">{t("program.time")}</th>
              <th className="text-left p-4 font-semibold">{t("program.activity")}</th>
              <th className="text-left p-4 font-semibold w-40">{t("program.location")}</th>
            </tr>
          </thead>
          <tbody>
            {program[activeDay].slots.map((slot, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="p-4 font-mono text-sm">{slot.time}</td>
                <td className="p-4">
                  <div className="flex items-start gap-2">
                    <span className={`text-xs px-2 py-1 rounded ${getKindColor(slot.kind)}`}>
                      {slot.kind}
                    </span>
                    <div>
                      <div className="font-medium">{slot.title}</div>
                      {slot.track && (
                        <div className="text-sm text-gray-600 mt-1">
                          {t("program.track")}: {slot.track}
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="p-4 text-sm text-gray-600">{slot.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

