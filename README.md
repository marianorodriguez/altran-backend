# altran-backend
Backend exercise made for Altran


**Prerequisite:** 
Having a MySQL server and client installed on the machine (https://www.mysql.com/)

Once you have installed the client and server, inside your MySQL client run the following command:

`CREATE DATABASE altran;`

then, import the dump into said database via any MySQL Client Interface or with the following command on a terminal pointing to the root of this project, replacing *\<USER\>* with the username of your MySQL client:
  
`mysql -u<USER> -p altran < altrandb.sql`

Finally, you may have to edit the connection params in lib/DB_CONFIG.json configuration file.


**Available commands:**

`npm run dev`: Launches the server in development mode

`npm run start`: Launches the server in production mode

`npm run stop`: Stops the server when launched on production mode

`npm run test`: Runs the test suite.


**main dependencies:**

- express (https://expressjs.com/) Node.js framework, used to write the API.
- jsonwebtoken (https://jwt.io/) For authenticating the requests to the API.
- mysql (https://www.mysql.com/) Database client used to retrieve the app data.
- redis (https://redis.io/) In-memory database used as a cache layer between MySQL and the user requests.
- pm2 (http://pm2.keymetrics.io/) Node.js process manager for starting and managing the server in production.
