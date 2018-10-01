import React from 'react';
import './stylesheet.css';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakMinutes: 5,
      sessionMinutes: 25,
      mode: 'Session', // Need a mode for "Stopped"? If stopped ...
      secondsLeft: 1500
    }
    this.reset = this.reset.bind(this);
  }
  reset() {
    this.setState({
      breakMinutes: 5,
      sessionMinutes: 25,
      mode: 'Session',
      secondsLeft: 1500
    });
  }
  render() {
    let minutes = Math.round(this.state.secondsLeft / 60);
    let seconds = this.state.secondsLeft % 60;
    if (seconds < 10) { seconds = '0' + seconds; }
    return (
      <div className="timer-wrapper">
        <div className="timer">
          <div id="time-left">{minutes}:{seconds}</div>
        </div>
        <div id="timer-label">Session</div>
        <div id="start_stop">
          <h1><i className="fas fa-play"></i></h1>
        </div>
        <div id="reset">
          <h1><i className="fas fa-redo"></i></h1>
        </div>
      </div>
    );
  }
}

class BreakSettings extends React.Component {
  render() {
    return (
      <div className="break-wrapper">
        <div className="break">
          <div id="break-length">5</div>
        </div>
        <div id="break-label">Break Length</div>
        <div id="break-increment">
          <h3><i className="fas fa-plus"></i></h3>
        </div>
        <div id="break-decrement">
          <h3><i className="fas fa-minus"></i></h3>
        </div>
      </div>
    );
  }
}

class SessionSettings extends React.Component {
  render() {
    return (
      <div className="session-wrapper">
        <div className="session">
          <div id="session-length">25</div>
        </div>
        <div id="session-label">Session Length</div>
        <div id="session-increment">
          <h3><i className="fas fa-plus"></i></h3>
        </div>
        <div id="session-decrement">
          <h3><i className="fas fa-minus"></i></h3>
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div className="page-wrapper">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossOrigin="anonymous"></link>
        <header>
          <h1>Pomodoro Clock</h1>
        </header>
        <div className="clock-wrapper">
          <BreakSettings />
          <Timer />
          <SessionSettings />
        </div>
        <footer>
          Made by <a href=" https://github.com/joldie/ " target="_blank ">joldie</a> as a project for the <a href="https://learn.freecodecamp.org/ " target="_blank ">freeCodeCamp</a> Front End Libraries course
        </footer>
      </div>
    );
  }
}

export default App;
