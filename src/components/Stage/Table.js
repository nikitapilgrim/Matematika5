import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {usePlaceholder} from "../../hooks/usePlaceholder";
import {Simple} from "./Simple";
import {useMount} from "react-use";


const Wrapper = styled.table`
   border-collapse: collapse;
   background: #FFF;
   th, td {
      border: 1px solid black;
      min-width: 4rem;
      height: 4rem;
   }
`;


const Cell = ({data, onRight, onInit, handler}) => {
    const {placeholder, text} = usePlaceholder(data);

    useMount(() => {
        if (!placeholder) onInit(text);
    });

    return (
        <td>
            <Simple handlerInput={handler(text)} theme={'table'} disabled={placeholder} placeholder={placeholder} answer={text}/>
        </td>
    )
};

export function Table({data, handler}) {
    const [inputs, setInputs] = useState({});

    const handlerInput = (tr, td) => answer => (value) => {
        if (value === answer) {
            setInputs({...inputs, ...{[`${tr}${td}`]: true}})
        } else {
            setInputs({...inputs, ...{[`${tr}${td}`]: false}})
        }
    };

    const handlerInit = (tr, td) => (answer) => {
        setInputs(prev => {
            return {...prev, ...{[`${tr}${td}`]: false}}
        })
    };

    useEffect(() =>  {
        if (Object.values(inputs).length > 0) {
            const right = Object.values(inputs).every((input => input));
            if (right) {
                handler(true)
            }
        }
    }, [inputs]);

    return (
        <Wrapper>
            <tbody>
            {data.question.map((tr, trI) => {
                return (
                    <tr key={tr}>
                        {tr.map((td, tdI) => {
                            return (
                                <Cell onInit={handlerInit(trI, tdI)} handler={handlerInput(trI, tdI)} key={td} data={td}/>
                            )
                        })}
                    </tr>
                )
            })}
            </tbody>
        </Wrapper>
    )
}