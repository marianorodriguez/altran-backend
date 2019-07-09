# altran-backend
Backend exercise made for Altran


**Prerequisite:** 
Having a MySQL server and client installed on the machine (https://www.mysql.com/)

Once you have installed the client and server, inside your MySQL client run the following command:

`CREATE DATABASE altran;`

then, import the dump into said database via any MySQL Client Interface or with the following command on a terminal pointing to the root of this project, replacing *\<USER\>* with the username of your MySQL client:
  
`mysql -u<USER> -p altran < altrandb.sql`

Finally, you may have to edit the connection params in lib/DB_CONFIG.json configuration file.
