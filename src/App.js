import React from 'react';
import './stylesheet.css';
const accurateInterval = require('./Accurate_Interval.js');

class BreakSettings extends React.Component {
  render() {
    return (
      <div className="break-wrapper">
        <div className="break">
          <div id="break-length">{this.props.length}</div>
        </div>
        <div id="break-label">Break Length</div>
        <button id="break-increment" value="+" onClick={this.props.changeBreak}>
          <h3><i className="fas fa-plus"></i></h3>
        </button>
        <button id="break-decrement" value="-" onClick={this.props.changeBreak}>
          <h3><i className="fas fa-minus"></i></h3>
        </button>
      </div>
    );
  }
}

class SessionSettings extends React.Component {
  render() {
    return (
      <div className="session-wrapper">
        <div className="session">
          <div id="session-length">{this.props.length}</div>
        </div>
        <div id="session-label">Session Length</div>
        <button id="session-increment" value="+" onClick={this.props.changeSession}>
          <h3><i className="fas fa-plus"></i></h3>
        </button>
        <button id="session-decrement" value="-" onClick={this.props.changeSession}>
          <h3><i className="fas fa-minus"></i></h3>
        </button>
      </div>
    );
  }
}

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakMinutes: 5,
      sessionMinutes: 25,
      mode: 'Session',
      timerRunning: false,
      secondsLeft: 1500,
      intervalID: ''
    }
    this.reset = this.reset.bind(this);
    this.timerStartStop = this.timerStartStop.bind(this);
    this.timerStartCountdown = this.timerStartCountdown.bind(this);
    this.decrementTimer = this.decrementTimer.bind(this);
    this.modeControl = this.modeControl.bind(this);
    this.formatTimeLeft = this.formatTimeLeft.bind(this);
    this.setBreakLength = this.setBreakLength.bind(this);
    this.setSessionLength = this.setSessionLength.bind(this);
    this.playBeep = this.playBeep.bind(this);
  }
  reset() {
    this.state.intervalID && this.state.intervalID.cancel();
    this.audioBeep.pause();
    this.audioBeep.currentTime = 0;
    this.setState({
      breakMinutes: 5,
      sessionMinutes: 25,
      mode: 'Session',
      timerRunning: false,
      secondsLeft: 1500,
      intervalID: ''
    });
  }
  timerStartStop() {
    if (this.state.timerRunning) {
      this.state.intervalID && this.state.intervalID.cancel();
      this.setState({
        timerRunning: false
      });
    } else {
      this.timerStartCountdown();
      this.setState({
        timerRunning: true
      });
    }
  }
  timerStartCountdown() {
    this.setState({
      intervalID: accurateInterval(() => {
        this.decrementTimer();
        this.modeControl();
      }, 1000)
    });
  }
  decrementTimer() {
    this.setState({ secondsLeft: this.state.secondsLeft - 1 });
  }
  modeControl() {
    let timeLeft = this.state.secondsLeft;
    this.playBeep(timeLeft);
    if (timeLeft < 0) {
      if (this.state.mode === 'Session') {
        this.setState({
          mode: 'Break',
          secondsLeft: this.state.breakMinutes * 60
        });
      } else {
        this.setState({
          mode: 'Session',
          secondsLeft: this.state.sessionMinutes * 60
        });
      }
      this.state.intervalID && this.state.intervalID.cancel();
      this.timerStartCountdown();
    }
  }
  formatTimeLeft() {
    let minutes = Math.floor(this.state.secondsLeft / 60);
    let seconds = this.state.secondsLeft % 60;
    if (seconds < 10) { seconds = '0' + seconds; }
    if (minutes < 10) { minutes = '0' + minutes; }
    return minutes + ':' + seconds;
  }
  setBreakLength(e) {
    if (!this.state.timerRunning) {
      if (e.currentTarget.value === '+' && this.state.breakMinutes < 60) {
        this.setState({
          breakMinutes: this.state.breakMinutes + 1,
          secondsLeft: this.state.mode === 'Break' ?
            (this.state.breakMinutes + 1) * 60 :
            this.state.secondsLeft
        });
      } else if (e.currentTarget.value === '-' && this.state.breakMinutes > 1) {
        this.setState({
          breakMinutes: this.state.breakMinutes - 1,
          secondsLeft: this.state.mode === 'Break' ?
            (this.state.breakMinutes - 1) * 60 :
            this.state.secondsLeft
        });
      }
    }
  }
  setSessionLength(e) {
    if (!this.state.timerRunning) {
      if (e.currentTarget.value === '+' && this.state.sessionMinutes < 60) {
        this.setState({
          sessionMinutes: this.state.sessionMinutes + 1,
          secondsLeft: this.state.mode === 'Session' ?
            (this.state.sessionMinutes + 1) * 60 :
            this.state.secondsLeft
        });
      } else if (e.currentTarget.value === '-' && this.state.sessionMinutes > 1) {
        this.setState({
          sessionMinutes: this.state.sessionMinutes - 1,
          secondsLeft: this.state.mode === 'Session' ?
            (this.state.sessionMinutes - 1) * 60 :
            this.state.secondsLeft
        });
      }
    }
  }
  playBeep(timeLeft) {
    if (timeLeft === 0) {
      this.audioBeep.play();
    }
  }
  render() {
    let startStopStyle;
    this.state.timerRunning ? startStopStyle = "fas fa-pause" : startStopStyle = "fas fa-play";
    return (
      <div className="page-wrapper">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossOrigin="anonymous"></link>
        <header>
          <h1>Pomodoro Clock</h1>
        </header>
        <div className="clock-wrapper">
          <BreakSettings length={this.state.breakMinutes}
            changeBreak={this.setBreakLength} />
          <div className="timer-wrapper">
            <div className="timer">
              <div id="time-left">{this.formatTimeLeft()}</div>
            </div>
            <div id="timer-label">{this.state.mode}</div>
            <button id="start_stop" onClick={this.timerStartStop}>
              <h1><i className={startStopStyle}></i></h1>
            </button>
            <button id="reset" onClick={this.reset}>
              <h1><i className="fas fa-redo"></i></h1>
            </button>
          </div>
          <SessionSettings length={this.state.sessionMinutes}
            changeSession={this.setSessionLength} />
          <audio id="beep" preload="auto" src="https://goo.gl/65cBl1"
            ref={(audio) => { this.audioBeep = audio; }} />
        </div>
        <footer>
          Made by <a href=" https://github.com/joldie/ " target="_blank ">joldie</a> as a project for the <a href="https://learn.freecodecamp.org/ " target="_blank ">freeCodeCamp</a> Front End Libraries course
        </footer>
      </div>
    );
  }
}

export default Clock;
