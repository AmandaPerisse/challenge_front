import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';

import Form from './FormNewQuiz';

export default function HomePage() {
    
    const navigate = useNavigate();

    return (
        <Content>
            <h1>
                Novo Questionário
            </h1>
            <NewQuizBackground>
                <Form /> 
            </NewQuizBackground>
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
const NewQuizBackground = styled.div`
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    width: 100%;
    margin-top: 25px;
    border-radius: 100px;
    padding: 50px 100px;
    h1, h2{
        color: black;
    }
    img{
        width: 15px;
    }
`;
