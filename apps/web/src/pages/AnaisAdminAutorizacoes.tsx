import { Helmet } from "react-helmet-async";
import AdminAuthorizationsPanel from "../components/authorization/AdminAuthorizationsPanel";

export default function AnaisAdminAutorizacoes() {
  return (
    <div className="min-h-screen bg-[#f5f0e8] flex flex-col">
      <Helmet>
        <title>Admin — Autorizações</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="flex-1 px-4 py-10">
        <AdminAuthorizationsPanel />
      </div>
    </div>
  );
}
