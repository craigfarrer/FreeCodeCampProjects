import React, { Component } from 'react';
import './App.css';
import UserInput from './components/UserInput';
import Footer from './components/Footer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayText: 'Press key'
    }
    this.playAudio = this.playAudio.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(event){

  }
  playAudio(id){
    this.setState({ displayText: dict[id].name  })
    var sound = document.getElementById(id);
    var pad = document.getElementById(id.concat('pad'));
    pad.className = 'pad-clicked'
    setTimeout(sound.play(),300);
    setTimeout(()=>{pad.className = 'drum-pad'},300);
  }
  handleKeyPress(event) {
    if (validKeys.includes(event.key)){
      this.playAudio(event.key.toUpperCase());
    }
  }

  componentWillMount(){
    document.addEventListener("keydown", this.handleKeyPress.bind(this));
  }

  
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center">Markdown Live Preview</h1>
            <hr />
          </div>
        </div>
        <UserInput />
        <Footer />
      </div>
    );
  }
}

export default App;
