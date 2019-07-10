# altran-backend
Backend exercise made for Altran


**Prerequisite:** 
Having a MySQL server and client installed on the machine (https://www.mysql.com/)

Once you have installed the client and serve run the following command, replacing *\<USER\>* with the username of your MySQL client:
  
`mysql -u<USER> -p < /PATH/TO/PROJECT/ROOT/altrandb.sql`

This command will create and load the required database and tables.

Finally, you may have to edit the connection params in *lib/DB_CONFIG.json* configuration file:

`
{
    "host": "localhost",
    "password": "123456",
    "user": "root"
}
`


**Available commands:**

`npm i`: Installs the required dependencies for the server to start

`npm run dev`: Launches the server in development mode

`npm run start`: Launches the server in production mode

`npm run stop`: Stops the server when launched on production mode

`npm run test`: Runs the test suite.


**How to use:**

you will need a login token to access to the main endpoints.

- Make a POST request to */login* with the following body:
`{
  "email": "<YOUR_EMAIL>"
 }`
 
 the server will validate your email with the clients database and send you a Token with a 30 minutes life span.
 
 available endpoints:
 
 - GET /clients/byId/:clientId -> sends client data, searched by client ID.
 - GET /clients/byName/:name -> sends client data, searched by client name.
 - GET /policies/user/:policyId -> sends the client data linked to a policy, searched by policy ID.
 - GET /policies/byUsername/:name -> sends all policies linked to a client, searched by client name.
 
 *All request must have a "token" key set in the header with the <AUTH_TOKEN> obtained in the login request as the value.*
 
 */policies endpoints requires the logged user to have the "admin" role.*


**Request example:**

- Login request:
`curl -X POST http://localhost:8080/login -H 'content-type: application/json' -d '{	"email": "sherrieblankenship@quotezart.com" }'`

Login response: `{
  "success":true,
  "token":"<AUTH_TOKEN>"
}`

- Get data of clients named 'Sherrie':
`curl -X GET http://localhost:8080/clients/byName/Sherrie -H 'token: "<AUTH_TOKEN>"'`

Response: `{
    "found": true,
    "clients": [
        {
            "id": "011dd3d8-2d1e-4abe-9efc-006a1a4a0399",
            "name": "Sherrie",
            "email": "sherrieblankenship@quotezart.com",
            "role": "user"
        }
    ]
}`


**main dependencies:**

- express (https://expressjs.com/) Node.js framework, used to write the API.
- jsonwebtoken (https://jwt.io/) For authenticating the requests to the API.
- mysql (https://www.mysql.com/) Database client used to retrieve the app data.
- redis (https://redis.io/) In-memory database used as a cache layer between MySQL and the user requests.
- pm2 (http://pm2.keymetrics.io/) Node.js process manager for starting and managing the server in production.
