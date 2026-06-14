const fs = require("fs");
const path = require("path");
const { query, closePool } = require("../src/db");

async function main() {
  const schemaPath = path.join(__dirname, "..", "sql", "schema.sql");
  const sql = fs.readFileSync(schemaPath, "utf8");
  await query(sql);
  console.log("Schema applied.");
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(() => closePool());
