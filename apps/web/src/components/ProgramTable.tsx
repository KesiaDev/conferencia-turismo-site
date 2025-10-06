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
                ? "border-b-2 border-accent text-accent"
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
                <td className="p-4 text-sm align-top font-bold text-gray-900">{slot.time}</td>
                <td className="p-4">
                  <div>
                    <div className="font-semibold text-gray-900">{slot.title}</div>
                    {slot.description && (
                      <div className="text-sm text-gray-700 mt-2 leading-relaxed">
                        {slot.description}
                      </div>
                    )}
                    {slot.speaker && (
                      <div className="text-sm text-gray-600 mt-2 italic">
                        <span className="font-medium">🎤 </span>
                        {slot.speaker}
                      </div>
                    )}
                    {slot.track && (
                      <div className="text-xs text-[#e0a085] mt-2 font-medium">{slot.track}</div>
                    )}
                  </div>
                </td>
                <td className="p-4 text-sm text-gray-600 align-top font-medium">{slot.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
