import {LAYOUTS} from "./stages";

export default [
    {
        layout: LAYOUTS.speech,
        title: 'Zdravo!',
        phrase: `Hoćemo li malo vježbati matematiku? Ne brini, nije teško! Više je zabavno nego teško!`,
        type: 'tutorial',
    },
    {
        layout: LAYOUTS.speech,
        title: 'Zdravo!',
        phrase: `Sad ću ti pokazati kako se koristi ovaj digitalni udžbenik.`,
        type: 'tutorial',
    },
    {
        layout: LAYOUTS.speech,
        title: 'Zdravo!',
        phrase: `Klikni ovdje da uključiš ili isključiš muziku. Klikni sada da isprobaš.`,
        type: 'tutorial',
        elem: 'music'
    },
    {
        layout: LAYOUTS.speech,
        title: 'Zdravo!',
        phrase: `Klikni ovdje da preskočiš lekcije ako želiš.`,
        type: 'tutorial',
        elem: 'menu'
    },
    {
        layout: LAYOUTS.speech,
        title: 'Zdravo!',
        phrase: `Klikni ovdje ako ti je negdje zapelo. Dobićeš pomoć.`,
        type: 'tutorial',
        elem: 'help'

    },
    {
        layout: LAYOUTS.speech,
        title: 'Zdravo!',
        phrase: `Hoćeš li da počnemo sa prvom lekcijom?`,
        type: 'tutorial'
    }
]