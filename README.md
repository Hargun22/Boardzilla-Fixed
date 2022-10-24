# Boardzilla

## A web app to create personalized dashboards with the ability to add multiple customizable widgets.

## Features

- News, Sticky Notes, Weather, Stock Price, and Calendar widgets
- Widgets are draggable and resizable thanks to [React-Grid-Layout](https://www.npmjs.com/package/react-grid-layout)
- Session based authentication courtesy of [Passport](http://www.passportjs.org/)

## Tech

- **MERN Stack**
  - [MongoDB](https://www.mongodb.com/)
  - [Express](https://expressjs.com/)
  - [React](https://reactjs.org/)
  - [Node.js](https://nodejs.org/en/)
- [Bulma](https://bulma.io/)
- [webpack](https://webpack.js.org/)
- [Redux](https://redux.js.org/)

## Some Things to Note:

Some data may not be fetched or may be stale due to free API usage limits.

- The news API from [newsapi.org](https://newsapi.org) is limited to 100 daily requests.
- The stock price history from [Alpha Vantage](https://www.alphavantage.co/) is capped at 5 reqests per minute and 500 requests per day.
- The weather data from [OpenWeather](https://openweathermap.org/) is limited to 1000 daily requests or 30K monthly requests.
- Another API used for fetching weather data is the [OpenCage Geocoding API](https://opencagedata.com/) and is limited to 2500 requests per day.

## Installation

Boardzilla requires [Node.js](https://nodejs.org/) to run.
(The keys in this repo are not used in production)

Install the dependencies and devDependencies.

```sh
cd Application
npm i
```

Rebuild the dist folder.
```
npm run prod
```

Start the server.

```
npm start
```
