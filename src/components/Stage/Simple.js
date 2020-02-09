import React, {useEffect, useRef, useState} from 'react';
import styled, {css} from 'styled-components';
import useComponentSize from '@rehooks/component-size'
import reactStringReplace from 'react-string-replace';
import useStoreon from "storeon/react";

const nanoid = require('nanoid');

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TabbleInput = css`
  background: none;
  border: none;
  border-radius: 0;
  color: ${props => {
    if (props.help) {
        return 'transparent'
    } else {
        return 'black'
    }
}};
  box-shadow: none;
  margin: 0;
   &::placeholder, &::-moz-placeholder { 
    color: black;
    opacity: 1;
  } 
`;


const Question = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: 'Boogaloo', cursive;
    flex-direction: ${props => props.direction};
    font-weight: normal;
    font-size: ${props => props.size}rem;
    color: #fff;
    //text-shadow: 1px 1px 1px #000;
`;

const InputWrapper = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    font-size: 1em;
    white-space: nowrap;
    width: ${props => props.width ? `${props.width}px` : '3rem'};
    height: ${props => props.height ? `${props.height}px` : '3rem'};
    padding: 0px ${props => props.layout === `columnCalculation` ? `` : '10px'};
    margin: 0;
    margin-left: ${props => props.layout === `columnCalculation` ? `` : '10px'};
    margin-right:  ${props => props.layout === `columnCalculation` ? `` : '10px'};
    min-width: ${props => props.layout === `columnCalculation` ? `1em` : '2em'};
    min-height: 1.5em;
    ${props => props.theme === 'table' && TabbleInput};
    ${props => props.separator && ''}
    
   /* &:before {
        content: '';
        position: absolute;
        top: -10%;
        left: -6%;
        width: 112%;
        height: 115%;
        border-radius: 7px;
        
    }*/
`;

const Input = styled.input`
    border:none;
    background-image:none;
    background-color:transparent;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    font-family: 'Boogaloo', cursive;
    font-weight: normal;
    font-size: 1em;
    display: inline-block;
    padding: 0px 0px;
    vertical-align: middle;
    -moz-appearance: textfield;
    text-align: center;
    background-color: #FFF;
    border: solid #FFF 0.02em;
    outline: none;
    padding: 0 ${props => props.layout === `columnCalculation` ? `` : '0.2rem'};
    color: ${props => {
    if (props.help) {
        return 'transparent'
    }
    if (!props.help && props.color) {
        return `black`
    } else {
        return 'black'
    }
}};

   
    //border: solid black 2px;
   
      //text-shadow: 1px 1px 1px #000;
    &::-webkit-outer-spin-button, &::-webkit-inner-spin-button {
      -webkit-appearance: none;
    };
    
    ${props => props.theme === 'table' && TabbleInput}
   
`;

const Border = styled.div`
    position: absolute;
    pointer-events: none;
    z-index: 2;
    width: 118%;
    height: 124%;
    border-radius: 0.4em;
    ${props => props.focused && `border: solid #5D8247 5px;`};
    ${props => props.right !== null && !props.right && `border: solid #ec060c 5px;`};
    ${props => props.right && `border: solid #32B40F 5px;`}; 
`;

const HiddenAnswer = styled.div`
  opacity: ${props => props.show ? '0.5' : '0'};
  transition: 0.2s;
  position: absolute;
  pointer-events: none;
  z-index: 1;
  ${props => props.edit && 'padding: 0 0.3em'};
  color: black;
`;

const ImgWrapper = styled.div`
  width: ${props => props.width};
  img {
    max-width: 100%;
  }
`;
const SepatatorWrapper = styled.div`
  position: relative;
  width: ${props => props.width};
  height: ${props => props.width};
  transform: rotate(-90deg);
  margin: 0 2rem;
  margin-right: 4rem;
  img {
    max-width: 100%;
  }
