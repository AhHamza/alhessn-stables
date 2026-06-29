const express = require("express");
const router = new express.Router();
const Booking = require("../models/booking");
const auth = require("../middleware/auth");

// PUBLIC: get taken slots for a specific date
router.get("/bookings/taken-slots", async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) return res.status(400).send({ error: "Date is required" });

    const bookings = await Booking.find({
      date: {
        $gte: new Date(new Date(date).setHours(0, 0, 0, 0)),
        $lte: new Date(new Date(date).setHours(23, 59, 59, 999)),
      },
      status: { $ne: "cancelled" },
    });

    const takenSlots = bookings.map((b) => b.timeSlot);
    res.send({ takenSlots });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

// PUBLIC: Create a booking (visitor submits)
router.post("/bookings", async (req, res) => {
  try {
    const existing = await Booking.findOne({
      date: new Date(req.body.date).toDateString(),
      timeSlot: req.body.timeSlot,
      status: { $ne: "cancelled" },
    });
    if (existing) {
      return res
        .status(400)
        .send({ error: "This time slot is already booked." });
    }
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).send(booking);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

// ADMIN: Get all bookings
router.get("/bookings", auth, async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const bookings = await Booking.find(filter)
      .populate("horse", "name breed")
      .sort({ date: 1 });
    res.send(bookings);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

//admin: single booking

// ADMIN: Get single booking
router.get("/bookings/:id", auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate(
      "horse",
      "name breed",
    );
    if (!booking) return res.status(404).send({ error: "Booking not found" });
    res.send(booking);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

// ADMIN: Update booking status (confirm / cancel)
router.patch("/bookings/:id", auth, async (req, res) => {
  const allowedUpdates = ["status", "notes", "date", "timeSlot"];
  const updates = Object.keys(req.body);
  const isAllowed = updates.every((update) => allowedUpdates.includes(update));
  if (!isAllowed)
    return res.status(400).send({ error: "invalid update fields" });
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!booking) {
      return res.status(404).send({ error: "booking not found" });
    }
    res.send(booking);
  } catch (e) {
    res.status(400).send({ error: e.message }); //status 400 since it's the user's fault in the input
  }
});

// ADMIN: Delete booking
router.delete("/bookings/:id", async (req, res) => {
  try {
    const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
    if (!deletedBooking) res.status(404).send({ error: "booking not found" });
    res.send(deletedBooking);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

module.exports = router;
