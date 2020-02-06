import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {Sound} from "./Sound";
import {Menu} from "./Menu";
import {Help} from "./Help";
import {sounds} from "../sounds";
import useStoreon from "storeon/react";

const Wrapper = styled.div`
  position: absolute;
  right: 4rem;
  top: 5rem;
  display: flex;
  align-items: center;
  z-index: 99999;
  transition: filter, opacity 1s;
  opacity: ${props => props.show ? 1 : 0};
  ${props => props.blur ? 'filter: blur(10px)' : ''}; //brightness(0.70) saturate(130%);
  & > div {
    transition: all 0.2s ease;
    &:hover {
      transform: scale(1.1);
    }
    &:not(:first-child) {
      margin-left: 0.5rem;
    }
  }
`;

const HiddenWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position:relative;
    padding: 0.5em;
    transition: filter 1s;
    ${props => props.hide ? 'filter: blur(10px)' : ''};
    &:before {
      content: '';
      position: absolute;
      height: 130%;
      width: 130%;
      border-radius: 50% 50%;
      ${props => props.round ? 'border: solid 0.3em red' : ''};
    }
`;
const HiddenWrapp = ({children, hide, round}) => {
    return (
        <HiddenWrapper round={round} onClick={e => {
            sounds.mouseclick.play()
        }} hide={hide}>
            {children}
        </HiddenWrapper>
    )
};

export function TopPanel({data, show}) {
    const {dispatch, modal} = useStoreon(
        'modal',
    );
    const [showElems, setShowElems] = useState([]);
    const elems = ['music', 'menu', 'help'];

    useEffect(() => {
        if (data && data.hasOwnProperty('elem') && elems.includes(data.elem)) {
            setShowElems([...showElems, data.elem])
        }
    }, [data]);

    return (
        <Wrapper show={show} blur={modal}>
            <HiddenWrapp round={data.elem === 'music'} hide={!showElems.includes('music')}>
                <Sound/>
            </HiddenWrapp>
            <HiddenWrapp round={data.elem === 'menu'} hide={!showElems.includes('menu')}>
                <Menu/>
            </HiddenWrapp>
            <HiddenWrapp round={data.elem === 'help'} hide={!showElems.includes('help')}>
                <Help/>
            </HiddenWrapp>
        </Wrapper>
    )
}