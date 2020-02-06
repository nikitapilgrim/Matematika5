import React, {useState, useMemo, useEffect, useRef} from 'react';
import styled from 'styled-components';
import useStoreon from "storeon/react";
import {Simple} from "./Simple";
import reactStringReplace from 'react-string-replace';
const nanoid = require('nanoid')

const Inputs = styled.div`
  display: flex;
  flex-direction: ${props => props.direction === 'row' ? 'row' : 'column'};
  justify-content: flex-start;
  & > div {
    margin-top: 0.5em;
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 2em;
`;

const parseQuestions = (questions) => {
    const regexp = /{{([^}]+)}}/ig;
    const reg = /{{([^}]+)}}/i;
    return questions.reduce((acc, item, i) => {
        const data = {
            answers: item.question.match(regexp).map((item, i) => ({answer: item.match(reg)[1],id: i, key: nanoid(2)})),
            question: item.question,
            key: nanoid(5),
            img: item.img,
            separator: item.separator
        };
        return [...acc, data]
    }, [])

};

export const ManyInputs = ({data, handler}) => {
    const [inputs, setInputs] = useState({});
    const ref = useRef();
    const {dispatch, stage, help} = useStoreon('help', 'stage');
    const questions = useMemo(() => parseQuestions(data.questions), [data.questions]);
    const simpleDirection = data.direction === 'row' ? 'column' : 'row';

    const inputHandler = (i, pos) => (value) => {
        setInputs({...inputs, [`${pos.row}_${pos.col}`]: {
                value,
                answer: i
            }})
    };

    useEffect(() => {
        setInputs({});
        if (ref.current) {
        }
    }, [data, ref]);

    useEffect(() => {
        if (ref && ref.current) {
            const nodes = ref.current.querySelectorAll('input');
            const right = Object.entries(inputs).every((pair, i) => {
                const [key, value] = pair;
                const check = value.value === value.answer;
                if (check === true) nodes[i + 1] && nodes[i + 1].focus()
                return check
            });
            if (Object.values(inputs).length === nodes.length) {
                if (right) dispatch('stage/next')
            }
        }
    }, [inputs,ref]);



    return (
        <Inputs ref={ref} direction={data.direction}>
            <Left>{data.left}</Left>
            {questions.map((item, row) => {
                return (
                    <Row key={item.key+row}>
                        {reactStringReplace(item.question, /{{([^}]+)}}/g, (match, col) => {
                            return (
                                <Simple
                                    img={data.img}
                                    direction={'row'}
                                    handlerInput={inputHandler(match, {row,col})}
                                    key={item.key+col}
                                    answer={match}
                                />
                            )
                        })}
                    </Row>
                )
            })}

        </Inputs>
    )
};