import React, {useState, useEffect} from 'react';
import styled, {keyframes} from "styled-components";
import {sounds} from "../sounds";
import {Sound} from "./Sound";
import {MenuWithouModal} from "./Menu";
import {Scale} from "./Animate/Slide";
import useStoreon from "storeon/react";
import menuobjects from '../assets/image/intro/frontelements.png'
import kids from '../assets/image/intro/kids-rotation.png'
import bg from "../assets/background-image.jpg";

import nanoid from "nanoid";
import soundhint from '../assets/image/sound-hint.png';
import menuhint from '../assets/image/intro/menu-hint.png';
import useKeyPressEvent from "react-use/lib/useKeyPressEvent";

const pulse = keyframes`
  0% {
      transform: scale(1) rotate(25deg) translate(0%, 0%);
  }
  80% {
      transform: scale(1.2) rotate(25deg) translate(5%, -5%);
  }
  100% {
      transform: scale(1) rotate(25deg) translate(0%, 0%);
  }
`;
const pulseMenu = keyframes`
  0% {
      transform: scale(1)  translate(0%, 0%);
  }
  80% {
      transform: scale(1.2) translate(5%, -5%);
  }
  100% {
      transform: scale(1)  translate(0%, 0%);
  }
`;

const SoundHint = styled.div`
  position: absolute;
  width: 10rem;
  right: -11rem;
  top: -6rem;
  animation: ${pulse} 2s ease 0s infinite;
  
  img {
    height: auto;
    max-width: 100%;
    user-select: none;
    pointer-events: none;
  }
`;

const MenuHint = styled.div`
  position: absolute;
 width: 10rem;

right: 5rem;

top: -8rem;
  animation: ${pulseMenu} 2s ease 0s infinite;
  
  img {
    height: auto;
    max-width: 100%;
    user-select: none;
    pointer-events: none;
  }
`;

const rotate = keyframes`
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
`;

const ChildrenRotateBG = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  animation: ${rotate} 40s linear infinite;
  background: url(${kids});
  background-size: cover;
  width: 50rem;
  height: 50rem;
  pointer-events: none;
  will-change: tranform;
`;

const Wrapper = styled.div`
  position: fixed;
  z-index: 5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${props => props.show !== null && Scale};
`;

const Buttons = styled.div`
  position: absolute;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 10%;
  right: 24%
`;

const ButtonWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  
`;

const Button = styled.div`
  position: relative;
  display: flex;
  left: -0.5rem;

top: 1rem;
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

const ButtonMenu = styled.div`
  position: absolute;
  left: -14.5rem;
  top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4.2rem; height: 4.2rem;
  border: 0.1em solid #000;
  border-radius: 50% 50%;
  background-color: #B12A17;
  cursor: pointer;
  &:not(:first-child) {
    margin-left: 1rem;
  }
  filter: drop-shadow(0 0 10px #FFF);
  svg {
      position: relative;
      top: 0.1rem;
  }
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

const FakeButton = styled.button`
  position: relative;
  background: none;
  border: none;
  outline: none;
  user-select: none;      
  img {
    position: relative;
  }
`;

const Pos = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;
  top: 0.1em;
`;

export const Intro = React.memo(({show}) => {
    const {dispatch, countCorrectAnswers, countQuestions, final, showDesk, modal} = useStoreon('countCorrectAnswers', 'countQuestions', 'showDesk', 'final', 'modal');
    const [id] = useState(nanoid(20));
    const [isShow, setIsShow] = useState(false);

    const handlerShowMenu = () => {
        setIsShow(false);
        setTimeout(() => {
            dispatch('showDesk', true);
            setTimeout(() => {
                dispatch('modal/show');
            }, 500)
        }, 300);
    };

    const onCloseModal = () => {
        if (modal) {
            dispatch('modal/hide');
            dispatch('showDesk', false);
            setTimeout(() => {
                setIsShow(true);
            }, 300);
        }
    };

    useKeyPressEvent('Escape', onCloseModal);

    const handlerStart = (e) => {
        sounds.mouseclick.play();
        const target = e.target;
        setTimeout(() => {
            setIsShow(false);
            setTimeout(() => {
                dispatch('game/start')
            }, 500)
        }, 100)
    };

    useEffect(() => {
        if (show) setIsShow(true)
    }, [show]);

    return (
        <Wrapper key={id} show={isShow}>
            <MenuObjectsWrapper>
                <ChildrenRotateBG/>
                <Buttons>
                    <ButtonMenu onClick={handlerShowMenu}>
                        <MenuWithouModal color={'#FFF'} size={{width: '60%', height: '60%'}}/>
                        <MenuHint>
                            <img src={menuhint} alt=" "/>
                        </MenuHint>
                    </ButtonMenu>
                    <Button>
                        <Sound color={'#FFF'} size={{width: '80%', height: '80%'}}/>
                        <SoundHint>
                            <img src={soundhint} alt=" "/>
                        </SoundHint>
                    </Button>
                </Buttons>
                <FakeButton onClick={handlerStart}>
                    <img src={menuobjects} alt=""/>
                </FakeButton>
            </MenuObjectsWrapper>
        </Wrapper>
    )
});