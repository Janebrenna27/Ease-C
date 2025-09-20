import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // only for learning/dev, not safe for production
});

export async function chatWithAI(messages) {
  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini", // fast + cheap model
      messages: messages,
    });

    return response.choices[0].message.content;
  } catch (err) {
    console.error("API error:", err);
    return "⚠️ Error connecting to AI";
  }
}
