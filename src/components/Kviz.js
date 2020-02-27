import React, {useEffect, useState} from 'react';
import styled, {css, keyframes} from "styled-components";
import useStoreon from "storeon/react";
import bg from "../assets/background-image.jpg";

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
  animation: ${props.show ? SlideTop : SlideBottom} 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
`;

const Title = styled.div`
      font-family: 'Mali', cursive;
      font-size: 6rem;
      display: none;
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
  width: 30rem;
  img {
    max-width: 100%;
  }
`;

const quizTitles = {
    1: require('../assets/image/quiz/01.png'),
    2: require('../assets/image/quiz/02.png'),
    3: require('../assets/image/quiz/03.png'),
    4: require('../assets/image/quiz/04.png'),
    5: require('../assets/image/quiz/05.png'),
    6: require('../assets/image/quiz/06.png'),
    7: require('../assets/image/quiz/07.png'),
    8: require('../assets/image/quiz/08.png'),
    9: require('../assets/image/quiz/09.png'),
    10: require('../assets/image/quiz/10.png'),
    11: require('../assets/image/quiz/11.png'),
    12: require('../assets/image/quiz/12.png'),
    13: require('../assets/image/quiz/13.png'),
    14: require('../assets/image/quiz/14.png'),
    15: require('../assets/image/quiz/15.png'),
    16: require('../assets/image/quiz/16.png'),
    17: require('../assets/image/quiz/17.png'),
    18: ''
};


export const Kviz = ({order}) => {
    const [show, setShow] = useState(null);
    const [number, setNumber] = useState(1);
    const {dispatch, start, kviz, stage} = useStoreon(
        'stage',
        'start',
        'kviz'
    );
    const [title, setTitle] = useState(null);

    useEffect(() => {
        if (start && kviz.show) {
            setShow(true);
            setTimeout(() => {
                const important = !Math.sign(kviz.order);
                const abs = Math.abs(kviz.order);
                const order = important ? abs : stage !== 0 ? abs + 1: abs;

                const state = {
                    current: order,
                    prev: kviz.prev || number
                };
                console.log(state, stage);
                dispatch('kviz/set', state);
                setNumber(order);

                setTimeout(() => {
                    dispatch('kviz/hide');
                }, 1000);
                setTimeout(() => {
                    dispatch('stage/next');
                }, 2000)
            }, 1300);
        } else {
            setShow(false)
        }

    }, [kviz.show, start, stage]);


    useEffect(() => {
        if (number === 0) setTitle(quizTitles[17]);
        else {
            setTitle(quizTitles[number])
        }
    }, [number]);

    return (
        <Wrapper show={show}>
            <ImgWrapper>
                <img src={title} alt={Math.abs(number)}/>
            </ImgWrapper>
            <Title>
                Kviz {number || 1}
            </Title>
        </Wrapper>
    )
};