import { useEffect, useState } from "react";
import apiService from "../../api/client";

interface Photo {
  id: string;
  url: string;
  nome: string | null;
  descricao: string | null;
  status: string;
  createdAt: string;
}

export default function PhotosAdminSection() {
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

  return (
    <section className="mx-auto max-w-6xl rounded-2xl border border-stone-200 bg-white/80 p-6 shadow-xl backdrop-blur-md">
      <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-[#8b4513]">
        <span className="text-3xl">📷</span>
        Moderação de Fotos
      </h2>

      {!isAuthenticated ? (
        <form onSubmit={handleLogin} className="max-w-sm">
          <p className="mb-4 text-gray-600">Digite a senha para gerenciar as fotos:</p>
          <div className="flex gap-2">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha de administrador"
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-[#e0a085] focus:outline-none focus:ring-2 focus:ring-[#e0a085]/20"
            />
            <button
              type="submit"
              className="rounded-lg bg-[#8b4513] px-6 py-2 font-medium text-white hover:bg-[#6b3410] transition-colors"
            >
              Entrar
            </button>
          </div>
        </form>
      ) : (
        <>
          {/* Filters */}
          <div className="mb-6 flex flex-wrap items-center gap-2">
            {(["pending", "approved", "rejected"] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  filter === status
                    ? "bg-[#8b4513] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {status === "pending" && "⏳ Pendentes"}
                {status === "approved" && "✅ Aprovadas"}
                {status === "rejected" && "❌ Rejeitadas"}
              </button>
            ))}
            <button
              onClick={loadPhotos}
              className="ml-auto rounded-lg bg-gray-100 px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 transition-colors"
            >
              🔄 Atualizar
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#e0a085]/30 border-t-[#8b4513]"></div>
            </div>
          ) : photos.length === 0 ? (
            <div className="rounded-xl bg-gray-50 py-12 text-center">
              <div className="text-4xl mb-3">📭</div>
              <p className="text-gray-500">
                Nenhuma foto{" "}
                {filter === "pending"
                  ? "pendente"
                  : filter === "approved"
                    ? "aprovada"
                    : "rejeitada"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className="overflow-hidden rounded-xl bg-white shadow-md transition-shadow hover:shadow-lg"
                >
                  <div
                    className="group relative aspect-square cursor-pointer"
                    onClick={() => setSelectedPhoto(photo)}
                  >
                    <img
                      src={photo.url}
                      alt={photo.descricao || "Foto"}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/20">
                      <span className="text-2xl text-white opacity-0 group-hover:opacity-100">
                        🔍
                      </span>
                    </div>
                  </div>
                  <div className="p-3">
                    {photo.nome && (
                      <p className="truncate text-sm font-medium text-gray-800">{photo.nome}</p>
                    )}
                    <p className="mb-2 text-xs text-gray-500">{formatDate(photo.createdAt)}</p>
                    {filter === "pending" ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleUpdateStatus(photo.id, "approved")}
                          disabled={actionLoading === photo.id}
                          className="flex-1 rounded bg-green-500 py-1.5 text-sm text-white hover:bg-green-600 disabled:opacity-50"
                        >
                          ✓
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(photo.id, "rejected")}
                          disabled={actionLoading === photo.id}
                          className="flex-1 rounded bg-red-500 py-1.5 text-sm text-white hover:bg-red-600 disabled:opacity-50"
                        >
                          ✗
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        {filter === "approved" && (
                          <button
                            onClick={() => handleUpdateStatus(photo.id, "rejected")}
                            disabled={actionLoading === photo.id}
                            className="flex-1 rounded bg-orange-500 py-1.5 text-sm text-white hover:bg-orange-600 disabled:opacity-50"
                            title="Remover da galeria"
                          >
                            ↩️
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(photo.id)}
                          disabled={actionLoading === photo.id}
                          className="flex-1 rounded bg-red-500 py-1.5 text-sm text-white hover:bg-red-600 disabled:opacity-50"
                        >
                          🗑️
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute right-4 top-4 z-10 text-4xl text-white hover:text-gray-300"
          >
            ×
          </button>
          <div
            className="w-full max-w-4xl overflow-hidden rounded-xl bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.descricao || "Foto"}
              className="max-h-[60vh] w-full bg-gray-100 object-contain"
            />
            <div className="p-6">
              {selectedPhoto.nome && (
                <p className="mb-2 text-lg font-medium text-gray-800">📷 {selectedPhoto.nome}</p>
              )}
              {selectedPhoto.descricao && (
                <p className="mb-4 text-gray-600">{selectedPhoto.descricao}</p>
              )}
              <p className="mb-6 text-sm text-gray-500">
                Enviada em: {formatDate(selectedPhoto.createdAt)}
              </p>

              {filter === "pending" && (
                <div className="flex gap-4">
                  <button
                    onClick={() => handleUpdateStatus(selectedPhoto.id, "approved")}
                    disabled={actionLoading === selectedPhoto.id}
                    className="flex-1 rounded-lg bg-green-500 py-3 font-medium text-white hover:bg-green-600 disabled:opacity-50"
                  >
                    ✅ Aprovar
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedPhoto.id, "rejected")}
                    disabled={actionLoading === selectedPhoto.id}
                    className="flex-1 rounded-lg bg-red-500 py-3 font-medium text-white hover:bg-red-600 disabled:opacity-50"
                  >
                    ❌ Rejeitar
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
