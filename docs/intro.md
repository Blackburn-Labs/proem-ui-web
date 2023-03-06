---
id: intro
title: Introduction
sidebar_label: Introduction
---
# Proem UI Framework

This is a ReactJS project using:

-   [Redux](http://redux.js.org/) - Maintains the state of the app.
-   [Babel](https://babeljs.io/) - Compiles the app.
-   [Webpack](https://webpack.github.io/) - Bundles the app. 
-   [Jasmine](https://jasmine.github.io/) / [Karma](https://karma-runner.github.io) - Tests the app. 
-   [Axios](https://github.com/mzabriskie/axios) - Makes promise base HTTP calls for the app. 
-   [Material-ui](http://www.material-ui.com/) - Makes the app pretty.

## Run Project

If you have not done so already, run:

```shell

$ npm install

```

Once done, run:

```

$ npm start

```

This will build the project and start it in a browser.

Before committing any changes to your project, please run unit tests and lint to check for code compliance:

```shell

$ npm run test
$ npm run lint

```

## Directory Layout

The web directory contains the web UI.

```shell

/
├── /actions/                   # Redux action function library
├── /components/                # Shared or generic UI components
│   ├── /Component1/            # A components in the app
│   ├── /Component2/            # A components in the app
│   └── /...                    # Each component should get its own folder (that matches the name of the component)
├── /css/                       # Static CSS and theme files
├── /domain/                    # The app's domian objects
├── /pages/                     # React components for web pages
│   ├── /page1/                 # A screen/state in the app
│   ├── /page2/                 # A screen/state in the app
│   └── /...                    # etc.
├── /reducer/                   # Redux reducers in charge of updating your data store
├── /utils/                     # Utility and helper classes
│── index.html                  # React application entry point
│── package.json                # The list of project dependencies and NPM scripts
│── renderer.js                 # This root application script, will be bundled into `renderer-bundle.js` using webpack
│── store.js                    # The root Redux data store
└── webpack.*.js                # Bundling and optimization settings for Webpack

```
