import React from 'react';
import moment from 'moment';
import Event from './event';

class Schedule extends React.Component {
  renderEvents(array) {
    /**
     * Renders Event component
     * @param {array} array
     * @return {array} array.map()
     */

    return array.map( (event, index) => {
      return  <Event
                key={index}
                eventName={event.name}
                now={this.props.now}
                nextMoment={moment(event.timeData.timeStrings.next)}
                next={moment(event.timeData.timeStrings.next).fromNow()}

                prevTime={event.timeData.timeStrings.prevTime}
                prevDate={event.timeData.timeStrings.prevDate}
                nextTime={event.timeData.timeStrings.nextTime}
                nextDate={event.timeData.timeStrings.nextDate}
              />
    });
  }

  renderSchedule(array) {
    /**
     * Renders schedule and events or schedule and error message
     * @param {array} array
     * @return {function} renderEvents()
     */

    if (array.length) {
      return (
        <ol>
          {this.renderEvents(array)}
        </ol>
      );
    } else {
      return (
        <div className="schedule_error">
          <p>{this.props.errorMsg}</p>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="schedule_container">
        <div className="schedule_title">
          <h3>{this.props.title}</h3>
        </div>
        <div className="schedule">
          {this.renderSchedule(this.props.schedule)}
        </div>
      </div>
    )
  }
}

export default Schedule;