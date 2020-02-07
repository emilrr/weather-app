# Weather app
A simple weather app that displays weather information from the Weatherbit API.

## Demo
[Wheather-app](https://weather-platform.herokuapp.com/)

## Quick Start

```bash
# Change config.js file in server folder (the file is located in server/config.js)

# Add url of your mongodb connection for example:
 "dbUrl": "mongodb://localhost/dev-social"
 
 # Add api key provided in the weatherbit account dashboard:
 "apiKey": "2jiwjdw9238kdwdwk"
```

```bash
*** Run server and client with build ***
# Install server and client dependencies
npm run heroku-postbuild

# Run server and client
npm run start

# Run unit tests
npm run test-unit

*** Run server and client without build ***

# Install server dependencies
npm install

# Install client dependencies
cd client
npm install

# Run both Koa & React from root
npm run dev
```

## App Info
Only users with **admin** role can view the platform with the weather forecast.

### License
This project is licensed under the MIT License
