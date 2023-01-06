import axios from 'axios';
import React, { useContext } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { Link } from "react-router-dom";

export default function Form(){

    const navigate = useNavigate();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordConfirm, setPasswordConfirm] = React.useState('');
    const [username, setUsername] = React.useState('');

    function resetFields(){
        setEmail('');
        setPassword('');
        setPasswordConfirm('');
        setUsername('');
    }
    async function login(e){
        /*e.preventDefault();
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
        
        <LoginForm onSubmit = {login}>
            <input type="text" onChange = {(e) => setUsername(e.target.value)} value = {username} placeholder='Nome'/>
            <input type="email" onChange = {(e) => setEmail(e.target.value)} value = {email} placeholder='E-mail'/>
            <input type="password" onChange = {(e) => setPassword(e.target.value)} value = {password} placeholder='Senha'/>
            <input type="password" onChange = {(e) => setPasswordConfirm(e.target.value)} value = {passwordConfirm} placeholder='Confirme sua senha'/>
            <Buttons>
                <Link to="/">
                    <LinkToSingUp>
                        Já possuo cadastro
                    </LinkToSingUp>
                </Link>
                <Button type="submit">
                    <h3>CADASTRAR</h3>
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