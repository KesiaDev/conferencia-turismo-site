import { Router } from "express";
import { meta, callForPapers, committees } from "../db/data.js";

const router = Router();

router.get("/", (req, res) => {
  res.json(meta);
});

router.get("/call", (req, res) => {
  res.json(callForPapers);
});

router.get("/committees", (req, res) => {
  res.json(committees);
});

export default router;
