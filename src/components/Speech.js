import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {Howl, Howler} from 'howler';

const Text = styled.p`
      margin: 0;
      padding: 0;
      //min-width: 300px;
    //max-width: 500px;
    //min-height: ${props => props.type ? '150px' : 'auto'};
    //max-height: 160px;
`;

const Wrapper = styled.div`
    background-color:#fff;
    position: absolute;
    bottom: 18rem;
    left: 19rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 20rem;
    padding: 2rem;
    padding-bottom: 4rem;
    z-index: 300;
    font-family: 'Mali', cursive;
    font-size: 1.5rem;
    color:#523217;
    border-radius: 10px;
    filter: drop-shadow(0 0.1em 0.15em #523217);
    cursor: pointer;
    ${props => {
    if (props.show === true) {
        return 'opacity: 1'
    }
    if (props.show === false) {
        return 'opacity: 0'
    }
}};
    transition: opacity 0.5s;
    //border: solid 1px#000;
    //filter: drop-shadow(0 0 3px rgba(0, 0, 0, 0.87));
    &:before {
        //filter: drop-shadow(0 0 0px rgba(0, 0, 0, 0.87));
        content: '';
        position: absolute;
        bottom: 0.2em;
        left: 15%;
        width: 0;
        height: 0;
        border: 1.5em solid transparent;
        border-top-color: white;
        border-bottom: 0;
        border-left: 0;
        margin-left: -0.75em;
        margin-bottom: -1.5em;
}
    }
`;

const Title = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Klik = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
`;


export const Speech = ({data, show, onClick, onEnd}) => {
    const [delayShow, setDelayShow] = useState(null);
    const [countSpeech, setCountSpeech] = useState(null);
    const [speech, setSpeech] = useState(null);

    useEffect(() => {
        if (show === true) {
            setTimeout(() => setDelayShow(true), 1000)
        }
        if (show === false) {
            setDelayShow(false)
        }
    }, [show]);

    useEffect(() => {
        if (data) {
            if (Array.isArray(data)) {
                setCountSpeech(0)
                setSpeech(data[0])
            }
            if (!Array.isArray(data)) {
                setCountSpeech(null);
                setSpeech(data)
            }
        }
    }, [data]);

    useEffect(() => {
        if (data && typeof countSpeech === 'number') {
            setSpeech(data[countSpeech])
        }
        if (data.length === countSpeech) {
            onEnd && onEnd();
        }
    }, [countSpeech, data]);

    useEffect(() => {
        if (delayShow && speech && speech.hasOwnProperty('audio')) {
            const howl = new Howl({
                src: speech.audio,
                autoplay: true,
                volume: 0.5,
            });
            howl.play();
            return (() => {
                howl.stop();
                Howler._howls = Howler._howls.filter(h => h !== howl)
            })
        }
    }, [speech, delayShow]);


    useEffect(() => {
        if (data && Array.isArray(data)) {
            const handlerClickWindow = (e) => {
                setCountSpeech(prev => prev + 1)
            };
            window.addEventListener("click", handlerClickWindow);
            return () => {
                window.removeEventListener("click", handlerClickWindow);
            };
        }
    }, [data]);


    return (
        <>
            {speech && speech.phrase && data &&
            <Wrapper onClick={onClick} show={delayShow} type={data.type}>
                {data.title && <Title>
                    {data.title}
                </Title>}
                <Text>
                    {speech.phrase}
                </Text>
                <Klik>{'> Klikni <'}</Klik>
            </Wrapper>
            }
        </>
    )
};