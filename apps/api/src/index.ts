import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
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

// Health check (before static files to ensure it's always available)
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Test endpoint
app.get("/test", (req, res) => {
  res.json({ message: "API funcionando!", timestamp: new Date().toISOString() });
});

// Test endpoint - serve HTML diretamente
app.get("/html", (req, res) => {
  const indexPath = path.join(frontendPath, "index.html");
  console.log("🔍 Serving HTML directly from:", indexPath);
  res.sendFile(indexPath);
});

// Debug endpoint - verificar se frontend existe
app.get("/debug", (req, res) => {
  const indexPath = path.join(frontendPath, "index.html");
  const frontendExists = fs.existsSync(frontendPath);
  const indexExists = fs.existsSync(indexPath);

  res.json({
    frontendPath,
    currentDir: process.cwd(),
    __dirname,
    frontendExists,
    indexExists,
    indexPath,
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

// Caminho do frontend correto após build (apps/api/dist/ -> apps/web/dist/)
const frontendPath = path.resolve(__dirname, "../../web/dist");
console.log("📁 Servindo frontend de:", frontendPath);
console.log("🔍 Current working directory:", process.cwd());
console.log("🔍 __dirname:", __dirname);

// Serve static files from frontend (after API routes)
app.use(express.static(frontendPath));

// SPA fallback - serve index.html for all non-API routes (MUST be last)
app.get("*", (req, res) => {
  console.log("🔍 SPA Fallback - Request path:", req.path);

  // Skip API routes
  if (req.path.startsWith("/api/")) {
    console.log("🔍 Skipping API route:", req.path);
    return res.status(404).json({ error: "API route not found" });
  }

  const indexPath = path.join(frontendPath, "index.html");
  console.log("🔍 Serving index.html from:", indexPath);

  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error("❌ Error serving index.html:", err);
      console.error("❌ Error details:", err.message);
      res.status(404).json({ error: "Frontend not found", details: err.message });
    } else {
      console.log("✅ Successfully served index.html");
    }
  });
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
