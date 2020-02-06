import React from 'react';
import styled from "styled-components";
import arrow from '../../assets/image/arrow.png'

const Wrapper = styled.div`
  font-family: 'Boogaloo', cursive;
  font-size: 2rem;
  text-align: center;
`;

const Image = styled.div`
  width: 7rem;
  margin: 2rem;
  margin-top: 5rem;
  img {
    max-width: 100%;
  }
`

const Question = styled.div`
  position:relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Left = styled.div`
  position:relative;
  width: 7rem;
  button {
    left: -3rem;
  }
  img {
    position: absolute;
    top: -8.3rem;
    max-width: 100%;
    left: 1rem;
  }
`;

const Right = styled.div`
  position:relative;
  width: 7rem;
  button {
    right: -2rem;
  }
  img {
    position: absolute;
    top: -8.3rem;
    max-width: 100%;
    left: -1rem;
    transform: scale(-1, 1)
  }
`;

const Title = styled.div`
  position: absolute;
  top: -2rem;
`
const Button = styled.button`
  cursor: pointer;
  min-width: 8rem;
  position: relative;
  top: 3rem;
  color: white;
  background: #f90300;
  border-radius: 0.5rem;
    border: none;
    padding: 0.3rem 1.5rem;
    outline: none;
    text-transform: uppercase;
    font-weight: 900;
`;

export function Between({data, handler}) {
    const {question} = data;

    const handlerClick = (answer) => () => {
        if (answer) {
            handler(true)
        }
    };

    return (
        <Wrapper>
            <Question>
                <Title>{question.text}</Title>
                <Left>
                    <Button onClick={handlerClick(question.answers[0].right)}>{question.answers[0].text}</Button>
                    <img src={arrow} alt=""/>
                </Left>
                <Image>
                    <img src={question.img} alt=""/>
                </Image>
                <Right>
                    <Button onClick={handlerClick(question.answers[1].right)}>{question.answers[1].text}</Button>
                    <img src={arrow} alt=""/>
                </Right>
            </Question>

        </Wrapper>
    )
}