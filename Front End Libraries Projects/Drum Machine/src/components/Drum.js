import React, { Component } from 'react';

let sounds = {
  Q: {
    name: 'JT1',
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
  },
  W: {
    name: 'JT2',
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
  },
  E: {
    name: 'JT3',
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
  },
  A: {
    name: 'Open Hi Hat',
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
  },
  S: {
    name: 'Kick n Hat',
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
  },
  D: {
    name: 'KICK',
    audio: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
  },
  Z: {
    name: 'Chord 1',
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3"
  },
  X: {
    name: 'Chord 2',
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3"
  },
  C: {
    name: 'Chord 3',
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3"
  },
}

class Drum extends Component {
  render() {
    let id = this.props.id
    return (
      <div className="drum-pad" id={id.concat('pad')} onClick={() => this.props.playAudio(id)}>
        {id}<audio src={sounds[id].audio} type="audio/mp3" className="clip" id={id} />
      </div>
    )
  }
}

export default Drum;