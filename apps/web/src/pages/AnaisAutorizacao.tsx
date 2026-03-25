import { Helmet } from "react-helmet-async";
import AuthorizationForm from "../components/authorization/AuthorizationForm";
import AuthorizationQr from "../components/authorization/AuthorizationQr";

export default function AnaisAutorizacao() {
  return (
    <div className="min-h-screen bg-[#EBE3D5] flex flex-col">
      <Helmet>
        <title>Autorização de publicação — Anais | III Conferência</title>
      </Helmet>

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg">
          <h1 className="text-2xl md:text-3xl font-semibold text-stone-900 text-center mb-2">
            Autorização de publicação nos anais
          </h1>
          <p className="text-sm text-stone-600 text-center mb-8">
            III Conferência Internacional de Turismo Literário e Cinematográfico
          </p>

          <div className="rounded-xl border border-stone-200/80 bg-white/90 backdrop-blur-sm p-6 md:p-8 shadow-md">
            <AuthorizationForm />
          </div>

          <div className="mt-10 flex justify-center">
            <AuthorizationQr label="Compartilhe o link da autorização (QR Code)" />
          </div>
        </div>
      </div>
    </div>
  );
}
