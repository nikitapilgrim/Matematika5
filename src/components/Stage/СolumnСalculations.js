import React, {useEffect, useMemo, useRef, useState} from 'react';
import styled from 'styled-components';
import useStoreon from "storeon/react";
import {Simple} from "./Simple";

const nanoid = require('nanoid');

const Wrapper = styled.div`
  color: #fff;
`;


const Top = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #FFF;
`;

const Answer = styled.div`
  margin-top: 1rem;
`;

const Sign = styled.div`
  position: absolute;
  left: -0.5rem;
  bottom: 0.5rem;
  font-size: 2rem;
`;

const parseQuestions = (questions) => {
    const regexp = /{{([^}]+)}}/i;

    const getInfo = () => {

    };

    if (Array.isArray(questions)) {
        return questions.reduce((acc, item, i) => {
            const reg = new RegExp('^\\d+$');
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
        if (nodes.length && Object.values(inputs).length === nodes.length) {
            if (right) handler(true)
        }
    }, [inputs, ref]);

    return (
        <Wrapper ref={ref}>
            <Top direction={data.direction}>
                {questions.map((data => (
                    <Simple
                        key={data.key + data.answer}
                        answer={data.answer}
                        question={data.question}
                        handlerInput={inputHandler(data.answer)}
                    />
                )))}
                <Sign>{data.sign}</Sign>
            </Top>
            <Answer>
                {answer.answer &&
                <Simple
                    answer={answer.answer}
                    question={answer.question}
                    handlerInput={inputHandler(answer.answer)}
                />
                || answer.question}
            </Answer>

        </Wrapper>
    )
};