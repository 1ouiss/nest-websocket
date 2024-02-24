import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SigninPage from "./pages/auth/SigninPage";
import SignupPage from "./pages/auth/SignupPage";
import RoomPage from "./pages/chat/RoomPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/signin" element={<SigninPage />} />
        <Route path="/auth/signup" element={<SignupPage />} />
        <Route path="/rooms/general" element={<RoomPage />} />
        <Route
          path="*"
          element={<Navigate to="/auth/signin" replace={true} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
