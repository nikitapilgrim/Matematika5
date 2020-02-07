import React, {useEffect, useReducer} from "react";
import styled from "styled-components";
import {Simple} from "./Simple";
import refresh from '../../assets/image/refresh.png'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Refresh = styled.button`
   width: 2rem;
   height: 2rem;
   background: none;
   border: none;
   cursor: pointer;
   outline: none;
   padding: 0;
   img {
     max-width: 100%;
   }
`;

const Input = styled.input`
  background-color: #cebca4;
  padding: 0.5rem;
  border: 1px solid black;
  border-radius: 3px;
`;

function init(data) {
    return {
        value: data.question,
        cache: data.question
    };
}

function reducer(state, action) {
    switch (action.type) {
        case 'setValue':
            return {
                ...state, value: action.payload
            };
        case 'reset':
            return init(action.payload);
        default:
            throw new Error();
    }
}

export function EditCorrect({data}) {
    const {answer, question} = data;
    const [state, dispatch] = useReducer(reducer, data, init);

    useEffect(() =>  {
        dispatch({type: 'reset', payload: data})
    }, [data]);

    const handlerOnChange = (val) => {
        dispatch({type: 'setValue', payload: val})
    };

    const handlerRefresh = () => {
        dispatch({type: 'reset', payload: data})
    };

    return (
        <Wrapper>
            <Simple
                value={state.value}
                edit={true}
                placeholder={question}
                handlerInput={handlerOnChange}
                answer={answer}
                />
            <Refresh onClick={handlerRefresh}>
                <img src={refresh} alt=""/>
            </Refresh>
        </Wrapper>
    )
}