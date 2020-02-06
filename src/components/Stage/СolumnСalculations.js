import React, {Fragment, useEffect, useState, useMemo, useRef} from 'react';
import styled from 'styled-components';
import useStoreon from "storeon/react";
import {Simple} from "./Simple";
const nanoid = require('nanoid')

const Wrapper = styled.div`

`;


const Top = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-bottom: 2px solid black;
`;

const Answer = styled.div`

`;


const parseQuestions = (questions) => {
    const regexp = /{{([^}]+)}}/i;

    const getInfo = () => {

    };

    if (Array.isArray(questions)) {
        return questions.reduce((acc, item, i) => {
            const checkAnswer = Boolean(item.match(regexp));
            const data = {
                answer: checkAnswer && item.match(regexp)[1] || false,
                question: item,
                key: nanoid(i),
            };
            return [...acc, data]
        }, [])
    } else {
        const checkAnswer = Boolean(questions.match(regexp));
        const data = {
            answer: checkAnswer && questions.match(regexp)[1] || false,
            question: questions,
            key: nanoid(5),
        };
        return data;
    }


};


export const ColumnCalculations = ({data, handler}) => {
    const ref = useRef(null);
    const {dispatch, stage, help} = useStoreon('help', 'stage');
    const questions = useMemo(() => parseQuestions(data.questions), [data.questions]);
    const answer = useMemo(() => parseQuestions(data.answer), [data.answer]);
    const [inputs, setInputs] = useState({});

    const inputHandler = (i) => (value) => {
        setInputs({...inputs, [i]: value})
    };


    useEffect(() => {
        const nodes = ref.current.querySelectorAll('input');
        const right = Object.entries(inputs).every((pair, i) => {
            const check = pair[0] === pair[1];
            if (check) {
                nodes[i + 1] && nodes[i + 1].focus();
            }
            return check;
        });
        if (Object.values(inputs).length === nodes.length) {
            if (right) dispatch('stage/next')
        }
    }, [inputs, ref]);

    return (
        <Wrapper ref={ref}>
            <Top direction={data.direction}>
                {questions.map((data => (
                    <Simple
                        key={data.key}
                        answer={data.answer}
                        question={data.question}
                        handlerInput={inputHandler(data.answer)}
                    />
                )))}
            </Top>
            <Answer>
                {answer.answer &&
                <Simple
                    key={'a' + answer.key}
                    answer={answer.answer}
                    question={answer.question}
                    handlerInput={inputHandler(answer.answer)}
                />
                || answer.question}
            </Answer>

        </Wrapper>
    )
};