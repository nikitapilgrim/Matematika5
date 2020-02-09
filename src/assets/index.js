import tutorialAssets from "./image/tutorial";

const assets = [
    {
        name: 'svg_help',
        url: require('./svg/help.svg')
    },
    {
        name: 'svg_menu',
        url: require('./svg/menu.svg')
    },
    {
        name: 'svg_volume-off',
        url: require('./svg/volume_off.svg')
    },
    {
        name: 'svg_volume-on',
        url: require('./svg/volume_on.svg')
    },
    {
        name: 'sound',
        url: require('./sound/music.mp3')
    },
    {
        name: 'mouseClick',
        url: require('./sound/mouseclick.mp3')
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
        url: require('./image/intro/Frontelements.png')
    },
    {
        name: 'kids',
        url: require('./image/intro/kids-rotation.png')
    },
    {
        name: 'font',
        url: require('./font/Boogaloo-Regular.woff2')
    },
    ...tutorialAssets
];

export default assets;
