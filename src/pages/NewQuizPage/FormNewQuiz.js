import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { Link } from "react-router-dom";
import UserContext from '../../providers/UserContext';

import Delete from '../../Imgs/Delete/Delete.js';
import Confirm from '../../Imgs/Confirm/Confirm.js';

export default function Form(){

    let title = "";
    let description = "";
    let question = "";
    let answers = [];
    let completedQuestion = [];
    let userId = JSON.parse(localStorage.getItem('userId'));

    const navigate = useNavigate();

    useEffect(() => {

        title = JSON.parse(localStorage.getItem('title'));
        description = JSON.parse(localStorage.getItem('description'));
        question = JSON.parse(localStorage.getItem('question'));
        answers = JSON.parse(localStorage.getItem('answers'));
        completedQuestion = JSON.parse(localStorage.getItem('completedQuestion'));

        const addTitleButton = document.querySelector(".addTitleButton");
        const addDescriptionButton = document.querySelector(".addDescriptionButton");
        const addQuestionButton = document.querySelector(".addQuestionButton");
        const addAnswersButton = document.querySelector(".addAnswersButton");
        const button = document.querySelector(".saveCancelCompleteQuestion");
        const saveQuizButton = document.querySelector(".saveQuiz");

        if(title){
            addDescriptionButton.classList.remove("hidden");
            addTitleButton.classList.add("hidden");
        }
        else{
            addDescriptionButton.classList.add("hidden");
            addTitleButton.classList.remove("hidden");
        }
        if(description){
            addQuestionButton.classList.remove("hidden");
            addDescriptionButton.classList.add("hidden");
        }
        else{
            addQuestionButton.classList.add("hidden");
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

    function addDescription(e){
        e.preventDefault();
        const addDescription = document.querySelector(".addDescriptionDiv");
        addDescription.classList.remove("hidden");
        const addDescriptionButton = document.querySelector(".addDescriptionButton");
        addDescriptionButton.classList.add("hidden");
    }

    function cancelDescription(e){
        e.preventDefault();
        const addDescription = document.querySelector(".addDescriptionDiv");
        addDescription.classList.add("hidden");
        const addDescriptionButton = document.querySelector(".addDescriptionButton");
        addDescriptionButton.classList.remove("hidden");
    }

    function saveDescription(){
        const description = document.querySelector("#descriptionInput").value;
        if(description){
            localStorage.setItem('description', JSON.stringify(description));
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
        let array = [];
        let questionsArr = [];
        if(completedQuestion){

            questionsArr = completedQuestion.questions;
            let newQuestionsArr = { question: question, answers: answers }
            questionsArr.push(newQuestionsArr);

            array = { title: title, description: description, questions: questionsArr };
        }
        else{
            let questionArr = [{ question: question, answers: answers }]

            array = { title: title, description: description, questions: questionArr };
        }      

        localStorage.setItem('completedQuestion', JSON.stringify(array));
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
        if (answers){
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
        if (completedQuestions.questions){
            return (
                completedQuestions.questions.map(question => {
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
        if (answers){
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
            try{
                const response = await axios.post('http://localhost:5000/quizzes', {
                    userId: userId,
                    nameQuiz: completedQuestion.title,
                    descriptionQuiz: completedQuestion.description,
                    questions: completedQuestion.questions
                });
            }
            catch(error){
                alert("Erro no sistema! Tente novamente.")
            }
        }
        else{
            alert("Quiz incompleto!");
        }
        navigate("/home");   
    }

    return (
        
        <NewQuizForm onSubmit = {saveQuiz}>
            <h1>
                {JSON.parse(localStorage.getItem('title'))}
            </h1>
            <h2>
                {JSON.parse(localStorage.getItem('description'))}
            </h2>
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
            <InputButtons className = "addDescriptionDiv hidden">
                <input id = "descriptionInput" type="text" placeholder='Digite a descrição do questionário aqui'/>
                <button type = "button" onClick={cancelDescription}>
                    <Delete />
                </button>
                <button type = "button" onClick = {saveDescription}>
                    <Confirm />
                </button>
            </InputButtons>
            <ButtonAdd className = "addDescriptionButton hidden" onClick={addDescription}>
                <h3>ADICIONAR DESCRIÇÃO</h3>
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