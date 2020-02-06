import React from 'react'
import {Sound} from "./Sound";
const sounds = {
    success: [
        require('../assets/sound/success_mixdown.aac'),
        require('../assets/sound/success_mixdown.mp3'),
        require('../assets/sound/success_mixdown.ogg'),
    ]
};

export const Sounds = () => {
  return (
      <>
          <Sound src={sounds.success}/>
      </>
  )
};