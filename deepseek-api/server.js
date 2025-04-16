// server.js (ES6-style, no streaming)
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fetch from "node-fetch"; // install via: npm i node-fetch

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

app.post("/generate", async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "deepseek-r1:1.5b",
        prompt,
        stream: false,
      }),
    });

    const data = await response.json();
    res.json({ response: data.response });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Failed to fetch from model." });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
