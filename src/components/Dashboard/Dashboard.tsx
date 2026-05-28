import { useState } from "react";
import "./Dashboard.css";

interface Music {
  id: number;
  nome: string;
  cantor: string;
  link: string;
}

interface Event {
  id: number;
  nome: string;
  organizador: string;
  data: string;
}

interface DashboardProps {
  setScreen: React.Dispatch<
    React.SetStateAction<"login" | "register" | "dashboard">
  >;
}

const Dashboard = ({ setScreen }: DashboardProps) => {
  const [activeTab, setActiveTab] = useState("eventos");

  const [showMusicModal, setShowMusicModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);

  const [userEmail] = useState(
    localStorage.getItem("userEmail") || ""
  );

  const [editingEventId, setEditingEventId] =
    useState<number | null>(null);

  const [musicas, setMusicas] = useState<Music[]>([
    {
      id: 1,
      nome: "Perfect",
      cantor: "Ed Sheeran",
      link: "https://www.youtube.com/watch?v=2Vv-BfVoq4g",
    },
  ]);

  const [eventos, setEventos] = useState<Event[]>([
    {
      id: 1,
      nome: "Casamento João & Maria",
      organizador: "Maria Silva",
      data: "2026-05-27",
    },
  ]);

  const [novaMusica, setNovaMusica] = useState({
    nome: "",
    cantor: "",
    link: "",
  });

  const [novoEvento, setNovoEvento] = useState({
    nome: "",
    organizador: "",
    data: "",
  });

  function handleAddMusic(e: React.FormEvent) {
    e.preventDefault();

    const nova: Music = {
      id: Date.now(),
      nome: novaMusica.nome,
      cantor: novaMusica.cantor,
      link: novaMusica.link,
    };

    setMusicas([...musicas, nova]);

    setNovaMusica({
      nome: "",
      cantor: "",
      link: "",
    });

    setShowMusicModal(false);
  }

  function handleAddEvent(e: React.FormEvent) {
    e.preventDefault();

    if (editingEventId) {
      setEventos(
        eventos.map((evento) =>
          evento.id === editingEventId
            ? {
                ...evento,
                nome: novoEvento.nome,
                organizador: novoEvento.organizador,
                data: novoEvento.data,
              }
            : evento
        )
      );

      setEditingEventId(null);
    } else {
      const evento: Event = {
        id: Date.now(),
        nome: novoEvento.nome,
        organizador: novoEvento.organizador,
        data: novoEvento.data,
      };

      setEventos([...eventos, evento]);
    }

    setNovoEvento({
      nome: "",
      organizador: "",
      data: "",
    });

    setShowEventModal(false);
  }

  function handleDeleteEvent(id: number) {
    setEventos(eventos.filter((evento) => evento.id !== id));
  }

  function handleEditEvent(evento: Event) {
    setNovoEvento({
      nome: evento.nome,
      organizador: evento.organizador,
      data: evento.data,
    });

    setEditingEventId(evento.id);

    setShowEventModal(true);
  }

  function getYoutubeThumbnail(link: string) {
    const videoId = link.split("v=")[1];

    if (!videoId) {
      return "https://placehold.co/300x180";
    }

    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  }

  return (
    <div className="dashboard-layout">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div>
          <div className="sidebar-top">
            <h1 className="logo">SONORA</h1>
          </div>

          <nav className="sidebar-menu">
            <button
              className={activeTab === "eventos" ? "active" : ""}
              onClick={() => setActiveTab("eventos")}
            >
              Eventos
            </button>

            <button
              className={activeTab === "musicas" ? "active" : ""}
              onClick={() => setActiveTab("musicas")}
            >
              Músicas
            </button>

            <button
              className={activeTab === "fundo" ? "active" : ""}
              onClick={() => setActiveTab("fundo")}
            >
              Música de Fundo
            </button>

            <button
              className={activeTab === "reacoes" ? "active" : ""}
              onClick={() => setActiveTab("reacoes")}
            >
              Reações
            </button>

            <button
              className={activeTab === "pastas" ? "active" : ""}
              onClick={() => setActiveTab("pastas")}
            >
              Pastas
            </button>
          </nav>
        </div>

        <div className="profile-area">
          <div
            className="profile-avatar"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {userEmail.charAt(0).toUpperCase()}
          </div>

          {menuOpen && (
            <div className="profile-dropdown">
              <p>{userEmail}</p>

              <button
                className="logout-dropdown-btn"
                onClick={() => {
                  localStorage.removeItem("userEmail");
                  setScreen("login");
                }}
              >
                Sair
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* CONTEÚDO */}
      <main className="dashboard-content">
        {/* EVENTOS */}
        {activeTab === "eventos" && (
          <>
            <div className="dashboard-header">
              <div>
                <h2>Eventos</h2>
                <p>Gerencie os eventos da cerimônia</p>
              </div>

              <button
                className="primary-btn"
                onClick={() => {
                  setEditingEventId(null);

                  setNovoEvento({
                    nome: "",
                    organizador: "",
                    data: "",
                  });

                  setShowEventModal(true);
                }}
              >
                + Novo Evento
              </button>
            </div>

            <div className="music-grid">
              {eventos.map((evento) => (
                <div key={evento.id} className="music-card">
                  <div className="music-info">
                    <h3>{evento.nome}</h3>

                    <p>Organizador: {evento.organizador}</p>

                    <p>
                      Data:{" "}
                      {new Date(evento.data).toLocaleDateString(
                        "pt-BR"
                      )}
                    </p>

                    <div className="music-actions">
                      <button
                        className="secondary-btn"
                        onClick={() => handleEditEvent(evento)}
                      >
                        Editar
                      </button>

                      <button
                        className="logout-dropdown-btn"
                        onClick={() =>
                          handleDeleteEvent(evento.id)
                        }
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* MÚSICAS */}
        {activeTab === "musicas" && (
          <>
            <div className="dashboard-header">
              <div>
                <h2>Músicas</h2>
                <p>Gerencie as músicas do evento</p>
              </div>

              <button
                className="primary-btn"
                onClick={() => setShowMusicModal(true)}
              >
                + Adicionar Música
              </button>
            </div>

            <div className="music-grid">
              {musicas.map((musica) => (
                <div key={musica.id} className="music-card">
                  <img
                    src={getYoutubeThumbnail(musica.link)}
                    alt={musica.nome}
                  />

                  <div className="music-info">
                    <h3>{musica.nome}</h3>

                    <p>{musica.cantor}</p>

                    <div className="music-actions">
                      <a
                        href={musica.link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <button className="play-btn">
                          ▶ Play
                        </button>
                      </a>

                      <button className="secondary-btn">
                        ❤️ Favoritar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* FUNDO */}
        {activeTab === "fundo" && (
          <div className="empty-tab">
            <h2>Músicas de Fundo</h2>

            <p>
              Aqui ficarão as músicas ambientes da
              cerimônia.
            </p>
          </div>
        )}

        {/* REAÇÕES */}
        {activeTab === "reacoes" && (
          <div className="empty-tab">
            <h2>Reações</h2>

            <p>
              Aqui ficarão músicas interativas e reações
              do público.
            </p>
          </div>
        )}

        {/* PASTAS */}
        {activeTab === "pastas" && (
          <div className="empty-tab">
            <h2>Pastas</h2>

            <p>
              Organize músicas por categorias e momentos
              do evento.
            </p>
          </div>
        )}
      </main>

      {/* MODAL MÚSICA */}
      {showMusicModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowMusicModal(false)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Adicionar Música</h2>

            <form onSubmit={handleAddMusic}>
              <div className="form-group">
                <label>Nome da Música</label>

                <input
                  type="text"
                  required
                  value={novaMusica.nome}
                  onChange={(e) =>
                    setNovaMusica({
                      ...novaMusica,
                      nome: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>Cantor</label>

                <input
                  type="text"
                  required
                  value={novaMusica.cantor}
                  onChange={(e) =>
                    setNovaMusica({
                      ...novaMusica,
                      cantor: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>Link do YouTube</label>

                <input
                  type="text"
                  required
                  value={novaMusica.link}
                  onChange={(e) =>
                    setNovaMusica({
                      ...novaMusica,
                      link: e.target.value,
                    })
                  }
                />
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={() =>
                    setShowMusicModal(false)
                  }
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="primary-btn"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL EVENTO */}
      {showEventModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowEventModal(false)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>
              {editingEventId
                ? "Editar Evento"
                : "Criar Evento"}
            </h2>

            <form onSubmit={handleAddEvent}>
              <div className="form-group">
                <label>Nome do Evento</label>

                <input
                  type="text"
                  required
                  value={novoEvento.nome}
                  onChange={(e) =>
                    setNovoEvento({
                      ...novoEvento,
                      nome: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>Organizador</label>

                <input
                  type="text"
                  required
                  value={novoEvento.organizador}
                  onChange={(e) =>
                    setNovoEvento({
                      ...novoEvento,
                      organizador: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>Data do Evento</label>

                <input
                  type="date"
                  required
                  value={novoEvento.data}
                  onChange={(e) =>
                    setNovoEvento({
                      ...novoEvento,
                      data: e.target.value,
                    })
                  }
                />
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={() =>
                    setShowEventModal(false)
                  }
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="primary-btn"
                >
                  {editingEventId
                    ? "Salvar"
                    : "Criar Evento"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;