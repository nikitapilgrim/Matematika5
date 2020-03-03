import {Howl} from 'howler';

const data = {
    success: [
        require('./assets/sound/cowbell.aac'),
    ],
    background: [
        require('./assets/sound/music.mp3'),
    ],
    mouseclick: [
        require('./assets/sound/mouseclick.mp3'),
    ],
    final: [
        require('./assets/sound/final-stage-music.aac'),
    ]
};

export const sounds = {
    /*success: new Howl({
        src: data.success
    }),
    fail: new Howl({
        src: data.fail
    }),*/
    background: new Howl({
        src: data.background,
        autoplay: false,
        loop: true,
        preload: true
    }),
    mouseclick: new Howl({
        src: data.mouseclick,
        preload: true
    }),
    success: new Howl({
        src: data.success,
        preload: true
    }),
    final: new Howl({
        src: data.final,
        preload: true,
        loop: true,
    }),
};