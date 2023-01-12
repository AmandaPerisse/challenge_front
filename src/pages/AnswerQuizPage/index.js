import React, { useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router';

export default function HomePage() {

    const navigate = useNavigate();

    const [questions, setQuestions] = React.useState([]);
    const [answers, setAnswers] = React.useState([]);
    const [title, setTitle] = React.useState("");
    const [quizId, setQuizId] = React.useState(0);

    let nameQuiz = JSON.parse(localStorage.getItem('nameQuiz'));
    let userId = JSON.parse(localStorage.getItem('userId'));

    let answersAmount = 0;
    let questionsAmount = questions.length;
    let hasAnswered = false;

    function chosenAnswer(nQuestion, nAnswer){
        hasAnswered = false;
        const questionAnswers = document.querySelectorAll(`.questionAnswers${nQuestion+1}`)[0].children;
        for(let i = 1; i < questionAnswers.length; i++){
            if(questionAnswers[i].classList.contains("disabled")){
                hasAnswered = true;
            }
            questionAnswers[i].classList.remove("disabled");
        }
        for(let i = 1; i < questionAnswers.length; i++){
            if(i != nAnswer+1){
                questionAnswers[i].classList.add("disabled");
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

    async function save(e){
        e.preventDefault();
        try{
            const promise = await axios.post(`http://localhost:5000/quizzes/quiz/save`, {
                userId: userId,
                quizId: quizId
            });
        }
        catch(e){
            alert('Falha.');
        }
        navigate("/home");
    }
    
    const fetchData = async () => {
        const promise = await axios.post(`http://localhost:5000/quizzes/quiz`, {
            name: nameQuiz
        });
        const { data } = promise;
        setTitle(data.data.title);
        setQuestions(data.data.questions);
        setAnswers(data.data.answers);
        setQuizId(data.data.quizId);
    }

    useEffect(() => {
        try{
            fetchData();
        }
        catch(e){
            alert('Falha.');
        }
    }, []);

    function RenderAnswers({ question }){
        let order = 0;
        let questionPosition = question-1;
        if (answers[questionPosition]){
            return (
                answers[questionPosition].map(answer => {
                    order++;
                    let answerPosition = order-1;
                    return(
                        <ButtonAnswer key = {order} onClick = {() => chosenAnswer(questionPosition, answerPosition)}>
                            <h2>
                                {answer.description}
                            </h2>
                        </ButtonAnswer>
                    )
                })
            )
        }
        else{
            return null;
        }
    }

    function RenderQuestions(){
        let order = 0;
        if (questions){
            return (
                questions.map(question => {
                    order++;
                    return(
                        <AnswerQuizBackground key = {order} className = {`questionAnswers${order}`}>
                            <h1>
                                {question.description}
                            </h1>
                            <RenderAnswers question = {order} />
                        </AnswerQuizBackground>
                    )
                })
            )
        }
        else{
            return null;
        }
    }

    return (
        <Content>
            <ContentBackground>
                <h1>
                    {title}
                </h1>
                <RenderQuestions />
                <AnswerForm onSubmit = {save}>
                    <FormButtons>
                        <FormButton onClick={cancel}>
                            <h3>CANCELAR</h3>
                        </FormButton>
                        <FormButton className = "finishAnswers hidden" type="submit">
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