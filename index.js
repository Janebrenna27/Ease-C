import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Endpoint to handle chat
app.post("/api/chat", async (req, res) => {
  const { message, history } = req.body;

  try {
    // Build conversation for context
    const messages = history
      ? history.map((h) => ({ role: h.role, content: h.content }))
      : [];
    messages.push({ role: "user", content: message });

    const completion = await openai.chat.completions.create({
      model: "gpt-5-mini",
      messages,
    });

    const reply = completion.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "Server error. Try again later." });
  }
});

app.listen(process.env.PORT || 5000, () =>
  console.log(`Server running on port ${process.env.PORT || 5000}`)
);
