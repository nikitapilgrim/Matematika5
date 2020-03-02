import React from 'react';
import styled from "styled-components";
import {Modal} from "./Modal/Modal";
import {InnerMenu} from "./Modal/InnerMenu";

import MenuIcon from '../assets/svg/menu.svg'

const Wrapper = styled.div`
    width: ${props => props.size.width || '2.5rem'};
    height: ${props => props.size.height || '2.5rem'};
    z-index: 300;
    cursor: pointer;
    background-size: cover;

    svg {
      fill: ${props => props.color};
      width: 100%;    
    }
`;

const style = {
    overlay: {
        zIndex: 2,
        background: 'none',
        padding: '0px !important',
    },
    modal: {
        background: 'none',
        boxShadow: 'none',
        padding: '0px !important',
    },
    closeButton: {
        opacity: 0
    }
};

export const Menu = ({color, size = {width: '2.5rem', height: '2.5rem'}}) => {
    return (
        <Wrapper color={color} size={size}>
            <Modal style={style} inner={<InnerMenu/>}>
                <MenuIcon/>
            </Modal>
        </Wrapper>
    )
};

 export const MenuWithouModal = ({color, size = {width: '2.5rem', height: '2.5rem'}}) => {
    return (
        <Wrapper color={color} size={size}>
            <MenuIcon/>
        </Wrapper>
    )
};
