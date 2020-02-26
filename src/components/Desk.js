import React, {useEffect, useState, useCallback} from "react";
import nanoid from "nanoid";
import notebook from "../assets/image/blackboard.png";
import {TopPanel} from "./TopPanel";
import tutorialData from "../data/tutorial";
import {Stage} from "./Stage";
import styled, {keyframes} from "styled-components";
import {SlideVert} from "./Animate/Slide";
import useStoreon from "storeon/react";

const shake = keyframes`
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }
  
  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
`;

const Wrapper = styled.div`
    width: 55rem;
    min-width: 300px;
    max-width: 900px;
    display: flex;
    justify-content: center;
    position: relative;
    z-index: 1;
    pointer-events: auto;
    ${props => props.show !== null && SlideVert};
`;


const DeskWrapper = styled.div`
  transform: translate3d(0, 0, 0);
  animation: ${props => props.shake && shake} 0.82s cubic-bezier(.36,.07,.19,.97) both infinite;
  backface-visibility: hidden;
  perspective: 1000px;
  width: 100%;
  height: 100%;
  position: relative;
  pointer-events: auto;
  top: -3.5rem;
  display: flex;
    justify-content: center;
    align-items: center;
  img {
    display: inline-block;
    //filter: drop-shadow(0 0 3px);
    max-width: 100%;
    user-select: none;
  }
`;


const Bg = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: ${props => props.position || 'fixed'};
    z-index: ${props => props.zIndex || '-1'};
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    ${props => !props.bgNone && `background: url(${notebook});`};
    background-size: cover;
    background-position: 50% 50%;
    transition: filter 1s;
  
`;


const WrapperImg = styled.div`
    position: relative;
    img {
      max-width: 100%;
      height: auto;
    }
`;

const Inner = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    z-index: 99;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: auto;
    transition: opacity 0.2s linear;
    transition-delay: ${props => props.show ? '0.1s' : '0.1s'};
    opacity: ${props => props.show ? 1 : 0}
`;


export const Desk = React.memo(({tutorialData, showStage, stageData, handlerNext, shake}) => {
    const [id] = useState(nanoid(20));
    const {dispatch, start, kviz, modal} = useStoreon(
        'start',
        'kviz',
        'modal',
    );

    return (
        <Wrapper key={id} show={start && !kviz.show}>
            <DeskWrapper shake={shake} className="desk-wrapper">
                <WrapperImg>
                    <img src={notebook} alt="notebook"/>
                    {/*<Medal/>*/}
                </WrapperImg>
                <TopPanel show={showStage} data={tutorialData}/>
                <Inner show={!modal && showStage}>
                    <Stage onNext={handlerNext} data={stageData}/>
                </Inner>
            </DeskWrapper>
        </Wrapper>
    )
});
