import React, { useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { Link } from "react-router-dom";

import Delete from '../../Imgs/Delete/Delete.js';
import Confirm from '../../Imgs/Confirm/Confirm.js';

export default function Form(){

    let title = "";
    let question = "";
    let answers = [];
    let completedQuestion = [];

    const navigate = useNavigate();

    useEffect(() => {
        title = JSON.parse(localStorage.getItem('title'));
        question = JSON.parse(localStorage.getItem('question'));
        answers = JSON.parse(localStorage.getItem('answers'));
        completedQuestion = JSON.parse(localStorage.getItem('completedQuestion'));

        const addTitleButton = document.querySelector(".addTitleButton");
        const addQuestionButton = document.querySelector(".addQuestionButton");
        const addAnswersButton = document.querySelector(".addAnswersButton");
        const button = document.querySelector(".saveCancelCompleteQuestion");
        const saveQuizButton = document.querySelector(".saveQuiz");

        console.log(title);
        console.log(question)
        console.log(answers)

        if(title){
            addQuestionButton.classList.remove("hidden");
            addTitleButton.classList.add("hidden");
        }
        else{
            addQuestionButton.classList.add("hidden");
            addTitleButton.classList.remove("hidden");
        }
        if (question){
            addQuestionButton.classList.add("hidden");
            addAnswersButton.classList.remove("hidden");
        }
        else{
            addAnswersButton.classList.add("hidden");
        }
        if(title && question && answers){
            button.classList.remove("hidden");
        }
        else{
            button.classList.add("hidden");
        }
        if((completedQuestion) && (question == "" && answers == "")){
            saveQuizButton.classList.remove("hidden");
        }
        else{
            saveQuizButton.classList.add("hidden");
        }
    }, []);

    function addTitle(e){
        e.preventDefault();
        const addtitle = document.querySelector(".addTitleDiv");
        addtitle.classList.remove("hidden");
        const addtitleButton = document.querySelector(".addTitleButton");
        addtitleButton.classList.add("hidden");
    }

    function cancelTitle(e){
        e.preventDefault();
        const addtitle = document.querySelector(".addTitleDiv");
        addtitle.classList.add("hidden");
        const addtitleButton = document.querySelector(".addTitleButton");
        addtitleButton.classList.remove("hidden");
    }

    function saveTitle(){
        const title = document.querySelector("#titleInput").value;
        if(title){
            localStorage.setItem('title', JSON.stringify(title));
            window.location.reload();
        }
    }

    function addQuestion(e){
        e.preventDefault();
        const addQuestion = document.querySelector(".addQuestionDiv");
        addQuestion.classList.remove("hidden");
        const addQuestionButton = document.querySelector(".addQuestionButton");
        addQuestionButton.classList.add("hidden");
    }
    
    function cancelQuestion(e){
        e.preventDefault();
        const addQuestion = document.querySelector(".addQuestionDiv");
        addQuestion.classList.add("hidden");
        const addQuestionButton = document.querySelector(".addQuestionButton");
        addQuestionButton.classList.remove("hidden");
    }

    function saveQuestion(){
        const question = document.querySelector("#questionInput").value;
        if(question){
            localStorage.setItem('question', JSON.stringify(question));
            window.location.reload();
        }
    }

    function addAnswer(e){
        e.preventDefault();
        const addAnswers = document.querySelector(".addAnswersDiv");
        addAnswers.classList.remove("hidden");
        const addAnswersButton = document.querySelector(".addAnswersButton");
        addAnswersButton.classList.add("hidden");
    }
    
    function cancelAnswer(e){
        e.preventDefault();
        const addAnswers = document.querySelector(".addAnswersDiv");
        addAnswers.classList.add("hidden");
        const addAnswersButton = document.querySelector(".addAnswersButton");
        addAnswersButton.classList.remove("hidden");
    }

    function saveAnswer(){
        const newAnswers = document.querySelector("#answersInput").value;
        if(newAnswers){
            const answersArr = [...answers, newAnswers];
            localStorage.setItem('answers', JSON.stringify(answersArr));
            window.location.reload();
        }
    }

    function cancelQuiz(){
        navigate("/home");
    }

    function saveCompleteQuestion(){
        let completedQuestion = JSON.parse(localStorage.getItem('completedQuestion'));
        let questionArr = [];
        if(completedQuestion){
            questionArr = [...completedQuestion, {title: title, question: question, answers: answers}];
        }
        else{
            questionArr = [{title: title, question: question, answers: answers}];
        }
        localStorage.setItem('completedQuestion', JSON.stringify(questionArr));
        localStorage.setItem('question', JSON.stringify(""));
        localStorage.setItem('answers', JSON.stringify(""));
        window.location.reload();
    }

    function cancelCompleteQuestion(){
        localStorage.setItem('question', JSON.stringify(""));
        localStorage.setItem('answers', JSON.stringify(""));
        window.location.reload();
    }

    function RenderAnswersWhileCreating(){
        answers = JSON.parse(localStorage.getItem('answers'));
        let order = 0;
        if (answers.length > 0){
            return (
                answers.map(answer => {
                    order++;
                    return(
                        <h2 key = {order}>
                            {answer}
                        </h2>
                    )
                })
            )
        }
        else{
            return null;
        }
    }

    function RenderQuestion(){
        let completedQuestions = JSON.parse(localStorage.getItem('completedQuestion'));
        let order = -1;
        if (completedQuestions.length > 0){
            return (
                completedQuestions.map(question => {
                    order++;
                    return(
                        <QuestionBackground key = {order}>
                            <h2>
                                {question.question}
                            </h2>
                            <RenderAnswers answers = {question.answers} />
                        </QuestionBackground>
                    )
                })
            )
        }
        else{
            return null;
        }
    }

    function RenderAnswers({answers}){
        let order = 0;
        if (answers.length > 0){
            return (
                answers.map(answer => {
                    order++;
                    return(
                        <h2 key = {order}>
                            {answer}
                        </h2>
                    )
                })
            )
        }
        else{
            return null;
        }
    }

    async function saveQuiz(e){
        e.preventDefault();
        if(completedQuestion){
            
        }
        navigate("/home");
        //CONFIGURAR PARA SALVAR NO BANCO
        /*e.preventDefault();

        

            <input type="text" onChange = {(e) => setUsername(e.target.value)} value = {username} placeholder='Nome'/>
            <input type="email" onChange = {(e) => setEmail(e.target.value)} value = {email} placeholder='E-mail'/>
            <input type="password" onChange = {(e) => setPassword(e.target.value)} value = {password} placeholder='Senha'/>
            <input type="password" onChange = {(e) => setPasswordConfirm(e.target.value)} value = {passwordConfirm} placeholder='Confirme sua senha'/>

        try{
            if(password === passwordConfirm){
                const response = await axios.post('http://localhost:5000/sign-up', {
                    email: email,
                    password: password,
                    username: username,
                });
                navigate('/');
            }
            else{
                alert('As senhas não são iguais');
                resetFields();
            }
        }
        catch(error){
            if (error.response.status === 409) {
                alert("Email já cadastrado! Tente novamente")
            }
            else {
                alert("Erro no sistema! Tente novamente.")
            }
            resetFields();
        }*/
    }

    return (
        
        <NewQuizForm onSubmit = {saveQuiz}>
            <h1>
                {JSON.parse(localStorage.getItem('title'))}
            </h1>
            <InputButtons className = "addTitleDiv hidden">
                <input id = "titleInput" type="text" placeholder='Digite o título do questionário aqui'/>
                <button type = "button" onClick={cancelTitle}>
                    <Delete />
                </button>
                <button type = "button" onClick = {saveTitle}>
                    <Confirm />
                </button>
            </InputButtons>
            <ButtonAdd className = "addTitleButton" onClick={addTitle}>
                <h3>ADICIONAR TÍTULO</h3>
            </ButtonAdd>
            <RenderQuestion />
            <QuestionBackground>
                <h2>
                    {JSON.parse(localStorage.getItem('question'))}
                </h2>
                <InputButtons className = "addQuestionDiv hidden">
                    <input id = "questionInput" type="text" placeholder='Digite sua pergunta aqui'/>
                    <button type = "button" onClick={cancelQuestion}>
                        <Delete />
                    </button>
                    <button type = "button" onClick = {saveQuestion}>
                        <Confirm />
                    </button>
                </InputButtons>
                <ButtonAdd className = "addQuestionButton hidden" onClick={addQuestion}>
                    <h3>ADICIONAR PERGUNTA</h3>
                </ButtonAdd>
                <RenderAnswersWhileCreating />
                <InputButtons className = "addAnswersDiv hidden">
                    <input id = "answersInput" type="text" placeholder='Digite sua resposta aqui'/>
                    <button type = "button" onClick={cancelAnswer}>
                        <Delete />
                    </button>
                    <button type = "button" onClick = {saveAnswer}>
                        <Confirm />
                    </button>
                </InputButtons>
                <ButtonAdd className = "addAnswersButton hidden" type = "button" onClick={addAnswer}>
                    <h3>ADICIONAR RESPOSTA</h3>
                </ButtonAdd>
                <Buttons2 className = "hidden saveCancelCompleteQuestion">
                        <Button2 type = "button" onClick={cancelCompleteQuestion}>
                            <h4>CANCELAR PERGUNTA</h4>
                        </Button2>
                        <Button2 type = "button" onClick = {saveCompleteQuestion}>
                            <h4>SALVAR PERGUNTA</h4>
                        </Button2>
                    </Buttons2>
            </QuestionBackground>
            <Buttons>
                <Button type = "button" onClick={cancelQuiz}>
                    <h3>CANCELAR QUESTIONÁRIO</h3>
                </Button>
                <Button className = "saveQuiz hidden" type="submit">
                    <h3>SALVAR QUESTIONÁRIO</h3>
                </Button>
            </Buttons>
        </NewQuizForm>
    );
}

const NewQuizForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    input{
        width: 100%;
    }
    h1, h2{
        text-align: center;
        margin-bottom: 15px;
    }
    gap: 10px;
`;
const QuestionBackground = styled.div`
    border: 2px solid #133780;
    padding: 30px;
`;
const Buttons2 = styled.div`
	display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 5px 0px;
`;
const InputButtons = styled.div`
	display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 5px;
`;
const Buttons = styled.div`
	display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
`;
const Button2 = styled.button`
    background: #94CC1F;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12);
    border-radius: 100px;
    width: 150px;
    padding: 10px 20px;
    h4{
        font-weight: bold;
        color: #133780;
    }
    margin-top: 20px;
`;
const Button = styled.button`
    background: #94CC1F;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12);
    border-radius: 100px;
    width: 200px;
    padding: 15px 20px;
    h3{
        font-weight: bold;
        color: #133780;
    }
`;
const ButtonAdd = styled.button`
    background: #133780;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12);
    border-radius: 100px;
    width: 100%;
    padding: 15px 20px;
    h3{
        font-weight: bold;
        color: white;
    }
`;