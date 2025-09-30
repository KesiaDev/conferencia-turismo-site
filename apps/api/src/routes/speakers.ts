import { Router } from "express";
import { speakers } from "../db/data.js";

const router = Router();

router.get("/", (req, res) => {
  res.json(speakers);
});

router.get("/:id", (req, res) => {
  const speaker = speakers.find((s) => s.id === req.params.id);
  if (!speaker) {
    return res.status(404).json({ error: "Speaker not found" });
  }
  res.json(speaker);
});

export default router;

