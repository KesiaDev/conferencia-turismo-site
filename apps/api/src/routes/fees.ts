import { Router } from "express";
import { fees } from "../db/data.js";

const router = Router();

router.get("/", (req, res) => {
  res.json(fees);
});

export default router;

