import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import apiService from "../api/client";

interface Photo {
  id: string;
  url: string;
  nome: string | null;
  descricao: string | null;
  status: string;
  createdAt: string;
}

export default function AdminFotos() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<"pending" | "approved" | "rejected">("pending");
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim()) {
      setIsAuthenticated(true);
      loadPhotos();
    }
  };

  const loadPhotos = async () => {
    setLoading(true);
    try {
      const response = await apiService.getPhotos(filter);
      setPhotos(response.items || []);
    } catch (error) {
      console.error("Error loading photos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadPhotos();
    }
  }, [filter, isAuthenticated]);

  const handleUpdateStatus = async (id: string, status: "approved" | "rejected") => {
    setActionLoading(id);
    try {
      await apiService.updatePhotoStatus(id, status, password);
      setPhotos((prev) => prev.filter((p) => p.id !== id));
      setSelectedPhoto(null);
    } catch (error: any) {
      if (error.response?.status === 401) {
        alert("Senha inválida");
        setIsAuthenticated(false);
      } else {
        alert("Erro ao atualizar foto");
      }
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir esta foto permanentemente?")) return;

    setActionLoading(id);
    try {
      await apiService.deletePhoto(id, password);
      setPhotos((prev) => prev.filter((p) => p.id !== id));
      setSelectedPhoto(null);
    } catch (error: any) {
      if (error.response?.status === 401) {
        alert("Senha inválida");
        setIsAuthenticated(false);
      } else {
        alert("Erro ao excluir foto");
      }
    } finally {
      setActionLoading(null);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <Helmet>
          <title>Admin — Fotos</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-lg max-w-sm w-full">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">🔐 Admin Fotos</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha de administrador"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-[#e0a085] focus:border-transparent"
            autoFocus
          />
          <button
            type="submit"
            className="w-full py-3 bg-[#8b4513] text-white rounded-lg hover:bg-[#6b3410] transition-colors font-medium"
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Helmet>
        <title>Admin — Fotos</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Header */}
      <header className="bg-[#8b4513] text-white py-4 px-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold">📷 Moderação de Fotos</h1>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="text-sm bg-white/20 px-4 py-2 rounded hover:bg-white/30 transition-colors"
          >
            Sair
          </button>
        </div>
      </header>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-2 mb-6">
          {(["pending", "approved", "rejected"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === status
                  ? "bg-[#8b4513] text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {status === "pending" && "⏳ Pendentes"}
              {status === "approved" && "✅ Aprovadas"}
              {status === "rejected" && "❌ Rejeitadas"}
            </button>
          ))}
          <button
            onClick={loadPhotos}
            className="ml-auto px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            🔄 Atualizar
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <svg
              className="animate-spin h-10 w-10 text-[#8b4513]"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>
        ) : photos.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl">
            <div className="text-5xl mb-4">📭</div>
            <p className="text-gray-500 text-lg">
              Nenhuma foto{" "}
              {filter === "pending" ? "pendente" : filter === "approved" ? "aprovada" : "rejeitada"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <div
                  className="aspect-square cursor-pointer relative group"
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <img
                    src={photo.url}
                    alt={photo.descricao || "Foto"}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <span className="text-white text-2xl opacity-0 group-hover:opacity-100">
                      🔍
                    </span>
                  </div>
                </div>
                <div className="p-3">
                  {photo.nome && (
                    <p className="text-sm font-medium text-gray-800 truncate">{photo.nome}</p>
                  )}
                  <p className="text-xs text-gray-500 mb-3">{formatDate(photo.createdAt)}</p>
                  {filter === "pending" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUpdateStatus(photo.id, "approved")}
                        disabled={actionLoading === photo.id}
                        className="flex-1 py-2 bg-green-500 text-white text-sm rounded hover:bg-green-600 disabled:opacity-50"
                      >
                        ✓
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(photo.id, "rejected")}
                        disabled={actionLoading === photo.id}
                        className="flex-1 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600 disabled:opacity-50"
                      >
                        ✗
                      </button>
                    </div>
                  )}
                  {filter !== "pending" && (
                    <button
                      onClick={() => handleDelete(photo.id)}
                      disabled={actionLoading === photo.id}
                      className="w-full py-2 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300 disabled:opacity-50"
                    >
                      🗑️ Excluir
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 z-10"
          >
            ×
          </button>
          <div
            className="max-w-4xl w-full bg-white rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.descricao || "Foto"}
              className="w-full max-h-[60vh] object-contain bg-gray-100"
            />
            <div className="p-6">
              {selectedPhoto.nome && (
                <p className="text-lg font-medium text-gray-800 mb-2">📷 {selectedPhoto.nome}</p>
              )}
              {selectedPhoto.descricao && (
                <p className="text-gray-600 mb-4">{selectedPhoto.descricao}</p>
              )}
              <p className="text-sm text-gray-500 mb-6">
                Enviada em: {formatDate(selectedPhoto.createdAt)}
              </p>

              {filter === "pending" && (
                <div className="flex gap-4">
                  <button
                    onClick={() => handleUpdateStatus(selectedPhoto.id, "approved")}
                    disabled={actionLoading === selectedPhoto.id}
                    className="flex-1 py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 disabled:opacity-50"
                  >
                    ✅ Aprovar
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedPhoto.id, "rejected")}
                    disabled={actionLoading === selectedPhoto.id}
                    className="flex-1 py-3 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 disabled:opacity-50"
                  >
                    ❌ Rejeitar
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
