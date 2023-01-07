import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import UserContext from '../../providers/UserContext';

import Form from './FormNewQuiz';
import Edit from '../../Imgs/Edit/Edit.js';
import Delete from '../../Imgs/Delete/Delete.js';
import Confirm from '../../Imgs/Confirm/Confirm.js';

export default function HomePage() {

    const {token, setToken} = useContext(UserContext);
    const [list, setList] = React.useState([0, 1, 2, 3]); {/* Lista que vai receber as perguntas e respostas */}
    
    const navigate = useNavigate();

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
