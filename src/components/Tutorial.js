import React, {useEffect, useRef, useState, useCallback, useMemo} from 'react';
import useMount from 'react-use/lib/useMount';
import styled from "styled-components";
import {Speech} from "./Speech";
import useClickAway from "react-use/lib/useClickAway";
import {useWindowSize} from 'react-use';
import {eventTopPanel} from "./TopPanel";

import {css, keyframes} from "styled-components";

const SlideTop = keyframes`
  0% {
    transform: translateY(100vh);
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
    transform: translateY(100vh);
  }
`;

const SlideVert = props => css`
  animation: ${props.show ? SlideTop : SlideBottom} 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
`;


const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  z-index: 999;
  ${props => props.show !== null && SlideVert};
`;

const Teacher = styled.div`
  position: fixed;
  bottom: -1rem;
  z-index: 3;
  width: 52vh;
  pointer-events: none;
  transition: transform 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940);
  transform: translateX(${props => props.left});
  img {
    max-width: 100%;
      height: auto;
  }
`;

const left = css`
  top: 30%;
  left: -70%;
`;

const right = css`
  top: 30%;
  right: -70%;
`;

const Bubble = styled.div`
    position: absolute;
    width: 30rem;
    ${props => props.position === 'right' ? right : left}
`;


export function Tutorial({active, data, handler}) {
    const ref = useRef(null);
    const [show, setShow] = useState(false);
    const [buttons, setButtons] = useState(null);
    const [teacherOffset, setTeacherOffset] = useState(null);
    const [bubble, setBubble] = useState(null);
    const {width, height} = useWindowSize();
    const [init, setInit] = useState(false);
    const [end, setEnd] = useState(false);
    useClickAway(ref, () => {
        handler()
    });

    useEffect(() => {
        if (active) {
            setTimeout(() => {
                setShow(true)
            }, 1000)
        } else {
            setShow(false);
            if (init) {
                setTimeout(() => {
                    setEnd(true)
                }, 1000)
            }
        }
    }, [active, init]);

    useEffect(() => {
        if (active) setInit(true)
    }, [active]);

    const onRefs = useCallback((refs) => setButtons(refs), []);

    useEffect(() => {
        eventTopPanel.on('refs', onRefs);
        return () => eventTopPanel.off('refs', onRefs)
    }, []);

    const sizes = useMemo(() => {
        if (buttons !== null) {
            return Object.entries(buttons).reduce((acc, pair) => {
                const [key, node] = pair;
                return {
                    ...acc,
                    [key]: {
                        top: node.getBoundingClientRect().top + document.body.scrollTop,
                        left: node.getBoundingClientRect().x
                    }
                };
            }, {});
        }
        return null;
    }, [buttons, width, height]);


    useEffect(() => {
        if (sizes && sizes[data.elem]) {
            setTeacherOffset(`${(sizes[data.elem].left + 20)}px`)
        }
        if (data.offset) {
            setTeacherOffset(data.offset);
        }
    }, [data, sizes, width]);

    useEffect(() => {
        if (show) {
            setBubble(null);
            setTimeout(() => {
                setBubble(data.bubble.src)
            }, 500);
        }
    }, [data, show]);

    return (
        <>
            {!end && <Wrapper show={show}>
                <Teacher left={teacherOffset} ref={ref}>
                    <img src={data.teacher} alt="teacher"/>
                    <Bubble position={data.bubble.position}>
                        {bubble !== null && <img src={bubble} alt="text"/>}
                    </Bubble>
                </Teacher>
                {/*<Speech onClick={handler} data={data}/>*/}
            </Wrapper>}
        </>
    )
}