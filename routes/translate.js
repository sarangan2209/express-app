// routes/translate.js
import express from "express";
const router = express.Router();

router.post("/translate", (req, res) => {
  const { text, language } = req.body;
  res.json({
    translation: `Translated '${text}' to ${language}`,
  });
});

export default router;
