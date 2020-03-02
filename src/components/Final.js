import React, {useEffect} from "react";
import styled, {keyframes} from "styled-components";
import useStoreon from "storeon/react";
import {Scale} from "./Animate/Slide";
import menuobjects from "../assets/image/final/final-stage-background.png";
import button from "../assets/image/final/final-stage-button.png";
import {Sound} from "./Sound";
import {MenuWithouModal} from "./Menu";
import {sounds} from "../sounds";

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
    display: flex;
    justify-content: space-between;
    align-items: center;
    top: 3rem;
      height: 20%;
      width: 100%;
     position: absolute;
     z-index: 999;
`


const HiddenWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position:relative;
    padding: 0.5em;
    transition: filter 1s;
  
`;
const HiddenWrapp = React.forwardRef(({children, hide, round}, ref) => {
    return (
        <HiddenWrapper ref={ref} round={round} onClick={e => {
            sounds.mouseclick.play()
        }} hide={hide}>
            {children}
        </HiddenWrapper>
    )
});


const ButtonSound = styled.div`
  top: -0.2rem;
  right: 12rem;
  position: absolute;
`;
const MenuSound = styled.div`
  transform: rotate(-8deg);
  top: -0.2rem;
  left: 12rem;
  position: absolute;
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

    const handlerShowMenu = () => {
        setTimeout(() => {
            dispatch('waitDesk', false);
        }, 1000);
        dispatch('modal/show');
        dispatch('stage/final', false);
        dispatch('waitDesk', true);
    };

    return (
        <Wrapper show={final}>
            <MenuObjectsWrapper>
                <img src={menuobjects} alt=""/>
            </MenuObjectsWrapper>
            <Buttons>

                <HiddenWrapp hide={false}>
                    <MenuSound onClick={handlerShowMenu}>
                        <MenuWithouModal color={'#FFF'}/>
                    </MenuSound>
                </HiddenWrapp>

                <HiddenWrapp hide={false}>
                    <ButtonSound>
                        <Sound color={'#FFF'}/>
                    </ButtonSound>
                </HiddenWrapp>


            </Buttons>
            <FakeButton onClick={handlerPlayAgain}>
                <img src={button} alt=""/>
            </FakeButton>
        </Wrapper>
    )
};