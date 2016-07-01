# Starter-API-Hapi-NodeJS

A starter backend point for any web or mobile application


State : W.I.P



### Technology

- **NodeJS** - Event-driven I/O server-side JavaScript environment based on V8.
- **Hapi** - Server side framework
- **Grunt** - Javascript tasks automation
- **MongoDB** - NoSQL Database
- **Bluebird** - Optimized promise library
- **asyncawait** - Callback heaven for Node.js with async/await

- **mongodb** - Mongo DB Native NodeJS Driver

### Instruction

Start with : node server.js

### Shell command

type "help" to have the command list

#### Connect to another database
Change in connector/database.js : DatabaseClient=MongoDB to your own connector
Exemple :
```
var myOtherDbClient = require('databases/MyOtherDbClient');
var DatabaseClient = myOtherDbClient;
```
