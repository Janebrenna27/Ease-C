import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import GlobePage from "./pages/GlobePage";
import { Globe as GlobeIcon } from "lucide-react"; // make sure lucide-react is installed
import Chatbot from "./components/Chatbot";

function FloatingGlobeButton() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/globe")}
      className="fixed bottom-24 right-6 bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg z-50"
    >
      <GlobeIcon size={28} />
    </button>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <FloatingGlobeButton />
            </>
          }
        />
        <Route
          path="/globe"
          element={
            <>
              <GlobePage />
              <FloatingGlobeButton />
            </>
          }
        />
      </Routes>

      {/* Chatbot visible on all pages */}
      <Chatbot />
    </Router>
  );
}
