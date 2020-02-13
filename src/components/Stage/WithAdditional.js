import React, {useEffect} from "react";
import styled from "styled-components";
import {TextWithBorders} from "../TextWithBorders";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  top: 7rem;
  height: 50%;
  width: 80%;
  padding: 0 1rem;
`;

const Title = styled.div`
  position: absolute;
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  top: 1rem;
`;

const Paragraph = styled.p`
    font-family: 'Mali', cursive;
    font-size: 1.5rem;
    text-align: center;
    max-width: 100%;
    color: white;

`;

const WrapperQuestion = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 100%;
`;

const MedalContainer = styled.div`
  position: relative;
  //margin-top: 1rem;
  /*height: 100%;
  width: 100%;*/
`;

const Image = styled.div`
  width: ${props => props.size};;
  img {
    max-width: 100%;
  }
`;

const isReactElement = (obj) => {
    return obj && obj.hasOwnProperty('type')
};

export function WithAdditional({children, data}) {
    const {text, title, layout, img, key} = data;
    const isTitleImage = title && title.includes('.png');

    useEffect(() => {
        const nodes = document.querySelectorAll('input')
        if (nodes[0]) {
            nodes[0].focus();
        }
    }, [data]);

    return (
        <Wrapper>
            {title && <Title>
                {isTitleImage ? <Image><img src={title} alt=""/></Image> :
                    <TextWithBorders strokeWidth={'0'} strokeColor={"#FFF"} color={"#FFF"} size={2} text={title}/>}
            </Title>}
            {img && <Image size={img.width}><img src={img.src} alt=""/></Image>}
            {text && <Paragraph>{text.split('\n').map((item, i) => {
                return (
                    <React.Fragment key={key + i}>
                        {item && item}
                        <br/>
                    </React.Fragment>);
            })}</Paragraph>}
            <WrapperQuestion>
                {React.Children.map(children, child => {
                    return (
                        <React.Fragment key={key}>
                            {isReactElement(child) && <>
                                {React.cloneElement(child, {layout})}
                            </>}

                        </React.Fragment>
                    )
                })}
            </WrapperQuestion>
        </Wrapper>
    )
}