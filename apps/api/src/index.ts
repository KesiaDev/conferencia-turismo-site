import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

import metaRouter from "./routes/meta.js";
import speakersRouter from "./routes/speakers.js";
import programRouter from "./routes/program.js";
import feesRouter from "./routes/fees.js";
import submissionsRouter from "./routes/submissions.js";
import panelsRouter from "./routes/panels.js";
import contactRouter from "./routes/contact.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: [
      "https://turismocinematografico.com.br",
      "https://www.turismocinematografico.com.br",
      "http://localhost:5173",
      "http://localhost:3000",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use("/api/", limiter);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Routes
app.use("/api/meta", metaRouter);
app.use("/api/speakers", speakersRouter);
app.use("/api/program", programRouter);
app.use("/api/fees", feesRouter);
app.use("/api/submissions", submissionsRouter);
app.use("/api/panels", panelsRouter);
app.use("/api/contact", contactRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

// Error handler
app.use((err: Error, req: express.Request, res: express.Response) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

app.listen(PORT, () => {
  console.log(`🚀 API Server running on http://localhost:${PORT}`);
  console.log(`📡 Environment: ${process.env.NODE_ENV || "development"}`);
});
