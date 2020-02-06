import React, {useState} from 'react';
import styled from "styled-components";
import {sounds} from "../sounds";
import {Sound} from "./Sound";
import {Menu} from "./Menu";
import {SlideVert} from "./Animate/Slide";
import useStoreon from "storeon/react";
import menuobjects from '../assets/image/start-menu-objects.png'
import menuType1 from '../assets/image/menu-typo-1.png'
import menuType2 from '../assets/image/menu-typo-2.png'
import menuType3 from '../assets/image/menu-typo-3.png'


const SoundHint = styled.div`
    position: absolute;
    top: -9rem;
    left: -6rem;
    width: 9rem;
    height: 9rem;
    background: url(${menuType1}) no-repeat;
    background-size: cover;
`;
const KvizHint = styled.div`
    position: absolute;
    top: -5rem;
    left: -11rem;
    width: 12rem;
    height: 8rem;
    background: url(${menuType2}) no-repeat;
    background-size: cover;
`;


const StartHint = styled.div`
    position: absolute;
    top: 75%;
    left: -5%;
    width: 12rem;
    height: 10rem;
    background: url(${menuType3}) no-repeat;
    background-size: cover;
`;



const Wrapper = styled.div`
  position: fixed;
  z-index: 5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${props => props.show !== null && SlideVert};
`;

const Buttons = styled.div`
  position: absolute;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 34%;
  left: 6%;
`;

const ButtonWrapper = styled.div`
  position: relative;
`;

const Button = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5rem; height: 5rem;
  border: 0.37em solid #814a22;
  border-radius: 50% 50%;
  background-color: #dcc6ac;
  cursor: pointer;
  &:not(:first-child) {
    margin-left: 1rem;
  }
  filter: drop-shadow(0 0 10px #FFF)
`;

const MenuObjectsWrapper = styled.div`
  position: relative;
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

export const Intro = () => {
    const [isShow, setIsShow] = useState(null);
    const {dispatch} = useStoreon('start');

    const handlerStart = (e) => {
        sounds.mouseclick.play();
        const target = e.target;
        target.style.top = '-0.3em';
        setTimeout(() => {
            setIsShow(false);
            target.style.top = '0';
            setTimeout(() => {
                dispatch('game/start')
            }, 500)
        }, 100)
    };

    return (
        <Wrapper show={isShow}>
            <MenuObjectsWrapper >
                <Buttons>
                    <ButtonWrapper>
                        <KvizHint/>
                        <Button>
                            <Pos>
                                <Menu color={'#814a22'} size={{width: '70%', height: '70%'}}/>
                            </Pos>
                        </Button>
                    </ButtonWrapper>
                    <ButtonWrapper>
                        <SoundHint/>
                        <Button>
                            <Sound color={'#814a22'} size={{width: '80%', height: '80%'}}/>
                        </Button>
                    </ButtonWrapper>
                </Buttons>
                <StartHint/>
                <FakeButton onClick={handlerStart} >
                    <img src={menuobjects} alt=""/>
                </FakeButton>
            </MenuObjectsWrapper>
           {/* <Title>
                <TextWithBorders strokeColor={'#814a22'} color={'#dcc6ac'} text={'matematika 3'}/>
                <Owl>
                    <img src={owl} alt="owl"/>
                </Owl>
                <Buttons>
                    <Button>
                        <Sound color={'#814a22'} size={{width: '80%', height: '80%'}}/>
                    </Button>
                    <Button>
                        <Menu color={'#814a22'} size={{width: '80%', height: '80%'}}/>
                    </Button>
                </Buttons>
            </Title>

            <Start onClick={handlerStart}>Start</Start>*/}
        </Wrapper>
    )
};