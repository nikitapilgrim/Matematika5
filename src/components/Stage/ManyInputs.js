import React, {useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react';
import {useRafState, useMount} from 'react-use';
import styled, {css} from 'styled-components';
import useStoreon from "storeon/react";
import {Simple} from "./Simple";
import reactStringReplace from 'react-string-replace';

const nanoid = require('nanoid');

const justify = css`
    text-align: justify;
    text-align-last: justify;
    vertical-align: middle;
`;


const Inputs = styled.div`
  max-width: 100%;
  display: flex;
  flex-direction: ${props => props.direction === 'row' ? 'row' : 'column'};
  justify-content: flex-start;
  color: white;
  font-size: ${props => {
      if (!props.left) return '1.9em';
      if (props.lenght > 50) return '120%';
      if (props.lenght > 40) return '150%';
      return '1.9em';
  }};
  & > div {
     margin-top: 0.1em;
     word-spacing: 0em;
     
    }
     & > div {
      display: block;
      ${props => props.justify && justify}
       
       & > div {
          display: inline-flex;
          position: relative;
          top: 0.3em
       }
     }
  }
`;

const Row = styled.div`
  display: ${props => props.beetween ? 'flex !important' : 'flex'};;
  justify-content: ${props => props.beetween ? 'flex-end !important' : 'space-between'};
  align-items: center;
  font-family: 'Mali', cursive;
`;

const Left = styled.div`
  position: relative;
  top: 0.5em;
  font-family: 'Mali', cursive;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 400;
  margin-right: 1rem;
`;

const Label = styled.div`
  position: relative;
  font-family: 'Mali', cursive;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 400;
  margin-right: 1rem;
  top: 0 !important;
  margin-top: 0.6em;
`;

const SizeContainer = styled.span`

`;

const parseQuestions = (questions) => {
    const regexp = /{{([^}]+)}}/ig;
    const reg = /{{([^}]+)}}/i;
    return questions.reduce((acc, item, i, array) => {
        const data = {
            answers: item.question.match(regexp).map((item, i) => ({
                answer: item.match(reg)[1],
                id: i,
                key: nanoid(2)
            })),
            question: item.question,
            key: nanoid(5),
            img: item.img,
            separator: item.separator,
            length: array.length,
            label: item.label,
            offset: item.offset
        };
        return [...acc, data]
    }, [])

};

export const ManyInputs = React.memo(({data, handler, layout}) => {
    const [inputs, setInputs] = useState({});
    const ref = useRef(null);
    const questions = useMemo(() => parseQuestions(data.questions), [data.questions]);
    const [size, setSize] = useRafState(null);

    const questionLength = useMemo(() => {

        if (questions && questions[0].question) {
            return questions[0].question.length;
        }
        return null
    }, [questions]);

    useLayoutEffect(() => {
        setTimeout(() => {
            if (ref.current) {
                const nodes = ref.current.querySelectorAll('input');
                if (nodes) {
                    const sizes = [...nodes].map(elem => elem.offsetWidth);
                    const max = Math.max(...sizes);
                    if (size !== max) setSize(max)
                }
            }
        }, 0)
    }, [data, ref]);

    const inputHandler = (i, pos) => (value) => {
        setInputs({
            ...inputs, [`${pos.row}_${pos.col}`]: {
                value,
                answer: i
            }
        })
    };

    useEffect(() => {
        setInputs({});
    }, [data]);

    useEffect(() => {
        if (ref && ref.current) {
            const nodes = ref.current.querySelectorAll('input');
            const right = Object.entries(inputs).every((pair, i) => {
                const [key, value] = pair;
                const check = value.value === value.answer;
                if (check === true) nodes[i + 1] && nodes[i + 1].focus();
                return check
            });
            if (nodes.length && Object.values(inputs).length === nodes.length) {
                if (right) handler(true)
            }
        }
    }, [inputs, ref]);


    return (
        <Inputs lenght={questionLength} left={data.left} justify={!data.left} ref={ref} direction={(Boolean(data.left) ? 'row' : 'column')  || data.direction}>
            {data.left && <Left>{data.left}</Left>}
            {questions.map((item, row, length) => {
                return (
                    <Row beetween={item.label} key={item.key + row}>
                        {item.label && <Label>{item.label}</Label>}
                        {reactStringReplace(item.question, /{{([^}]+)}}/g, (match, col) => {
                            return (
                                <Simple
                                    inputOffset={item.offset}
                                    size={!data.left && size}
                                    layout={layout}
                                    img={data.img}
                                    direction={'row'}
                                    handlerInput={inputHandler(match, {row, col})}
                                    key={item.key + col}
                                    answer={match}
                                />
                            )
                        })}
                    </Row>
                )
            })}

        </Inputs>
    )
});