import {FileLoader} from "three/src/loaders/FileLoader";
import {Cache} from "three/src/loaders/Cache";

import {Loader as ResourcesLoader} from 'resource-loader';
import React, {useState, useMemo, useEffect} from 'react';
import {LoaderContext} from "./context";
import {Howl} from 'howler';

const loader = new ResourcesLoader();
let init = false;
let sounds = {};

const extension = {
    images: ['png','jpg','jpeg'],
    sounds: ['mp3','aac','ogg']
};
export const Loader = ({resources, onProgress}) => {
    if (init) return loader;
    if (resources) init = true;
    let cache = Cache;
    cache.enabled = true;
    let fileLoader = new FileLoader();
    fileLoader.setResponseType('blob');

    loader
        .add(resources)
        .use((resource, next) => {
            if (extension.sounds.some(ext => ext === resource.extension)) {
                const data = new Howl({
                    src: [resource.url],
                    autoplay: false,
                    preload: true,
                    onload: function() {
                        resource.data = data;
                        sounds[resource.name] = resource.data;
                        setTimeout(() => {
                            next();
                        },  1000)
                    }
                });
            }
            if (extension.images.some(ext => ext === resource.extension)) {
                function cacheImage(blob) {
                    const objUrl = URL.createObjectURL(blob);
                    const image = document.createElementNS('http://www.w3.org/1999/xhtml', 'img');

                    image.onload = ()=> {
                        cache.add([resource.url], image);
                        URL.revokeObjectURL(objUrl);
                        document.body.removeChild(image);
                    };

                    image.src = objUrl;
                    image.style.visibility = 'hidden';
                    document.body.appendChild(image);
                    next();
                }
                fileLoader.load([resource.url], cacheImage, () => void(0), () => console.log(false));
            }
            else {
                fileLoader.load([resource.url], next, () => void(0), () => console.log(false));
            }
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
    loader.onLoad.add((a) => {

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
