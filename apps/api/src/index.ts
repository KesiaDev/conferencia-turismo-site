import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import path from "path";

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
console.log("🔍 DEBUG - PORT:", PORT);
console.log("🔍 DEBUG - process.env.PORT:", process.env.PORT);

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

// Serve static files from frontend
const frontendPath = path.join(process.cwd(), "..", "web", "dist");
app.use(express.static(frontendPath));

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Test endpoint
app.get("/test", (req, res) => {
  res.json({ message: "API funcionando!", timestamp: new Date().toISOString() });
});

// Routes
app.use("/api/meta", metaRouter);
app.use("/api/speakers", speakersRouter);
app.use("/api/program", programRouter);
app.use("/api/fees", feesRouter);
app.use("/api/submissions", submissionsRouter);
app.use("/api/panels", panelsRouter);
app.use("/api/contact", contactRouter);

// Serve React app for all non-API routes (SPA fallback)
app.get("*", (req, res) => {
  // Skip API routes
  if (req.path.startsWith("/api/")) {
    return res.status(404).json({ error: "API route not found" });
  }

  // Serve React app
  const indexPath = path.join(process.cwd(), "..", "web", "dist", "index.html");
  res.sendFile(indexPath);
});

// Error handler
app.use((err: Error, req: express.Request, res: express.Response) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

app.listen(Number(PORT), "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`🔧 API Routes configured:`);
  console.log(`   - GET /health`);
  console.log(`   - GET /test`);
  console.log(`   - POST /api/submissions`);
  console.log(`   - POST /api/panels`);
  console.log(`   - POST /api/contact`);
});
