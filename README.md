## Table of Contents
1. [Project Overview](#1-project-overview)
   - [Introduction](#11-introduction)
   - [Tech Stack Used](#12-tech-stack-used)
   - [Functional Requirements for Backend Application](#13-functional-requirements-for-backend-application)
   - [Functional Requirements for Frontend Application](#14-functional-requirements-for-frontend-application)
   - [Additional Functionalities](#15-additional-functionalities)
   - [API Specifications](#16-api-specifications)
   - [Demo Video](#17-demo-video)
     
2. [Setting Up the Project on Windows Local System](#2-setting-up-the-project-on-windows-local-system)
   - [Setting up the MongoDB Atlas Database](#21-setting-up-the-mongodb-atlas-database)
   - [Setting up the Virtual Environment](#22-setting-up-the-virtual-environment)
     
3. [Running the Project on Windows Local System](#3-running-the-project-on-windows-local-system)

---
---

## 1) Project Overview

### 1.1) Introduction
This project is a web-based analytics dashboard designed to display an interactive map of India with location-based clusters and metrics. The application allows users to explore data points on the map, view tooltips with details on hover, and interact with the map effortlessly. Cluster data, including latitude and longitude for map markers, is retrieved from the database and displayed on the map. The dashboard also includes metrics calculation and visualization, providing a simple and user-friendly experience.

---

### 1.2) Tech Stack Used
- **Frontend**: React (using Tailwind CSS)
- **Backend**: Python FastAPI
- **Database**: MongoDB
- **Visualization Library**: Leaflet.js
- **CI/CD**: GitHub Actions (for automating build and deployment for frontend to GitHub Pages)
  
---

### 1.3) Functional Requirements for Backend Application
To build a backend application powered by FastAPI supporting the following operations:
1. **Fetch Clusters**: Provide an API endpoint to retrieve cluster data from MongoDB, including:
   - Name
   - Latitude and Longitude
   - Number of Users, Projects, and Leads
2. **Metrics Calculation**: Provide an API endpoint to calculate and return:
   - Total Users
   - Total Clusters
   - Total Projects
   - Total Leads
   - Average Users per Cluster
3. **Filter Functionality**: Provide an API endpoint to filter clusters based on:
   - Minimum number of users
   - Minimum number of projects
4. **Delete Cluster Functionality**: Provide an API endpoint to delete a specific cluster by its unique identifier (ID).

---

### 1.4) Functional Requirements for Frontend Application
To build a frontend application powered by React.js supporting the following operations:
1. **Interactive Map Rendering**:
   - Render an interactive map of India using Leaflet.js.
   - Fetch and plot cluster data with markers.
   - Show a tooltip on hover with Cluster Name and details.
2. **Dashboard Metrics**:
   - Fetch and display calculated metrics (Total Users, Total Clusters, etc.) in card format.
3. **Table View**:
   - Fetch and display cluster details in a table.
   - Support sorting and filtering.
4. **Filter Functionality**: Add options to filter clusters by:
   - Minimum number of users
   - Minimum number of projects
5. **Responsive Design**:
   - Ensure the application works across different screen sizes.

---

### 1.5) Additional Functionalities
#### a) Allow user to delete the clusters
#### b) Allow user to create new clusters

---

### 1.6) API Specifications
**a) GET cluster/get_clusters:** This endpoint retrieves the list of clusters with support for sorting and pagination.
It accepts the following query parameters: 
   1) **limit: (Optional)**: The number of documents to fetch. Default is 10.
   2) **skip: (Optional)**: The number of documents to skip from start. Default is 0.
   3) **field: (Optional)**: The field to sort by. Allowed values are name, users, projects, and leads. Default is name.
   4) **sorted: (Optional)**: The sort order. Allowed values are asc for ascending and desc for descending. Default is asc.

The response will return the list of clusters with the selected limit and sorting, including their details such as name, latitude, longitude, number of users, projects, and leads.

**b) GET /cluster/metrics:** This endpoint calculates and returns the following metrics for the clusters:
      - total_users: The total number of users across all clusters
      - total_clusters: The total number of clusters.
      - total_projects: The total number of projects across all clusters.
      - total_leads: The total number of leads across all clusters.
      - avg_users_per_cluster: The average number of users per cluster.

The response will return these calculated metrics as a JSON object.

**c) POST cluster/add:** This endpoint adds a new cluster to the database. It expects the following data in the request body:
   1) **name (Required)**: The name of the cluster
   2) **latitude (Required)**: The latitude of the cluster (Required).
   3) **longitude (Required)**: The longitude of the cluster (Required).
   4) **users (Required)**: The number of users in the cluster (Optional).
   5) **projects (Required)**: The number of projects in the cluster (Optional).
   6) **leads (Required)**: The number of leads in the cluster (Optional).

If the cluster name already exists, a 400 error is returned. If the cluster is added successfully, the newly created cluster's details are returned in the response.

**d) DELETE cluster/delete/{docid}:** This endpoint deletes a cluster by its ObjectId. It accepts the following parameter:
   1) **docid: (Required)**: The ObjectId of the cluster to delete.

The response will indicate whether the deletion was successful. If the cluster is not found or the provided ObjectId is invalid, a 404 or 400 error is returned, respectively.

---

### 1.7) Demo Video
Watch the demo video [here](https://drive.google.com/file/d/1-rRBpp1eNfo-M4i976DLhq5Mj570HbaU/view?usp=sharing).
      
---
---


## 2) Setting Up the Project on Windows Local System

#### 2.1) Setting up the MongoDB Atlas Database
1. Clone this repository to your local system.
2. Create a cluster in MongoDB Atlas and note the username, password, and connection string.
3. Create a `.env` file in the 'backend/' folder of the root directory of this cloned project, with the following:
      - DB_USERNAME=`Your username`
      - DB_PASSWORD=`Your password`
4. Set the `url` variable in './backend/database/connection.py' to the connection string of your cluster.

### 2.2) Setting up the Backend Application
1. Add the below variable in the `.env` file in the 'backend/' folder:
      - CLIENT_URL=`http://localhost:3000`
2. Open CMD and navigate to the 'backend/' folder of root project directory.
3. Install the required packages with: `pip install -r requirements.txt`
4. Close CMD.

### 2.3) Setting up the Frontend Application
1. Create a `.env` file in the 'frontend/' folder of the root directory of this cloned project, with the following:
      - REACT_APP_SERVER_URL=`http://localhost:8000`
2. Open CMD and navigate to the 'frontend/' folder of root project directory.
3. Install the required packages with: `npm install`
4. Close CMD.

---
---

## 3) Running the Project on Windows Local System

1. Open CMD in the 'backend/' folder of project and run `uvicorn main:app --reload`. This will run the backend application at `http://localhost:8000/`.
2. Open CMD in the 'frontend/' folder of project and run `npm start`. This will run the frontend application at `http://localhost:3000/`.
