import React, {useEffect, useMemo, useRef, useState} from 'react';
import styled from 'styled-components';
import useStoreon from "storeon/react";
import {Simple} from "./Simple";

const nanoid = require('nanoid');

const Wrapper = styled.div`
  color: #fff;
  font-size: 2rem;
  font-family: 'Mali', cursive;
`;

const Row = styled.div`
    margin-top: 0.3em;
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
  text-align: center;
`;

const Sign = styled.div`
  position: absolute;
  left: -1.5rem;
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


export const ColumnCalculations = React.memo(({data, handler, layout}) => {
    const ref = useRef(null);
    const questions = useMemo(() => parseQuestions(data.questions), [data.questions]);
    const answer = useMemo(() => parseQuestions(data.answer), [data.answer]);
    const all = useMemo(() => ([...questions, answer]), [questions, answer]);
    const [sign, setSign] = useState(null);
    const [inputs, setInputs] = useState({});

    const inputHandler = (key) => (value) => {
        setInputs({...inputs, [key]: value})
    };

    useEffect(() => {
        if (data.sign) {
            setSign(data.sign)
        } else {
            setSign(null)
        }
        setInputs({})
    }, [data]);

    useEffect(() => {
        if (Object.values(inputs).length && ref && ref.current) {
            const nodes = ref.current.querySelectorAll('input');
            const right = Object.entries(inputs).every((pair, i) => {
                const [key, value] = pair;
                const compareValue = all.find(item => item.key === key);
                const right = compareValue.answer === value;
                if (right) {
                    if (nodes[i + 1]) {
                        nodes[i + 1].focus()
                    }
                }
                return right;
            });
            if (nodes.length && Object.values(inputs).length === nodes.length) {
                if (right) handler(true)
            }
        }
    }, [inputs, ref]);

    return (
        <Wrapper ref={ref}>
            <Top direction={data.direction}>
                {questions.map(((data, i, arr) => (
                    <Row>
                        <Simple
                            key={data.key}
                            answer={data.answer}
                            question={data.question}
                            handlerInput={inputHandler(data.key)}
                            layout={layout}
                        >
                            {i === arr.length - 1 && <Sign>{sign}</Sign>}
                        </Simple>
                    </Row>
                )))}
            </Top>
            <Answer>
                {answer.answer &&
                <Simple
                    answer={answer.answer}
                    question={answer.question}
                    handlerInput={inputHandler(answer.key)}
                    layout={layout}
                />
                || answer.question}
            </Answer>

        </Wrapper>
    )
});