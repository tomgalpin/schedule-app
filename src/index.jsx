import React from 'react';
import ReactDOM from 'react-dom';
import './App.scss';

import Scheduler from './components/schedulerContainer';


class App extends React.Component {

  render() {
    return(
      <div>
        <h1>Tom's Scheduler App</h1>
        <Scheduler />
      </div>
    )
  }
}

// ========================================

ReactDOM.render(
  <App />,
  document.getElementById('scheduler_app')
);
