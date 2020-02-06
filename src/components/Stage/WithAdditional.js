import React from "react";
import styled from "styled-components";
import {TextWithBorders} from "../TextWithBorders";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: green;
`;

const Title = styled.div`
  position: relative;
  top: -1rem;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Paragraph = styled.p`
    font-family: 'Boogaloo', cursive;
    font-size: 2rem;
    text-align: center;
    max-width: 60%;

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
    const {text, title, layout, img} = data;
    const isTitleImage = title && title.includes('.png');

    return (
        <Wrapper>
            {title && <Title>
                {isTitleImage ? <Image><img src={title} alt=""/></Image>:
                    <TextWithBorders strokeWidth={'0.2em'} strokeColor={"#2c1e0c"} color={"#d5883f"} size={3} text={title}/>}
            </Title>}
            {img && <Image size={img.width}><img src={img.src} alt=""/></Image>}
            {text && <Paragraph>{text.split('\n').map((item, i) => {
                return (
                    <React.Fragment key={i}>
                        {item && item}
                        <br/>
                    </React.Fragment>);
            })}</Paragraph>}
            {React.Children.map(children, child => {
                return (
                    <>
                        {isReactElement(child) && <>
                            {React.cloneElement(child, {layout})}
                        </>}

                    </>
                )
            })}
        </Wrapper>
    )
}