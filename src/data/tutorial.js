import {LAYOUTS} from "./stages";

export default [
    {
        layout: LAYOUTS.speech,
        teacher: require('../assets/image/tutorial/teacher-1.png'),
        bubble: {
            src: require('../assets/image/tutorial/bubble-1.png'),
            position: 'left'
        },
        type: 'tutorial',
        offset: '50vw'
    },
    {
        layout: LAYOUTS.speech,
        teacher: require('../assets/image/tutorial/teacher-1.png'),
        bubble: {
            src: require('../assets/image/tutorial/bubble-2.png'),
            position: 'right'
        },
        type: 'tutorial',
        elem: 'menu'
    },
    {
        layout: LAYOUTS.speech,
        teacher: require('../assets/image/tutorial/teacher-1.png'),
        bubble: {
            src: require('../assets/image/tutorial/bubble-3.png'),
            position: 'right'
        },
        type: 'tutorial',
        elem: 'sound'
    },
    {
        layout: LAYOUTS.speech,
        teacher: require('../assets/image/tutorial/teacher-2.png'),
        bubble: {
            src: require('../assets/image/tutorial/bubble-4.png'),
            position: 'right'
        },
        type: 'tutorial',
        elem: 'help'
    },
    {
        layout: LAYOUTS.speech,
        teacher: require('../assets/image/tutorial/teacher-1.png'),
        bubble: {
            src: require('../assets/image/tutorial/bubble-5.png'),
            position: 'right'
        },
        type: 'tutorial',
        offset: '0vw'
    }
]