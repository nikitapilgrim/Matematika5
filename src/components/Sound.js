import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {sounds} from "../sounds";
import useStoreon from "storeon/react";
import SoundOn from '../assets/svg/volume_on.svg';
import SoundOff from '../assets/svg/volume_off.svg';

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


export const Sound = ({color, size = {width: '2.5rem', height: '2.5rem'}}) => {
    const {dispatch, music, final} = useStoreon('start', 'preloader', 'music', 'final');

    useEffect(() => {
        if (!final) sounds.final.pause();
        if (final) sounds.background.pause();
        const m = final ? sounds.final : sounds.background;
        if (music) {
            m.play();
        }
        if (!music) {
            m.pause();
        }
    }, [music, final]);


    const handlerClick = () => dispatch('music/change');

    return (
        <Wrapper color={color} size={size} onClick={handlerClick}>
            {music ? <SoundOn/> : <SoundOff/>}
        </Wrapper>
    )
};