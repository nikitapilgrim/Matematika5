import React from "react";
import styled, {keyframes} from "styled-components";
import useStoreon from "storeon/react";
import {Scale} from "./Animate/Slide";
import menuobjects from "../assets/image/final/final-stage-background.png";
import button from "../assets/image/final/final-stage-button.png";
import {Sound} from "./Sound";
import {Menu} from "./Menu";

const Wrapper = styled.div`
  position: fixed;
  z-index: 5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${props => props.show !== null && Scale};
`;

const pulse = keyframes`
  0% { transform: scale(1) translateY(50%);}
    30% { transform: scale(1) translateY(50%); }
    40% { transform: scale(1.08) translateY(50%); }
    50% { transform: scale(1) translateY(50%); }
    60% { transform: scale(1) translateY(50%); }
    70% { transform: scale(1.05) translateY(50%); }
    80% { transform: scale(1) translateY(50%); }
    100% { transform: scale(1)   translateY(50%); }
`;

const MenuObjectsWrapper = styled.div`
  position: relative;
  z-index: 2;
  width: 40rem;
  button {
    background: none;
    border: none;
    cursor: pointer;
  }
  img {
    max-width: 100%;
  }
`;

const Buttons = styled.div`
      height: 100%;
      width: 100%;
     position: absolute;
     z-index: 999;
`


const ButtonSound = styled.div`
  top: 5rem;
  right: 12rem;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4.2rem; height: 4.2rem;
  border: 0.1em solid #000;
  border-radius: 50% 50%;
  background-color: #B12A17;
  cursor: pointer;
  transform: rotate(-25deg);
  &:not(:first-child) {
    margin-left: 1rem;
  }
  filter: drop-shadow(0 0 10px #FFF)
`;

const FakeButton = styled.button` 
  background: none;
  border: none;
  cursor: pointer;
  width: 20rem;
  position: absolute;
  z-index: 99;
  bottom: 50%;
  transform: translateY(50%);
  outline: none;
  user-select: none;      
  animation-name: ${pulse};
  animation-duration: 5000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  img {
    position: relative;
    max-width: 100%;
  }
`;
export const Final = () => {
    const {dispatch, countCorrectAnswers, countQuestions, final} = useStoreon('countCorrectAnswers', 'countQuestions', 'final');

    const handlerPlayAgain = () => {
        dispatch('stage/final', false);
        dispatch('stage/to', 0)
    };

    return (
        <Wrapper show={final}>
            <MenuObjectsWrapper>
                <img src={menuobjects} alt=""/>
            </MenuObjectsWrapper>
            <Buttons>

                <ButtonSound>
                    <Sound/>
                </ButtonSound>
            </Buttons>
            <FakeButton onClick={handlerPlayAgain}>
                <img src={button} alt=""/>
            </FakeButton>
        </Wrapper>
    )
};