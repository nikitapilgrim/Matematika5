import React, {useState, useEffect} from 'react';
import styled, {keyframes} from "styled-components";
import {sounds} from "../sounds";
import {Sound} from "./Sound";
import {Menu} from "./Menu";
import {Scale} from "./Animate/Slide";
import useStoreon from "storeon/react";
import menuobjects from '../assets/image/intro/Frontelements.png'
import kids from '../assets/image/intro/kids-rotation.png'
import bg from "../assets/background-image.jpg";

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
  animation: ${rotate} 10s linear infinite;
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
  right: 25%
`;

const ButtonWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  
`;

const Button = styled.div`
  position: relative;
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

const Blur = styled.div`
    ${props => props.blur ? 'filter: blur(10px)' : ''}; //brightness(0.70) saturate(130%);
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: ${props => props.zIndex || '-1'};
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    transition: filter 1s;
    ${props => !props.bgNone && `background: url(${bg});`};
    background-size: cover;
    background-position: 50% 50%;
    backface-visibility: hidden;
    perspective: 1000;
    transform: translate3d(0,0,0);
    transform: translateZ(0);
`;

export const Intro = () => {
    const [isShow, setIsShow] = useState(false);
    const [blured, setBlured] = useState(false);
    const {dispatch, preloader} = useStoreon('start', 'preloader');

    const handlerStart = (e) => {
        sounds.mouseclick.play();
        const target = e.target;
        setTimeout(() => {
            setIsShow(false);
            setBlured(false);
            target.style.top = '0';
            setTimeout(() => {
                dispatch('game/start')
            }, 500)
        }, 100)
    };

    useEffect(() => {
        if (preloader.count === 100) {
            setTimeout(() => {
                setBlured(true);
                setTimeout(() => {
                    setIsShow(true)
                }, 1000)
            }, 1000);
        }
    }, [preloader.count]);

    return (
        <>
            <Blur className={'intro-blur'} bgNone={false} zIndex={1} blur={blured}/>
            <Wrapper show={isShow}>
                <MenuObjectsWrapper>
                    <ChildrenRotateBG/>
                    <Buttons>
                        <Button>
                            <Sound color={'#FFF'} size={{width: '80%', height: '80%'}}/>
                        </Button>
                    </Buttons>
                    <FakeButton onClick={handlerStart}>
                        <img src={menuobjects} alt=""/>
                    </FakeButton>
                </MenuObjectsWrapper>
            </Wrapper>
        </>
    )
};