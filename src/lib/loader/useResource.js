import React, {useContext, useMemo} from 'react';
import {LoaderContext} from "./context";

export const useResource = () => {
    const value = useContext(LoaderContext);
    return useMemo(() => {
        if (value) {
            return {...value} || {}
        }
    }, [value]);
};