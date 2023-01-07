import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import UserContext from '../../providers/UserContext';

import Form from './Form';
import Edit from '../../Imgs/Edit/Edit.js';
import Delete from '../../Imgs/Delete/Delete.js';
import Confirm from '../../Imgs/Confirm/Confirm.js';

export default function HomePage() {

    const {token, setToken} = useContext(UserContext);
    const [list, setList] = React.useState([0, 1, 2, 3]); {/* Lista que vai receber as perguntas e respostas */}
    
    const navigate = useNavigate();

    function editQuestionValue(number){
        console.log("teste1")
        const button = document.querySelector(`.editQuestionButton${number}`);
        button.classList.toggle("hidden");
    }

    function editAnswersValue(number){
        console.log("teste2");
        const button = document.querySelector(`.editAnswersButton${number}`);
        button.classList.toggle("hidden");
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
            <h1>
                Editar Questionário
            </h1>
            <h2>
                "Nome do questionário a ser editado"
            </h2>
            <EditQuizBackground>
                <EditQuestionAnswers>
                    <h1>
                        Pergunta 1
                    </h1>
                    <EditDeleteButton onClick={() => editQuestionValue(0)}> {/* o valor passado como parametro vai ser a posição da resposta no array*/}
                        <Edit />
                        <Delete />
                    </EditDeleteButton>
                </EditQuestionAnswers>
                <InputChange className = {`editQuestionButton${list[0]} hidden`}> {/* o valor passado como parametro vai ser a posição da resposta no array*/}
                    <input type="text" placeholder='Digite a nova pergunta aqui'/>
                    <button>
                        <Confirm />
                    </button>
                </InputChange>
                <EditQuizAnswers>
                    <EditQuestionAnswers>
                        <h2>
                            Resposta 1
                        </h2>
                        <EditDeleteButton onClick={() => editAnswersValue(0)}>
                            <Edit />
                            <Delete />
                        </EditDeleteButton>
                    </EditQuestionAnswers>
                    <InputChange className = {`editAnswersButton${list[0]} hidden`}> {/* o valor passado como parametro vai ser a posição da pergunta no array*/}
                        <input type="text" placeholder='Digite a nova resposta aqui'/>
                        <button>
                            <Confirm />
                        </button>
                    </InputChange>
                    <EditQuestionAnswers>
                        <h2>
                            Resposta 2
                        </h2>
                        <EditDeleteButton onClick={() => editAnswersValue(1)}>
                            <Edit />
                            <Delete />
                        </EditDeleteButton>
                    </EditQuestionAnswers>
                    <InputChange className = {`editAnswersButton${list[1]} hidden`}> {/* o valor passado como parametro vai ser a posição da pergunta no array*/}
                        <input type="text" placeholder='Digite a nova resposta aqui'/>
                        <button>
                            <Confirm />
                        </button>
                    </InputChange>
                </EditQuizAnswers>
                <Form />
            </EditQuizBackground>
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
const EditQuizBackground = styled.div`
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
const EditQuizAnswers = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    width: 100%;
`;
const InputChange = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-beteween;
    gap: 10px;
`;
const EditDeleteButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: space-betwween;
    gap: 5px;
`;
const EditQuestionAnswers = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 5px;
`;