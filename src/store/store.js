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
    medals: {}
};

const app = store => {
    store.on('@init', () => (initState));


    store.on('medal/set', ({medals}, state) => {
        return ({medals: {
          ...medals, [state.id]: {
            type: state.type
          }}});
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
    store.on('kviz/set', ({kviz}, state) => {
        return ({kviz: {...kviz,
                order: state.current || kviz.order,
                prev: state.prev || kviz.prev,
        }});
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
        console.log(state)
        return (initState);
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
    store.on('countQuestion', ({countQuestions}) => {
        return ({countQuestions: countQuestions + 1});
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


export const store = createStore([app, persistState(['stage'])]);
//persistState(['stage', 'medals' ])