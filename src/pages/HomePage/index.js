import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import UserContext from '../../providers/UserContext';

import Edit from '../../Imgs/Edit/Edit.js';
import Delete from '../../Imgs/Delete/Delete.js';

export default function HomePage() {

    const {token, setToken} = useContext(UserContext);
    localStorage.setItem('question', JSON.stringify(""));
    localStorage.setItem('answers', JSON.stringify(""));
    const navigate = useNavigate();

    function edit(){
        navigate("/editQuiz");
    }

    function newQuiz(){
        navigate("/newQuiz");
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
            <TitleSubTitle>
                <h1>
                    Seus Questionários:
                </h1>
                <Quiz>
                    <h2>
                        Você não possui questionários.
                    </h2>
                    <UserQuizEdit>
                        <UserQuizBackground>
                            <h2>
                                Nome do Questionário
                            </h2>
                        </UserQuizBackground>
                        <div>
                            <EditDeleteButton onClick={edit}>
                                <Edit />
                            </EditDeleteButton>
                            <EditDeleteButton>
                                <Delete />
                            </EditDeleteButton>
                        </div>
                    </UserQuizEdit>
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
                    <QuizBackgroundAnswered>
                        <h2>
                            Nome do Questionário
                        </h2>
                    </QuizBackgroundAnswered>
                    <QuizBackgroundAnswered>
                        <h2>
                            Nome do Questionário
                        </h2>
                    </QuizBackgroundAnswered>
                </Quiz>
            </TitleSubTitle>
            <TitleSubTitle>
                <h1>
                    Questionários disponíveis:
                </h1>
                <Quiz>
                    <QuizBackground>
                        <h2>
                            Nome do Questionário
                        </h2>
                    </QuizBackground>
                    <QuizBackground>
                        <h2>
                            Nome do Questionário
                        </h2>
                    </QuizBackground>
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