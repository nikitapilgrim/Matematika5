import React from "react";
import styled from "styled-components";
import {TextWithBorders} from "../TextWithBorders";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;
  top: 8%
`;

const Title = styled.div`
  position: relative;
  top: -1rem;
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Paragraph = styled.p`
    font-family: 'Boogaloo', cursive;
    font-size: 2rem;
    text-align: center;
    max-width: 60%;
    color: white;

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

    return (
        <Wrapper>
            {title && <Title>
                {isTitleImage ? <Image><img src={title} alt=""/></Image>:
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
            {React.Children.map(children, child => {
                return (
                    <React.Fragment key={key}>
                        {isReactElement(child) && <>
                            {React.cloneElement(child, {layout})}
                        </>}

                    </React.Fragment>
                )
            })}
        </Wrapper>
    )
}