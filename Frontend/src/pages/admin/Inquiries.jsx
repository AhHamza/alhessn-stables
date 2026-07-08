import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/inquiries")
      .then((res) => setInquiries(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/inquiries/${id}`, { status });
      setInquiries(inquiries.map((i) => (i._id === id ? { ...i, status } : i)));
    } catch {
      alert("Failed to update.");
    }
  };

  const deleteInquiry = async (id) => {
    if (!window.confirm("Delete this inquiry?")) return;
    try {
      await api.delete(`/inquiries/${id}`);
      setInquiries(inquiries.filter((i) => i._id !== id));
    } catch {
      alert("Failed to delete.");
    }
  };

  const filtered =
    filter === "all" ? inquiries : inquiries.filter((i) => i.status === filter);

  const statusColor = (status) => {
    if (status === "replied") return "text-green-400";
    if (status === "closed") return "text-gray-500";
    if (status === "read") return "text-blue-400";
    return "text-yellow-400";
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-24">
      <div className="flex items-center justify-between mb-12">
        <div>
          <p className="text-xs tracking-[0.4em] text-gold uppercase mb-1">
            Admin Panel
          </p>
          <h1 className="font-serif text-4xl text-cream">Inquiries</h1>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-3 mb-8">
        {["all", "new", "read", "replied", "closed"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 text-xs tracking-widest uppercase transition-colors ${filter === f ? "bg-gold text-dark" : "border border-dark-border text-gray-400 hover:border-gold hover:text-gold"}`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* List */}
      {loading ? (
        <p className="text-gray-500 text-center py-24">Loading...</p>
      ) : filtered.length === 0 ? (
        <p className="text-gray-500 text-center py-24">No inquiries found.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {filtered.map((inquiry) => (
            <div
              key={inquiry._id}
              className="bg-dark-card border border-dark-border p-6 hover:border-gold transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                {/* Info */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-3">
                    <p className="text-cream font-serif text-lg">
                      {inquiry.senderName}
                    </p>
                    <span
                      className={`text-xs tracking-widest uppercase px-2 py-0.5 border ${inquiry.type === "purchase" ? "border-gold text-gold" : "border-gray-600 text-gray-500"}`}
                    >
                      {inquiry.type}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">
                    {inquiry.senderEmail} · {inquiry.senderPhone}
                  </p>
                  {inquiry.horse && (
                    <p className="text-gold text-xs tracking-wider mt-1">
                      Horse: {inquiry.horse.name} — {inquiry.horse.breed}
                    </p>
                  )}
                  <p className="text-gray-300 text-sm mt-3 leading-relaxed">
                    {inquiry.message}
                  </p>
                  <p className="text-gray-600 text-xs mt-2">
                    {new Date(inquiry.createdAt).toLocaleDateString()}
                  </p>
                </div>

                {/* Status + Actions */}
                <div className="flex flex-col items-end gap-3 flex-shrink-0">
                  <p
                    className={`text-xs tracking-widest uppercase font-semibold ${statusColor(inquiry.status)}`}
                  >
                    {inquiry.status}
                  </p>
                  <div className="flex flex-col gap-2">
                    {inquiry.status === "new" && (
                      <button
                        onClick={() => updateStatus(inquiry._id, "read")}
                        className="border border-blue-800 text-blue-400 px-3 py-1 text-xs tracking-widest uppercase hover:bg-blue-900/20 transition-colors"
                      >
                        Mark Read
                      </button>
                    )}
                    {inquiry.status !== "replied" &&
                      inquiry.status !== "closed" && (
                        <button
                          onClick={() => updateStatus(inquiry._id, "replied")}
                          className="border border-green-800 text-green-400 px-3 py-1 text-xs tracking-widest uppercase hover:bg-green-900/20 transition-colors"
                        >
                          Mark Replied
                        </button>
                      )}
                    {inquiry.status !== "closed" && (
                      <button
                        onClick={() => updateStatus(inquiry._id, "closed")}
                        className="border border-gray-700 text-gray-500 px-3 py-1 text-xs tracking-widest uppercase hover:bg-gray-800 transition-colors"
                      >
                        Close
                      </button>
                    )}
                    <button
                      onClick={() => deleteInquiry(inquiry._id)}
                      className="border border-red-900 text-red-500 px-3 py-1 text-xs tracking-widest uppercase hover:bg-red-900/20 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
