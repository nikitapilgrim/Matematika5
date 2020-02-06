import React, {useEffect, useState} from 'react';
import styled, {css, keyframes} from "styled-components";
import {TextWithBorders} from "./TextWithBorders";
import useStoreon from "storeon/react";

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
const SlideVert = props => css`
  animation: ${props.show ? SlideTop : SlideBottom} 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
`;


const Wrapper = styled.div`
  position: fixed;
  z-index: 3;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  filter: drop-shadow(0 0 0.3em black);
  transform: translateY(-100vh);
  ${props => props.show !== null && SlideVert};
`;

const ImgWrapper = styled.div`
  width: 15rem;
  img {
    max-width: 100%;
  }
`;

const quizTitles = {
    1: require('../assets/image/quiz/kviz_1.png'),
    2: require('../assets/image/quiz/kviz_2.png'),
    3: require('../assets/image/quiz/kviz_3.png'),
    4: require('../assets/image/quiz/kviz_4.png'),
    5: require('../assets/image/quiz/kviz_5.png'),
    6: require('../assets/image/quiz/kviz_6.png'),
    7: require('../assets/image/quiz/kviz_7.png'),
    8: require('../assets/image/quiz/kviz_8.png'),
    9: require('../assets/image/quiz/kviz_9.png'),
    10: require('../assets/image/quiz/kviz_10.png'),
    11: require('../assets/image/quiz/kviz_11.png'),
    12: require('../assets/image/quiz/kviz_12.png'),
    13: require('../assets/image/quiz/kviz_13.png'),
    14: require('../assets/image/quiz/kviz_14.png'),
    15: require('../assets/image/quiz/kviz_15.png'),
    16: require('../assets/image/quiz/kviz_16.png'),
    17: require('../assets/image/quiz/kviz_17.png'),
    18: require('../assets/image/quiz/kviz_18.png'),
    19: require('../assets/image/quiz/kviz_19.png'),
    20: require('../assets/image/quiz/kviz_20.png'),
    21: require('../assets/image/quiz/kviz_21.png'),
};


export const Kviz = ({order}) => {
    const [show, setShow] = useState(null);
    const [number, setNumber] = useState(1);
    const {dispatch, start, kviz, final} = useStoreon(
        'stage',
        'start',
        'kviz',
        'modal',
        'preloader',
        'final'
    );
    const [title, setTitle] = useState(null);

    useEffect(() => {
        if (start && kviz.show) {
            setShow(true);
            setTimeout(() => {
                dispatch('kviz/hide');
            }, 800);
            setTimeout(() => {
                dispatch('stage/next');
            }, 1000)
        } else {
            setShow(false)
        }

    }, [kviz.show, start]);

    useEffect(() => {
        setNumber(kviz.order);
        setTitle(quizTitles[kviz.order])
    }, [kviz.order]);

    return (
        <Wrapper show={show}>
            <ImgWrapper>
                <img src={title} alt={kviz.order}/>
            </ImgWrapper>
            {/*<TextWithBorders
                strokeColor={'#ffd2ba'}
                strokeWidth={'0.1em'}
                size={6}
                color="#662c0c"
                text={`Kviz ${number || 1}`}/>*/}
        </Wrapper>
    )
};