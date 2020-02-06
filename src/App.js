import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import StoreContext from 'storeon/react/context';
import {GameView} from "./components/GameView";
import {store} from "./store/store";
import Fullscreen from "react-full-screen";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow:hidden;
`;

const WithProviders = () => {
    const [isFull, setIsFull] = useState(false);

    const goFullScreen = () => {
        setIsFull(true)
    };


    return (
        <StoreContext.Provider value={store}>
                <Fullscreen
                    enabled={isFull}
                    onChange={isFull => setIsFull(isFull)}
                >
                    <Wrapper>
                        <GameView handlerFullscreen={goFullScreen}/>
                    </Wrapper>
                </Fullscreen>
        </StoreContext.Provider>
    );
};

export default WithProviders;

