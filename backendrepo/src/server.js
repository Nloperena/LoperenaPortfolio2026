require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { query } = require("./db");
const { parseSubmission } = require("./validation");

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
app.use(helmet());
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

    return res.status(500).json({
      ok: false,
      error: "submission_failed",
    });
  }
});

app.use((_req, res) => {
  res.status(404).json({ ok: false, error: "not_found" });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend listening on port ${port}`);
});

module.exports = app;
