import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

export default function AdminHorses() {
  const [horses, setHorses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHorses();
  }, []);

  const fetchHorses = () => {
    api
      .get("/horses")
      .then((res) => setHorses(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const deleteHorse = async (id) => {
    if (!window.confirm("Are you sure you want to delete this horse?")) return;
    try {
      await api.delete(`/horses/${id}`);
      setHorses(horses.filter((h) => h._id !== id));
    } catch {
      alert("Failed to delete.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-12">
        <div>
          <p className="text-xs tracking-[0.4em] text-gold uppercase mb-1">
            Admin Panel
          </p>
          <h1 className="font-serif text-4xl text-cream">Manage Horses</h1>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/admin/horses/new")}
            className="bg-gold text-dark font-semibold px-5 py-2 text-xs tracking-widest uppercase hover:bg-gold-light transition-colors"
          >
            + Add Horse
          </button>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <p className="text-gray-500 text-center py-24">Loading...</p>
      ) : horses.length === 0 ? (
        <p className="text-gray-500 text-center py-24">No horses yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {horses.map((horse) => (
            <div
              key={horse._id}
              className="bg-dark-card border border-dark-border p-6 flex items-center justify-between hover:border-gold transition-colors"
            >
              <div className="flex items-center gap-6">
                {/* Thumbnail */}
                <div className="w-16 h-16 bg-dark-border overflow-hidden flex-shrink-0">
                  {horse.images?.[0] ? (
                    <img
                      src={horse.images[0]}
                      alt={horse.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl">
                      🐴
                    </div>
                  )}
                </div>
                {/* Info */}
                <div>
                  <p className="text-cream font-serif text-lg">{horse.name}</p>
                  <p className="text-gold text-xs tracking-wider mt-1">
                    {horse.breed} — {horse.age} years old
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => navigate(`/admin/horses/${horse._id}/edit`)}
                  className="border border-dark-border text-gray-400 px-4 py-2 text-xs tracking-widest uppercase hover:border-gold hover:text-gold transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteHorse(horse._id)}
                  className="border border-red-900 text-red-500 px-4 py-2 text-xs tracking-widest uppercase hover:bg-red-900/20 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
