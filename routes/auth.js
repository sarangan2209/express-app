// routes/auth.js
import express from "express";
import crypto from "crypto";
const router = express.Router();

// POST /login
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Dummy auth logic
  if (username === "admin" && password === "password") {
    const token = crypto.randomBytes(32).toString("hex");
    return res.json({ token });
  }

  res.status(401).json({ error: "Invalid credentials" });
});

// GET /status
router.get("/status", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

export default router;
