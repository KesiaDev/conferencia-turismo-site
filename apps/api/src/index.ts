import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { existsSync } from "fs";

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
import authorizationRouter from "./routes/authorization.js";
import liveStreamsRouter from "./routes/liveStreams.js";
import photosRouter from "./routes/photos.js";

dotenv.config();

if (!process.env.DATABASE_URL) {
  console.warn(
    "⚠️ DATABASE_URL não está definida. A API de autorizações (Prisma) e migrate no start vão falhar até configurar o Postgres no Railway."
  );
}

const app = express();
const PORT = process.env.PORT || 3001;

// Trust proxy (Railway/reverse proxy) - required for express-rate-limit and X-Forwarded-For
app.set("trust proxy", 1);

// Force HTTPS in production (Railway edge terminates SSL)
if (process.env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    // Check if request came through HTTPS at Railway edge
    const isSecure =
      req.secure ||
      req.headers["x-forwarded-proto"] === "https" ||
      req.headers["x-forwarded-proto"] === "https,http"; // Railway can send multiple

    // Redirect HTTP to HTTPS for custom domains
    if (!isSecure && req.hostname !== "localhost" && !req.hostname.includes("railway.app")) {
      return res.redirect(301, `https://${req.hostname}${req.url}`);
    }

    // Set security headers
    res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
    next();
  });
}

// Middleware
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        connectSrc: ["'self'", "*"], // Permitir todas as conexões para requisições AJAX
        imgSrc: ["'self'", "data:", "https:", "blob:"],
        fontSrc: ["'self'", "https://fonts.gstatic.com", "data:"],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'"],
        frameSrc: [
          "'self'",
          "https://www.google.com",
          "https://maps.google.com",
          "https://www.youtube.com",
          "https://www.youtube-nocookie.com",
        ],
        upgradeInsecureRequests: process.env.NODE_ENV === "production" ? [] : null,
      },
    },
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
  })
);
// CORS configuration - aceita ambos www e não-www
const corsOrigin = process.env.CORS_ORIGIN;
const allowedOrigins = corsOrigin
  ? corsOrigin.split(",").map((origin) => origin.trim())
  : [
      "https://turismocinematografico.com.br",
      "https://www.turismocinematografico.com.br",
      "http://localhost:5173",
      "http://localhost:3000",
    ];

app.use(
  cors({
    origin: (origin, callback) => {
      // Permitir requisições sem origin (mobile apps, Postman, etc.)
      if (!origin) return callback(null, true);

      // Verificar se a origin está na lista permitida
      if (allowedOrigins.includes(origin) || allowedOrigins.includes("*")) {
        callback(null, true);
      } else {
        callback(null, true); // Por enquanto, permitir todas para evitar bloqueios
      }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "X-Admin-Password"],
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
app.use("/api/authorization", authorizationRouter);
app.use("/api/live-streams", liveStreamsRouter);
app.use("/api/photos", photosRouter);

// Caminho do frontend após build
// Tenta primeiro o caminho copiado durante o build (web/dist dentro de dist/)
// Se não existir, tenta o caminho relativo (../../web/dist)
let frontendPath = path.resolve(__dirname, "web/dist");
if (!existsSync(frontendPath)) {
  frontendPath = path.resolve(__dirname, "../../web/dist");
}
console.log("📁 Servindo frontend de:", frontendPath);
console.log("🔍 Current working directory:", process.cwd());
console.log("🔍 __dirname:", __dirname);

// Serve static files from frontend (after API routes)
app.use(
  express.static(frontendPath, {
    // Configurações de cache para evitar problemas de atualização
    maxAge: 0, // Sem cache para arquivos estáticos
    etag: false, // Desabilitar ETag
    lastModified: false, // Desabilitar Last-Modified
    setHeaders: (res) => {
      // Headers específicos para forçar atualização
      res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
      res.setHeader("Pragma", "no-cache");
      res.setHeader("Expires", "0");
    },
  })
);

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

  // Headers para evitar cache do index.html
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");

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
  console.log(`   - GET /api/submissions`);
  console.log(`   - POST /api/submissions`);
  console.log(`   - POST /api/panels`);
  console.log(`   - POST /api/contact`);
  console.log(`   - POST /api/authorization`);
  console.log(`   - GET /api/authorization/admin`);
  console.log(`   - GET /api/live-streams`);
  console.log(`   - POST /api/live-streams/admin`);
  console.log(`   - POST /api/photos/upload`);
  console.log(`   - GET /api/photos`);
  console.log(`   - PATCH /api/photos/admin/:id`);
});
