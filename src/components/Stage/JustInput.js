import React, {useEffect, useMemo, useState} from "react";
import {Simple} from "./Simple";
import useStoreon from "storeon/react";
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const WrapperInput = styled.div`
    font-size: 2rem;
    margin-top: 2rem;
`;

const parseQuestions = (questions) => {
    const regexp = /{{([^}]+)}}/i;
    const checkAnswer = Boolean(questions.match(regexp));
    return {
        answer: checkAnswer && questions.match(regexp)[1] || false,
        question: questions,
        key: 0,
    };
};

const Text = styled.span`
    font-family: 'Mali', cursive;
    font-weight: normal;
    font-size: 2rem;
    color: #fff;
    margin-right: 0.3em;
`;

export const JustInput = ({data}) => {
    const questions = useMemo(() => parseQuestions(data.questions), [data.questions]);
    const [input, setInput] = useState("");
    const {dispatch, stage, help} = useStoreon('help', 'stage');

    useEffect(() => {
        setInput("")
    }, [data]);

    useEffect(() => {
        if (questions.answer === input) dispatch('stage/next')
    }, [input]);

    const inputHandler = (value) => {
        setInput(value)
    };

    return (
        <Wrapper>
            <Text>{data.textInput}</Text>
            <WrapperInput>
                <Simple
                    answer={questions.answer}
                    handlerInput={inputHandler}
                />
            </WrapperInput>
        </Wrapper>
    )
};