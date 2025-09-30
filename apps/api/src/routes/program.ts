import { Router } from "express";
import { program } from "../db/data.js";

const router = Router();

router.get("/", (req, res) => {
  res.json(program);
});

export default router;

