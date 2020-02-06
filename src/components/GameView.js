import React, {useEffect, useRef, useState} from "react";
import useStoreon from 'storeon/react';
import tutorialData from "../data/tutorial";

import useClickAway from 'react-use/lib/useClickAway'
import Fullscreen from "react-full-screen";
import {SlideVert} from "./Animate/Slide";
import notebook from '../assets/image/papersheet@3x.png'
import styled from "styled-components";
import {Intro} from './Intro'
import {Medal} from "./Medal";
import {Owl} from "./Owl";
import stagesData, {LAYOUTS} from "../data/stages";
import {TopPanel} from "./TopPanel";
import {Tutorial} from "./Tutorial";
import {Stage} from "./Stage";
import {Answer} from "./Answer";
import {sounds} from "../sounds";

import {Kviz} from "./Kviz";
import {Final} from "./Final";
import bg from '../assets/image/wood-background.jpeg'
import {useMount} from "react-use";

const Wrapper = styled.div`
    width: 50rem;
    min-width: 300px;
    max-width: 700px;
    display: flex;
    justify-content: center;
    position: relative;
    z-index: 1;
    pointer-events: auto;
`;

const DeskWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  pointer-events: auto;
  img {
    display: inline-block;
    //filter: drop-shadow(0 0 3px);
    max-width: 100%;
    user-select: none;
  }
`;

const WrapperApp = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    height: 100vh;
    width: 100vw;
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
    //${props => !props.bgNone && `background: url(${bg});`};
    background-size: cover;
    background-position: 50% 50%;
    transition: filter 1s;
    //pointer-events: none;
    //${props => props.tutorial ? 'filter: blur(10px)' : ''} //brightness(0.70) saturate(130%);
`;

const Blur = styled.div`
    //${props => props.tutorial ? 'filter: blur(10px)' : ''}; //brightness(0.70) saturate(130%);
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
    background-color: gray;
    //${props => !props.bgNone && `background: url(${bg});`};
    background-size: cover;
    background-position: 50% 50%;
    backface-visibility: hidden;
    perspective: 1000;
    transform: translate3d(0,0,0);
    transform: translateZ(0);
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

const CurrentStage = styled.div`
  position: fixed;
  top: 3vh;
  right: 3vw;
  font-size: 40px;
  color: red;
  opacity: 0.8;
`;

const WrapperImg = styled.div`
    position: relative;
    transform: translateY(-100vh);
    background-color: white;
    ${props => props.show !== null && SlideVert};
    img {
      opacity: 0;
    }
`;

const initialState = {count: 0};

function reducer(state, action) {
    switch (action.type) {
        case 'increment':
            return {count: state.count + 1};
        case 'decrement':
            return {count: state.count - 1};
        default:
            throw new Error();
    }
}


export function GameView({handlerFullscreen}) {
    const {dispatch, stage, start, kviz, modal, preloader, final} = useStoreon(
        'stage',
        'start',
        'kviz',
        'modal',
        'preloader',
        'final',
    );
    const [stageData, setStageData] = useState(stagesData[stage]);
    const [tutorialCount, setTutorialCount] = useState(0);
    const [showTutorial, setShowTutorial] = useState(false);
    const [showStage, setShowStage] = useState(null);

    useEffect(() => {
        if (start && !kviz.show) {
            setTimeout(() => {
                setShowStage(true)
            }, 200);
        }
    }, [kviz.show, start]);

    useEffect(() => {
        if (start) {
            //setShowTutorial(true);
        }
    }, [start]);

    useEffect(() => {
        setStageData(stagesData[stage]);
    }, [stage]);
    useMount(() => {
        dispatch('preload/set', 100);

        /*let count = 0;
        const setPreload = i => () => {
            count = i + 1;
            dispatch('preload/set', i);
            if (i < 100) {
                setTimeout(setPreload(count), 10)
            }
        };
        setTimeout(setPreload(count), 0);*/
    });

    // show kviz
    useEffect(() => {
        if (stageData.layout === 'quiz') {
            dispatch('kviz/show')
        }
    }, [stageData]);


    const handlerNextTutorial = () => {
        if (tutorialData[tutorialCount + 1]) {
            setTutorialCount((prev) => prev + 1);
        } else {
            setShowTutorial(false)
        }
    };


    /*

        const memoizedCallback = useCallback(
            () => {
                doSomething(a, b);
            },
            [a, b],
        );*/
    const handlerNext = (right) => {
        console.log(right)
        if (right) {
            dispatch('medal/set', {type: 'gold', id: stage})
            dispatch('stage/next');
        }
    };

    return (
        <>
            <WrapperApp>
                <Blur zIndex={1} tutorial={showTutorial}/>
                <Blur bgNone={true} zIndex={2} tutorial={modal}>
                    {/*<Intro/>*/}
                    <Kviz/>
                    {/*<Tutorial handler={handlerNextTutorial} active={showTutorial && !kviz.show}
                              data={tutorialData[tutorialCount]}/>*/}
                    {/*<Owl active={showStage && !showTutorial && !kviz.show}
                         data={stageData.hasOwnProperty('speech') && stageData.speech}/>*/}
                    <CurrentStage>{stageData.id && stageData.id}</CurrentStage>

                    <Wrapper>
                        <DeskWrapper className="desk-wrapper">
                            <TopPanel show={showStage} data={tutorialData[tutorialCount]}/>
                            <Bg bgNone={true} zIndex={3} position={'relative'} tutorial={showTutorial || modal}>
                                <WrapperImg show={start && !kviz.show}>
                                    <img src={notebook} alt="notebook"/>
                                    {/*<Medal/>*/}
                                </WrapperImg>
                                <Inner show={showStage}>
                                    <Stage onNext={handlerNext} data={stageData}/>
                                </Inner>
                            </Bg>
                        </DeskWrapper>
                    </Wrapper>
                </Blur>
            </WrapperApp>

            <button style={{
                position: 'fixed',
                zIndex: '999',
                top: '2rem',
                right: '2rem'
            }} onClick={e => {
                dispatch('stage/to', stage + 1);
            }}>next
            </button>
            <input value={stage}
                   style={{
                       position: 'fixed',
                       zIndex: '999',
                       top: 0,
                       right: 0
                   }} type="text" onClick={e => {
//refDebugg.current = 'active'
            }} onChange={(e) => {
                if (+e.target.value) {
                    const value = e.target.value;
                    if (stagesData[+value]) {
                        dispatch('stage/to', +value);
                    }
                }
                if (!e.target.value) {
                    dispatch('stage/to', 0)
                }
            }}/>
            {/*<Answer last={stagesData[stage].layout === 'quiz'} answer={answer}/>*/}
        </>
    )
};