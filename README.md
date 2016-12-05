# Stack:

* Grunt
* React / Babel / Webpack
* Node ORM2 / MongoDB
* Express

# Stack Reasoning
* Grunt - "Taskrunner" which acts like a "Makefile" and runs a collection of commands for us.
* React - Front-end framework that lets us create different views in a way that is * object-oriented.
* Babel - React uses non-standard syntax and so it needs to be compiled. Babel compiles React syntax into a syntax a Javascript engine could recognize.
* Webpack - Takes all the client-side javascript files and bundles them into a single file.
* ORM2 - Wraps querying the MongoDB into an objected oriented interface.
* MongoDB - Database
* ExpressJS - Hosting the website, serving static files, and providing REST API
  
# Running the Server
  
## Prereqs
Node, NPM, MongoDB, Grunt installed.  
`npm install -g grunt` <- to install grunt
  
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

# CMPE 172

We’re going to build a web application using **javascript/node.js** on client side and any web programming languages (such as Ruby/Rails, Java/Scala, Python and node.js) on server side. The server-side program should provide for itself such functions as **transaction processing**, **database connectivity**, and/or **messaging**. Using Amazon Web Services (AWS) cloud-hosting infrastructure for project development is optional and deploy it on heroku is mandatory.
  
Note: Chat application is just an example please don’t use this as a project topic
  
#Our Requirements
  
Let’s define some basic requirements for building a web application server on AWS:
  
* You will develop on a SSH/HTTP/HTTPs-accessible EC2 machine eligible for/compatible with the "AWS Free Usage Tier" (Links to an external site.).
* Runs on Amazon Linux (the Amazon Linux images seem to be better optimized for EC2)
* Install the required libraries on EC2 (depends on which programming language you have chosen)
* Use Git-based deployment of our code to AWS
* Implement a webserver with **ORM application with** reasonable level of functionality across all devices (a responsive framework like Bootstrap will help you build mobile-friendly feature set).
* Deploy the application on Heroku
  
#Additional Requirement
  
You should use at least one other frameworks (e.g;  HTML 5 presentation system (reveal.js)) discussed in class in conjunction with basic requirements described above.