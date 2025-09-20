import { useState } from "react";
import mockTests from "./data/mockTests.json";

export default function MockTest({ selectedCareer }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  if (!selectedCareer) return <p>Select a career to start mock tests.</p>;
  const questions = mockTests[selectedCareer] || [];
  if (questions.length === 0) return <p>No mock tests for {selectedCareer} yet.</p>;

  const handleAnswer = (option) => {
    if (option === questions[currentQ].answer) setScore(score + 1);
    if (currentQ + 1 < questions.length) setCurrentQ(currentQ + 1);
    else setCompleted(true);
  };

  if (completed) return <div><h2>Test Completed!</h2><p>Score: {score}/{questions.length}</p></div>;

  return (
    <div className="mock-test">
      <h3>Question {currentQ + 1} / {questions.length}</h3>
      <p>{questions[currentQ].question}</p>
      {questions[currentQ].options.map(opt => <button key={opt} onClick={() => handleAnswer(opt)}>{opt}</button>)}
    </div>
  );
}
