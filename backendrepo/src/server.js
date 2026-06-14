require("dotenv").config();

const path = require("path");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { query } = require("./db");
const { parseSubmission } = require("./validation");
const {
  isOpsConfigured,
  verifyOpsPassword,
  createSessionToken,
  isOpsAuthenticated,
  setOpsSessionCookie,
  clearOpsSessionCookie,
} = require("./opsAuth");

const app = express();
const port = process.env.PORT || 5000;

const allowedOrigins = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (!allowedOrigins.length || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Origin not allowed by CORS"));
    },
  }),
);
app.use(
  helmet({
    contentSecurityPolicy: false,
  }),
);
app.use(express.json({ limit: "1mb" }));
app.use(morgan("tiny"));

app.get("/health", async (_req, res) => {
  try {
    await query("SELECT 1");
    return res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(500).json({ ok: false, error: "db_unreachable" });
  }
});

app.post("/api/submissions", async (req, res) => {
  try {
    const parsed = parseSubmission(req.body);

    const insertResult = await query(
      `INSERT INTO intake_submissions (name, email, company, project_scope)
       VALUES ($1, $2, $3, $4)
       RETURNING id, created_at`,
      [parsed.name, parsed.email, parsed.company, parsed.projectScope],
    );

    return res.status(201).json({
      ok: true,
      message: "Thank you — I'll be in touch soon.",
      submission: insertResult.rows[0],
    });
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({
        ok: false,
        error: "validation_failed",
        details: error.issues,
      });
    }

    console.error("Submission error:", error);
    return res.status(500).json({
      ok: false,
      error: "submission_failed",
    });
  }
});

app.post("/api/ops/login", (req, res) => {
  if (!isOpsConfigured()) {
    return res.status(503).json({ ok: false, error: "Operations access is not configured." });
  }

  const password = typeof req.body?.password === "string" ? req.body.password : "";
  if (!verifyOpsPassword(password)) {
    return res.status(401).json({ ok: false, error: "Incorrect password." });
  }

  const token = createSessionToken();
  if (!token) {
    return res.status(500).json({ ok: false, error: "Could not create session." });
  }

  setOpsSessionCookie(res, token);
  return res.status(200).json({ ok: true });
});

app.post("/api/ops/logout", (_req, res) => {
  clearOpsSessionCookie(res);
  return res.status(200).json({ ok: true });
});

app.get("/api/ops/submissions", async (req, res) => {
  if (!isOpsAuthenticated(req)) {
    return res.status(401).json({ ok: false, error: "Unauthorized" });
  }

  try {
    const result = await query(
      `SELECT id, name, email, company, project_scope AS message, created_at
       FROM intake_submissions
       ORDER BY created_at DESC
       LIMIT 200`,
    );

    return res.status(200).json({
      ok: true,
      submissions: result.rows.map((row) => ({
        ...row,
        created_at: row.created_at.toISOString(),
      })),
    });
  } catch (error) {
    console.error("Ops submissions error:", error);
    return res.status(500).json({ ok: false, error: "Failed to load submissions." });
  }
});

app.get("/operations", (_req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "operations.html"));
});

app.use(express.static(path.join(__dirname, "..", "public")));

app.use((_req, res) => {
  res.status(404).json({ ok: false, error: "not_found" });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend listening on port ${port}`);
});

module.exports = app;
