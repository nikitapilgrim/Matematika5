import React, {useEffect, useState} from "react";
import styled, {keyframes} from "styled-components";
/*import ResponsiveCanvas from 'react-responsive-canvas';
import useMount from "react-use/lib/useMount";
import FontFaceObserver from 'fontfaceobserver';
import useComponentSize from '@rehooks/component-size'*/
import {TextWithBorders} from "./TextWithBorders";


const Wrong = keyframes`
  from {
    transform: scale3d(1.4, 1.4, 1.4);
  }

  10%, 20% {
    transform: scale3d(1.4, 1.4, 1.4);
  }

  30%, 50%, 70%, 90% {
    transform: scale3d(1.6, 1.6, 1.6);
  }

  40%, 60%, 80% {
    transform: scale3d(1.4, 1.4, 1.4);
  }

  to {
    transform: scale3d(1.6, 1.6, 1.6);
  }
`;


const Bravo = keyframes`
  from {
    transform: scale(0);
  }

  50% {
    transform: scale(1.4);
  }
  to {
    transform: scale(1.6) rotate(-10deg);
  }
`;

const Wrapper = styled.div`
    font-family: 'Luckiest Guy', cursive;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;
    height: 100vh;
    width: 100vw;
    animation-name: ${props => props.right ? Bravo : Wrong};
    animation-duration: ${props => props.right ? '1s' : '1s'};
    animation-timing-function: ${props => !props.right && 'ease-out'};
    animation-iteration-count: ${props => !props.right && 'infinite'};
    font-weight: bold;
    color: ${props => props.right ? '#' : 'red'};
    z-index: 999;
    font-size:100px;
`;


export const Answer = ({answer, last}) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (answer && !last) {
            setShow(true)
            if (answer.right) {
                setTimeout(() => {
                    setShow(false)
                }, 1000)
            }
            if (answer.right === false) {
                setTimeout(() => {
                    setShow(false)
                }, 1000)
            }
        }
    }, [answer]);

    return (
        <>
            {show &&
            <Wrapper right={answer.right}>
                {!answer.right ?
                    <TextWithBorders answer={true} color="red" size={7} text={answer.value}/> :
                    <TextWithBorders answer={true} color="#1dc91d" size={10} text="BRAVO!"/>}
            </Wrapper>
            }
        </>

    )
};