import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserContext from "./providers/UserContext";
import './styles/reset.css';
import './styles/style.css';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import AnswerQuizPage from './pages/AnswerQuizPage';
import NewQuizPage from './pages/NewQuizPage';

function App() {

  const initialId = localStorage.getItem(0);

  const [userId, setUserId] = useState(JSON.parse(initialId));

  return (

    <UserContext.Provider value={{ userId, setUserId }} >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
          <Route path="/sign-up" element={<SignUpPage />}></Route>
          <Route path="/home" element={<HomePage/>}></Route>
          <Route path="/newQuiz" element={<NewQuizPage/>}></Route>
          <Route path="/answerQuiz" element={<AnswerQuizPage/>}></Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
