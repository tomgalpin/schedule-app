# Tom's React Scheduler:

## Deploy
- Live @:  https://tomgalpin.github.io/scheduler/
  - From:  https://github.com/gitname/react-gh-pages

## Areas of Improvement:


## Guidelines

## Structure
    .
    ├── /public 
    │     └── favicon.ico
    │     └── index.html
    │     └── manifest.json
    ├── /src     
    │     ├── /components
    │     ├── /styles                    
    │     │     ├── reset.scss 
    │     │     ├── variables.scss   
    │     │     ├── mixins.scss
    │     ├── app.scss
    │     └── index.jsx
    └── README.md


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

https://github.com/groveco/grove-scheduler-challenge
# Grove Scheduler Challenge

For this challenge, you will create a schedulizer application that uses data from an existing API to display events.

## Deliverables

Take a look at the data from [this API call](https://scheduler-challenge.grove.co) which retrieves a collection of all the events that should be displayed in your app. Notice that the dates of the events themselves are in [Cron format](http://www.nncron.ru/help/EN/working/cron-format.htm).

Using whatever JavaScript framework(s) you believe to be appropriate, create a single-page schedulizer application that:

1. makes a call to [this endpoint](https://scheduler-challenge.grove.co) to retrieve the event data
2. display the events in a logical, readable manner. At a minimum, show events happening in the next 24 hours and events that have happened in the previous 3 hours from the current time
3. uses the [Web Notifications API](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API) to create notifications when an event is starting

Please provide documentation on how to run the application locally. Be prepared to talk about your decisions for the assignment, any assumptions you made, and tradeoffs you are aware of.

## Submission Guidelines

You may submit your solution in one of two ways:

1. Create your own GitHub repository and check in all of your source code (do not fork this repo). Then, send us the link to the repo.

2. Zip the project folder and send us the compressed file.

