import React from 'react';
import rainyDayImage from '../assets/rainy-day.png';

class Event extends React.Component {
  state = {
    shouldNotify: this.setShouldNotify(),
  }

  createNotification(eventName) {
    /**
     * Checks for and creates a Notification.
     * adapted from:  https://davidwalsh.name/notifications-api
     * @param {string} eventName
     * @return {obj} new Notification();
     */

    if(window.Notification && Notification.permission !== "denied") {
      Notification.requestPermission(function(status) {
        const options = {
          body: eventName,
          icon: rainyDayImage,
        };

        return new Notification('Reminder:', options);
      });
    }
  }

  componentDidMount() {
    /**
     * Creates notificaiton if state.shouldNotify
     * @return {function} createNotification()
     */

    if (this.state.shouldNotify) {
      this.createNotification(this.props.eventName);
    }
  }


  componentDidUpdate(prevProps) {
    /**
     * Sets state of shouldNotify if props change
     * @param {obj} prevProps
     * @return {function} setState()
     */

    if (this.props.now !== prevProps.now) {
      this.setState({ shouldNotify: this.setShouldNotify() });
    }
  }

  setShouldNotify() {
    /**
     * Returns boolean based on time frame of 0 to 5 minutes
     * @return {boolean} shouldNotify
     */

    const now = this.props.now;
    const nextMoment = this.props.nextMoment;
    const minsDiff = nextMoment.diff(now, 'minutes');
    const secondsDiff = nextMoment.diff(now, 'seconds');
    const shouldNotify = (secondsDiff > 0) && (minsDiff <= 5) ? true : false;

    return shouldNotify;
  }

  render() {
    return (
      <li className={this.state.shouldNotify ? 'event should_notify' : 'event'}>
        <div className="event_name">
          <div className="left_column column"><span>to do: </span></div>
          <div className="right_column column"><span>{this.props.eventName}</span></div>
        </div>
        <div className="event_time">
          <div className="left_column column"><span>prev: </span></div>
          <div className="right_column column">
            <span>{this.props.prevDate}</span>
            <span>@ {this.props.prevTime}</span>
          </div>
        </div>
        <div className="event_time">
          <div className="left_column column"><span>next: </span></div>
          <div className="right_column column">
            <span>{this.props.nextDate}</span>
            <span>@ {this.props.nextTime}</span>
          </div>
        </div>
        <div className="time_left">
          <div className="left_column column"><span>time left: </span></div>
          <div className="right_column column"><span>{this.props.next}</span></div>
        </div>
        <hr />
      </li>
    )
  }
}

export default Event;
