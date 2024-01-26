# Project Setup

## Environment Setup

1. Install yarn globally: `npm install -g yarn`
2. Install project dependencies: `yarn install`
3. Build the project: `yarn run build:dev`
4. Open: `http://localhost:3000` in a web browser.

## Front End

- To see the BFS path displayed go to `http://localhost:3000/bfs`
- `http://localhost:3000` goes to the main homepage that contains a map of the hospital
- Selecting a map on the navbar will bring you to the official map page which contains a file drag and drop. In order to display the data in a CSV file, pull up the file folder aside the page and drag the file and drop it in the box. This will then display the contents in the CSV in the box below the drag and drop.
- `http://localhost:3000/userselection` goes to a user selection page where there are options to login as “Patient,” “Admin,” or “Guest”

For future implementations of the login page, we plan to restrict certain functionalities depending on the type of user. For example, an admin user will have access to more data and functionalities than a guest user.

After opening the web page use the buttons to navigate.

## Algorithms

To visualize the BFS, within `BFSComponent.tsx` under `frontend → src → components`, navigate to lines 12 and 13 and change the `startId` and `endId` to the respective nodeID’s you wish to generate a path for.

- To visit the web page that displays the node pathway, visit `http://localhost:3000/bfs`
- To visit the web page that parses and displays the csv file, visit `http://localhost:3000/map` then drag and drop the csv file.

## Database

We constructed a schema to hold node and edge data within `prisma.schema`.