`;

const InputWithState = React.memo(({separator, edit, val, solo, question, answer, handler, direction, color, disabled, placeholder, theme, layout}) => {
    const [id] = React.useState(nanoid)
    const {dispatch, help} = useStoreon('help');
    const [right, setRight] = useState(null);
    const [focused, setFocused] = useState(null);
    const inputRef = useRef(null);
    const ref = useRef(null);
    let size = useComponentSize(ref);
    let {width, height} = size;
    const [value, setValue] = useState(val || '');
    const regexp = /^[0-9]*$/gm;
    const romanRegexp = /^((\(M\)){0,3})(\(C\)\(M\)|\(C\)\(D\)|(\(D\))?(\(C\)){0,3})(\(X\)\(C\)|\(X\)\(L\)|(\(L\))?(\(X\)){0,3})(M\(X\)|M\(V\)|(\(V\))?)(M{0,3})(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;
    const type = new RegExp(regexp).test(answer) ? 'number' : 'text';

    useEffect(() => {
        if (val) {
            setValue(val)
        }
    }, [val]);

    useEffect(() => {
        setRight(null);
        setFocused(null);
    }, [question]);

    const handlerInput = (e) => {
        const value = e.target.value;
        if (romanRegexp.test(answer)) {
            const convertValue = value.toUpperCase()
            if (romanRegexp.test(convertValue)) {
                setValue(convertValue);
            }
            return false
        }

        if (type === 'number') {
            const re = /^[0-9\b]+$/;
            if (value === '' || re.test(value)) {
                setValue(value)
            }
            return false
        }
        if (type === 'text') {
            //const re = /^[A-Za-z]+$/;
            const re = /^[0-9\b]+$/;
            if (value === '' || !re.test(value)) {
                setValue(value.toLowerCase())
            }
        }
    };

    const handlerOnBlur = e => setFocused(false);
    const handlerOnFocus = e => setFocused(true);

    useEffect(() => {
        if (question && answer) {
            setValue('');
        }
        /*   if (inputRef.current) {
               console.log(inputRef)

               inputRef.current.focus()
           }*/
    }, [question, answer]);

    useEffect(() => {
        if (value.length > 0) {
            if (answer.toString() !== value) setRight(false);
            if (answer.toString() === value) setRight(true);
        }
        value && handler && handler(value);
    }, [value]);

    useEffect(() => {
        if (solo && right) {
            dispatch('stage/next')
        }
    }, [right, solo]);

    if (!question) {
        return (
            <InputWrapper theme={theme} width={width} height={height}>
                {!placeholder || edit &&
                <HiddenAnswer edit={edit} show={help}
                              ref={ref}>{Array.isArray(answer) ? answer[0] : answer}</HiddenAnswer>}
                {!placeholder &&
                <HiddenAnswer show={help} ref={ref}>{Array.isArray(answer) ? answer[0] : answer}</HiddenAnswer>}

                <Input
                    onFocus={handlerOnFocus}
                    onBlur={handlerOnBlur}
                    help={help && !placeholder || help && edit}
                    theme={theme}
                    value={value}
                    placeholder={edit ? placeholder : placeholder && answer || ''}
                    disabled={!edit && placeholder || ''}
                    color={color}
                    right={right}
                    maxLength={answer.toString().length} ref={inputRef}
                    pattern={type === "number" ? "[0-9]*" : ''}
                    onChange={handlerInput}
                />
            </InputWrapper>
        )
    }

    return (
        <>
            {question.split('\n').map((item, i) => (
                <React.Fragment key={i}>
                    {direction !== 'row' && layout !== 'columnCalculation' && <br/>}
                    {reactStringReplace(item, /{{([^}]+)}}/g, (match, i) => {
                        return (
                            <React.Fragment>
                                {separator &&
                                <SepatatorWrapper width={separator.width}>
                                    <img src={separator.src} alt=""/>
                                </SepatatorWrapper>
                                }
                                <InputWrapper layout={layout} separator={separator && separator.width} width={width}
                                              height={height} key={i}>
                                    <HiddenAnswer show={help}
                                                  ref={ref}>{Array.isArray(answer) ? answer[0] : answer}</HiddenAnswer>

                                    <Input
                                        layout={layout}
                                        onFocus={handlerOnFocus}
                                        onBlur={handlerOnBlur}
                                        help={help}
                                        color={color}
                                        right={right}
                                        maxLength={answer.toString().length} ref={inputRef}
                                        pattern={type === "number" ? "[0-9]*" : ''} value={value}
                                        onChange={handlerInput}
                                    />
                                </InputWrapper>
                            </React.Fragment>
                        )
                    })}
                </React.Fragment>
            ))}
        </>
    )
});


export const Simple = ({children, separator, edit, value, solo, question, img, handlerInput, answer, direction, layout, placeholder, disabled, theme}) => {
    const props = {
        size: layout === 'simple' ? 2 : 2,
        color: layout === 'simple' ? '#000' : '#7b4728'
    };

    return (
        <Wrapper>
            {children}

            <Question size={props.size} direction={direction}>
                {img &&
                <ImgWrapper width={img.width}>
                    <img src={img.src} alt=""/>
                </ImgWrapper>
                }

                <InputWithState
                    direction={direction}
                    separator={separator}
                    val={value}
                    edit={edit}
                    solo={solo}
                    theme={theme}
                    color={props.color}
                    placeholder={placeholder}
                    disabled={disabled}
                    answer={answer}
                    question={question}
                    handler={handlerInput}
                    layout={layout}
                />
            </Question>
        </Wrapper>
    )
};