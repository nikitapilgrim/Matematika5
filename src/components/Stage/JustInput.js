import React, {useEffect, useMemo, useState} from "react";
import {Simple} from "./Simple";
import useStoreon from "storeon/react";


const parseQuestions = (questions) => {
    const regexp = /{{([^}]+)}}/i;
    const checkAnswer = Boolean(questions.match(regexp));
    return {
        answer: checkAnswer && questions.match(regexp)[1] || false,
        question: questions,
        key: 0,
    };
};

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
        <Simple
            answer={questions.answer}
            question={questions.question}
            handlerInput={inputHandler}
        />
    )
};