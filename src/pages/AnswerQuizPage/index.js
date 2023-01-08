import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import UserContext from '../../providers/UserContext';

export default function HomePage() {

    const {token, setToken} = useContext(UserContext);

    const navigate = useNavigate();

    let answersAmount = 0; //tem que chegar no total de questões
    let hasAnswered = false;

    let questionsAmount = 3 //ATUALIZAR QUANTIDADE DE PERGUNTAS QUE TEM O QUESTIONARIO DE ACORDO COM OQ RECEBER NO BANCO

    function chosenAnswer(nQuestion, nAnswer){
        hasAnswered = false;
        const questionAnswers = document.querySelectorAll(`.questionAnswers${nQuestion}`)[0].children;

        for(let i = 0; i < questionAnswers.length; i++){
            if(questionAnswers[i].classList.contains("disabled")){
                hasAnswered = true;
            }
            questionAnswers[i].classList.remove("disabled");
        }
        for(let i = 0; i < questionAnswers.length; i++){
            if (i != 0){
                if(i != nAnswer+1){
                    questionAnswers[i].classList.add("disabled");
                }
            }
        }
        if(!hasAnswered){
            answersAmount++;
        }
        if(answersAmount === questionsAmount){
            const button = document.querySelector(".finishAnswers");
            button.classList.remove("hidden");
        }
    }

    function cancel(){
        navigate("/home");
    }

    function finish(e){
        e.preventDefault();
        //CONFIGURAR PARA SALVAR NO BANCO 
        navigate("/home");
    }

    async function answer(e){
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

    /*const fetchData = async () => {
        const promise = await axios.get('http://localhost:5000/home', {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        const { data } = promise;
        setDataList(data);
    }

    useEffect(() => {
        try{
            fetchData();
        }
        catch(e){
            alert('Falha.');
        }
    }, []);*/

    return (
        <Content>
            <ContentBackground>
                <h1>
                    Título do questionário
                </h1>
                <AnswerQuizBackground className = {`questionAnswers${0}`}> {/* Posição do array dessa questão */}
                    <h1>
                        Pergunta 1
                    </h1>
                    <ButtonAnswer onClick = {() => chosenAnswer(0, 0)}> {/* Passa por paramentro a posição no array dessa resposta para identificar */}
                        <h2>
                            Resposta 1
                        </h2>
                    </ButtonAnswer>
                    <ButtonAnswer onClick = {() => chosenAnswer(0, 1)}>
                        <h2>
                            Resposta 2
                        </h2>
                    </ButtonAnswer>
                    <ButtonAnswer onClick = {() => chosenAnswer(0, 2)}>
                        <h2>
                            Resposta 3
                        </h2>
                    </ButtonAnswer>
                </AnswerQuizBackground>
                <AnswerQuizBackground className = {`questionAnswers${1}`}>
                    <h1>
                        Pergunta 2
                    </h1>
                    <ButtonAnswer onClick = {() => chosenAnswer(1, 0)}> {/* Passa por paramentro a posição no array dessa resposta para identificar */}
                        <h2>
                            Resposta 1
                        </h2>
                    </ButtonAnswer>
                    <ButtonAnswer onClick = {() => chosenAnswer(1, 1)}>
                        <h2>
                            Resposta 2
                        </h2>
                    </ButtonAnswer>
                    <ButtonAnswer onClick = {() => chosenAnswer(1, 2)}>
                        <h2>
                            Resposta 3
                        </h2>
                    </ButtonAnswer>
                    <ButtonAnswer onClick = {() => chosenAnswer(1, 3)}>
                        <h2>
                            Resposta 4
                        </h2>
                    </ButtonAnswer>
                    <ButtonAnswer onClick = {() => chosenAnswer(1, 4)}>
                        <h2>
                            Resposta 5
                        </h2>
                    </ButtonAnswer>  
                </AnswerQuizBackground>
                <AnswerQuizBackground className = {`questionAnswers${2}`}>
                    <h1>
                        Pergunta 3
                    </h1>
                    <ButtonAnswer onClick = {() => chosenAnswer(2, 0)}> {/* Passa por paramentro a posição no array dessa resposta para identificar */}
                        <h2>
                            Resposta 1
                        </h2>
                    </ButtonAnswer>
                    <ButtonAnswer onClick = {() => chosenAnswer(2, 1)}>
                        <h2>
                            Resposta 2
                        </h2>
                    </ButtonAnswer> 
                </AnswerQuizBackground>
                <AnswerForm onSubmit = {answer}>
                    <FormButtons>
                        <FormButton onClick={cancel}>
                            <h3>CANCELAR</h3>
                        </FormButton>
                        <FormButton className = "finishAnswers hidden" onClick = {finish} type="submit">
                            <h3>CONCLUIR</h3>
                        </FormButton>
                    </FormButtons>
                </AnswerForm>
            </ContentBackground>
        </Content>
    )
}

const Content = styled.div`
    h1, h2{
        color: white;
    }
    padding: 50px 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;
const ContentBackground = styled.div`
    background-color: white;
    width: 100%;
    margin-top: 25px;
    border-radius: 100px;
    padding: 50px 100px;
`;
const AnswerQuizBackground = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    width: 100%;
    h1, h2{
        color: black;
    }
    margin-bottom: 30px;
`;
const ButtonAnswer = styled.button`
    background: #133780;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12);
    border-radius: 100px;
    width: 100%;
    padding: 15px 20px;
    h2{
        color: white;
    }
`;
const AnswerForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    input{
        width: 100%;
    }
    gap: 10px;
`;
const FormButtons = styled.div`
	display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
`;
const FormButton = styled.button`
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