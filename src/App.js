import React from 'react';
import './stylesheet.css';

class App extends React.Component {
  render() {
    return (
      <div className="page-wrapper">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossOrigin="anonymous"></link>
        <header>
          <h1>Pomodoro Clock</h1>
        </header>
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
        <div className="clock-wrapper">
          <div className="clock">
            <div id="time-left">25:00</div>
          </div>
          <div id="timer-label">Session</div>
          <div id="start_stop">
            <h1><i className="fas fa-play"></i></h1>
          </div>
          <div id="reset">
            <h1><i className="fas fa-redo"></i></h1>
          </div>
        </div>
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
        <footer>
          Made by <a href=" https://github.com/joldie/ " target="_blank ">joldie</a> as a project for the <a href="https://learn.freecodecamp.org/ " target="_blank ">freeCodeCamp</a> Front End Libraries course
        </footer>
      </div>
    );
  }
}

export default App;
