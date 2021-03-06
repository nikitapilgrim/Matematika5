import createStore from 'storeon';
import persistState from '@storeon/localstorage';
import stages from '../data/stages'

const preloader = document.querySelector('#preload__percent');

const initState = {
    stage: 0,
    final: false,
    modal: false,
    start: false,
    music: false,
    preloader: {
        container: preloader,
        count: 0,
        show: true,
    },
    countQuestions: 0,
    countCorrectAnswers: 0,
    kviz: {
        order: 1,
        prev: 1,
        show: false,
        wait: false,
    },
    help: false,
    tutorial: false,
    waitDesk: false,
    showDesk: false,
    medals: {},
    reset: false,
    resetDone: true,
    tutorialDone: false,
    deskRef: null,
};
const reset = {
    resetDone: false,
    reset: true,
    stage: 1,
    final: false,
    modal: false,
    start: true,
    countQuestions: 0,
    countCorrectAnswers: 0,
    tutorial: false,
    tutorialDone: true,
    preloader: {
        container: preloader,
        count: 100,
        show: false,
    },
    kviz: {
        order: -1,
        prev: -1,
        show: true,
        wait: false,
    },
    help: false,
    waitDesk: false,
    showDesk: false,
    medals: {}
};

const app = store => {
    store.on('@init', () => (initState));


    store.on('medal/set', ({medals}, state) => {
        return ({
            medals: {
                ...medals, [state.id]: {
                    type: state.type
                }
            }
        });
    });

    store.on('tutorial', ({tutorial}, state) => {
        return ({tutorial: state});
    });
    store.on('music/change', ({music}) => {
        return ({music: !music});
    });

    store.on('game/start', () => {
        return ({start: true});
    });
    store.on('modal/show', ({quiz}, state) => {
        return ({modal: true});
    });
    store.on('modal/hide', ({quiz}, state) => {
        return ({modal: false});
    });
    store.on('waitDesk', ({quiz}, state) => {
        return ({waitDesk: state});
    });
    store.on('showDesk', ({quiz}, state) => {
        return ({showDesk: state});
    });

    store.on('kviz/set', ({kviz}, state) => {
        return ({
            kviz: {
                ...kviz,
                order: state.current || kviz.order,
                prev: state.prev || kviz.prev,
            }
        });
    });

    store.on('preload/set', ({preloader}, state) => {
        preloader.container.innerHTML = `${state}%`;
        if (state === 100) {
            document.querySelector('#preload').style.opacity = 0;
            document.querySelector('#preload').style.zIndex = -99;
        }
        return ({preloader: {...preloader, count: state}});
    });

    store.on('kviz/show', ({kviz}) => {
        return ({kviz: {...kviz, show: true}});
    });
    store.on('kviz/hide', ({kviz}) => {
        return ({kviz: {...kviz, show: false}});
    });

    store.on('stage/final', ({final}, state) => {
        return ({final: state});
    });
    store.on('reset', (state) => {
        return (reset);
    });
    store.on('resetDone', (state) => {
        return ({resetDone: state});
    });
    store.on('stage/to', ({stage}, number) => {
        if (number === 0 || number) {
            return ({stage: number});
        }
    });
    store.on('help/show', ({kviz}) => {
        return ({help: true});
    });
    store.on('help/hide', ({kviz}) => {
        return ({help: false});
    });
    store.on('tutorialDone', ({kviz}) => {
        return ({tutorialDone: true});
    });
    store.on('countQuestion', ({countQuestions}) => {
        return ({countQuestions: countQuestions + 1});
    });
    store.on('deskRef', ({deskRef}, ref) => {
        return ({deskRef: ref});
    });
    store.on('countCorrectAnswers', ({countCorrectAnswers}) => {
        return ({countCorrectAnswers: countCorrectAnswers + 1});
    });
    store.on('stage/next', ({stage}, data) => {
        store.dispatch('countQuestion');
        if (data) {
            if (data.right) {
                store.dispatch('countCorrectAnswers')
            }
        }

        if (stages.length <= stage + 1) {
            store.dispatch('stage/final', true);
            return ({stage: stage});
        }
        return ({stage: stage + 1});
    });
};


export const store = createStore([app]);
//persistState(['stage', 'medals' ])