# Mango Server with Mongoose

A robust and scalable mango server built with Express, TypeScript, and Mongoose. This server provides a complete set of APIs to manage mangoes, users, authentication, and orders.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following software installed on your machine:

- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/Apollo-Level2-Web-Dev/mango-server-with-mongoose.git
   cd mango-server-with-mongoose
   ```

2. **Install dependencies:**
   ```sh
   pnpm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root of the project and add the following environment variables. You can use the `.env.example` file as a template.
   ```env
   PORT=5000
   DATABASE_URL=your_mongodb_connection_string
   BCRYPT_SALT_ROUNDS=12
   JWT_ACCESS_SECRET=your_jwt_access_secret
   JWT_REFRESH_SECRET=your_jwt_refresh_secret
   JWT_ACCESS_EXPIRES_IN=1d
   JWT_REFRESH_EXPIRES_IN=365d
   ```

4. **Run the development server:**
   ```sh
   pnpm dev
   ```
   The server will start on the port specified in your `.env` file (e.g., `http://localhost:5000`).

## API Documentation

The base URL for all API endpoints is `/api/v1`.

### User Module

#### `POST /user/create-user`

Creates a new user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "1234567890",
  "password": "yourpassword",
  "role": "Customer"
}
```

**Response Body:**
```json
{
  "success": true,
  "statusCode": 201,
  "message": "User created successfully",
  "data": {
    "_id": "...",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "1234567890",
    "role": "Customer"
  }
}
```

#### `POST /user/login`

Logs in a user and returns access and refresh tokens.

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

**Response Body:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "User logged in successfully",
  "data": {
    "accessToken": "...",
    "refreshToken": "..."
  }
}
```

#### `POST /user/refresh-token`

Refreshes the access token using a valid refresh token.

**Request (Cookie):**
- `refreshToken`: Your refresh token.

**Response Body:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Access token refreshed successfully",
  "data": {
    "accessToken": "..."
  }
}
```

#### `GET /user`

Retrieves a list of all users. Requires authentication.

**Authorization:** `Admin`, `Customer`

**Response Body:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Users retrieved successfully",
  "data": [
    {
      "_id": "...",
      "name": "...",
      "email": "...",
      "phone": "...",
      "role": "..."
    }
  ]
}
```

### Auth Module

#### `POST /auth/change-password`

Changes the password for the authenticated user.

**Authorization:** `Admin`, `Customer`

**Request Body:**
```json
{
  "oldPassword": "current_password",
  "newPassword": "new_strong_password"
}
```

**Response Body:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Password changed successfully"
}
```

#### `POST /auth/reset-password`

Resets the user's password.

**Request Body:**
```json
{
  "email": "user@example.com",
  "phone": "1234567890",
  "password": "new_password"
}
```

**Response Body:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Password reset successfully"
}
```

#### `POST /auth/logout`

Logs out the user by clearing the tokens.

**Response Body:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "User logged out successfully"
}
```

### Mango Module

#### `POST /mango`

Creates a new mango entry.

**Request Body:**
```json
{
  "name": "Himsagar",
  "price": 150,
  "stock": 100,
  "description": "Sweet and flavorful mango from Rajshahi."
}
```

**Response Body:**
```json
{
  "success": true,
  "statusCode": 201,
  "message": "Mango created successfully",
  "data": {
    "_id": "...",
    "name": "Himsagar",
    "price": 150,
    "stock": 100,
    "description": "..."
  }
}
```

#### `GET /mango`

Retrieves a list of all mangoes.

**Response Body:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Mangoes retrieved successfully",
  "data": [
    {
      "_id": "...",
      "name": "...",
      "price": 0,
      "stock": 0,
      "description": "..."
    }
  ]
}
```

#### `GET /mango/:mangoId`

Retrieves a single mango by its ID.

**Response Body:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Mango retrieved successfully",
  "data": {
    "_id": "...",
    "name": "...",
    "price": 0,
    "stock": 0,
    "description": "..."
  }
}
```

#### `PATCH /mango/:mangoId`

Updates a mango's details.

**Request Body:**
```json
{
  "price": 160,
  "stock": 80
}
```

**Response Body:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Mango updated successfully",
  "data": {
    "_id": "...",
    "name": "...",
    "price": 160,
    "stock": 80,
    "description": "..."
  }
}
```

#### `DELETE /mango/:mangoId`

Deletes a mango by its ID.

**Response Body:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Mango deleted successfully"
}
```

### Order Module

#### `POST /order`

Creates a new order. Requires authentication.

**Authorization:** `Admin`, `Customer`

**Request Body:**
```json
{
  "user": "user_id",
  "mango": "mango_id",
  "quantity": 5
}
```

**Response Body:**
```json
{
  "success": true,
  "statusCode": 201,
  "message": "Order created successfully",
  "data": {
    "_id": "...",
    "user": "...",
    "mango": "...",
    "quantity": 5,
    "totalPrice": 750
  }
}
```

#### `GET /order`

Retrieves a list of all orders. Requires authentication.

**Authorization:** `Admin`, `Customer`

**Response Body:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Orders retrieved successfully",
  "data": [
    {
      "_id": "...",
      "user": "...",
      "mango": "...",
      "quantity": 0,
      "totalPrice": 0
    }
  ]
}
```

