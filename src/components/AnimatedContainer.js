import React, {useCallback, useEffect, useState} from 'react';
import {Slide as NewSlide} from './Animate/Slide'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import styled from 'styled-components';
import Spritesheet from '../lib/Spritesheet';
import teacher from '../assets/img/teacherSprites.png'
import girl from '../assets/img/girlSprites.png';
import boy from '../assets/img/boySprites.png'
import Fade from "react-reveal/Fade";
import useStoreon from "storeon/react";

const sprites = {
    teacher,
    girl,
    boy,
};

const setting = {
    teacher: {
        options: {
            steps: 86,
            image: sprites.teacher,
            widthFrame: 165,
            heightFrame: 450,
        },
        idle: {
            start: 85,
            end: 86,
            fps: 0.30,
        },
        right: [
            {
                start: 1,
                end: 18,
                fps: 15,
            }, {
                start: 42,
                end: 84,
                fps: 15,
            }, {
                start: 42,
                end: 84,
                fps: 15,
            }
        ]
    },
    girl: {
        options: {
            steps: 260,
            image: sprites.girl,
            widthFrame: 230,
            heightFrame: 379,
        },
        idle: [
            {
                end: 185,
                start: 184,
                fps: 0.30,
            },
            {
                end: 260,
                start: 245,
                fps: 5,
            },
        ],
        right: [
            {
                end: 52,
                fps: 24,
                start: 1
            },
            {
                end: 121,
                start: 62,
                fps: 24,
            },
            {
                end: 184,
                start: 123,
                fps: 24,
            }
        ]
    },
    boy: {
        options: {
            steps: 383,
            image: sprites.boy,
            widthFrame: 230,
            heightFrame: 350,
        },
        right: [
            {
                start: 1,
                end: 58,
                fps: 24,
            },
            {
                end: 149,
                start: 90,
                fps: 24,
            },
            {
                end: 268,
                start: 179,
                fps: 24,
            },
        ],
        idle: [
            {
                end: 269,
                start: 268,
                fps: 0.30,
            },
            {
                end: 383,
                start: 357,
                fps: 10,
            },
        ]
    },
};

const Position = styled.div`
  z-index: 1;
  width: 40%;
  position: absolute;
  bottom: ${props => props.bottom ? `${props.bottom}rem` : '0'};
  ${(props) => {
    if (props.left !== undefined) {
        return `left: ${props.left + 'rem'}`
    }
    if (props.right !== undefined) {
        return `right: ${props.right + 'rem'}`
    }
}}
`;

const ConfettiWrapper = styled.div`
  position: fixed;
  z-index: 1;
  top:0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  pointer-events: none;
`;

const useAnimateConfig = (config, animate) => {
    const [animateConfig, setAnimateConfig] = useState(null);
    const {name, stage} = animate;
    const getConfigForState = (name, stage) => {
        if (Array.isArray(config[name])) {
            setAnimateConfig(config[name][stage])
        } else {
            setAnimateConfig(config[name])
        }
    };
    useEffect(() => getConfigForState(name, stage), [animate]);

    return [config.options, animateConfig];
};

const PersonDropShadow = styled.div`
  filter: drop-shadow(0 0 3px);
  position: relative;
`;

const creatorPerson = (setting, name) => {
    return ({animate, onLoopComplete, children, onLoaded, pause, scale, className}) => {
        const [state, setState] = useState(animate);
        const [ref, setRef] = useState(null);
        const [settings, animateConfig] = useAnimateConfig(setting[name], state);

        const handlerLoop = () => {
            if (state.name !== 'idle') {
                setState({name: 'idle', stage: 0})
            }
        };

        useEffect(() => {
            if (animate.name !== 'idle') {
                setState(animate);
            }
        }, [animate]);

        useEffect(() => {
            if (pause && ref) {
                ref.pause();
            }
        }, [pause, ref]);

        const setAnimation = () => {
            if (animateConfig && ref && !pause) {
                const methods = {
                    start: 'setStartAt',
                    end: 'setEndAt',
                    fps: 'setFps'
                };
                Object.entries(animateConfig).forEach((pair) => {
                    const [key, value] = pair;
                    const method = methods[key];
                    ref[method](value);
                    if (key === 'start') {
                        ref.goToAndPlay(value)
                    }
                });
            }
        };

        useEffect(setAnimation, [animateConfig, ref, pause, state]);

        return (
            <>
                {children}
                {settings &&
                animateConfig &&
                <PersonDropShadow>
                    <Spritesheet getInstance={(ref) => {
                        setRef(ref)
                    }}
                                 className={className}
                                 autoplay={false}
                                 onInit={onLoaded}
                                 onLoopComplete={handlerLoop}
                                 style={{width: scale ? `${100 * scale}%` : '100%'}}
                                 isResponsive={true}
                                 loop={true}
                                 fps={24}
                                 onEachFrame={spritesheet => {

                                     //fix for girl empty frame
                                     if (name === 'girl' && state.stage === 1) {
                                         if (spritesheet.getInfo('frame') === 121) {
                                             spritesheet.goToAndPlay(122);
                                             spritesheet.setEndAt(123);
                                         }
                                     }

                                     if (state.name === 'idle') {
                                         if (spritesheet.getInfo('frame') !== animateConfig.start) {
                                             spritesheet.setFps(2)
                                         } else {
                                             spritesheet.setFps(0.30)
                                         }
                                     }
                                 }}
                                 {...settings}/>
                </PersonDropShadow>
                }
            </>
        )
    }
};

