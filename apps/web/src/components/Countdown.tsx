import { useState, useEffect } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { useTranslation } from "react-i18next";

dayjs.extend(duration);

interface CountdownProps {
  targetDate: string;
}

export default function Countdown({ targetDate }: CountdownProps) {
  const { t } = useTranslation();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = dayjs();
      const target = dayjs(targetDate);
      const diff = target.diff(now);

      if (diff > 0) {
        const d = dayjs.duration(diff);
        setTimeLeft({
          days: Math.floor(d.asDays()),
          hours: d.hours(),
          minutes: d.minutes(),
          seconds: d.seconds(),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="grid grid-cols-4 gap-4 md:gap-6">
      {[
        { label: t("countdown.days"), value: timeLeft.days },
        { label: t("countdown.hours"), value: timeLeft.hours },
        { label: t("countdown.minutes"), value: timeLeft.minutes },
        { label: t("countdown.seconds"), value: timeLeft.seconds },
      ].map((item, i) => (
        <div key={i} className="text-center">
          <div className="bg-white text-primary text-3xl md:text-5xl font-bold rounded-lg p-4 mb-2 shadow-lg">
            {String(item.value).padStart(2, "0")}
          </div>
          <div className="text-sm md:text-base font-medium">{item.label}</div>
        </div>
      ))}
    </div>
  );
}

