import React, {useCallback, useEffect, useState} from "react";
import styled, {keyframes} from "styled-components";
import useStoreon from "storeon/react";
import {Scale} from "./Animate/Slide";
import menuobjects from "../assets/image/final/final-stage-background.png";
import button from "../assets/image/final/final-stage-button.png";
import quote1 from "../assets/image/final/quote1.png";
import quote2 from "../assets/image/final/quote2.png";
import quote3 from "../assets/image/final/quote3.png";
import {Sound} from "./Sound";
import {MenuWithouModal} from "./Menu";
import {sounds} from "../sounds";
import useKeyPressEvent from "react-use/lib/useKeyPressEvent";
import useClickAway from "react-use/lib/useClickAway";

const quotes = [quote1, quote2, quote3];

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
   
    80% { transform: scale(1.2)   translateY(50%); }
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
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-timing-function: ease;
  img {
    position: relative;
    max-width: 100%;
  }
`;


const QuotesWrapper = styled.div`
  position: absolute;
  max-width: 20rem;
  right: -15rem;
  @media (max-width: 500px) {
    display: none;
  }
  img {
    display: block;
    max-width: 100%;
  }
`

function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

export const Final = () => {
    const {dispatch, stage, deskRef, final, showDesk, modal, kviz} = useStoreon('stage', 'countQuestions', 'showDesk', 'final', 'modal', 'deskRef', 'kviz');
    const [show, setShow] = useState(final);
    const [quote, setQuote] = useState(quotes[randomInteger(0, quotes.length - 1)]);

    useEffect(() => {
        const interval = setInterval(() => {
            setQuote(quotes[randomInteger(0, quotes.length - 1)]);
        }, 2000);
        return () => clearInterval(interval);
    },[]);

    useEffect(() => {
        if (final) {
            setShow(true);
        }
    }, [final]);

    const handlerPlayAgain = () => {
        setShow(false);
        dispatch('kviz/set', -1);
        setTimeout(() => {
            dispatch('reset');
        }, 500)
    };

    const handlerShowMenu = () => {
        setShow(false);
        setTimeout(() => {
            dispatch('showDesk', true);
            setTimeout(() => {
                dispatch('modal/show');
            }, 500)
        }, 300);
    };

    const onCloseModal = () => {
        if (modal && final) {
            dispatch('modal/hide');
            dispatch('showDesk', false);
            setTimeout(() => {
                setShow(true);
            }, 300);
        }
    };

    useKeyPressEvent('Escape', onCloseModal);
    useClickAway(deskRef, () => {
        setTimeout(() => {
            onCloseModal();
        }, 100)
    });


    return (
        <Wrapper show={show && final && !kviz.show}>
            <MenuObjectsWrapper>
                <img src={menuobjects} alt=""/>
            </MenuObjectsWrapper>
            <QuotesWrapper>
                <img src={quote} alt=""/>
            </QuotesWrapper>
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