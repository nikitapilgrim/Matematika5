import {LAYOUTS} from "./stages";

const {detect} = require('detect-browser');
const browser = detect();

export default [
    {
        layout: LAYOUTS.speech,
        teacher: require('../assets/image/tutorial/floating-teacher-1.png'),
        bubble: {
            src: require('../assets/image/tutorial/bubble-1.png'),
            position: 'left'
        },
        type: 'tutorial',
        offset: document.documentElement.clientWidth < 500 ? '5vw' : '50vw'
    },
    {
        layout: LAYOUTS.speech,
        teacher: document.documentElement.clientWidth < 500 ? require('../assets/image/tutorial/floating-teacher-1.png') : require('../assets/image/tutorial/floating-teacher-3.png'),
        bubble: {
            src: require('../assets/image/tutorial/bubble-2.png'),
            position: 'right'
        },
        revert: document.documentElement.clientWidth > 500,
        type: 'tutorial',
        elem: 'menu'
    },
    {
        layout: LAYOUTS.speech,
        teacher: require('../assets/image/tutorial/floating-teacher-1.png'),
        bubble: {
            src: require('../assets/image/tutorial/bubble-3.png'),
            position: 'right'
        },
        type: 'tutorial',
        elem: 'sound'
    },
    {
        layout: LAYOUTS.speech,
        teacher: require('../assets/image/tutorial/floating-teacher-2.png'),
        bubble: {
            src: require('../assets/image/tutorial/bubble-4.png'),
            position: 'right'
        },
        type: 'tutorial',
        elem: 'help'
    },
    {
        layout: LAYOUTS.speech,
        teacher: require('../assets/image/tutorial/floating-teacher-1.png'),
        bubble: {
            src: require('../assets/image/tutorial/bubble-5.png'),
            position: 'right'
        },
        type: 'tutorial',
        offset: document.documentElement.clientWidth < 500 ? '5vw' : '50vw'
    }
]