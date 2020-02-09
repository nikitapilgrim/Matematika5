import React, {useState, useEffect, useMemo} from 'react';
import {Loader} from "./index";

export const useLoader = ({resources}) => {
    if (!Array.isArray(resources)) throw new Error('Must be Array');
    const [percentLoading, setPercentLoading] = useState(0);
    const handlerProgress = (e) => {
        const {progress} = e;
        setPercentLoading(Math.round(progress));
    };
    const [loader] = useState(Loader({resources, onProgress: handlerProgress}));
    return {loader, progress: percentLoading};
};