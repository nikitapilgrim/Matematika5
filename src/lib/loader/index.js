import {Loader as ResourcesLoader} from 'resource-loader';
import React, {useState, useMemo, useEffect} from 'react';
import {LoaderContext} from "./context";

const loader = new ResourcesLoader();
let init = false;
export const Loader = ({resources, onProgress}) => {
    if (init) return loader;
    if (resources) init = true;
    loader
        // Chainable `add` to enqueue a resource
        .add(resources)

        // Chainable `use` to add a middleware that runs for each resource, *after* loading that resource.
        // This is useful to implement custom parsing modules (like spritesheet parsers).
        .use((resource, next) => {
            // Be sure to call next() when you have completed your middleware work.
            next();
        })

        // The `load` method loads the queue of resources, and calls the passed in callback called once all
        // resources have loaded.
        .load((loader, resources) => {
            // resources is an object where the key is the name of the resource loaded and the value is the resource object.
            // They have a couple default properties:
            // - `url`: The URL that the resource was loaded from
            // - `error`: The error that happened when trying to load (if any)
            // - `data`: The raw data that was loaded
            // also may contain other properties based on the middleware that runs.
        });

// Throughout the process multiple signals can be dispatched.
    loader.onStart.add(() => {
    }); // Called when a resource starts loading.
    loader.onError.add(() => {
    }); // Called when a resource fails to load.
    loader.onLoad.add(() => {
    }); // Called when a resource successfully loads.
    if (onProgress) loader.onProgress.add(onProgress); // Called when a resource finishes loading (success or fail).
    loader.onComplete.add(() => {
    }); // Called when all resources have finished loading.
};

export const ProviderLoader = ({children}) => {
    const [LOADER] = useState(loader);
    const [loaded, setLoaded] = useState(false);
    const [value, setValue] = useState(null);

    if (!loaded && LOADER && LOADER.progress === 100) {
        const result = Object.entries(LOADER.resources).reduce((acc, pair) => {
            const [key, value] = pair;
            return {...acc, [key]: value.data.src}
        }, {});
        setValue(result);
        setLoaded(true)
    }


    return (
        <LoaderContext.Provider value={value}>
            {children}
        </LoaderContext.Provider>
    )
};
