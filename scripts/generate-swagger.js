import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { OpenAI } from "openai";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateSwagger() {
  const routePath = path.resolve("routes", "auth.js"); 
  const routeCode = fs.readFileSync(routePath, "utf-8");

  const prompt = `
You're an expert in OpenAPI documentation.

Generate the OpenAPI 3.0 "paths" object (only the inner object — do NOT wrap it in a "paths" key)
for the following Express.js route code:

\`\`\`js
${routeCode}
\`\`\`

Return only the raw JSON object.
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
  });

  let content = response.choices[0].message.content.trim();
  content = content.replace(/^```json/, "").replace(/```$/, "").trim();

  let parsedPaths;
  try {
    parsedPaths = JSON.parse(content);
  } catch (err) {
    console.error("Failed to parse OpenAPI JSON:\n", content);
    return;
  }

  const swaggerSpec = {
    openapi: "3.0.0",
    info: {
      title: "Express API with OpenAI",
      version: "1.0.0",
      description: "Generated dynamically using OpenAI",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    paths: parsedPaths, 
  };

  fs.writeFileSync("swagger.json", JSON.stringify(swaggerSpec, null, 2));
  console.log("Swagger spec written to swagger.json");
}

generateSwagger();
