const express = require("express");
const horseRouter = new express.Router();
const Horse = require("../models/horse");
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");

horseRouter.post(
  "/horses/upload",
  auth,
  upload.array("images", 10),
  async (req, res) => {
    try {
      const urls = req.files.map(
        (f) => `http://localhost:3000/uploads/${f.filename}`,
      );
      res.send({ urls });
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  },
);

horseRouter.post("/horses", auth, async (req, res) => {
  try {
    const horseData = new Horse(req.body);
    await horseData.save();
    console.log(req.user);
    res.status(200).send(horseData);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

horseRouter.get("/horses", async (req, res) => {
  try {
    const horses = await Horse.find();
    res.status(200).send(horses);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

horseRouter.get("/horses/:id", async (req, res) => {
  try {
    const oneHorse = await Horse.findById(req.params.id);
    if (!oneHorse) {
      return res.status(404).send({ error: "horse not found" });
    }
    res.status(200).send(oneHorse);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

horseRouter.delete("/horses/:id", auth, async (req, res) => {
  try {
    const deletedHorse = await Horse.findByIdAndDelete(req.params.id);
    if (!deletedHorse) {
      return res.status(404).send({ error: "horse not found" });
    }
    res.status(200).send(deletedHorse);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

horseRouter.patch("/horses/:id", auth, async (req, res) => {
  try {
    const updates = ["name", "age", "breed", "description", "images"];
    const updateKeys = Object.keys(req.body);
    const inUpdates = updateKeys.every((element) => updates.includes(element));
    if (!inUpdates) {
      return res.status(400).send({ error: "invalid attribute" });
    }
    const updatedHorse = await Horse.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );
    if (!updatedHorse) {
      return res.status(404).send({ error: "horse not found" });
    }
    res.status(200).send(updatedHorse);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = horseRouter;
