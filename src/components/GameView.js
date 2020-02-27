import React, {useEffect, useState, useCallback} from "react";
import useStoreon from 'storeon/react';
import tutorialData from "../data/tutorial";
import nanoid from "nanoid";
import {sounds} from "../sounds";
import bg from '../assets/background-image.jpg'
import styled from "styled-components";
import {Intro} from './Intro'
import stagesData from "../data/stages";
import {Tutorial} from "./Tutorial";
import {Desk} from "./Desk";
import {Kviz} from "./Kviz";
import {Final} from "./Final";

const WrapperApp = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    height: 100vh;
    width: 100vw;
`;

const CurrentStage = styled.div`
  position: fixed;
  top: 3vh;
  right: 3vw;
  font-size: 40px;
  color: red;
  opacity: 0.8;
  z-index: 10;
`;

const Debugg = () => {
    const {dispatch, stage, tutorial, kviz, start} = useStoreon(
        'stage', 'tutorial', 'kviz', 'start'
    );

    const ClickHandler = useCallback(() => {
        dispatch('stage/to', stage + 1);
    }, [stage]);

    const InputHandler = useCallback((e) => {
        if (+e.target.value) {
            const value = e.target.value;
            if (stagesData[+value]) {
                dispatch('stage/to', +value);
            }
        }
        if (!e.target.value) {
            dispatch('stage/to', 0)
        }
    }, []);


    return (
        <div style={{position: "relative"}}>
            <button disabled={tutorial || kviz.show || !start}  style={{
                position: 'fixed',
                zIndex: '999',
                top: '2rem',
                right: '2rem'
            }} onClick={ClickHandler}>next
            </button>
            <input disabled={tutorial || kviz.show || !start}  value={stage}
                   style={{
                       position: 'fixed',
                       zIndex: '999',
                       top: 0,
                       right: 0
                   }} type="text" onClick={e => {
            }} onChange={InputHandler}/>
        </div>
    )
};


const Blur = styled.div`
    filter: ${props => props.blur ? 'blur(10px)' : 'none'};
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: ${props => props.zIndex || '-1'};
    top: 0;
    left: -5vw;   
    height: 110vh;
    width: 110vw;
    transition: filter 1s;
    background: url(${bg});
    background-size: cover;
    background-position: 50% 50%;   
`;

export function GameView() {
    const {dispatch, stage, start, kviz, preloader, final} = useStoreon(
        'stage',
        'start',
        'kviz',
        'preloader',
        'final'
    );
    const [stageData, setStageData] = useState(stagesData[stage]);
    const [tutorialCount, setTutorialCount] = useState(0);
    const [showTutorial, setShowTutorial] = useState(false);
    const [showStage, setShowStage] = useState(null);
    const [id] = useState(nanoid(20));
    const [showIntro, setShowIntro] = useState(false);
    const [correctAnswer, setCorrectAnswer] = useState(false);

    useEffect(() => {
        if (preloader.count === 100) {
            setTimeout(() => {
                document.querySelector('.bg').classList.add('with-blur');
                setTimeout(() => {
                    setShowIntro(true)
                }, 1000)
            }, 1000);
        }
    }, [preloader.count]);

    useEffect(() => {
        if (start && !kviz.show) {
            setTimeout(() => {
                setShowStage(true)
            }, 200);
        }
    }, [kviz.show, start]);

    useEffect(() => {
        if (start) {
            dispatch('tutorial', true);
            setShowTutorial(true);
        }
    }, [start]);

    useEffect(() => {
        if (stagesData[stage] + 1) {
            setStageData(stagesData[stage]);
        } else {
            dispatch('stage/final', true);
        }
    }, [stage]);


    // show kviz
    useEffect(() => {
        if (stageData.layout === 'quiz') {
            dispatch('kviz/show')
        }
    }, [stageData]);


    const handlerNextTutorial = useCallback(() => {
        if (start === true) {
            if (tutorialData[tutorialCount + 1]) {
                setTutorialCount((prev) => prev + 1);
            } else {
                dispatch('tutorial', false);
                setShowTutorial(false)
            }
        }
    }, [start, tutorialData, tutorialCount]);


    const handlerNext = useCallback((right) => {
        if (right) {
            dispatch('medal/set', {type: 'gold', id: stage});
            dispatch('stage/next');
            sounds.success.play();
            setCorrectAnswer(true);
            setTimeout(() =>{
                setCorrectAnswer(false)
            }, 1000)
        }
    }, []);
    useEffect(()=> {

    }, [final])

    return (
        <WrapperApp key={id}>
            <Intro show={showIntro}/>
            <Kviz/>
            <Tutorial handler={handlerNextTutorial} active={showTutorial && !kviz.show}
                      data={tutorialData[tutorialCount]}/>
            <CurrentStage>{stageData.id && stageData.id}</CurrentStage>
            <Desk handlerNext={handlerNext}
                  tutorialData={tutorialData[tutorialCount]}
                  stageData={stageData}
                  showStage={showStage}
                  shake={correctAnswer}
            />


            <Debugg/>
        </WrapperApp>
    )
}
