import React, {useEffect, useState, useRef} from "react";
import styled from "styled-components";
import {Sound} from "./Sound";
import {Menu} from "./Menu";
import {Help} from "./Help";
import {sounds} from "../sounds";
import useStoreon from "storeon/react";
import mitt from 'mitt'

export const eventTopPanel = mitt();

const Wrapper = styled.div`
  position: absolute;
  left: 10%;
  top: 30%;
  display: flex;
  align-items: center;
  z-index: 99999;
  transition: filter, opacity 0.2s;
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
`;
const HiddenWrapp = React.forwardRef(({children, hide, round}, ref) => {
    return (
        <HiddenWrapper ref={ref} round={round} onClick={e => {
            sounds.mouseclick.play()
        }} hide={hide}>
            {children}
        </HiddenWrapper>
    )
});

export function TopPanel({data, show}) {
    const [showElems, setShowElems] = useState([]);
    const elems = ['music', 'menu', 'help'];
    const soundRef = useRef(null);
    const menuRef = useRef(null);
    const helpRef = useRef(null);

    useEffect(() => {
        if (soundRef && soundRef.current && menuRef && menuRef.current && helpRef && helpRef.current) {
            eventTopPanel.emit('refs', {sound: soundRef.current, menu: menuRef.current, help: helpRef.current})
        }
    }, [soundRef, menuRef, helpRef]);

    useEffect(() => {
        if (data && data.hasOwnProperty('elem') && elems.includes(data.elem)) {
            setShowElems([...showElems, data.elem])
        }
    }, [data]);

    return (
        <Wrapper show={show} blur={false}>
            <HiddenWrapp ref={menuRef} round={data.elem === 'menu'} hide={false}>
                <Menu color={'#FFF'}/>
            </HiddenWrapp>
            <HiddenWrapp ref={soundRef} round={data.elem === 'music'} hide={false}>
                <Sound color={'#FFF'}/>
            </HiddenWrapp>
            <HiddenWrapp ref={helpRef} round={data.elem === 'help'} hide={false}>
                <Help color={'#FFF'}/>
            </HiddenWrapp>
        </Wrapper>
    )
}

// !showElems.includes('help')