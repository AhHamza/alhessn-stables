import { useState } from "react";
import api from "../api/axios";

const timeSlots = ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM", "5:00 PM"];

export default function BookTraining() {
  const [takenSlots, setTakenSlots] = useState([]);
  const [form, setForm] = useState({
    visitorName: "",
    visitorEmail: "",
    visitorPhone: "",
    date: "",
    timeSlot: "",
    purpose: "training",
    notes: "",
  });
  const [status, setStatus] = useState(null);
  const fetchTakenSlots = async (date) => {
    if (!date) return;
    try {
      const res = await api.get(`/bookings/taken-slots?date=${date}`);
      setTakenSlots(res.data.takenSlots);
    } catch {}
  };
  const handle = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name === "date") fetchTakenSlots(e.target.value);
  };

  const submit = async () => {
    if (
      !form.visitorName ||
      !form.visitorEmail ||
      !form.date ||
      !form.timeSlot
    ) {
      setStatus("error");
      return;
    }
    try {
      await api.post("/bookings", form);
      setStatus("success");
      setForm({
        visitorName: "",
        visitorEmail: "",
        visitorPhone: "",
        date: "",
        timeSlot: "",
        purpose: "training",
        notes: "",
      });
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-24">
      <div className="text-center mb-12">
        <p className="text-xs tracking-[0.4em] text-gold uppercase mb-3">
          Al Hessn Stables
        </p>
        <h1 className="font-serif text-4xl text-cream">Book a Training Day</h1>
        <div className="w-16 h-px bg-gold mx-auto mt-4" />
        <p className="text-gray-400 mt-4">
          Reserve your session with our expert trainers.
        </p>
      </div>

      <div className="bg-dark-card border border-dark-border p-8 flex flex-col gap-5">
        <input
          name="visitorName"
          value={form.visitorName}
          onChange={handle}
          placeholder="Full Name *"
          className="w-full bg-dark border border-dark-border text-cream px-4 py-3 focus:outline-none focus:border-gold transition-colors placeholder-gray-600"
        />
        <input
          name="visitorEmail"
          type="email"
          value={form.visitorEmail}
          onChange={handle}
          placeholder="Email Address *"
          className="w-full bg-dark border border-dark-border text-cream px-4 py-3 focus:outline-none focus:border-gold transition-colors placeholder-gray-600"
        />
        <input
          name="visitorPhone"
          value={form.visitorPhone}
          onChange={handle}
          placeholder="Phone Number"
          className="w-full bg-dark border border-dark-border text-cream px-4 py-3 focus:outline-none focus:border-gold transition-colors placeholder-gray-600"
        />
        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handle}
          className="w-full bg-dark border border-dark-border text-cream px-4 py-3 focus:outline-none focus:border-gold transition-colors"
        />
        <select
          name="timeSlot"
          value={form.timeSlot}
          onChange={handle}
          className="w-full bg-dark border border-dark-border text-cream px-4 py-3 focus:outline-none focus:border-gold transition-colors"
        >
          <option value="">Select Time Slot *</option>
          {timeSlots.map((t) => (
            <option key={t} value={t} disabled={takenSlots.includes(t)}>
              {takenSlots.includes(t) ? `${t} — Booked` : t}
            </option>
          ))}
        </select>
        <select
          name="purpose"
          value={form.purpose}
          onChange={handle}
          className="w-full bg-dark border border-dark-border text-cream px-4 py-3 focus:outline-none focus:border-gold transition-colors"
        >
          <option value="training">Training Session</option>
          <option value="viewing">Horse Viewing</option>
          <option value="trial_ride">Trial Ride</option>
          <option value="other">Other</option>
        </select>
        <textarea
          name="notes"
          value={form.notes}
          onChange={handle}
          placeholder="Additional notes..."
          rows={4}
          className="w-full bg-dark border border-dark-border text-cream px-4 py-3 focus:outline-none focus:border-gold transition-colors placeholder-gray-600 resize-none"
        />

        {status === "success" && (
          <p className="text-green-400 text-sm">
            ✓ Booking submitted! We'll confirm within 24 hours.
          </p>
        )}
        {status === "error" && (
          <p className="text-red-400 text-sm">
            Please fill in all required fields.
          </p>
        )}

        <button
          onClick={submit}
          className="bg-gold text-dark font-semibold px-8 py-3 tracking-widest uppercase text-sm hover:bg-gold-light transition-colors mt-2"
        >
          Submit Booking
        </button>
      </div>
    </div>
  );
}
