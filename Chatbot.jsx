import React, { useState } from "react";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages([...messages, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      const botMsg = { sender: "bot", text: data.reply || "Sorry, I didn't understand." };
      setMessages((prev) => [...prev, botMsg]);
      speak(botMsg.text);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [...prev, { sender: "bot", text: "Error: server not reachable." }]);
    } finally {
      setLoading(false);
    }
  };

  const speak = (text) => {
    if (!("speechSynthesis" in window)) return;
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="fixed bottom-6 right-6 w-80 max-w-full z-50">
      <div className="flex flex-col h-96 bg-white/90 backdrop-blur-md shadow-2xl rounded-xl border border-gray-300">
        {/* Chat header */}
        <div className="bg-blue-500 text-white px-4 py-2 font-semibold text-lg">
          Ease C - Career AI
        </div>

        {/* Chat messages (no scroll) */}
        <div className="flex-1 p-3 space-y-2 bg-gray-100">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-3 py-1 rounded-lg max-w-xs break-words ${
                  m.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
          {loading && <div className="text-gray-500">Thinking...</div>}
        </div>

        {/* Input */}
        <div className="flex border-t border-gray-300">
          <input
  type="text"
  value={input}
  onChange={(e) => setInput(e.target.value)}
  onKeyDown={handleKeyPress}
  placeholder="Ask me about your career..."
  className="flex-grow px-3 py-2 text-black focus:outline-none" // <-- add text-black
/>

          <button
            onClick={handleSend}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
