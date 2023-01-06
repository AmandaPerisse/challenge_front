import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserContext from "./providers/UserContext";
import './styles/reset.css';
import './styles/style.css';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

function App() {

  const initialToken = localStorage.getItem("token");
  const initialName = localStorage.getItem("name");

  const [infoName, setInfoName] = useState(JSON.parse(initialName));
  const [token, setToken] = useState(initialToken);

  return (

    <UserContext.Provider value={{ infoName, token, setToken }} >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
          <Route path="/sign-up" element={<SignUpPage />}></Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
