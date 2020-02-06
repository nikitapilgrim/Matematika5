import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import {Speech} from "./Speech";
import owl from '../assets/image/owl.png'
import useClickAway from "react-use/lib/useClickAway";

const Wrapper = styled.div`
  position: relative;
  z-index: 999;
  transition: opacity 0.2s ease 0s;
  opacity: ${props => props.show && 1 || 0};
`;

const Owl = styled.div`
  position: fixed;
  bottom: -1rem;
  z-index: 3;
  left: 20%;
  width: 30rem;
  img {
    max-width: 100%;
  }
`;


export function Tutorial({active, data, handler}) {
    const ref = useRef();
    const [show, setShow] = useState(false);

    useClickAway(ref, () => {
        handler()
    });

    useEffect(() => {
        if (active) {
            setTimeout(() => {
                setShow(true)
            }, 1000)
        } else {
            setShow(false)
        }
    }, [active]);

    return (
        <>
            {active && <Wrapper show={show}>
                <Owl ref={ref}>
                    <img src={owl} alt="owl"/>
                    <Speech onClick={handler} data={data}/>
                </Owl>
            </Wrapper>}
        </>
    )
}