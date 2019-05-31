# Tom's React Scheduler:
More React practice using a cron scheduler and Web Notifications API

## Deploy
- Live @:  https://tomgalpin.github.io/schedule-app/
  - From:  https://github.com/gitname/react-gh-pages

## Areas of Improvement:
1.  Tests
2.  Consider refactoring such that less logic is on container component
3.  Redux?
4.  Modals of events on click?

## Guidelines
1. Display all events, past events in last 3 hours, and upcoming events in next 24 hours.
2. Use Notifications API to create a notification when event is starting.

## Dependencies Used:
1.  cron-parser:  https://www.npmjs.com/package/cron-parser
2.  moment.js:  https://momentjs.com/
3.  axios:  https://github.com/axios/axios
4.  sass:  https://sass-lang.com/

## Structure
    .
    ├── /public 
    │     └── favicon.ico
    │     └── index.html
    │     └── manifest.json
    ├── /src 
    │     ├── /assets
    │     │     └── rainy-day.png     
    │     ├── /components
    │     │     ├── event.jsx 
    │     │     ├── schedule.jsx
    │     │     └── scheduleContainer.jsx
    │     ├── /dummyData
    │     │     └── dummyData.json => adjusted data to test different scenarios
    │     ├── /styles                    
    │     │     ├── reset.scss 
    │     │     ├── variables.scss   
    │     │     ├── mixins.scss
    │     │     ├── event.scss 
    │     │     └── schedule.scss 
    │     ├── App.jsx
    │     ├── App.scss
    │     └── index.js
    └── README.md


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm install`
### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.


