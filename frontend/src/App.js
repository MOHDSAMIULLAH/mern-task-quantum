
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NoPage from "./componenets/NoPage";
import LoginForm from "./componenets/LoginForm";
import RegistrationForm from "./componenets/RegistrationForm";
import ProtectedPage from "./componenets/ProtectedPage";

import 'bootstrap/dist/css/bootstrap.css';
import Login from "./componenets/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/protected" element={<ProtectedPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
