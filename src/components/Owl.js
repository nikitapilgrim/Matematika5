import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import {Speech} from "./Speech";
import owl from '../assets/image/owl.png'
import useClickAway from "react-use/lib/useClickAway";

const Wrapper = styled.div`
  position: relative;
  z-index: ${props => props.zIndex};
  transition: opacity 0.2s ease 0s;
  opacity: ${props => props.show && 1 || 0};
`;

const OwlWrapper = styled.div`
  position: fixed;
  bottom: -1rem;
  z-index: 3;
  left: 20%;
  width: 30rem;
  img {
    max-width: 100%;
  }
`;


export function Owl({active, data}) {
    const ref = useRef();
    const [show, setShow] = useState(false);
    const [zIndex, setZIndex] = useState(3);

    useClickAway(ref, () => {
        //handler()
    });

    useEffect(() => {
        if (active && data) {
            setShow(true);
            setZIndex(3);
        }
    }, [active, data]);

    const handlerEnd = () => {
        setShow(false)
        setTimeout(() => {
            setZIndex(-1);
        }, 200)
    };

    useEffect(() => {
        if (active) {
            setZIndex(3);
            setTimeout(() => {
                setShow(true);
            }, 1000)
        } else {
            setShow(false);
            setTimeout(() => {
                setZIndex(-1);
            }, 200)
        }
    }, [active]);

    return (
        <>
            {active && data  && <Wrapper zIndex={zIndex} show={show}>
                <OwlWrapper ref={ref}>
                    <img src={owl} alt="owl"/>
                    <Speech onEnd={handlerEnd} data={data}/>
                </OwlWrapper>
            </Wrapper>}
        </>
    )
}