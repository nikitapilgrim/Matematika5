import {Howl} from 'howler';

const data = {
    success: [
        require('./assets/sound/success_mixdown.aac'),
        require('./assets/sound/success_mixdown.mp3'),
        require('./assets/sound/success_mixdown.ogg'),
    ],
    background: [
        require('./assets/sound/music.mp3'),
    ],
    fail: [
        require('./assets/sound/error_mixdown_2.aac'),
        require('./assets/sound/error_mixdown_2.mp3'),
    ],
    mouseclick: [
        require('./assets/sound/mouseclick.mp3'),
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
};