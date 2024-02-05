# Project Setup and Usage Guide

## Environment Setup
1. Open the project in Webstorm.
2. Run the following commands:
   - Install yarn globally: `npm install -g yarn`
   - Install project dependencies: `yarn install`
   - Build the project: `yarn run build:dev`
3. Launch Docker.
4. Run the `Start Dev` configuration.

## Accessing the Application
Open [http://localhost:3000](http://localhost:3000) in a web browser.

## How to Use Features
- [http://localhost:3000](http://localhost:3000) sends you to the login page.
- To login, click “Login as Admin” and use “admin” as the username and password.
- If you are a patient you can log in using ‘patient’ as the username and password. Your specific user authorities over what you can access will not change just yet in this prototype. So logging in as a patient, admin, or guest all have the same access on the site.
- After logging in, the main homepage contains the Lower Floor 1 Navigation pathfinding page.
- Choose the rooms from both drop-downs and the path, in text, will be displayed below if a path is found.
- To access the different pages, use the navigation bar at the top of your screen.

## Importing and Exporting CSV Files
- To import CSV files, navigate to the respective page, click the “Export” button which will open File Explorer and drag the file into the box or click on the file to choose your file.
- Once added, the table will populate below.
- Click the export button above the box to export the database data.

## Service Log and Requests
- In order for the service log to populate with data, you first have to drop a CSV into “node data,” then copy a room long name.
- Next navigate to the send flowers page. Enter your credentials, and for the room name, paste the room long name from the node data page.
- In order to access the send flowers, click on “Service Requests” on the menu bar and select “Send Flowers.”
- In order for the request to go through, the room name must match the long name of a node.
- To see all of the service requests, click on “Service Requests” on the menu bar and select “Service Log”
