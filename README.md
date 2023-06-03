# TODO API

Short description of your project.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The project is a Todo API that allows users to manage their tasks and to-do lists. It provides endpoints to create, update, and delete tasks, as well as mark tasks as completed or pending. The API also supports user authentication using JWT (JSON Web Tokens).

## Features

1. **User Registration and Authentication**

   Users can register with the API by providing their email address and password. Upon successful registration, users receive a JWT (JSON Web Token) that they can use for authentication in subsequent API requests.

2. **Create, Update, and Delete Tasks**

   Users can create new tasks by providing a title and description. They can also update existing tasks, modifying their title and description. Additionally, users have the ability to delete tasks when they are no longer needed.

3. **Mark Tasks as Completed or Pending**

   Users can mark tasks as completed or pending to keep track of their progress. This feature helps users stay organized and easily identify which tasks are finished and which ones still need attention.

4. **Get a List of Tasks for a Specific User**

   The API provides an endpoint to retrieve a list of tasks specifically associated with a user. This allows users to view all their tasks in one place and manage them efficiently.

5. **Email Notifications**

   The API can send email notifications to users for various events, such as task created,task updates. Users can configure their email preferences and receive notifications in their registered email address.

6. **Sorting Tasks**

   Users can sort their tasks based on different criteria, such as due date, priority, or status. This allows users to organize and view their tasks according to their preferences and priorities.

## Usage
Usage
Start the server:

bash
Copy code
npm start
Use an API development tool like Postman or cURL to interact with the API.

1. **Register a New User**

   Endpoint: POST /api/auth/register
   Payload: { "email": "user@example.com", "password": "mypassword" }
   Response: {"message": "User registered successfully"}

2. **Login**

   Endpoint: POST /api/auth/login
   Payload: { "email": "user@example.com", "password": "mypassword" }
   Response: {"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJpYXQiOjE2MzA0NjQ2OTEsImV4cCI6MTYzMDQ2NTA5MX0.JT5otYqfdNh"

3. **Create a New Task**

   Endpoint: POST /api/tasks
   Payload: { "title": "Task 1", "description": "Description of Task 1" }
   Response: {"message": "Task created successfully", "task": { "id": "1", "title": "Task 1", "description": "Description of Task 1", "completed": false, "userId": "12345" }}

4. **Get Tasks for a User**

   Endpoint: GET /api/tasks
   Response: {"tasks": [{ "id": "1", "title": "Task 1", "description": "Description of Task 1", "completed": false, "userId": "12345" }]}

5. **Update a Task**

   Endpoint: PUT /api/tasks/:taskId
   Payload: { "title": "Updated Task 1", "description": "Updated description" }
   Response: {"message": "Task updated successfully", "task": { "id": "1", "title": "Updated Task 1", "description": "Updated description", "completed": false, "userId": "12345" }}

6. **Delete a Task**

   Endpoint: DELETE /api/tasks/:taskId
   Response: {"message": "Task deleted successfully"}
  

## Getting Started

### Prerequisites

Before running the project, make sure you have the following installed:

- Node.js
- MongoDB

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/sayed-soeb/todoApi.git
