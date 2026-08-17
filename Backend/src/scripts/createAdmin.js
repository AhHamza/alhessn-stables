
const path = require("path");
const dns = require("node:dns");
const bcrypt = require("bcrypt"); // or "bcrypt" if that is what your app uses
const mongoose = require("mongoose");
const User = require("../models/user"); // adjust if your model lives elsewhere

require("dotenv").config({
  path: path.resolve(__dirname, "../../config/.env"),
});


dns.setServers(["1.1.1.1", "1.0.0.1"]);

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);

    const email = process.env.INITIAL_ADMIN_EMAIL;
    const password = process.env.INITIAL_ADMIN_PASSWORD;
    const name = process.env.INITIAL_ADMIN_NAME;

 if (!name || !email || !password) {
  throw new Error("Add INITIAL_ADMIN_NAME, INITIAL_ADMIN_EMAIL, and INITIAL_ADMIN_PASSWORD to config/.env temporarily.");
}

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("An account with this email already exists.");
      return;
    }

    // const passwordHash = await bcrypt.hash(password, 12);

    await User.create({
  name,
  email,
  password: "Hamza_123",
  role: "admin",
});
    console.log("Admin created successfully.");
  } catch (error) {
    console.error("Could not create admin:", error.message);
  } finally {
    await mongoose.disconnect();
  }
}

createAdmin();