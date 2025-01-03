import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/Home";
import LoginPage from "./pages/Login";

function App() {
  return (
    <div className="app">
      <main className="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
