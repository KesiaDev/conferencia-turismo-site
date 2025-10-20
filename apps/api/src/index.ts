import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";

// ES Module compatibility - __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        connectSrc: ["'self'", "*"], // Permitir todas as conexões para requisições AJAX
        imgSrc: ["'self'", "data:", "https:"],
        fontSrc: ["'self'"],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'"],
        frameSrc: ["'none'"],
      },
    },
  })
);
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    credentials: false,
  })
);
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use("/api/", limiter);

// Health check (before static files to ensure it's always available)
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Test endpoint
app.get("/test", (req, res) => {
  res.json({ message: "API funcionando!", timestamp: new Date().toISOString() });
});

// Debug endpoint - API only mode
app.get("/debug", (req, res) => {
  res.json({
    mode: "API_ONLY",
    currentDir: process.cwd(),
    __dirname,
    timestamp: new Date().toISOString(),
  });
});

// API Routes (must come BEFORE static files and fallback)
app.use("/api/meta", metaRouter);
app.use("/api/speakers", speakersRouter);
app.use("/api/program", programRouter);
app.use("/api/fees", feesRouter);
app.use("/api/submissions", submissionsRouter);
app.use("/api/panels", panelsRouter);
app.use("/api/contact", contactRouter);

// API ONLY - No frontend serving
console.log("🔧 API MODE - Serving only JSON endpoints");
console.log("🔍 Current working directory:", process.cwd());
console.log("🔍 __dirname:", __dirname);

// API routes only - no frontend serving
app.get("*", (req, res) => {
  console.log("🔍 API route requested:", req.path);

  if (req.path.startsWith("/api/")) {
    return res.status(404).json({ error: "API route not found" });
  }

  return res.status(404).json({ error: "API endpoint not found" });
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
