# Vinyl Shop

<p>
    <img src="https://user-images.githubusercontent.com/25181517/192158954-f88b5814-d510-4564-b285-dff7d6400dad.png" width="45" height="45">
    <img src="https://user-images.githubusercontent.com/25181517/183898674-75a4a1b1-f960-4ea9-abcb-637170a00a75.png" width="45" height="45">
    <img src="https://user-images.githubusercontent.com/25181517/183898054-b3d693d4-dafb-4808-a509-bab54cf5de34.png" width="45" height="45">
    <img src="https://user-images.githubusercontent.com/25181517/117448124-a2da9800-af3e-11eb-85d2-bd1b69b65603.png" width="40" height="40">
     <img src="https://user-images.githubusercontent.com/25181517/117447155-6a868a00-af3d-11eb-9cfe-245df15c9f3f.png" width="40" height="40">
    <img src="https://user-images.githubusercontent.com/25181517/183568594-85e280a7-0d7e-4d1a-9028-c8c2209e073c.png" width="45" height="45">
    <img src="https://user-images.githubusercontent.com/25181517/183859966-a3462d8d-1bc7-4880-b353-e2cbed900ed6.png" width="45" height="45">
</p>

## Table of Contents

- [Description](#description)
- [Backend Features](#backend-features)
- [Frontend Features](#frontend-features)
- [Installation](#installation)

## Description

This project is a full-stack web application that consists of 3 backend services, developed in Node.js using the Express framework, and 2 frontend applications, one for admin and other for user.

## Backend Features

<b>First backend - REST Service</b>
- Exposes data from the database through RESTful endpoints.
- Implements CRUD operations for all entities in the database.
- Handles validation using Joi
- Implements user authentication.
- Uses MariaDB database. <br>

<b>Second backend - Authentication Service</b>
- Provides user registration (API only).
- Implements authentication with JWT (API only).
- Handles user roles. <br>
  
<b>Third backend - Application Service</b>
- Serves HTML and associated resources for the application GUI.
- Communicates with the REST service using fetch/ajax.

## Frontend Features

<b>Admin Application (HTML + CSS)</b>
- Interacts with the REST service from the backend for data access.
- Implements CRUD operations for all entities.
- Designs pages for listing, details, editing, etc., for each entity.
- Implements validation for user inputs. <br>

<b>User Application (Vue.js)</b>
- Interacts with the REST service from the backend for data access.
- Uses Vue Router for navigation.
- Implements Vuex Store for state management.
- Uses Bootstrap Vue.
- Implements login and register views/routes.

## Installation

```git clone <repository_url>```

<b>1. Backend setup</b>
- Api service setup
```
  cd api-service
  npm install
```
- App service setup
 ```
  cd app-service
  npm install
```
- Auth service setup
```
  cd auth-service
  npm install
```
<b>2. Frontend setup</b>
```
cd front
npm install --force
npm run serve
```
