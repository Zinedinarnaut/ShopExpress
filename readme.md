# Shopexpress

ShopExpress is a modern and versatile API designed to power e-commerce applications. It provides a comprehensive set of endpoints for managing users, products, shopping carts, and payments. ShopExpress is built with security in mind, incorporating features like user authentication and JWT token protection.

Key Features

	•	User Management: Register, log in, and log out users securely. Protect routes with JWT token authentication.
	•	Product Catalog: Create, update, delete, and retrieve product details. Maintain a catalog of available products.
	•	Shopping Cart: Add, update, and remove products from a shopping cart. Calculate totals and handle checkout processes.
	•	Payment Integration: Seamlessly integrate payment services to facilitate transactions. Currently supports Stripe payments.
	•	Documentation: Detailed documentation available for each endpoint, making it easy for developers to get started.
	•	Bootstrap Integration: Designed with frontend frameworks like Bootstrap in mind, making it straightforward to create user interfaces.

ShopExpress simplifies the development of e-commerce applications, allowing you to focus on building a great shopping experience for your users.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Authentication](#authentication)
  - [Routes](#routes)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

- Node.js and npm (Node Package Manager)
- Database (e.g., PostgreSQL, MySQL)
- `.env` file with configuration (example provided)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/zinedinarnaut/shopexpress.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file at the root of your project and add the following configurations:

   ```env
   PORT=3055
   DATABASE_URL=your-database-url
   JWT_SECRET=your-secret-key
   ```

4. Run the API:

   ```bash
   npm start
   ```

## Usage

### Authentication

Before using the protected routes, you need to obtain an access token. You can do this by registering an account and logging in.

### Routes

#### Authentication Routes

- **Register User**

  - URL: `/auth/register`
  - Method: `POST`
  - Description: Register a new user.
  - Request Body:
    - `username`: User's username
    - `password`: User's password
    - `email`: User's email
    - `fullName`: User's full name
  - Example:

    ```json
    {
      "username": "newuser",
      "password": "password123",
      "email": "user@example.com",
      "fullName": "New User"
    }
    ```

  - Response:
    - Success: Status 200 OK
    - Error: Status 400 Bad Request

- **Login User**

  - URL: `/auth/login`
  - Method: `POST`
  - Description: Log in a user and obtain an access token.
  - Request Body:
    - `username`: User's username
    - `password`: User's password
  - Example:

    ```json
    {
      "username": "existinguser",
      "password": "password123"
    }
    ```

  - Response:
    - Success: Status 200 OK
    - Error: Status 401 Unauthorized

- **Logout User**

  - URL: `/auth/logout`
  - Method: `GET`
  - Description: Log out the currently authenticated user.
  - Response:
    - Success: Status 200 OK

- **Refresh Token**

  - URL: `/auth/token`
  - Method: `POST`
  - Description: Obtain a new JWT token after it has expired. (Optional)
  - Response:
    - Success: Status 200 OK

#### Other Routes

- **Protected Routes**

  All other routes are protected and require an access token obtained through login.

  - Example:

    ```http
    GET /api/protected-route
    Authorization: Bearer your-access-token
    ```

## Contributing

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push your changes to your fork.
5. Submit a pull request to the original repository.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.