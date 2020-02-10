import React, {useEffect, useMemo, useRef, useState} from 'react';
import styled from 'styled-components';
import useStoreon from "storeon/react";
import {Simple} from "./Simple";
import reactStringReplace from 'react-string-replace';

const nanoid = require('nanoid')

const Inputs = styled.div`
  display: flex;
  flex-direction: ${props => props.direction === 'row' ? 'row' : 'column'};
  justify-content: flex-start;
  color: white;
  & > div {
     margin-top: 0.5em;
     
    }
     & > div {
      display: block;
      text-align: justify;
     text-align-last: justify;
     vertical-align: middle;
       
       & > div {
          display: inline-flex;
          position: relative;
          top: 0.3em
       }
     }
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'Boogaloo', cursive;
  font-size: 2rem;
  
  
`;

const Left = styled.div`
  position: relative;
  top: 0.5em;
  font-family: 'Boogaloo', cursive;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 2em;
  margin-right: 1rem;
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

export const ManyInputs = React.memo(({data, handler, layout}) => {
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
    }, [data]);

    useEffect(() => {
        if (ref && ref.current) {
            const nodes = ref.current.querySelectorAll('input');
            const right = Object.entries(inputs).every((pair, i) => {
                const [key, value] = pair;
                const check = value.value === value.answer;
                if (check === true) nodes[i + 1] && nodes[i + 1].focus()
                return check
            });
            if (nodes.length && Object.values(inputs).length === nodes.length) {
                if (right) handler(true)
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
                                    layout={layout}
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
});