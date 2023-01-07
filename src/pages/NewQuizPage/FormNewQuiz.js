import React, { useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { Link } from "react-router-dom";

export default function Form(){

    const [answersAmount, setAnswersAmount] = React.useState(0); {/* Criar map de acordo com quantidade de respostas criadas até o momento */}

    let question = "";
    let answers = [];
    
    //localStorage.setItem('question', JSON.stringify(""));

    const navigate = useNavigate();

    useEffect(() => {
        question = JSON.parse(localStorage.getItem('question'));
        answers = JSON.parse(localStorage.getItem('answers')); // LEMBRAR DE LIMPAR LOCAL STORAGE QND CLICAR NO BOTAO SALVAR NO BANCO

        if (question){
            const addQuestionButton = document.querySelector(".addQuestionButton");
            addQuestionButton.classList.add("hidden");
            const addAnswersButton = document.querySelector(".addAnswersButton");
            addAnswersButton.classList.remove("hidden");
        }
        else{
            const addQuestionButton = document.querySelector(".addQuestionButton");
            addQuestionButton.classList.remove("hidden");
        }
    }, []);

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
        localStorage.setItem('question', JSON.stringify(question));
        window.location.reload();
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
        const answersArr = [...answers, newAnswers];
        localStorage.setItem('answers', JSON.stringify(answersArr));
        window.location.reload();
    }

    function cancel(){
        navigate("/home");
    }

    function save(){
        navigate("/newQuiz");
    }

    async function save(e){
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
        
        <LoginForm onSubmit = {save}>
            <QuestionBackground>
                <h2>
                    {JSON.parse(localStorage.getItem('question'))}
                </h2>
                <div className = "addQuestionDiv hidden">
                    <input id = "questionInput" type="text" placeholder='Digite sua pergunta aqui'/>
                    <Buttons2>
                        <Button2 type = "button" onClick={cancelQuestion}>
                            <h4>CANCELAR</h4>
                        </Button2>
                        <Button2 type = "button" onClick = {saveQuestion}>
                            <h4>SALVAR</h4>
                        </Button2>
                    </Buttons2>
                </div>
                <ButtonAdd className = "addQuestionButton" onClick={addQuestion}>
                    <h3>ADICIONAR PERGUNTA</h3>
                </ButtonAdd>
                <h2>
                    {JSON.parse(localStorage.getItem('answers'))}
                </h2>
                <div className = "addAnswersDiv hidden">
                    <input id = "answersInput" type="text" placeholder='Digite sua resposta aqui'/>
                    <Buttons2>
                        <Button2 type = "button" onClick={cancelAnswer}>
                            <h4>CANCELAR</h4>
                        </Button2>
                        <Button2 type = "button" onClick = {saveAnswer}>
                            <h4>SALVAR</h4>
                        </Button2>
                    </Buttons2>
                </div>
                <ButtonAdd className = "addAnswersButton hidden" type = "button" onClick={addAnswer}>
                    <h3>ADICIONAR RESPOSTA</h3>
                </ButtonAdd>
            </QuestionBackground>
            <Buttons>
                <Button type = "button" onClick={cancel}>
                    <h3>CANCELAR</h3>
                </Button>
                <Button type="submit">
                    <h3>SALVAR</h3>
                </Button>
            </Buttons>
        </LoginForm>
    );
}

const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    input{
        width: 100%;
    }
    h2{
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