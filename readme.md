# Brigham & Women's Hospital Navigation System

A comprehensive web application for hospital navigation and service management, developed for CS3733 C24 Software Engineering under Prof. Wilson Wong by the Dark Maroon Dragons team in collaboration with Brigham & Women's Hospital.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Demo](#running-the-demo)
  - [Accessing the Application](#accessing-the-application)
- [Usage](#usage)
  - [User Selection](#user-selection)
  - [Admin Login](#admin-login)
  - [Guest Access](#guest-access)
  - [Map Navigation](#map-navigation)
    - [Pathfinding Functionality](#pathfinding-functionality)
    - [Floor Map Legend](#floor-map-legend)
    - [Display Modes](#display-modes)
      - [Heat Map](#heat-map)
      - [3D Map](#3d-map)
  - [Accessibility Options](#accessibility-options)
    - [Text-to-Speech](#text-to-speech)
    - [Mobility Impairments](#mobility-impairments)
  - [Service Requests](#service-requests)
    - [Religious Services](#religious-services)
    - [Cleaning Services](#cleaning-services)
    - [Flower Delivery](#flower-delivery)
    - [Language Translation](#language-translation)
    - [Internal Transportation](#internal-transportation)
    - [External Transportation](#external-transportation)
  - [About Us](#about-us)
  - [Service Log](#service-log)
  - [Data Manager](#data-manager)
- [Delighter Features](#delighter-features)
  - [Dark Mode](#dark-mode)
  - [AI Chatbot](#ai-chatbot)
  - [Mobile Responsiveness](#mobile-responsiveness)
- [Team](#team)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [Yarn](https://yarnpkg.com/getting-started/install) (Install globally)
- [Docker](https://www.docker.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/conner-olsen/BWH-Navigation-Management-System.git
   cd BWH-Navigation-Management-System
   ```

2. **Install the project dependencies:**
   ```bash
   yarn install
   ```

### Running the Demo

To run the demo application, ensure that Docker is running on your machine, then use the following command:

```bash
yarn demo
```

This command will build and start the application using Docker.

To stop the demo, use:

```bash
yarn stop
```

### Accessing the Application

Once the application is running, open [http://localhost:3000](http://localhost:3000) in your web browser.

## Usage

### User Selection

Upon accessing the application, users are presented with three sign-in options:

![User Selection Page](/docs/images/user-selection.png)
*User selection page with Admin, and Guest options*

### Admin Login

![Admin Login Page](/docs/images/admin-login.png)
*Admin login interface with email and password fields*

Admins have access to administrative functionalities, including employee management, data upload, and viewing service logs.

Use one of the following pre-existing accounts to log in:

- **Username:** `softengc24D@gmail.com`
  <br>
  **Password:** `cs3733c24D`

- **Username:** `staffc24D@gmail.com`
  <br>
  **Password:** `cs3733c24D`

Alternatively, you can create a new account by selecting the "Create Account" option. Users can sign up with their email or use an existing Google account.

### Guest Access

Guests can explore the functionalities of the site with some limitations (e.g., access to private data like node or edge data is restricted). Click the "Guest" button on the user selection page to proceed directly to the map page.

### Map Navigation

This pathfinding page displays a map of the Brigham & Women's Hospital that allows the user to zoom in, zoom out, pinch, and drag the floor map.

![Map Navigation Interface](/docs/images/map-navigation.png)
*Main map navigation interface with pathfinding controls*

#### Pathfinding Functionality

- Access the pathfinding functionality by clicking on the cursor icon (which will highlight in blue).
- Select your starting and ending locations within the hospital from the dropdown menus.
  - **Note:** You can only select the starting location from the floor you are currently viewing.
- Alternatively, select a starting and ending location by clicking directly on the location nodes on the map.

#### Floor Map Legend

- Located in the bottom right corner of the map page.
- Hover over the icon to see a legend displaying all the icons used on the floor maps.

#### Display Modes

Accessed via the display button on the bottom left side of the map.

- Customize your map view preferences:
  - Show or hide edges, nodes, halls, and location names individually or collectively.
  - Switch between a 3D map view and a heat map view.

##### Heat Map

- When selected, location icons are color-coded from green (low traffic) to red (high traffic).
- Represents the volume of pathfinding requests passing through nodes.
- The pathfinding algorithm bases the weighting of nodes on the heat map.

![Heat Map View](/docs/images/heat-map.png)
*Heat map showing traffic patterns across hospital locations*

##### 3D Map

- **No Path Chosen:**
  - Users are directed to a 3D view page showcasing each floor.
  - Click on a specific floor to transition to the corresponding 2D view on the pathfinding page.

- **Path Chosen:**
  - An animated 3D path between floors is displayed based on the selected algorithm.
  - Features a legend explaining the meaning of each icon.
  - A toggle button is available to enable or disable the animation for pathfinding.
  - Clicking on a floor within the 3D view redirects to the corresponding floor in 2D, showcasing the animated path.

![3D Map View](/docs/images/3d-map.png)
*3D visualization of multiple hospital floors*

![3D Path Animation](/docs/images/3d-path.png)
*Animated 3D pathfinding between floors*

### Accessibility Options

#### Text-to-Speech

- For users with visual impairments, a text-to-speech option for pathfinding is available by clicking on the speaker icon on the sidebar.
- Users can pause and resume the audio instructions by clicking on the pause button.

#### Mobility Impairments

- For users unable to navigate via stairs, a wheelchair symbol toggle on the sidebar allows for generating a new path that avoids stairs.
- If a path contains stairs, an alert will appear indicating the presence of stairs.

### Service Requests

Accessible through all login interfaces.

- Select from a range of service options:
  - **Religious Services**
  - **Cleaning**
  - **Floral Arrangements**
  - **Language Translation**
  - **Internal Transportation**
  - **External Transportation**
- Upon submission, the data is stored within the backend database.
- For every request, users can provide the patient's name, request location, and assign a priority level (low, high, or emergency).

![Service Request Dashboard](/docs/images/service-requests.png)
*Service request selection dashboard*

#### Religious Services

- Request specific religious services, including prayers.
- Provide additional details through notes if desired.

#### Cleaning Services

- Request cleaning services with options such as basic, regular, or deep cleaning.

#### Flower Delivery

- Send flowers (e.g., daffodils, daisies, lilies, or roses) to a patient.
- Include a personalized note, specify the delivery date, and input a sender email.

#### Language Translation

- Request language translation services by specifying the language needed.

#### Internal Transportation

- Arrange transportation for a patient from their room to a specified destination.
- Choose the mode of transportation such as wheelchair or stretcher.

#### External Transportation

- Request external transportation services, such as an ambulance, to a specified destination.
- Provide details such as the date and a description of the request.

### About Us

- Highlights the development team and the software libraries and UI frameworks used.
- Includes three carousels displaying images of the hospital, relevant frameworks, and team photographs.
- Frameworks are linked to their respective websites upon hovering.
- Clicking on a developer's photo displays each person’s favorite quote.

### Service Log

Accessible exclusively to Admins and Employees.

- Displays all service requests submitted along with their respective details.
- Users can filter requests by status and employee.
- Access statistics by clicking on the provided option, which includes data on request types, the quantity of requests, and assignment details.

![Service Log Interface](/docs/images/service-log.png)
*Service log showing request history and statistics*

### Data Manager

Accessible only to Admins and Employees.

- Manage employee data within the database.
- Add, update, and delete employee records.
- Export or import node, edge, and employee data.
- Access both node and edge data from this page.

![Data Manager Interface](/docs/images/data-manager.png)
*Data management interface for node data*

## Delighter Features

### Dark Mode

- Seamlessly switch to a dark theme across all pages for a comfortable viewing experience in low-light environments.

![Dark Mode Comparison](/docs/images/dark-mode.png)
*Dark mode on the map page*

### AI Chatbot

- An interactive chatbot that slides in from the side of the screen.
- Users can ask various questions on topics like minor medical concerns and general information.

![AI Chatbot Interface](/docs/images/chatbot.png)
*AI Chatbot sliding interface with example conversation*

### Mobile Responsiveness

- The website adapts to smaller screens like mobile or tablet devices.
- Components dynamically resize according to the resolution.
- Features a responsive design for an optimal user experience on all devices.

![Mobile View](/docs/images/mobile-view.png)

*Application interface on mobile device*

## Team

**CS 3733 C24 - Dark Maroon Dragons**

| Name             | Role                         | GitHub Account    |
| ---------------- | ---------------------------- | ----------------- |
| Minh Bui         | Full-Time Software Engineer  | [mlnbui](https://github.com/mlnbui)           |
| Aiden Deady      | Documentation Analyst        | [AidenDeady](https://github.com/AidenDeady)   |
| Steven Gao       | Full-Time Software Engineer  | [StevenGGA](https://github.com/StevenGGA)     |
| Max Gosselin     | Assistant Lead               | [maxgossselin](https://github.com/maxgossselin) |
| Karish Gupta     | Assistant Lead               | [Karish-Gupta](https://github.com/Karish-Gupta) |
| Shivank Gupta    | Scrum Master                 | [shaunmcbean](https://github.com/shaunmcbean) |
| Cecei Herriman   | Full-Time Software Engineer  | [ceci-herriman](https://github.com/ceci-herriman) |
| Tanya Khan       | Product Owner                | [tanyaalikhan](https://github.com/tanyaalikhan) |
| Conner Olsen     | Lead Software Engineer       | [conner-olsen](https://github.com/conner-olsen) |
| William Smith    | Project Manager              | [smithwm210](https://github.com/smithwm210)   |
| James Walden     | Full-Time Software Engineer  | [jdwalden74](https://github.com/jdwalden74)   |

**Team Coach:** Nick Leslie ([GitHub](https://github.com/nick-leslie))

![Team Photo](/docs/images/team-photo.png)
*About page with photos of the team*

[GitHub Repository](https://github.com/conner-olsen/BWH-Navigation-Management-System)
