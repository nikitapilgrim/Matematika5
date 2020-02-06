import React, {useState, useEffect, useRef} from 'react';
import useStoreon from "storeon/react";
import {createPortal} from "react-dom";
import {InnerMenu} from "./InnerMenu";
import styled, {keyframes, css} from "styled-components";
import {Slide} from "../Animate/Slide";
import useClickAway from "react-use/lib/useClickAway";
import useKeyPressEvent from 'react-use/lib/useKeyPressEvent';

import closeIcon from '../../assets/image/close-button-2x.png'


const SlideTop = keyframes`
  0% {
    transform: translateY(-100vh);
  }
  100% {
    transform: translateY(0vh);
  }
`;

const SlideBottom = keyframes`
  0% {
    transform: translateY(0vh);
  }
  100% {
    transform: translateY(-100vh);
  }
`;

const slide = props => css`
  animation: ${props.isOpen ? SlideTop : SlideBottom} 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
`;



const Wrapper = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
  ${slide};
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  width: 100vw;
 /* & > div {
    display: flex;
    justify-content: center;
    align-items: center;
  }*/
`;

const Inner = styled.div`
  position: relative;
  height: content-box;
`;

const Close = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: -6rem;
  top: -6rem;
  width: 5rem;
  height: 5rem;
  border: 0.5rem solid #896549;
  border-radius: 50% 50%;
  background-color: #fce4be;
  font-size: 5rem;
  font-weight: bold;
  color: #896549;
  cursor: pointer;
  filter: drop-shadow(0px 0px 1rem white);  
  outline: none;
  img {
    width: 4.3rem;
    height: 4.3rem;
    position: absolute;
    left: -0.04em;
    top: -0.04em;
  }
`;

export const Modal = React.memo((({children, style, inner}) => {
    const {dispatch, modal} = useStoreon('modal');
    const ref = useRef(null);
    const [animationEnd, setAnimationEnd] = useState(null);

    const onOpenModal = () => dispatch('modal/show');
    const onCloseModal = () => dispatch('modal/hide');

    useClickAway(ref, () => {
        onCloseModal();
    });
    useKeyPressEvent('Escape', onCloseModal);

    const handlerAnimationEnd = () => {
        console.log('end')
        //if (!modal) setAnimationEnd(true)
    };

    return (
        <>
            <div onClick={onOpenModal}>
                {children}
            </div>
            {createPortal(
                <Wrapper isOpen={modal}>
                    <Inner ref={ref}>
                        <Close onClick={onCloseModal}><img src={closeIcon} alt="close"/></Close>
                        {inner}
                    </Inner>
                    {/* <Slide delay={modal ? 500 : 0} when={modal} onReveal={handlerAnimationEnd} top>

                    </Slide>*/}
                </Wrapper>, document.querySelector('body'))}
        </>
    );
}));