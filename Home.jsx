import React from "react";
import Chatbot from "../components/Chatbot";

export default function Home() {
  return (
    <div
      className="relative h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: "url('/background.jpg')" }} // ✅ put background.jpg in public/
    >
      {/* Slight dark overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Centered heading and subheading */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
        <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">Ease C</h1>
        <p className="text-xl drop-shadow-md max-w-xl">
          Get personalized career advice, motivation, and global insights for your future.
        </p>
      </div>

      {/* Chatbot docked at bottom */}
      <div className="absolute bottom-6 w-full flex justify-center">
        <Chatbot />
      </div>
    </div>
  );
}
