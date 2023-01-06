import React from 'react';
import Form from './Form';
import styled from 'styled-components';

export default function SignUpPage() {

    return (
        <Content>
            <h5>Cadastre-se!</h5>
            <Login>
                <Form />
            </Login>
        </Content>
    )
}

const Content = styled.div`
    h5{
        font-wight: bold;
        color: white;
    }
    padding: 50px 100px;
    border-radius: 50px;
    background-color: #133780;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 45%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    gap: 100px;
    width: 1000px;
`;
const Login = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 30px;
`;