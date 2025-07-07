// swagger.js
import fs from "fs";

let spec = {};
try {
  spec = JSON.parse(fs.readFileSync("swagger.json", "utf-8"));
} catch (e) {
  console.warn("⚠️ Warning: swagger.json not found or invalid.");
}

export default spec;
