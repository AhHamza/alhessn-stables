import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    api
      .get("/bookings")
      .then((res) => setBookings(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/bookings/${id}`, { status });
      setBookings(bookings.map((b) => (b._id === id ? { ...b, status } : b)));
    } catch {
      alert("Failed to update.");
    }
  };

  const deleteBooking = async (id) => {
    if (!window.confirm("Delete this booking?")) return;
    try {
      await api.delete(`/bookings/${id}`);
      setBookings(bookings.filter((b) => b._id !== id));
    } catch {
      alert("Failed to delete.");
    }
  };

  const filtered =
    filter === "all" ? bookings : bookings.filter((b) => b.status === filter);

  const statusColor = (status) => {
    if (status === "confirmed") return "text-green-400";
    if (status === "cancelled") return "text-red-400";
    return "text-yellow-400";
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-12">
        <div>
          <p className="text-xs tracking-[0.4em] text-gold uppercase mb-1">
            Admin Panel
          </p>
          <h1 className="font-serif text-4xl text-cream">Bookings</h1>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-3 mb-8">
        {["all", "pending", "confirmed", "cancelled"].map((f) => (
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
        <p className="text-gray-500 text-center py-24">No bookings found.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {filtered.map((booking) => (
            <div
              key={booking._id}
              className="bg-dark-card border border-dark-border p-6 hover:border-gold transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                {/* Info */}
                <div className="flex flex-col gap-1">
                  <p className="text-cream font-serif text-lg">
                    {booking.visitorName}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {booking.visitorEmail} · {booking.visitorPhone}
                  </p>
                  <p className="text-gold text-xs tracking-wider mt-1">
                    {new Date(booking.date).toLocaleDateString()} ·{" "}
                    {booking.timeSlot}
                  </p>
                  <p className="text-gray-500 text-xs mt-1 uppercase tracking-wider">
                    {booking.purpose}
                  </p>
                  {booking.notes && (
                    <p className="text-gray-400 text-sm mt-2 italic">
                      "{booking.notes}"
                    </p>
                  )}
                </div>

                {/* Status + Actions */}
                <div className="flex flex-col items-end gap-3 flex-shrink-0">
                  <p
                    className={`text-xs tracking-widest uppercase font-semibold ${statusColor(booking.status)}`}
                  >
                    {booking.status}
                  </p>
                  <div className="flex gap-2">
                    {booking.status !== "confirmed" && (
                      <button
                        onClick={() => updateStatus(booking._id, "confirmed")}
                        className="border border-green-800 text-green-400 px-3 py-1 text-xs tracking-widest uppercase hover:bg-green-900/20 transition-colors"
                      >
                        Confirm
                      </button>
                    )}
                    {booking.status !== "cancelled" && (
                      <button
                        onClick={() => updateStatus(booking._id, "cancelled")}
                        className="border border-yellow-800 text-yellow-400 px-3 py-1 text-xs tracking-widest uppercase hover:bg-yellow-900/20 transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      onClick={() => deleteBooking(booking._id)}
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
