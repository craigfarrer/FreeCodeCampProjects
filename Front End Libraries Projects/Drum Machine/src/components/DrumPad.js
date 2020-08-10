import React, { Component } from 'react';
import Drum from './Drum'
import Footer from './Footer'

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

let validKeys = [...Object.keys(sounds),
...Object.keys(sounds).map(item => item.toLowerCase())]

class DrumPad extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayText: 'Press key'
        }
        this.playAudio = this.playAudio.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    playAudio(id) {
        this.setState({ displayText: sounds[id].name })
        var sound = document.getElementById(id);
        var pad = document.getElementById(id.concat('pad'));
        pad.className = 'pad-clicked'
        setTimeout(sound.play(), 400);
        setTimeout(() => { pad.className = 'drum-pad' }, 400);
    }

    handleKeyPress(event) {
        if (validKeys.includes(event.key)) {
            this.playAudio(event.key.toUpperCase());
        }
    }

    componentWillMount() {
        document.addEventListener("keydown", this.handleKeyPress.bind(this));
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyPress.bind(this));
    }

    render() {
        return (
            <div className="App">
                <div id="drum-machine">
                    <div id="title">Drum Machine</div>
                    <div id="pad-container">
                        <Drum id='Q' playAudio={this.playAudio} />
                        <Drum id='W' playAudio={this.playAudio} />
                        <Drum id='E' playAudio={this.playAudio} />
                        <Drum id='A' playAudio={this.playAudio} />
                        <Drum id='S' playAudio={this.playAudio} />
                        <Drum id='D' playAudio={this.playAudio} />
                        <Drum id='Z' playAudio={this.playAudio} />
                        <Drum id='X' playAudio={this.playAudio} />
                        <Drum id='C' playAudio={this.playAudio} />
                    </div>
                    <div id="display">{this.state.displayText}</div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default DrumPad;