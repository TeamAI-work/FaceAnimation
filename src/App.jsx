import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MainPage from "./Components/MainPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </Router>
  );
}