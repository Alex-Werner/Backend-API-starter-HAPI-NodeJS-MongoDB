# Starter-API-Hapi-NodeJS

A starter backend point for any web or mobile application


State (as of 04 July 14): Working state with models, controllers and routes connected



### Technology

- **NodeJS** - Event-driven I/O server-side JavaScript environment based on V8.
- **Hapi** - Server side framework
- **Grunt** - Javascript tasks automation
- **MongoDB** - NoSQL Database
- **Bluebird** - Optimized promise library
- **asyncawait** - Callback heaven for Node.js with async/await

- **mongodb** - Mongo DB Native NodeJS Driver

### Instruction

Per default, this works on MongoDB.
If you don't have it, install here (~9mn) : https://www.mongodb.com/download-center

Then after having done a ```npm install```

Prepare and launch your database using the script in
```bin/win/start_MongoDB.bat```
It will create a .db folder where db mongo's file will be stored  

Start with :
```node server.js```

or with nodemon (reload on code change,...)
```
npm install -g nodemon
nodemon server.js
```

### Shell command

type "help" to have the command list

#### Connect to another database
Change in connector/database.js : DatabaseClient=MongoDB to your own connector
Exemple :
```
var myOtherDbClient = require('databases/MyOtherDbClient');
var DatabaseClient = myOtherDbClient;
```
