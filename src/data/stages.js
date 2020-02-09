export const LAYOUTS = {
    simple: 'simple',
    manyInputs: 'manyInputs',
    dragAndDrop: 'dragAndDrop',
    sortable: 'sortable',
    choice: 'choice',
    speech: 'speech',
    quiz: 'quiz',
    table: 'table',
    graph: 'graph',
    editCorrect: 'editCorrect',
    between: 'between',
    columnCalculation: 'columnCalculation',
    justInput: 'justInput'
};

const titles = {}

export default [
    {layout: LAYOUTS.quiz},
    {
        id: 1,
        layout: LAYOUTS.manyInputs,
        title: 'Dopuni koliko ti nedostaje do 1000',
        questions: [
            {
                question: '256 + {{744}} = 1000'
            },
            {
                question: '324 - {{676}} = 1000'
            },
            {
                question: '687 + {{313}} = 1000'
            },
            {
                question: '794 + {{306}} = 1000'
            },
        ],
    },
    {
        id: 2,
        layout: LAYOUTS.columnCalculation,
        title: 'Saberi',
        questions: [
            '485',
            '367',
        ],
        sign: '+',
        answer: '{{852}}'
    },
    {
        id: 2.1,
        layout: LAYOUTS.columnCalculation,
        title: 'Saberi',
        questions: [
            '237',
            '482',
        ],
        sign: '+',
        answer: '{{719}}'
    },
    {
        id: 3,
        layout: LAYOUTS.columnCalculation,
        title: 'Saberi',
        questions: [
            '592',
            '189',
        ],
        sign: '+',
        answer: '{{781}}'
    },
    {
        id: 4,
        layout: LAYOUTS.columnCalculation,
        title: 'Oduzmi',
        questions: [
            '456',
            '183',
        ],
        sign: '-',
        answer: '{{273}}'
    },
    {
        id: 5,
        layout: LAYOUTS.columnCalculation,
        title: 'Oduzmi',
        questions: [
            '456',
            '376',
        ],
        sign: '-',
        answer: '{{466}}'
    },
    {
        id: 6,
        layout: LAYOUTS.columnCalculation,
        title: 'Oduzmi',
        questions: [
            '724',
            '382',
        ],
        sign: '-',
        answer: '{{342}}'
    },
    {
        id: 7,
        layout: LAYOUTS.columnCalculation,
        title: 'Oduzmi',
        questions: [
            '724',
            '382',
        ],
        sign: '-',
        answer: '{{342}}'
    },
    {
        id: 8,
        layout: LAYOUTS.manyInputs,
        title: 'U kvadratić upiši odgovarajuće brojeve',
        questions: [
            {
                question: '42{{3}}+{{3}}27=7{{5}}0'
            },
            {
                question: '{{5}}26+4{{3}}5=961'
            },
            {
                question: '4{{1}}7+{{2}}8{{4}}=701'
            },
        ],
    },
    {
        id: 9,
        layout: LAYOUTS.manyInputs,
        title: 'Nađi nepoznat sabirak',
        questions: [
            {
                question: '{{471}} + 385 = 856'
            },
            {
                question: '{{204}}+437=641'
            },
            {
                question: '427 + {{420}} = 847'
            },
            {
                question: '189 + {{354}} = 543'
            },
        ],
    },
    {
        id: 10,
        layout: LAYOUTS.manyInputs,
        title: 'Nađi nepoznati umanjenik ili umanjitelj',
        questions: [
            {
                question: '{{719}}–281=438'
            },
            {
                question: '253 – {{125}} = 128'
            },
            {
                question: '{{575}} – 328 = 247'
            },
            {
                question: '457 – {{220}} = 237'
            },
        ],
    },
    {
        id: 11,
        layout: LAYOUTS.manyInputs,
        title: 'Odgovori!',
        text: `Koji broj dobiješ kad od proizvoda brojeva 142 i 5 oduzmeš 237?`,
        direction: `row`,
        questions: [
            {
                question: '{{473}}'
            }
        ],
        left: `Rješenje:`
    },
    {
        id: 12,
        layout: LAYOUTS.manyInputs,
        title: 'Odgovori!',
        text: `U voćnjaku je ubrano 978 kg šljiva i jabuka. Šljiva je bilo 5 puta više nego jabuka. Koliko je bilo šljiva, a koliko jabuka?`,
        direction: `row`,
        questions: [
            {
                question: 'Šljiva {{815}} kg, jabuka {{163}} kg'
            }
        ],
        left: `Rješenje:`
    },
    {layout: LAYOUTS.quiz},
    {
        id: 13,
        layout: LAYOUTS.manyInputs,
        title: 'Odgovori!',
        text: `Izračunaj vrijednost brojnih izraza`,
        questions: [
            {
                question: '(136 + 284) ∙ 2 = {{840}}'
            },
            {
                question: '(837 – 675) ∙ 3 = {{486}}'
            },
            {
                question: '453 + 182 ∙ 3 = {{999}}'
            },
            {
                question: '187 ∙ 4 – 389 = {{359}}'
            },
        ],
    },
    {
        id: 14,
        layout: LAYOUTS.manyInputs,
        title: 'Podijeli',
        questions: [
            {
                question: '834 : 3 = {{278}}'
            },
            {
                question: '936 : 6 = {{15}}'
            },
            {
                question: '475 : 5 = {{95}}'
            },
            {
                question: '896 : 7 = {{128}}'
            },
        ],
    },
    {
        id: 15,
        layout: LAYOUTS.manyInputs,
        title: 'Odgovori!',
        text: `Količnik dva broja je 132, djelitelj je 6, a ostatak 3. Koliki je djeljenik?`,
        direction: `row`,
        questions: [
            {
                question: '{{795}}'
            }
        ],
        left: `Rješenje:`
    },
    {
        id: 16,
        layout: LAYOUTS.manyInputs,
        title: 'Riješi jednačine!',
        questions: [
            {
                question: '8 ∙ {{125}} = 1000'
            },
            {
                question: '6 ∙ {{146}} = 876'
            },
            {
                question: '{{748}} : 4 = 187'
            },
            {
                question: '{{867}} : 3 = 289'
            },
        ],
    },
    {
        id: 17,
        layout: LAYOUTS.manyInputs,
        title: 'Odgovori!',
        text: `U tvornicu za preradu voća stiglo je 354 kg jabuka, 186 kg krušaka i 180 kg šljiva. Trećina od svakog voća je prerađeno u mermeladu, a od ostatka je napravljen kompot. Koliko je kg voća prerađeno u mermeladu, a koliko u kompot?`,
        direction: `row`,
        questions: [
            {
                question: '{{240}} kg u mermeladu, {{480}} kg u kompot'
            }
        ],
        left: `Rješenje:`
    },
    {
        id: 18,
        layout: LAYOUTS.manyInputs,
        title: 'Riješiti nejednačine',
        questions: [
            {
                question: '{{< 643}} - 387 < 256'
            },
            {
                question: '{{> 205}} + 487 > 692'
            },
        ],
    },
    {
        id: 19,
        layout: LAYOUTS.manyInputs,
        title: 'Riješiti nejednačine',
        questions: [
            {
                question: '845 : 5 + 371  = {{540}}'
            },
            {
                question: '937 – 834 : 6 = {{798}}'
            },
        ],
    },
    {layout: LAYOUTS.quiz},
    {
        id: 20,
        layout: LAYOUTS.manyInputs,
        text: `Napiši brojeve za 1000 veće od brojeva`,
        direction: `column`,
        questions: [
            {
                question: '98854 {{99854}}',
                separator: {
                    src: require('../assets/image/11-08.png'),
                    width: '1rem'
                }
            },
            {
                question: '49826 {{50826}}',
                separator: {
                    src: require('../assets/image/11-08.png'),
                    width: '1rem'
                }
            },
            {
                question: '18924 {{19924}}',
                separator: {
                    src: require('../assets/image/11-08.png'),
                    width: '1rem'
                }
            },
            {
                question: '80999 {{81999}}',
                separator: {
                    src: require('../assets/image/11-08.png'),
                    width: '1rem'
                }
            },
        ],
    },
    {
        id: 21,
        layout: LAYOUTS.manyInputs,
        text: `Napiši brojeve za 1000 veće od brojeva`,
        direction: `column`,
        questions: [
            {
                question: '59827 {{60827}}',
                separator: {
                    src: require('../assets/image/11-08.png'),
                    width: '1rem'
                }
            },
            {
                question: '21208 {{31208}}',
                separator: {
                    src: require('../assets/image/11-08.png'),
                    width: '1rem'
                }
            },
            {
                question: '30724 {{40724}}',
                separator: {
                    src: require('../assets/image/11-08.png'),
                    width: '1rem'
                }
            },
            {
                question: '89099 {{99099}}',
                separator: {
                    src: require('../assets/image/11-08.png'),
                    width: '1rem'
                }
            },
        ],
    },
    {
        id: 22,
        layout: LAYOUTS.sortable,
        text: `Poredaj po veličini brojeve počevši od najmanjeg`,
        items: [
            {value: 409899, id: 1},
            {value: 189325, id: 2},
            {value: 408999, id: 3},
            {value: 200786, id: 4},
            {value: 589708, id: 5},
            {value: 601311, id: 6},
            {value: 871203, id: 7},
            {value: 599100, id: 8},
        ],
        answer: [
            {
                placeholder: '0',
                id: 2,
            },
            {
                placeholder: '1',
                id: 4,
            },
            {
                placeholder: '2',
                id: 3,
            },
            {
                placeholder: '3',
                id: 1,
            },
            {
                placeholder: '4',
                id: 5,
            },
            {
                placeholder: '5',
                id: 8
            },
            {
                placeholder: '6',
                id: 6
            },
            {
                placeholder: '6',
                id: 7
            },
        ]
    },
    {
        id: 23,
        layout: LAYOUTS.justInput,
        title: 'Napiši ciframa slijedeće brojeve',
        questions: 'Devetsto devet hiljada petsto pet {{909505}}',
        textInput: 'Devetsto devet hiljada petsto pet',
    },
    {
        id: 24,
        layout: LAYOUTS.justInput,
        title: 'Napiši ciframa slijedeće brojeve',
        questions: 'Tristo tri hiljade trideset devet {{303039}}',
        textInput: 'Tristo tri hiljade trideset devet',
    },
    {
        id: 25,
        layout: LAYOUTS.justInput,
        title: 'Napiši ciframa slijedeće brojeve',
        questions: 'Četiristotine hiljada devedeset devet {{400099}}',
        textInput: 'Četiristotine hiljada devedeset devet',
    },
    {
        id: 26,
        layout: LAYOUTS.manyInputs,
        title: 'Razmisli!',
        text: `Napiši najmanji šesterocifren broj`,
        direction: `row`,
        questions: [
            {
                question: '{{100000}}'
            }
        ],
        left: `Odgovor:`
    },
    {
        id: 27,
        layout: LAYOUTS.manyInputs,
        title: 'Razmisli!',
        text: `Ciframa 1, 2, 0, 5, 6, 7 upiši u kvadratić najmanji i najveći šestocifren broj koristeći svaku cifru samo jedanput.`,
        direction: `row`,
        questions: [
            {
                question: '{{102567}} {{765210}}'
            }
        ],
        left: `Odgovor:`
    },
    {
        id: 28,
        layout: LAYOUTS.manyInputs,
        title: 'Razmisli!',
        text: `Upiši u kvadratiće, kako pišemo broj koji u klasi hiljada ima 521, a u klasi jedinica 25.`,
        direction: `row`,
        questions: [
            {
                question: '{{521025}}'
            }
        ],
        left: `Odgovor:`
    },
    {
        id: 29,
        layout: LAYOUTS.manyInputs,
        title: 'Razmisli!',
        text: `U klasi hiljada je 59 a u klasi jedinica 379. Kako pišemo taj broj?`,
        direction: `row`,
        questions: [
            {
                question: '{{59379}}'
            }
        ],
        left: `Odgovor:`
    },
    {layout: LAYOUTS.quiz},
    {
        id: 30,
        layout: LAYOUTS.manyInputs,
        title: 'Računaj!',
        questions: [
            {
                question: '2843 + 3279 = {{6122}}'
            },
            {
                question: '5826 – 2378 = {{3448}}'
            },
            {
                question: '4577 + 3208 = {{7785}}'
            },
            {
                question: '7304  –5 229 = {{2075}}'
            },
        ],
    },
    {
        id: 31,
        layout: LAYOUTS.manyInputs,
        title: 'Računaj!',
        questions: [
            {
                question: '4271 + {{2086}} = 6357'
            },
            {
                question: '5784 - {{2499}} = 3285'
            },
            {
                question: '3825 + {{5175}} = 9000'
            },
            {
                question: '7000 - {{5103}} = 1897'
            },
        ],
    }, {
        id: 32,
        layout: LAYOUTS.columnCalculation,
        title: 'Saberi',
        questions: [
            '5824',
            '485',
        ],
        sign: '+',
        answer: '{{6312}}'
    }, {
        id: 33,
        layout: LAYOUTS.columnCalculation,
        title: 'Saberi',
        questions: [
            '2947',
            '5768',
        ],
        sign: '+',
        answer: '{{8715}}'
    }, {
        id: 34,
        layout: LAYOUTS.columnCalculation,
        title: 'Saberi',
        questions: [
            '4256',
            '3809',
        ],
        sign: '+',
        answer: '{{8065}}'
    }, {
        id: 35,
        layout: LAYOUTS.columnCalculation,
        title: 'Oduzmi',
        questions: [
            '8740',
            '3286',
        ],
        sign: '-',
        answer: '{{4954}}'
    }, {
        id: 36,
        layout: LAYOUTS.columnCalculation,
        title: 'Oduzmi',
        questions: [
            '7841',
            '3294',
        ],
        sign: '-',
        answer: '{{4547}}'
    },
    {
        id: 37,
        layout: LAYOUTS.columnCalculation,
        title: 'Oduzmi',
        questions: [
            '9405',
            '3567',
        ],
        sign: '-',
        answer: '{{5838}}'
    },
    {
        id: 38,
        layout: LAYOUTS.manyInputs,
        title: 'Odgovori!',
        text: `U rudniku je iskopano 82150 tona uglja. Za ogrev je potrošeno 13857 tona, a ostatak ide termoelektranama. Koliko je uglja otišlo termoelektranama?`,
        direction: `row`,
        questions: [
            {
                question: '{{68293}} tona'
            }
        ],
        left: `Rješenje:`
    },
    {
        id: 39,
        layout: LAYOUTS.manyInputs,
        title: 'Odgovori!',
        text: `Jedna firma je prva tri mjeseca u godini za nabavku robe potrošila 387214 KM. Za prvi i drugi mjesec je potrošila 228779 KM, za drugi i treći mjesec je potrošila 255372 KM. Koliko novca je firma potrošila svakog mjeseca pojedinačno?`,
        direction: `row`,
        questions: [
            {
                question: '1. mjesec {{131842}}, 2. mjesec {{96937}} i 3. mjesec {{158435}} '
            }
        ],
        left: `Rješenje:`
    },
    {layout: LAYOUTS.quiz},
    {
        id: 40,
        layout: LAYOUTS.manyInputs,
        title: 'Računaj',
        questions: [
            {
                question: '41245 + 21255 + 37500 = {{100000}}'
            },
            {
                question: '38188 + 18239 + 21761 = {{78188}}'
            },
        ],
    },
    {
        id: 41,
        layout: LAYOUTS.manyInputs,
        title: 'Računaj',
        text: `Jedna firma je prva tri mjeseca u godini za nabavku robe potrošila 387214 KM. Za prvi i drugi mjesec je potrošila 228779 KM, za drugi i treći mjesec je potrošila 255372 KM. Koliko novca je firma potrošila svakog mjeseca pojedinačno?`,
        direction: `row`,
        questions: [
            {
                question: 'Poveća se za {{50}}'
            }
        ],
        left: `Rješenje:`
    },
    {
        id: 42,
        layout: LAYOUTS.manyInputs,
        title: 'Računaj',
        text: `Razlika dva broja je 3180. Ako se umanjenik poveća za 150, a umanjilac smanji za 150 kolika će biti razlika?`,
        direction: `row`,
        questions: [
            {
                question: '{{3480}}'
            }
        ],
        left: `Rješenje:`
    },
    {
        id: 43,
        layout: LAYOUTS.manyInputs,
        title: 'Računaj',
        text: `Zbiru brojeva 25125 i 18687 oduzmi njihovu razliku. Šta ste dobili?`,
        direction: `row`,
        questions: [
            {
                question: '{{37374}}'
            }
        ],
        left: `Rješenje:`
    },
    {
        id: 44,
        layout: LAYOUTS.manyInputs,
        title: 'Računaj',
        text: `Zbiru brojeva 25125 i 18687 dodaj njihovu razliku. Šta ste dobili?`,
        direction: `row`,
        questions: [
            {
                question: '{{50250}}'
            }
        ],
        left: `Rješenje:`
    },
    {
        id: 45,
        layout: LAYOUTS.manyInputs,
        title: 'Računaj',
        text: `U zbiru dva sabirka jedan sabirak se poveća za 250. Kako promijeniti drugi sabirak pa da se taj zbir poveća za 185?`,
        direction: `row`,
        questions: [
            {
                question: 'Smanjiti ga za {{65}}'
            }
        ],
        left: `Rješenje:`
    },
    {layout: LAYOUTS.quiz},
    {
        id: 46,
        layout: LAYOUTS.manyInputs,
        title: 'Riješi jednačine',
        questions: [
            {
                question: '{{797}} + 1784 = 2581'
            },
            {
                question: '637 + {{1349}} = 1986'
            },
            {
                question: '3485 – {{1550}} = 1935'
            },
            {
                question: '{{6741}} – 4156 = 2585'
            },
        ],
    }, {
        id: 47,
        layout: LAYOUTS.manyInputs,
        title: 'Računaj',
        text: `Koliko treba dodati broju 7184 da se dobije 10000?`,
        direction: `row`,
        questions: [
            {
                question: '{{2816}}'
            }
        ],
        left: `Rješenje:`
    }, {
        id: 48,
        layout: LAYOUTS.manyInputs,
        title: 'Računaj',
        text: `Za koliko treba umanjiti 20000 da se dobije 12560?`,
        direction: `row`,
        questions: [
            {
                question: '{{7440}}'
            }
        ],
        left: `Rješenje:`
    }, {
        id: 49,
        layout: LAYOUTS.manyInputs,
        title: 'Riješi nejednačine',
        questions: [
            {
                question: '57826 + {{41753}} < 99579'
            },
            {
                question: '{{475024}} – 451190 < 23834'
            },
            {
                question: '{{49805}} + 28175 > 77980'
            },
            {
                question: '83196 – {{56818}} > 26378'
            },
        ],
    },
    {
        id: 50,
        layout: LAYOUTS.manyInputs,
        title: 'Računaj',
        text: `Koji najveći broj možeš sabrati sa 37824 pa da zbir bude manji od 50000?`,
        direction: `row`,
        questions: [
            {
                question: '{{12175}}'
            }
        ],
        left: `Rješenje:`
    },
    {
        id: 51,
        layout: LAYOUTS.manyInputs,
        title: 'Računaj',
        text: `Zbir dva broja je 57896, a jedan od njih je 7800. Koliki je drugi broj?`,
        direction: `row`,
        questions: [
            {
                question: '{{50096}}'
            }
        ],
        left: `Rješenje:`
    },
    {layout: LAYOUTS.quiz},
    {
        id: 52,
        layout: LAYOUTS.manyInputs,
        title: 'Računaj',
        questions: [
            {
                question: '1852 ∙ 100 = {{185200}}'
            },
            {
                question: '5840 : 10 = {{584}}'
            },
            {
                question: '897 ∙ 1000 = {{897000}}'
            },
            {
                question: '78500 : 100 = {{785}}'
            },
            {
                question: '42 ∙ 10000 = {{420000}}'
            },
            {
                question: '342000 : 100 = {{3420}}'
            },
        ],
    },
    {
        id: 53,
        layout: LAYOUTS.manyInputs,
        title: 'Računaj',
        text: `Uvećaj date brojeve za 100 puta`,
        direction: `column`,
        questions: [
            {
                question: '5760 {{576000}}',
                separator: {
                    src: require('../assets/image/11-08.png'),
                    width: '1rem'
                }
            },
            {
                question: '4263 {{426300}}',
                separator: {
                    src: require('../assets/image/11-08.png'),
                    width: '1rem'
                }
            },
            {
                question: '108 {{10800}}',
                separator: {
                    src: require('../assets/image/11-08.png'),
                    width: '1rem'
                }
            },
            {
                question: '1342 {{134200}}',
                separator: {
                    src: require('../assets/image/11-08.png'),
                    width: '1rem'
                }
            },
            {
                question: '2840 {{284000}}',
                separator: {
                    src: require('../assets/image/11-08.png'),
                    width: '1rem'
                }
            },
            {
                question: '425 {{42500}}',
                separator: {
                    src: require('../assets/image/11-08.png'),
                    width: '1rem'
                }
            },
        ],
    },
    {
        id: 54,
        layout: LAYOUTS.manyInputs,
        title: 'Računaj',
        text: `Upiši u kvadratić koliko se puta smanji broj 253000 kad mu obrišemo dvije nule?`,
        direction: `row`,
        questions: [
            {
                question: '{{100 puta}}'
            }
        ],
        left: `Rješenje:`
    },

    {
        id: 55,
        layout: LAYOUTS.manyInputs,
        title: 'Računaj',
        text: `Uvećaj date brojeve za 100 puta`,
        direction: `column`,
        questions: [
            {
                question: '324000 {{324}}',
                separator: {
                    src: require('../assets/image/11-08.png'),
                    width: '1rem'
                }
            },
            {
                question: '40000 {{40}}',
                separator: {
                    src: require('../assets/image/11-08.png'),
                    width: '1rem'
                }
            },
            {
                question: '84000 {{84}}',
                separator: {
                    src: require('../assets/image/11-08.png'),
                    width: '1rem'
                }
            },
            {
                question: '820000 {{820}}',
                separator: {
                    src: require('../assets/image/11-08.png'),
                    width: '1rem'
                }
            },
            {
                question: '50000 {{50}}',
                separator: {
                    src: require('../assets/image/11-08.png'),
                    width: '1rem'
                }
            },
            {
                question: '379000 {{379}}',
                separator: {
                    src: require('../assets/image/11-08.png'),
                    width: '1rem'
                }
            },
        ],
    },

    {
        id: 55,
        layout: LAYOUTS.manyInputs,
        title: 'Računaj',
        text: `Jedan sabirak je 589. Izračunaj koliki je zbir 1000 takvih sabiraka.`,
        direction: `row`,
        questions: [
            {
                question: '{{589000}}'
            }
        ],
        left: `Rješenje:`
    },
    {
        id: 56,
        layout: LAYOUTS.manyInputs,
        title: 'Računaj',
        questions: [
            {
                question: '320 : 8 = {{40}}'
            },
            {
                question: '81000 : 90 = {{900}}'
            },
            {
                question: '5600 : 70 = {{80}}'
            },
            {
                question: '4900 : 70 = {{70}}'
            },
            {
                question: '40000 : 50  = {{800}}'
            },
            {
                question: '3600 : 60 = {{6}}'
            },
        ],
    },
    {
        id: 57,
        layout: LAYOUTS.manyInputs,
        title: 'Računaj',
        questions: [
            {
                question: '320 : 8 = {{40}}'
            },
            {
                question: '81000 : 90 = {{900}}'
            },
            {
                question: '5600 : 70 = {{80}}'
            },
            {
                question: '4900 : 70 = {{70}}'
            },
            {
                question: '40000 : 50  = {{800}}'
            },
            {
                question: '3600 : 60 = {{6}}'
            },
        ],
    },
    {layout: LAYOUTS.quiz},
    {
        id: 58,
        layout: LAYOUTS.manyInputs,
        title: 'Računaj',
        questions: [
            {
                question: '(8 + 7) ∙ 4 = {{60}}'
            },
            {
                question: '3 ∙ 156  + 7 ∙ 156 = {{1560}}'
            },
            {
                question: '(9 + 8) ∙ 7 = {{119}}'
            },
            {
                question: '17 ∙ 19 + 3 ∙ 19 = {{380}}'
            },
            {
                question: '(14 + 6) ∙ 8 = {{160}}'
            },
            {
                question: '36 ∙ 8 + 4 ∙ 8 = {{320}}'
            },
            {
                question: '(23 + 7) ∙ 9 = {{270}}'
            },
            {
                question: '238 ∙ 4 + 238 ∙ 6 = {{2380}}'
            },
        ],
    }, {
        id: 59,
        layout: LAYOUTS.manyInputs,
        title: 'Računaj',
        questions: [
            {
                question: '346 ∙ 8 – 46 ∙ 8 = {{2400}}'
            },
            {
                question: '(56 – 26) ∙ 9 = {{270}}'
            },
            {
                question: '13417 – 134 ∙ 7 = {{1340}}'
            },
            {
                question: '(278 – 78) ∙ 7 = {{1400}}'
            },
            {
                question: '128 ∙ 5 – 28 ∙ 5 = {{500}}'
            },
            {
                question: '(543 – 43) ∙ 4 = {{2000}}'
            },
        ],
    }, {
        id: 60,
        layout: LAYOUTS.manyInputs,
        title: 'Računaj',
        questions: [
            {
                question: '45 : 6 + 15 : 6 = {{100}}'
            },
            {
                question: '87:  4 – 63 : 4 = {{6}}'
            },
            {
                question: '430 : 9 + 470 : 9 = {{100}}'
            },
            {
                question: '129 : 5 - 79: 5 = {{100}}'
            },
            {
                question: '325 : 7 + 375 : 7 = {{10}}'
            },
            {
                question: '253 : 8 – 221 : 8 = {{4}}'
            },
        ],
    },
    {
        id: 61,
        layout: LAYOUTS.manyInputs,
        title: 'Odgovori',
        text: `Amir je kupio sto i 4 stolice. Koliko je Amir platio sto i stolice, ako je stol bio 5 puta skuplji od stolice, a cijena jedne stolice je bila 60 KM ?`,
        direction: `row`,
        questions: [
            {
                question: '{{540}} KM '
            }
        ],
        left: `Rješenje:`
    },
    {
        id: 62,
        layout: LAYOUTS.manyInputs,
        title: 'Odgovori',
        text: `Amir je kupio sto i 4 stolice. Koliko je Amir platio sto i stolice, ako je stol bio 5 puta skuplji od stolice, a cijena jedne stolice je bila 60 KM ?`,
        direction: `row`,
        questions: [
            {
                question: '{{540}} KM '
            }
        ],
        left: `Rješenje:`
    },
    {
        id: 63,
        layout: LAYOUTS.manyInputs,
        title: 'Odgovori',
        text: `Za koliko treba povećati djeljenik da bi se količnik povećao za jedan?`,
        direction: `row`,
        questions: [
            {
                question: 'Djeljenik treba povećati za vrijednost {{djeljenika}}'
            }
        ],
        left: `Rješenje:`
    },
    {
        id: 64,
        layout: LAYOUTS.manyInputs,
        title: 'Odgovori',
        text: `Zbir dva broja je 250. Jedan od njih je devet puta veći od drugog. Koji su to brojevi?`,
        direction: `row`,
        questions: [
            {
                question: '{{25}} i {{225}}'
            }
        ],
        left: `Rješenje:`
    },
    {layout: LAYOUTS.quiz},
    {
        id: 65,
        layout: LAYOUTS.manyInputs,
        title: 'Računaj',
        questions: [
            {
                question: '8379 : 9 = {{931}}'
            },
            {
                question: '3875 : 5 = {{775}}'
            },
            {
                question: '48234 : 6 = {{8039}}'
            },
            {
                question: '77944 : 4 = {{19486}}'
            },
        ],
    }, {
        id: 64,
        layout: LAYOUTS.manyInputs,
        title: 'Podijeli',
        text: `Sedam radnika je za jedan posao zaradilo 29512 KM. Koliko će dobiti svaki radnik ako dobivaju jednaku sumu novca ?`,
        direction: `row`,
        questions: [
            {
                question: '{{4216}} KM'
            }
        ],
        left: `Rješenje:`
    }, {
        id: 65,
        layout: LAYOUTS.manyInputs,
        title: 'Podijeli',
        text: `Date brojeve podijeli i napiši količnik i ostatak:`,
        direction: `row`,
        questions: [
            {
                question: '4371:6={{728}} ostatak {{3}}'
            }
        ],
        left: `Rješenje:`
    }, {
        id: 66,
        layout: LAYOUTS.manyInputs,
        title: 'Podijeli',
        text: `Date brojeve podijeli i napiši količnik i ostatak:`,
        direction: `row`,
        questions: [
            {
                question: '127571 : 6 = {{21261}} ostatak {{5}}'
            }
        ],
        left: `Rješenje:`
    },
    {
        id: 67,
        layout: LAYOUTS.manyInputs,
        title: 'Podijeli',
        text: `Lana ima 1215 KM. Kad bi 5 dio novca dala sestri imale bi jednaku sumu novca. Koliko je novca imala Lanina sestra?`,
        direction: `row`,
        questions: [
            {
                question: '{{972}} KM'
            }
        ],
        left: `Rješenje:`
    },
    {
        id: 68,
        layout: LAYOUTS.manyInputs,
        title: 'Podijeli',
        text: `Količnik dva broja je 7843 i ostatak je 5. Djelitelj je 7. Koliki je djeljenik?`,
        direction: `row`,
        questions: [
            {
                question: '{{54906}}'
            }
        ],
        left: `Rješenje:`
    },
    {layout: LAYOUTS.quiz},
    {
        id: 69,
        layout: LAYOUTS.manyInputs,
        title: 'Množi',
        questions: [
            {
                question: '74 ∙ 38 = {{2812}}'
            },
            {
                question: '236 ∙ 584 = {{137824}}'
            },
            {
                question: '156 ∙ 49 = {{7644}}'
            },
            {
                question: '156 ∙ 49 = {{7644}}'
            },
            {
                question: '1237 ∙ 385 = {{476245}}'
            },
            {
                question: '608 ∙ 72 = {{43776}}'
            },
            {
                question: '986 ∙ 187 = {{184382}}'
            },
            {
                question: '936 ∙ 18 = {{16848}}'
            },
            {
                question: '785 ∙ 239 = {{187615}}'
            },
        ],
    },
    {
        id: 70,
        layout: LAYOUTS.manyInputs,
        title: 'Množi',
        text: `Broj 1284 pomnoži zbirom brojeva 20 i 18.`,
        direction: `row`,
        questions: [
            {
                question: '{{48792}}'
            }
        ],
        left: `Rješenje:`
    },
    {
        id: 71,
        layout: LAYOUTS.manyInputs,
        title: 'Množi',
        text: `Koji je broj 7 puta veći od proizvoda brojeva 28 i 36?`,
        direction: `row`,
        questions: [
            {
                question: '{{7056}}'
            }
        ],
        left: `Rješenje:`
    },
    {
        id: 72,
        layout: LAYOUTS.manyInputs,
        title: 'Množi',
        text: `Ako 6 radnika zaradi 1548 KM za jedan dan, koliko će zaraditi jedan od njih za 26 dana? Radnici su jednako plaćeni.`,
        direction: `row`,
        questions: [
            {
                question: '{{6708}}'
            }
        ],
        left: `Rješenje:`
    },
    {
        id: 73,
        layout: LAYOUTS.manyInputs,
        title: 'Množi',
        text: `Iz jedne cijevi istječe 275 litara vode za 5 minuta, a iz druge cijevi 192 litra za 3 minute. Koliko će isteči vode iz obe cijevi za 24 minute?`,
        direction: `row`,
        questions: [
            {
                question: '{{2856}} litara'
            }
        ],
        left: `Rješenje:`
    },
    {
        id: 74,
        layout: LAYOUTS.manyInputs,
        title: 'Množi',
        text: `U tvornici čarapa proizvede se za 8 sati 2104 pari čarapa. Koliko se proizvede za 15 sati?`,
        direction: `row`,
        questions: [
            {
                question: '{{3945}} pari'
            }
        ],
        left: `Rješenje:`
    },
    {
        id: 75,
        layout: LAYOUTS.manyInputs,
        title: 'Množi',
        text: `U tvornici čarapa proizvede se za 8 sati 2104 pari čarapa. Koliko se proizvede za 15 sati?`,
        direction: `row`,
        questions: [
            {
                question: '{{3945}} pari'
            }
        ],
        left: `Rješenje:`
    },
    {layout: LAYOUTS.quiz},
    {
        id: 76,
        layout: LAYOUTS.manyInputs,
        title: 'Odgovori',
        text: `Obim kvadrata je 936 cm. Kolika mu je površina`,
        direction: `row`,
        questions: [
            {
                question: '{{54756}} cm2'
            }
        ],
        left: `Rješenje:`
    },
    {
        id: 77,
        layout: LAYOUTS.manyInputs,
        title: 'Odgovori',
        text: `Stranice pravougaonika su: a = 12 cm i b = 8 cm. Ako stranice povećamo 3 puta koliko će se puta povećati površina pravougaonika.`,
        direction: `row`,
        questions: [
            {
                question: '{{9}} puta'
            }
        ],
        left: `Rješenje:`
    },
    {
        id: 78,
        layout: LAYOUTS.manyInputs,
        title: 'Odgovori',
        text: `Staze u parku koja ima oblik pravougaonika širine 160 i dužina 18 m. Koliko kvadratnih decimetara iznosi njena površina ?`,
        direction: `row`,
        questions: [
            {
                question: '{{2880}} dm2'
            }
        ],
        left: `Rješenje:`
    },
    {
        id: 79,
        layout: LAYOUTS.manyInputs,
        title: 'Odgovori',
        text: `Njiva oblika kvadrata ima obim 360 m. Njenom sredinom paralelno sa stranicama je prosječen put širine 5 m. Koliko je preostalo obradivog zemljišta od te njive?`,
        direction: `row`,
        questions: [
            {
                question: '{{7660}} m2'
            }
        ],
        left: `Rješenje:`
    },
    {
        id: 80,
        layout: LAYOUTS.manyInputs,
        title: 'Odgovori',
        text: `Kvadrat i pravougaonik imaju jednake obime dužine 64 m. Pravougaonik ima jednu stranicu 18 m. Čija površina je veća i za koliko?`,
        direction: `row`,
        questions: [
            {
                question: 'Površina {{kvadrata}} je veća za {{4}} m2:'
            }
        ],
        left: `Rješenje:`
    },
    {layout: LAYOUTS.quiz},
    {
        id: 81,
        layout: LAYOUTS.manyInputs,
        title: 'Odgovori',
        text: `Površina kocke je 2028 cm2. Kolika je površina jedne strane kocke ?`,
        direction: `row`,
        questions: [
            {
                question: '{{338}} m2'
            }
        ],
        left: `Rješenje:`
    },
    {
        id: 82,
        layout: LAYOUTS.manyInputs,
        title: 'Odgovori',
        text: `Izračunaj u cm2 površinu kvadra dimenzija: a = 8 dm 5 cm, b = 5 dm 7 cm,
 c = 3 dm 8cm.`,
        direction: `row`,
        questions: [
            {
                question: '{{20482}} cm2'
            }
        ],
        left: `Rješenje:`
    },
    {
        id: 83,
        layout: LAYOUTS.manyInputs,
        title: 'Odgovori',
        text: `Treba obojiti zidove i plafon jedne prostorije dužine 4 m 5 dm, širine 3m 4 dm i visine 2m 5 dm. Izračunaj površinu koju treba obojiti u dm2.`,
        direction: `row`,
        questions: [
            {
                question: '{{5480}} dm2'
            }
        ],
        left: `Rješenje:`
    },
    {
        id: 84,
        layout: LAYOUTS.manyInputs,
        title: 'Odgovori',
        text: `Drvena kocka ivice 6 dm razrezana je na 27 jednakih kocki. Izračunaj zbir površina svih 27 kocki.`,
        direction: `row`,
        questions: [
            {
                question: '{{648}} dm2'
            }
        ],
        left: `Rješenje:`
    },
    {
        id: 85,
        layout: LAYOUTS.manyInputs,
        title: 'Odgovori',
        text: `Kvadar ima dimenzije 12 cm, 13 cm i 8 cm. Ako redom smanjimo ivice 2 cm, 3 cm, a treću povećamo za 2 cm, dobijemo kocku. Izračunaj razliku površina kvadra i kocke.`,
        direction: `row`,
        questions: [
            {
                question: '{{112}} cm2'
            }
        ],
        left: `Rješenje:`
    },
    {
        id: 86,
        layout: LAYOUTS.manyInputs,
        title: 'Odgovori',
        text: `Od tri kocke ivica 8 cm napravljen je kvadar ivica 24 cm, 8 cm i 8 cm.Izračunaj razliku površina te tri kocke i kvadra.`,
        direction: `row`,
        questions: [
            {
                question: '{{256}} cm2'
            }
        ],
        left: `Rješenje:`
    },
    {layout: LAYOUTS.quiz},
    {
        id: 87,
        layout: LAYOUTS.manyInputs,
        title: 'Podijeli',
        questions: [
            {
                question: '1896 : 12 = {{158}}'
            },
            {
                question: '3312 : 24 = {{138}}'
            },
            {
                question: '14644 : 28 = {{523}}'
            },
            {
                question: '73692 : 36 = {{2047}}'
            }
        ],
    },
    {
        id: 88,
        layout: LAYOUTS.manyInputs,
        title: 'Podijeli',
        text: `U mljekari je za mjesec dana proizvedeno 32136 kg maslaca. Koliko je proizvedeno dnevno ako se svaki dan proizvede ista količina maslaca, a taj mjesec je bilo 26 radnih dana.`,
        direction: `row`,
        questions: [
            {
                question: '{{1236}} kg'
            }
        ],
        left: `Rješenje:`
    },
    {
        id: 89,
        layout: LAYOUTS.manyInputs,
        title: 'Podijeli',
        text: `Količnik dva broja je 19, ostatak 8. Djeljenik je 464. Koliki je djelilac?`,
        direction: `row`,
        questions: [
            {
                question: '{{24}}'
            }
        ],
        left: `Rješenje:`
    },
    {
        id: 90,
        layout: LAYOUTS.manyInputs,
        title: 'Podijeli',
        text: `Djelilac dva broja je 46, količnik 283, ostatak 18. Koliki je djeljenik?`,
        direction: `row`,
        questions: [
            {
                question: '{{13036}}'
            }
        ],
        left: `Rješenje:`
    },
    {
        id: 91,
        layout: LAYOUTS.manyInputs,
        title: 'Podijeli',
        text: `Livada ima oblik pravougaonika površine 4280. Kolika je površina voćnjaka koji ima 4 puta manju dužinu i 5 puta manju širinu ?`,
        direction: `row`,
        questions: [
            {
                question: '{{214}} m2'
            }
        ],
        left: `Rješenje:`
    },
    {
        id: 92,
        layout: LAYOUTS.manyInputs,
        title: 'Podijeli',
        text: `Koristi jednakost 111 : 37 = 3, pa izračunaj :`,
        questions: [
            {
                question: '666 : 37 = {{18}}}'
            },
            {
                question: '888 : 37 = {{24}}'
            },
            {
                question: '999 : 37 = {{27}}'
            }
        ],
    },
    {
        id: 92,
        layout: LAYOUTS.manyInputs,
        title: 'Podijeli',
        text: `Koristi jednakost 111 : 37 = 3, pa izračunaj :`,
        questions: [
            {
                question: '666 : 37 = {{18}}}'
            },
            {
                question: '888 : 37 = {{24}}'
            },
            {
                question: '999 : 37 = {{27}}'
            }
        ],
    },
    {
        layout: LAYOUTS.quiz
    },
    {
        id: 93,
        layout: LAYOUTS.manyInputs,
        title: 'Računaj',
        text: `Množenje i dijeljenje proizvoda i količnika brojem`,
        questions: [
            {
                question: '(6 3 45) ∙ 2 = {{1620}}'
            },
            {
                question: '(72 15 4) : 8 = {{540}}'
            },
            {
                question: '(25 8 3) 4 = {{2400}}'
            },
            {
                question: '(49 35 4) : 7 = {{980}}'
            }
        ],
    },
    {
        id: 94,
        layout: LAYOUTS.manyInputs,
        title: 'Računaj',
        text: `Množenje i dijeljenje proizvoda i količnika brojem`,
        questions: [
            {
                question: '(960:16) : 5 = {{12}}'
            },
            {
                question: '(560:8) : 7 = {{10}}'
            },
            {
                question: '(720:9) : 8 = {{10}}'
            }
        ],
    },
    {
        id: 95,
        layout: LAYOUTS.manyInputs,
        title: 'Računaj',
        text: `Množenje i dijeljenje proizvoda i količnika brojem`,
        questions: [
            {
                question: '(828:6) 15 = {{2070}}'
            },
            {
                question: '(1275:25) 45 = {{2295}}'
            }
        ],
    },
    {
        id: 96,
        layout: LAYOUTS.manyInputs,
        title: 'Računaj',
        text: `Četiri radnika urade neki posao za 264 sata. Za koje vrijeme bi isti posao uradila 3 radnika?`,
        questions: [
            {
                question: '{{198}} sati'
            }
        ],
        left: `Rješenje:`
    },
    {
        id: 97,
        layout: LAYOUTS.manyInputs,
        title: 'Računaj',
        text: `Ako 6 radnika zarade za jedan dan 708 KM. Koliko će zaraditi, za istu vrstu posla, jedan radnik za 24 dana?`,
        questions: [
            {
                question: '{{2832}} KM'
            }
        ],
        left: `Rješenje:`
    },
    {
        id: 98,
        layout: LAYOUTS.manyInputs,
        title: 'Računaj',
        text: `Tvornica je proizvela 3845 komada usisivača. Cijena jednog usisivača je 108 KM. Izračunaj vrijednost ukupne proizvodnje usisivača.`,
        questions: [
            {
                question: '{{415260}} KM'
            }
        ],
        left: `Rješenje:`
    },
    {layout: LAYOUTS.quiz},
    {
        id: 99,
        layout: LAYOUTS.manyInputs,
        title: 'Računaj',
        text: `Množenje i dijeljenje proizvoda i količnika brojem`,
        questions: [
            {
                question: '423141 : 47 – 51471 : 57 = {{8100}}'
            },
            {
                question: '(11016 : 27) : 408 + 259 = {{260}}'
            }
        ],
    },
    {
        id: 100,
        layout: LAYOUTS.manyInputs,
        title: 'Izračunaj',
        text: `Zbir dva broja 56225, a jedan od njih je 25. Koliko je puta veći broj veći od manjeg?`,
        questions: [
            {
                question: '{{2248}}'
            }
        ],
        left: `Rješenje:`
    },
    {
        id: 101,
        layout: LAYOUTS.manyInputs,
        title: 'Izračunaj',
        text: `Izračunaj vrijednost izraza:(9072:x) 16, ako je x=28.`,
        questions: [
            {
                question: '{{5184}}'
            }
        ],
        left: `Rješenje:`
    },
    {
        id: 102,
        layout: LAYOUTS.manyInputs,
        title: 'Računaj',
        text: `Množenje i dijeljenje proizvoda i količnika brojem`,
        questions: [
            {
                question: '(64 + {{136}}) : 8 = 25'
            },
            {
                question: '(42∙ {{1034}}) : 14 = 3102'
            },
            {
                question: '{{75168}} : 36 + 257 = 2345'
            }
        ],
    },
    {
        id: 103,
        layout: LAYOUTS.manyInputs,
        title: 'Izračunaj',
        text: `Iz dva grada međusobne udaljenosti 795 km krenula su istovremeno dva automobila jedan prema drugom. Jedan automobil je vozio 76 km na sat, a drugi 83 km na sat. Poslije koliko sati vožnje su se automobili susreli?`,
        questions: [
            {
                question: '{{5}} sati'
            }
        ],
        left: `Rješenje:`
    },
    {
        id: 104,
        layout: LAYOUTS.manyInputs,
        title: 'Izračunaj',
        text: `U jednoj bačvi je bilo 3 puta više ulja nego u drugoj. Ako se iz prve bačve istoči 25 litara ulja u obje bačve ostaje zajedno 175 litara ulja. Koliko je litara ulja bilo u svakoj bačvi prije istakanja ulja iz prve bačve?`,
        questions: [
            {
                question: '{{150}} litara i {{50}} litara'
            }
        ],
        left: `Rješenje:`
    },
    {layout: LAYOUTS.quiz},
    {
        id: 105,
        layout: LAYOUTS.manyInputs,
        title: 'Odgovori',
        text: `Zapremina kvadra je 1440 cm3. Izračunaj njegovu visinu ako mu je dužina 12 cm, a širina 8 cm.`,
        questions: [
            {
                question: '{{15}} cm'
            }
        ],
        left: `Rješenje:`
    },
    {
        id: 106,
        layout: LAYOUTS.manyInputs,
        title: 'Odgovori',
        text: `Akvarijum oblika kocke ivice 60 cm, napunjen je vodom visine 40 cm. Koliko litara vode ima u akvarijumu?`,
        questions: [
            {
                question: '{{144}} litra'
            }
        ],
        left: `Rješenje:`
    },
    {
        id: 107,
        layout: LAYOUTS.manyInputs,
        title: 'Odgovori',
        text: `Zapremina kocke i kvadra zajedno iznosi 980 m3. Jednake su im površine osnovica i iznose 49 M2. Kolika je visina kvadra?`,
        questions: [
            {
                question: '{{13}} m'
            }
        ],
        left: `Rješenje:`
    },
    {
        id: 108,
        layout: LAYOUTS.manyInputs,
        title: 'Odgovori',
        text: `Dno bunara ima oblik kvadrata ivice 15 dm. Visina bunara je 2 m. Koliko vode stane u bunar kad je pun?`,
        questions: [
            {
                question: '{{4500}} litara'
            }
        ],
        left: `Rješenje:`
    },
    {
        id: 109,
        layout: LAYOUTS.manyInputs,
        title: 'Računaj',
        text: `Zbir svih ivica kocke je 108 m. Izračunaj površinu i zapreminu te kocke.`,
        questions: [
            {
                question: 'P = {{486}} m2'
            },
            {
                question: 'V = {{729}} m3'
            }
        ],
    },
    {
        id: 110,
        layout: LAYOUTS.manyInputs,
        title: 'Odgovori',
        text: `Visina kvadra je 32 cm. Ako se površina osnove poveća tri puta, zapremina se poveća za 6080 cm3. Odredi površinu osnove tog kvadra.`,
        questions: [
            {
                question: '{{95}} cm2'
            }
        ],
        left: `Rješenje:`
    },
    {layout: LAYOUTS.quiz},
    {
        id: 111,
        layout: LAYOUTS.manyInputs,
        title: 'Izračunaj',
        questions: [
            {
                question: '756322 7 + 1856787 = {{6580000}}'
            }
        ],
    },
    {
        id: 112,
        layout: LAYOUTS.manyInputs,
        title: 'Izračunaj',
        text: `Broj 2347 saberi 10 puta sa samim sobom pa od dobivenog zbira oduzmi 124 i dobivenu razliku podijeli sa 6. Kolika je vrijednost dobivenog izraza ?`,
        questions: [
            {
                question: '{{3891}}'
            }
        ],
        left: `Rješenje:`
    },
    {
        id: 113,
        layout: LAYOUTS.manyInputs,
        title: 'Izračunaj',
        questions: [
            {
                question: '2780–(5350:5–873) = {{1971}}'
            }
        ],
    },
    {
        id: 114,
        layout: LAYOUTS.manyInputs,
        title: 'Izračunaj',
        questions: [
            {
                question: '(6225–225) (2664:24) 15 = {{9990000}}'
            }
        ],
    },
    {
        id: 115,
        layout: LAYOUTS.manyInputs,
        title: 'Izračunaj',
        text: `Ciframa: 2, 3, 4, 1, 7, 0, 8, 6 napiši najmanji i najveći prirodan broj tako da se svaka cifra u broju pojavi samo jedanput.`,
        questions: [
            {
                question: '{{10234678}}'
            },
            {
                question: '{{87643201}}'
            }
        ],
    },
    {
        id: 116,
        layout: LAYOUTS.manyInputs,
        title: 'Izračunaj',
        text: `Upiši ciframa brojeve`,
        questions: [
            {
                question: '5 miliona 4 hiljade 37 - {{5004037}}'
            },
            {
                question: '13 miliona 84 - {{13000084}}'
            }
        ],
    }
]