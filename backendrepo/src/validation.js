const { z } = require("zod");

const submissionSchema = z
  .object({
    name: z.string().min(1).max(120),
    email: z.string().email().max(200),
    company: z.string().max(160).optional(),
    projectScope: z.string().max(5000).optional(),
    message: z.string().max(5000).optional(),
  })
  .transform((data) => ({
    name: data.name.trim(),
    email: data.email.trim(),
    company: (data.company || "").trim(),
    projectScope: (data.projectScope || data.message || "").trim() || "(No message provided)",
  }));

function parseSubmission(payload) {
  return submissionSchema.parse(payload);
}

module.exports = { parseSubmission };
