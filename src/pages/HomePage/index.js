import React, { useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router';

import Delete from '../../Imgs/Delete/Delete.js';

export default function HomePage() {
    localStorage.setItem('question', JSON.stringify(""));
    localStorage.setItem('answers', JSON.stringify(""));
    localStorage.setItem('title', JSON.stringify(""));
    localStorage.setItem('description', JSON.stringify(""));
    localStorage.setItem('completedQuestion', JSON.stringify(""));
    localStorage.setItem('nameQuiz', JSON.stringify(""));

    let userId = JSON.parse(localStorage.getItem('userId'));

    const [userQuizzes, setUserQuizzes] = React.useState([]);
    const [availableQuizzes, setAvailableQuizzes] = React.useState([]);
    const [answeredQuizzes, setAnsweredQuizzes] = React.useState([]);

    const navigate = useNavigate();

    function newQuiz(){
        navigate("/newQuiz");
    }

    function answerQuiz(nameQuiz){
        localStorage.setItem('nameQuiz', JSON.stringify(nameQuiz));
        navigate(`/answerQuiz`);
    }

    async function deleteQuiz(name){
       const promise = await axios.delete(`http://localhost:5000/quizzes/quiz`, {
            data:{
                name: name
            }
        });
        const { data } = promise;
        console.log(data)
        window.location.reload();
    }

    const fetchData = async () => {
        const promise = await axios.get(`http://localhost:5000/quizzes/${userId}`, {
        });
        const { data } = promise;
        setAnsweredQuizzes(data.data.answeredQuizzes);
        setAvailableQuizzes(data.data.availableQuizzes);
        setUserQuizzes(data.data.userQuizzes);
    }

    function RenderUserQuizzes(){
        let order = 0;
        let position = 0;
        if (userQuizzes.length > 0){
            return (
                userQuizzes.map(userQuiz => {
                    order++;
                    position = order-1;
                    return(
                        <UserQuizEdit key = {order}>
                            <QuizBackgroundAnswered>
                                <h2>
                                    {userQuiz.name}
                                </h2>
                            </QuizBackgroundAnswered>
                            <EditDeleteButton type= "button" onClick = {() => deleteQuiz(userQuiz.name)}>
                                <Delete />
                            </EditDeleteButton>
                        </UserQuizEdit>
                    )
                })
            )
        }
        else{
            return (
                <h2>
                    Você não possui questionários.
                </h2>
            );
        }
    }

    function RenderAnsweredQuizzes(){
        let order = 0;
        if (answeredQuizzes.length > 0){
            return (
                answeredQuizzes.map(answeredQuiz => {
                    order++;
                    return(
                        <QuizBackgroundAnswered key = {order}>
                            <h2>
                                {answeredQuiz}
                            </h2>
                        </QuizBackgroundAnswered>
                    )
                })
            )
        }
        else{
            return (
                <h2>
                    Você não respondeu nenhum questionário.
                </h2>
            );
        }
    }

    function RenderAvailableQuizzes(){
        let order = 0;
        if (availableQuizzes.length > 0){
            return (
                availableQuizzes.map(availableQuiz => {
                    order++;
                    return(
                        <QuizBackground onClick={() => answerQuiz(availableQuiz.name)} key = {order}>
                            <h2>
                                {availableQuiz.name}
                            </h2>
                        </QuizBackground>
                    )
                })
            )
        }
        else{
            return (
                <h2>
                    Não tem questionários disponíveis.
                </h2>
            );
        }
    }

    useEffect(() => {
        try{
            fetchData();
        }
        catch(e){
            alert('Falha.');
        }
    }, []);

    return (
        <Content>
            <TitleSubTitle>
                <h1>
                    Seus Questionários:
                </h1>
                <Quiz>
                    <RenderUserQuizzes />
                    <NewQuiz onClick={newQuiz}>
                        <h3>NOVO QUESTIONÁRIO</h3>
                    </NewQuiz>
                </Quiz>
            </TitleSubTitle>
            <TitleSubTitle>
                <h1>
                    Questionários respondidos:
                </h1>
                <Quiz>
                    <RenderAnsweredQuizzes />
                </Quiz>
            </TitleSubTitle>
            <TitleSubTitle>
                <h1>
                    Questionários disponíveis:
                </h1>
                <Quiz>
                    <RenderAvailableQuizzes />
                </Quiz>
            </TitleSubTitle>
        </Content>
    )
}

const Content = styled.div`
    h1{
        color: white;
    }
    padding: 50px 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 100px;
    width: 100%;
`;
const TitleSubTitle = styled.div`
    text-align: center;
    width: 100%;
`;
const Quiz = styled.div`
    background-color: white;
    margin-top: 25px;
    width: 100%;
    padding: 20px 50px;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 15px;
`;
const UserQuizBackground = styled.button`
    background-color: #94CC1F;
    padding: 20px 50px;
    width: 100%;
    h2{
        color: #133780;
    }
    border-radius: 100px;
`;
const QuizBackground = styled.button`
    background-color: #94CC1F;
    width: 100%;
    padding: 20px 50px;
    h2{
        color: #133780;
    }
    border-radius: 100px;
`;
const QuizBackgroundAnswered = styled.div`
    background-color: #94CC1F;
    width: 100%;
    padding: 20px 50px;
    h2{
        color: #133780;
    }
    border-radius: 100px;
`;
const UserQuizEdit = styled.div`
    width: 100%;
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: space-between;
`;
const EditDeleteButton = styled.button`
    img{
        width: 20px;
    }
`;
const NewQuiz = styled.button`
    background: #133780;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12);
    border-radius: 100px;
    width: 300px;
    padding: 15px 20px;
    h3{
        font-weight: bold;
        color: #94CC1F;
    }
`;