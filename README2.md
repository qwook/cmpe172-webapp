# Stack:

* Grunt
* React / Babel / Webpack
* Node ORM2 / MongoDB
* Express

# Stack Reasoning
Grunt - "Taskrunner" which acts like a "Makefile" and runs a collection of commands for us.
React - Front-end framework that lets us create different views in a way that is object-oriented.
Babel - React uses non-standard syntax and so it needs to be compiled. Babel compiles React syntax into a syntax a Javascript engine could recognize.
Webpack - Takes all the client-side javascript files and bundles them into a single file.
ORM2 - Wraps querying the MongoDB into an objected oriented interface.
MongoDB - Database
ExpressJS - Hosting the website, serving static files, and providing REST API

# Running the Server

## Prereqs
Node, NPM, MongoDB installed.
`npm install -g grunt`

## Installing
`npm install .`
`mkdir db` <- Make sure to delete this directory when pushing to github.

## Running
`grunt`
and on a seperate terminal...
`mongodb --dbpath db`

# Structure

## server/api.js
Implements all the REST api calls

## client/vendors.js
Used for caching library files for fast compilation using Babel.

## client/*.js
React Views