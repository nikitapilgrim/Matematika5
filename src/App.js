import React, {useState, useEffect} from 'react';
import useStoreon from 'storeon/react';
import styled from 'styled-components';
import StoreContext from 'storeon/react/context';
import {GameView} from "./components/GameView";
import {store} from "./store/store";
import {useLoader} from "./lib/loader/useLoader";
import resources from "./assets";
import nanoid from "nanoid";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow:hidden;
`;

const WithStore = ({children}) => {
    const [id] = useState(nanoid(10));
    const {progress} = useLoader({resources});
    const {dispatch} = useStoreon(
        'preloader',
    );
    useEffect(() => {
        dispatch('preload/set', progress);
    }, [progress]);

    return (
        <React.Fragment key={id}>
            {children}
        </React.Fragment>
    )
};

const WithProviders = () => {
    const [isFull, setIsFull] = useState(false);

    const goFullScreen = () => {
        setIsFull(true)
    };


    return (
        <StoreContext.Provider value={store}>
            <WithStore>
                <GameView/>
            </WithStore>
        </StoreContext.Provider>
    );
};


export default WithProviders;

