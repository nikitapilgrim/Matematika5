import tutorialAssets from "./image/tutorial";

const assets = [
    {
        name: 'sound',
        url: require('./sound/music.mp3')
    },
    {
        name: 'mouseClick',
        url: require('./sound/mouseclick.mp3')
    },
    {
        name: 'successSound',
        url: require('./sound/cowbell.aac')
    },
    {
        name: 'background',
        url: require('./background-image.jpg')
    },
    {
        name: 'desk',
        url: require('./image/blackboard.png')
    },
    {
        name: 'into',
        url: require('./image/intro/frontelements.png')
    },{
        name: 'hintm',
        url: require('./image/intro/menu-hint.png')
    },{
        name: 'hints',
        url: require('./image/sound-hint.png')
    },
    {
        name: 'kids',
        url: require('./image/intro/kids-rotation.png')
    },
    {
        name: 'final',
        url: require('./image/final/final-stage-background.png')
    },
    {
        name: 'finalbutton',
        url: require('./image/final/final-stage-button.png')
    },{
        name: 'finalnusic',
        url: require('./sound/final-stage-music.aac')
    },
    {
        name: 'font',
        url: require('./font/Boogaloo-Regular.woff2')
    },
    ...tutorialAssets
];

export default assets;