const Girl = creatorPerson(setting, 'girl');
const Boy = creatorPerson(setting, 'boy');
const Teacher = creatorPerson(setting, 'teacher');


export const AnimatedContainer = React.memo(({tutorial, animate, spritePlay, showCharacters, onAnimationEnd, onLoadedSprites, confety}) => {
    const [state, setState] = useState({name: 'idle', stage: 0});
    const {dispatch, kviz} = useStoreon('kviz');
    const [confettiShow, setConfettiShow] = useState(null);
    const {width, height} = useWindowSize();
    const [animations, setAnimations] = useState({
        teacher: null,
        child: null,
    });
    const [allSpriteLoaded, setAllSpriteLoaded] = useState(false);
    const [spriteLoaded, setSpriteLoaded] = useState({
        teacher: null,
        boy: null,
        girl: null,
    });

    useEffect(() => {
        /*if (state.stage === 2) {
            setConfettiShow(true);
            setTimeout(() => {
                setConfettiShow(false)
            }, 2500)
        }*/
        if (kviz.show && confety) {
            setConfettiShow(true)
        } else {
            setTimeout(() => {
                setConfettiShow(false)

            }, 1000);
        }
    }, [kviz.show, confety]);


    const handlerAnimationEnd = (name) => () => {
        setTimeout(() => {
            setAnimations(prev => {
                return {...prev, [name]: true}
            })
        }, 1000);
    };
    const memoHandlerAnimationEnd = useCallback(
        () => {
            handlerAnimationEnd(name);
        },
        [name],
    );

    const handlerSpriteLoaded = (name) => () => {
        setSpriteLoaded(prev => {
            return {...prev, [name]: true}
        })
    };

    // if all sprite loaded
    useEffect(() => {
        if (Object.values(spriteLoaded).every(a => a === true)) {
            setTimeout(() => {
                setAllSpriteLoaded(true);
                onLoadedSprites(spriteLoaded);
            }, 0)
        }
    }, [spriteLoaded]);

    // if animations done
    useEffect(() => {
        if (Object.values(animations).every(a => a === true)) {
            onAnimationEnd(animations);
            setTimeout(() => {
                setState({name: 'idle', stage: 0});
            }, 1000)
        }
    }, [animations]);

    const handlerLoopComplete = (name, animateName) => {
        /*if (animateName !== 'idle') {
            setState({name: 'idle', stage: 0})
        }*/
    };

    useEffect(() => {
        if (animate) {
            setState(animate)
        }
    }, [animate]);

    return (
        <>
            <ConfettiWrapper>

                <Fade when={kviz.show && confety}>
                    <Confetti
                        run={confettiShow && confety}
                        width={width}
                        height={height}
                    />
                </Fade>
            </ConfettiWrapper>
            <NewSlide when={showCharacters} left onReveal={memoHandlerAnimationEnd('teacher')}>
                <Position left={-12}>
                    <Teacher onLoaded={handlerSpriteLoaded('teacher')}
                             onLoopComplete={handlerLoopComplete}
                             animate={state}
                             pause={!spritePlay}
                             className="teacher-sprite"
                    />
                </Position>
            </NewSlide>

            <NewSlide when={!tutorial && showCharacters} right onReveal={memoHandlerAnimationEnd('child')}>
                <Position right={-4} bottom={-1}>
                    <Boy onLoaded={handlerSpriteLoaded('boy')}
                         onLoopComplete={handlerLoopComplete}
                         animate={state}
                         pause={!spritePlay}
                         scale={1.2}
                    />
                </Position>
                <Position right={-10} bottom={-1}>
                    <Girl onLoaded={handlerSpriteLoaded('girl')}
                          onLoopComplete={handlerLoopComplete}
                          animate={state}
                          pause={!spritePlay}
                          scale={1.2}
                    />
                </Position>
            </NewSlide>
        </>
    )
});