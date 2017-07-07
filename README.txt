Backend for Notification system


Dependencies:
1. node npm
2. Mongodb

Install dependencies:
1. Download node from Nodes official website.
2. Download MongoDB from mongodb's official website.


Install steps for backend:
1. "npm install"

2. Create Mongodb with demo users and actions:
'db_dump' directory has dump files of mongo database 'wingify'
 we need to restore this daatabase in order to start the application.

 Run the below command in project root. This will create a db name 'wingify' with
 some demo data.
 command: "mongorestore --db wingify ./db_dump/dump/wingify/"

Running the server:
1. "npm start": This will start the http server on port 5660


Generating Notification from server:
1. "npm run emulate": This command will generate a single notifications after every 4s.

In case something is not working, please reach out to me.
Author : Ankit Yadav
Email: ankitwrk@gmail.com
Mobile: 8087850104