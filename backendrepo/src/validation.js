const { z } = require("zod");

const submissionSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(200),
  company: z.string().min(2).max(160),
  projectScope: z.string().min(20).max(5000),
});

function parseSubmission(payload) {
  return submissionSchema.parse(payload);
}

module.exports = { parseSubmission };
