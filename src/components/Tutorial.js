import React, {useEffect, useRef, useState, useCallback, useMemo} from 'react';
import useMount from 'react-use/lib/useMount';
import useRafState from 'react-use/lib/useRafState';
import useRafLoop from 'react-use/lib/useRafLoop';
import useComponentSize from '@rehooks/component-size'
import styled from "styled-components";
import {Speech} from "./Speech";
import useClickAway from "react-use/lib/useClickAway";
import {useWindowSize} from 'react-use';
import {eventTopPanel} from "./TopPanel";

import {css, keyframes} from "styled-components";
import useStoreon from "storeon/react";

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
  top: 0;
  z-index: 3;
  width: 23rem;
  transform: translate(${props => Number(props.left) ? `${props.left}px`: props.left}, ${props => props.top}px);
  
  transition-duration: 0.25s;
  user-select: none;
  pointer-events: none;
  img {
    max-width: 100%;
      height: auto;
  }
`;

const left = css`
  left: -20rem;
`;

const right = css`
  right: -23rem;
`;

const Bubble = styled.div`
    position: absolute;
    top: 25%;
    width: 30rem;
    ${props => props.position === 'right' ? right : left}
`;


export function Tutorial({active, data, handler}) {
    const {dispatch, tutorial, kviz,final} = useStoreon(
        'tutorial',
        'kviz',
        'final'
    );
    const ref = useRef(null);
    const [show, setShow] = useState(false);
    const [buttons, setButtons] = useState(null);
    const [teacherOffset, setTeacherOffset] = useRafState(null);
    const [bubble, setBubble] = useState(null);
    const {width, height} = useWindowSize();
    const [init, setInit] = useState(false);
    const [end, setEnd] = useState(false);
    const teacherSize = useComponentSize(ref);
    const [sizes, setSizes] = useRafState(null);
    const [start, setStart] = useState(false);
    useClickAway(ref, () => {
        handler()
    });

    useEffect(() => {
        if (tutorial && !kviz.show) {
            setTimeout(() => {
                setStart(true)
            }, 1000)
        }
        if (tutorial) {
            setStart(false)
        }
    }, [tutorial, kviz.show]);

    useEffect(() => {
        if (active && !final) {
            setTimeout(() => {
                setShow(true)
            }, 2000)
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

    const [loopStop, isActive, loopStart] = useRafLoop(() => {
        if (buttons !== null && start && tutorial) {
            const r = Object.entries(buttons).reduce((acc, pair) => {
                const [key, node] = pair;
                const size = node.getBoundingClientRect();
                return {
                    ...acc,
                    top: size.top + document.body.scrollTop,
                    [key]: {
                        top: size.top + document.body.scrollTop,
                        left: size.x,
                        width: size.width,
                        bottom: size.bottom,

                    }
                };
            }, {});
            setSizes(r);
        }
    }, [buttons, width, height, start]);

    useEffect(() => {
        if (start) {
            setTimeout(() => {
                loopStart()
            }, 1000);

        }
        if (end) {
            dispatch('tutorialDone');
            loopStop()
        }
    }, [start, end]);

    useEffect(() => {
        if (sizes && isActive) {
            let x;
            if (sizes[data.elem]) {
                x = data.revert ? (sizes[data.elem].left + sizes[data.elem].width / 2) - teacherSize.width : (sizes[data.elem].left + sizes[data.elem].width / 2)
            }
            if (data.offset) {
                x = data.offset
            }
            setTeacherOffset(prev => ({
                ...prev, ...{y:  (sizes.top),
                    x: x,
            }}));
        }
    }, [data, sizes, width, teacherSize, height,isActive]);

    useEffect(() => {
        if (show) {
            setBubble(null);
            setTimeout(() => {
                setBubble(data.bubble.src)
            }, 500);
        }
    }, [data, show]);

    return (
        <Wrapper show={show}>
            <Teacher top={teacherOffset && teacherOffset.y} left={teacherOffset && teacherOffset.x} ref={ref}>
                <img src={data.teacher} alt="teacher"/>
                <Bubble teacherHeight={teacherSize.height} position={data.bubble.position}>
                    {bubble !== null && <img src={bubble} alt="text"/>}
                </Bubble>
            </Teacher>
            {/*<Speech onClick={handler} data={data}/>*/}
        </Wrapper>
    )
}