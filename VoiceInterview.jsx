import React, { useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

export default function VoiceInterview() {
  const [aiResponse, setAiResponse] = useState("");
  const [listening, setListening] = useState(false);
  const { transcript, resetTranscript } = useSpeechRecognition();

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <p>Browser does not support voice recognition.</p>;
  }

  const startListening = () => { setListening(true); resetTranscript(); SpeechRecognition.startListening({ continuous: true, language: "en-US" }); };
  const stopListening = async () => {
    SpeechRecognition.stopListening();
    setListening(false);

    const res = await fetch("http://localhost:5000/interview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userInput: transcript })
    });
    const data = await res.json();
    setAiResponse(data.reply);
    const utterance = new SpeechSynthesisUtterance(data.reply);
    speechSynthesis.speak(utterance);
  };

  return (
    <div>
      <h2>AI Interview Assistant</h2>
      <button onClick={listening ? stopListening : startListening}>
        {listening ? "Stop & Submit" : "Start Interview"}
      </button>
      <p><strong>You said:</strong> {transcript}</p>
      <p><strong>AI Response:</strong> {aiResponse}</p>
    </div>
  );
}
