# Charitism_Backend
## Todo_Management_System API Documentation

**Description**: A Simple Crud Application backend for an todo application using nodejs, express.js and MongoDB.

**Deployed_Link**: https://tiny-cyan-calf-vest.cyclic.app/

**Postman_Collection_Link**:https://www.postman.com/crimson-escape-876324/workspace/sumit/collection/24304575-85230e5a-b16e-4f00-b5b5-f4fa1acb758c?action=share&creator=24304575 

**Postman_Collection_Json_Link** : https://api.postman.com/collections/24304575-85230e5a-b16e-4f00-b5b5-f4fa1acb758c?access_key=PMAT-01HK4TSH00H0FN78B7YM7ZMN64 


**Version**: 1.0.0

## Base URL

`http://localhost:4500/`

## Authentication

Bearer Token authentication is required for some routes.

### Security Definitions

- Bearer
  - Type: apiKey
  - Name: Authorization
  - In: header

## Endpoints

### User Signup

- **URL**: `/users/signup`
- **Method**: `POST`
- **Description**: User signup
- **Parameters**:
  - `body` (Request Body)
    - `name` (string, example: "any")
    - `email` (string, example: "any")
    - `password` (string, example: "any")
- **Responses**:
  - 201: Created
  - 400: Bad Request
  - 500: Internal Server Error

### User Login

- **URL**: `/users/login`
- **Method**: `POST`
- **Description**: User login
- **Parameters**:
  - `body` (Request Body)
    - `email` (string, example: "any")
    - `password` (string, example: "any")
- **Responses**:
  - 200: OK
  - 400: Bad Request
  - 401: Unauthorized
  - 404: Not Found
  - 500: Internal Server Error

### Get All Todos

- **URL**: `/todos`
- **Method**: `GET`
- **Description**: Get all todos
- **Security**: Bearer Token
- **Responses**:
  - 200: OK
  - 500: Internal Server Error

### Create a New Todo

- **URL**: `/todos`
- **Method**: `POST`
- **Description**: Create a new todo
- **Security**: Bearer Token
- **Parameters**:
  - `body` (Request Body)
    - `userID` (string, example: "any")
    - `todo` (string, example: "any")
    - `status` (string, example: "any")
- **Responses**:
  - 201: Created
  - 400: Bad Request
  - 500: Internal Server Error

### Get a Todo by ID

- **URL**: `/todos/{id}`
- **Method**: `GET`
- **Description**: Get a todo by ID
- **Security**: Bearer Token
- **Parameters**:
  - `id` (path parameter, required, type: string)
- **Responses**:
  - 200: OK
  - 500: Internal Server Error

### Delete a Todo by ID

- **URL**: `/todos/{id}`
- **Method**: `DELETE`
- **Description**: Delete a todo by ID
- **Security**: Bearer Token
- **Parameters**:
  - `id` (path parameter, required, type: string)
- **Responses**:
  - 200: OK
  - 201: Created
  - 500: Internal Server Error

### Update a Todo by ID

- **URL**: `/todos/{id}`
- **Method**: `PATCH`
- **Description**: Update a todo by ID
- **Security**: Bearer Token
- **Parameters**:
  - `id` (path parameter, required, type: string)
  - `body` (Request Body)
    - `todo` (string, example: "Updated Todo")
    - `status` (string, example: "Updated Status")
    - `userID` (string, example: "Updated UserID")
- **Responses**:
  - 200: OK
  - 400: Bad Request
  - 404: Not Found
  - 500: Internal Server Error
