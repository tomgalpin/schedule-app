import React from 'react';
import axios from 'axios';
import cronParser from 'cron-parser';
import moment from 'moment';

import Schedule from './schedule';


class SchedulerContainer extends React.Component {
  state = {
    now: moment(),
    allEvents: [],
    prevEvents: [],
    upcomingEvents: [],
  };


  initScheduler() {
    /**
     * Initializes the schdeduler app by getting schedule data and setting state
     * @return {function} axios.get() 
     */
    
    const scheduleAPI = `https://scheduler-challenge.grove.co/`;

    axios.get(scheduleAPI)
    .then(response => {
      this.setEventsState(response);
    })
    .catch(error => {
      console.log(error);
    });
  }

  setEventsState(response) {
    /**
     * Sets events states
     * @param {obj} response
     * @return {function}  setState()
     */

    const scheduleData = response.data.data;

    const formattedScheduleData = this.setEventProps(scheduleData);
    const sortedScheduleData = this.sortEventsByDate(formattedScheduleData);

    const prevEvents = this.filterPrevEvents(sortedScheduleData);
    const upcomingEvents = this.filterUpcomingEvents(sortedScheduleData);

    this.setState({allEvents: sortedScheduleData});
    this.setState({prevEvents: prevEvents});
    this.setState({upcomingEvents: upcomingEvents});
  }

  setEventProps(array) {
    /**
     * Sets/formats event props on array
     * @param {array} array
     * @return {array} formattedArray
     */

    const formattedArray = [];

    for (let i=0; i<array.length; i++) {
      const eventData= {
        id: array[i].id,
        type: array[i].type,
        name: array[i].attributes.name,
        timeData: {
          cron: array[i].attributes.cron,
          cronObjs: {
            cronObj: null,
            prevObj: null,
            nextObj: null,
          },
          timeStrings: {
            prev: null,
            prevTime: null,
            prevDate: null,
            next: null,
            nextTime: null,
            nextDate: null,
          }
        },
      };

      eventData.timeData.cronObjs.cronObj = cronParser.parseExpression(eventData.timeData.cron);
      eventData.timeData.cronObjs.prevObj = eventData.timeData.cronObjs.cronObj.prev();
      eventData.timeData.cronObjs.nextObj = eventData.timeData.cronObjs.cronObj.next();

      eventData.timeData.timeStrings.prev = eventData.timeData.cronObjs.prevObj.toString();
      eventData.timeData.timeStrings.prevTime = moment(eventData.timeData.timeStrings.prev).format('LT');
      eventData.timeData.timeStrings.prevDate = moment(eventData.timeData.timeStrings.prev).format('l');

      eventData.timeData.timeStrings.next = eventData.timeData.cronObjs.nextObj.toString();
      eventData.timeData.timeStrings.nextTime = moment(eventData.timeData.timeStrings.next).format('LT');
      eventData.timeData.timeStrings.nextDate = moment(eventData.timeData.timeStrings.next).format('l');

      formattedArray.push(eventData);
    }

    return formattedArray;
  }

  sortEventsByDate(array) {
    /**
     * Sorts array by timeStrings.next
     * @param {array} array
     * @return {array}  array.sort()
     */

    return array.sort( (a,b) => new Date(a.timeData.timeStrings.next) - new Date(b.timeData.timeStrings.next) );
  }

  filterPrevEvents(array) {
    /**
     * Filters arrays to previous events: 0 seconds to -3 hours
     * @param {array}
     * @return {array} array.filter()
     */

    const now = this.state.now;

    return array.filter((event) => {
      const nextMoment = moment(event.timeData.timeStrings.next);
      const hoursDiff = nextMoment.diff(now, 'hours');
      const secondsDiff = nextMoment.diff(now, 'seconds');
      const isPrev = (secondsDiff <= 0) && (hoursDiff >= -3);

      return isPrev;
    });
  }

  filterUpcomingEvents(array) {
    /**
     * Filters arrays to upcoming events: 0 seconds to +24 hours
     * @param {array} array
     * @return {array} array.filter()
     */

    const now = this.state.now;

    return array.filter((event) => {
      const nextMoment = moment(event.timeData.timeStrings.next);
      const hoursDiff = nextMoment.diff(now, 'hours');
      const secondsDiff = nextMoment.diff(now, 'seconds');
      const isUpcoming = (secondsDiff > 0) && (hoursDiff <= 24);

      return isUpcoming;
    });
  }

  componentDidMount() {
    /**
     * Inits schdeduler app and sets interval to check and refresh states
     * @return {function} initScheduler()
     * @return {function} setInterval()
     * @return {function} refreshStates()
     */

    this.initScheduler();

    setInterval( () => {
      this.refreshStates();
    }, 5000);
  }

  refreshStates() {
    /**
     * Sets state of prevEvents and upComingEvents arrays
     * @return {function} setState() 
     */

    const prevEvents = this.filterPrevEvents(this.state.allEvents);
    const upcomingEvents = this.filterUpcomingEvents(this.state.allEvents);

    this.setState({now: moment()});
    this.setState({prevEvents: prevEvents});
    this.setState({upcomingEvents: upcomingEvents});
  }

  render() {
    return (
      <div>
        <div className="scheduler_container">
          <Schedule 
            title="Previous Events (last 3 hours)"
            schedule={this.state.prevEvents}
            errorMsg="For the last 3 hours, you have accomplished nothing in your life."
            now={this.state.now}
          />
          <Schedule 
            title="Upcoming Events (next 24 hours)"
            schedule={this.state.upcomingEvents}
            errorMsg="Sit back & relax for the next 24 hours."
            now={this.state.now}
          />
          <Schedule 
            title="All Events"
            schedule={this.state.allEvents}
            errorMsg="You do not have any events scheduled!"
            now={this.state.now}
          />
        </div>
      </div>
    )
  }
}

export default SchedulerContainer;