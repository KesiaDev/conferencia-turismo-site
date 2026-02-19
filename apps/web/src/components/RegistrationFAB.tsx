import { Link, useLocation } from "react-router-dom";

export default function RegistrationFAB() {
  const { pathname } = useLocation();
  if (pathname === "/fees") return null;
  return (
    <Link
      to="/fees"
      className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-0.5 rounded-xl px-4 py-3 shadow-lg transition hover:scale-105 hover:shadow-xl"
      style={{ backgroundColor: "#c8632d" }}
      aria-label="Pagar inscrição"
    >
      <span className="text-sm font-bold text-white">Pagar inscrição</span>
      <span className="text-xs text-white/90">Até 23/03</span>
    </Link>
  );
}
