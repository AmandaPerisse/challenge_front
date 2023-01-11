import axios from 'axios';
import React, { useContext } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { Link } from "react-router-dom";
import UserContext from '../../providers/UserContext';

export default function Form(){

    const [cpf, setCpf] = React.useState('');
    const [password, setPassword] = React.useState('');

    const { userId, setUserId } = useContext(UserContext);


    const navigate = useNavigate();
    function resetFields(){
        setCpf('');
        setPassword('');
    }
    async function login(e){
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:5000/sign-in', {
                cpf: cpf,
                password: password
            });
            const data = response.data;
            if(data){
                setUserId(data.data);
                navigate('/home');
            }
            else{
                alert('Cpf ou senha inválidos!');
                resetFields();
            }
        }
        catch(e){
            alert('Usuário ou senha incorreto!');
            resetFields();
        }
    }

    return (
        
        <LoginForm onSubmit = {login}>
            <input type="text" onChange = {(e) => setCpf(e.target.value)} value = {cpf} placeholder='CPF'/>
            <input type="password" onChange = {(e) => setPassword(e.target.value)} value = {password} placeholder='Senha'/>
            <Buttons>
                <Link to="/sign-up">
                    <LinkToSingUp>
                        Não possuo cadastro
                    </LinkToSingUp>
                </Link>
                <Button type="submit">
                    <h3>ENTRAR</h3>
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
    gap: 10px;
`;
const Buttons = styled.div`
	display: flex;
    align-items: center;
    justify-content: space-between;
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
const LinkToSingUp = styled.h4`
	text-decoration: underline;
    color: #94CC1F;
    letter-spacing: 0.15px;
`;