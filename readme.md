# Simple CRUD Server

A simple REST API built with **Node.js**, **Express.js**, and **MongoDB** to demonstrate basic CRUD (Create, Read, Update, Delete) operations. This project includes APIs for managing **Users** and **Products** collections.

## Features

- Create, Read, Update, and Delete Users
- Create, Read, Update, and Delete Products
- MongoDB Atlas integration
- Environment variables using dotenv
- CORS enabled
- JSON request handling with Express middleware

## Technologies Used

- Node.js
- Express.js
- MongoDB Atlas
- MongoDB Node.js Driver
- dotenv
- CORS

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
```

2. Navigate to the project folder:

```bash
cd simple-crud-server
```

3. Install dependencies:

```bash
npm install
```

4. Create a `.env` file in the project root:

```env
DB_USER=your_mongodb_username
DB_PASS=your_mongodb_password
PORT=3000
```

5. Start the development server:

```bash
npm run dev
```

Or start normally:

```bash
npm start
```

## API Endpoints

### Users

| Method | Endpoint     | Description       |
| ------ | ------------ | ----------------- |
| GET    | `/users`     | Get all users     |
| GET    | `/users/:id` | Get a single user |
| POST   | `/users`     | Create a new user |
| PUT    | `/users/:id` | Update a user     |
| DELETE | `/users/:id` | Delete a user     |

### Products

| Method | Endpoint        | Description          |
| ------ | --------------- | -------------------- |
| GET    | `/products`     | Get all products     |
| GET    | `/products/:id` | Get a single product |
| POST   | `/products`     | Create a new product |
| PUT    | `/products/:id` | Update a product     |
| DELETE | `/products/:id` | Delete a product     |

## Project Structure

```text
simple-crud-server/
│── node_modules/
│── .env
│── .gitignore
│── package.json
│── package-lock.json
│── index.js
```

## Author

**Shantunu Chakma**
