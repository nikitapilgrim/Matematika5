import React, {useState, useEffect} from 'react';
import styled, {css} from 'styled-components';
import {useMount, useWindowSize} from 'react-use';
import * as Scroll from 'react-scroll';

import {Menu} from '../components/Menu/Menu';
import {breakpoints} from '../mixins/breakpoints';

import ArticlesData from '../Data/Articles';
import {MultipleArticles} from '../components/Layouts/MultipleArticles';

import bgHeader from '../assets/img/backgrounds/header.jpg';

let scroll = Scroll.animateScroll;

const AllSpace = css`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Wrapper = styled.div`
  font-family: Raleway,serif;
  width: 100%;
`;

const Main = styled.main`
  //transform: scale(0.8);
`

const Header = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url(${bgHeader});
  background-size: cover;
`;

const Inner = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BgContainer = styled.div`
    ${AllSpace};
    z-index: 0;
`;

const Bg = styled.div`
  background: url(${bgHeader});
   @media ${breakpoints.tablet} {
    background: url(${bgHeader}) 50% 0%;
  }
  background-size: cover;
  ${AllSpace};
  z-index: 1;
  &:before {
    content: '';
    ${AllSpace};
    z-index: 2;
    background-color: #422400;
    opacity: 0.59;
    }
 
`;

const Title = styled.div`
  text-shadow: 0 4px 0 #000000;
  color: #ffffff;
  font-size: 46px;
  font-weight: 900;
  @media ${breakpoints.tablet} {
    font-size: 108px;
  }
`;

const Subtitle = styled.div`
  text-shadow: 0 4px 0 #000000;
  color: #ffffff;
  font-size: 26px;
  font-weight: 700;
  @media ${breakpoints.tablet} {
    font-size: 44px;
  }
`;

const Button = styled.button`
  cursor: pointer;
  position: relative;
  margin-top: 60px;
  background: #FFF;
  width: 200px;
  height: 100px;
  font-size: 36px; 
  border-radius: 6px;
  border: none;
  outline: none;
  color: black;
  font-weight: 900;
  @media ${breakpoints.laptop} {
    width: 334px;
    height: 153px;
    font-size: 60px; 
  }
  span {
    color: black;
    background: url(${bgHeader}) no-repeat;
    background-position: 50% 50%;
    @media ${breakpoints.tablet} {
      background: url(${bgHeader}) no-repeat;
      background-position: 50% 25%;
      -webkit-background-clip: text;
    }
    background-size: ${props => `${props.size[0]}px ${props.size[1]}px`};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const MenuWrapper = styled.div`
  position: fixed;
  z-index: 1;
  top: 2vh;
  right: 3vw;
`;

export const Start = () => {
  const {width, height} = useWindowSize();
  const [offsetArticles, setOffsetArticles] = useState({});
  const getOffset = (id, offset) => {
    setOffsetArticles(prev => ({...prev, [id]: offset}));
  };
  const scrollToArticle = (id) => {
    console.log(id, scroll, offsetArticles[id])
    scroll.scrollTo(offsetArticles[id]);
    /*window.scrollTo({
      top: offsetArticles[id],
      behavior: 'smooth',
    });*/
  };

  useMount(() => {
    const preload = document.querySelector('#preload');
    const percentDIV = document.querySelector('#percent');
    const five = document.querySelector('#five');
    const twentyfive = document.querySelector('#twentyfive');
    const fifty = document.querySelector('#fifty');
    const seventyfive = document.querySelector('#seventyfive');
    const onehundred = document.querySelector('#onehundred');

    const setChecked = (elem, percent) => () => {
      elem.checked = true;
      percentDIV.innerHTML = `${percent}%`;
    };

    setTimeout(() => {
      setTimeout(setChecked(five, 5), 100);
      setTimeout(setChecked(twentyfive, 25), 500);
      setTimeout(setChecked(fifty, 50), 900);
      setTimeout(setChecked(seventyfive, 75), 1300);
      setTimeout(setChecked(onehundred, 100), 1500);
      setTimeout(() => {
        preload.style.display = 'none';
      }, 2000)
    });
    }, 2000);


  return (
    <Wrapper>
      <Header>
        <Menu scrollToArticle={scrollToArticle}/>
        <Inner>
          <Title>Citanka 8-9</Title>
          <Subtitle>Ljiljana Mitic-Roric</Subtitle>
          <Subtitle>Alija H. Dubocanin</Subtitle>
          <Button onClick={() => scrollToArticle(1)} size={[width, height]}><span>Start</span></Button>
        </Inner>
        <BgContainer>
          <Bg/>
        </BgContainer>
      </Header>
      <Main>
        <MultipleArticles getOffset={getOffset} data={ArticlesData}/>
      </Main>
    </Wrapper>
  );
};