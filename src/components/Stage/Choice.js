import React, {Fragment, useEffect, useState} from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
   display: flex;
   flex-direction: ${props => props.direction || 'column'};
   justify-content: flex-start;
   align-items: center;
   flex-wrap: wrap;
   margin: 0 auto;
   ${props => {
       if (props.direction === 'row') {
           return `
             margin-top: 2rem;
             max-width: 70%;
             justify-content: center;
           `
       }
    }};
`;

const Elem = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    background-color: #fe0002;
    font-family: 'Boogaloo', cursive;
    font-size: 2rem;
    text-align: center;
    font-weight: 900;
    //border: solid #fff 3px;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
    transition: all 0.2s ease-in;
    /*&:hover {
      background-color: #70b800;
    }*/
    ${props => {
    if (props.direction === 'row') {
        return `
             max-width: 70%;
             justify-content: center;
             margin-top: 1rem;
             &:not(:first-child) {
               margin-left: 1rem;
             }
           `
    } else {
        return `
            &:not(:first-child) {
            margin-top: 1rem;
        }
        `
    }
    }};
    
`;
const Span = styled.span`
  position: relative;
  top: -0.2rem
`;

export const Choice = ({data, handler}) => {
    const [answer, setAnswer] = useState(null);

    const handlerClick = (answer, value) => () => {
        console.log('kick')
        setAnswer({
            right: answer,
            value: value
        });
    };

    useEffect(() => {
        setAnswer(null)
    }, [data]);

    useEffect(() => {
        if (answer) {
            handler(answer)
        }
    }, [answer]);

    return (
        <Wrapper direction={data.direction}>
            {data.items.map((item, i) => {
                return (
                    <Fragment key={i}>
                        <Elem direction={data.direction} onClick={handlerClick(item.right, item.placeholder)}>
                            <Span>
                                {item.placeholder}
                            </Span>
                        </Elem>
                    </Fragment>
                )
            })}
        </Wrapper>
    )
};