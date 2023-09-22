# Shopexpress

ShopExpress is a modern and versatile API designed to power e-commerce applications. It provides a comprehensive set of endpoints for managing users, products, shopping carts, and payments. ShopExpress is built with security in mind, incorporating features like user authentication and JWT token protection.

## Key Features

- **User Management:** Register, log in, and log out users securely. Protect routes with JWT token authentication.
- **Product Catalog:** Create, update, delete, and retrieve product details. Maintain a catalog of available products.
- **Shopping Cart:** Add, update, and remove products from a shopping cart. Calculate totals and handle checkout processes.
- **Payment Integration:** Seamlessly integrate payment services to facilitate transactions. Currently supports Stripe payments.
- **Documentation:** Detailed documentation available for each endpoint, making it easy for developers to get started.
- **Bootstrap Integration:** Designed with frontend frameworks like Bootstrap in mind, making it straightforward to create user interfaces.

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

To get started with ShopExpress, you'll need:

- Node.js and npm (Node Package Manager)
- A database (e.g., PostgreSQL, MySQL)
- A `.env` file with configuration (example provided)

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

### Authentication Routes

#### Register User

- **URL:** `/auth/register`
- **Method:** `POST`
- **Description:** Register a new user.
- **Request Body:**
  - `username` (string): User’s username
  - `password` (string): User’s password
  - `email` (string): User’s email
  - `fullName` (string): User’s full name
- **Example Request Body:**

  ```json
  {
    "username": "newuser",
    "password": "password123",
    "email": "user@example.com",
    "fullName": "New User"
  }
  ```

- **Response:**
  - **Success (200 OK):** User registered successfully.
  - **Error (400 Bad Request):** Invalid request parameters or user already exists.

#### Login User

- **URL:** `/auth/login`
- **Method:** `POST`
- **Description:** Log in a user and obtain an access token.
- **Request Body:**
  - `username` (string): User’s username
  - `password` (string): User’s password
- **Example Request Body:**

  ```json
  {
    "username": "existinguser",
    "password": "password123"
  }
  ```

- **Response:**
  - **Success (200 OK):** User logged in successfully, and an access token is provided.
  - **Error (401 Unauthorized):** Invalid credentials.

#### Logout User

- **URL:** `/auth/logout`
- **Method:** `GET`
- **Description:** Log out the currently authenticated user.
- **Response:**
  - **Success (200 OK):** User logged out successfully.

#### Refresh Token

- **URL:** `/auth/token`
- **Method:** `POST`
- **Description:** Obtain a new JWT token after it has expired. (Optional)
- **Response:**
  - **Success (200 OK):** A new JWT token is provided.

### Other Routes

These routes require authentication via JWT token obtained from the login process.

#### User Routes

##### Get User Profile

- **URL:** `/user/profile`
- **Method:** `GET`
- **Description:** Get the user’s profile information.
- **Response:**
  - **Success (200 OK):** User profile data.
  - **Error (401 Unauthorized):** User is not authenticated.

##### Update User Profile

- **URL:** `/user/profile`
- **Method:** `PUT`
- **Description:** Update the user’s profile information.
- **Request Body (example):**

  ```json
  {
    "email": "newemail@example.com",
    "fullName": "Updated User"
  }
  ```

- **Response:**
  - **Success (200 OK):** User profile updated successfully.
  - **Error (401 Unauthorized):** User is not authenticated.

#### Product Routes

##### Get All Products

- **URL:** `/products`
- **Method:** `GET`
- **Description:** Get a list of all available products.
- **Response:**
  - **Success (200 OK):** List of products.

##### Get Product by ID

- **URL:** `/products/:id`
- **Method:** `GET`
- **Description:** Get details of a specific product by its ID.
- **Response:**
  - **Success (200 OK):** Product details.
  - **Error (404 Not Found):** Product not found.

##### Create New Product

- **URL:** `/products`
- **Method:** `POST`
- **Description:** Create a new product.
- **Request Body (example):**

  ```json
  {
    "name": "New Product",
    "description": "Product description",
    "price": 29.99
  }
  ```

- **Response:**
  - **Success (201 Created):** New product created.
  - **Error (400 Bad Request):** Invalid product data.

##### Update Product by ID

- **URL:** `/products/:id`
- **Method:** `PUT`
- **Description:** Update an existing product by its ID.
- **Request Body (example):**

  ```json
  {
    "name": "Updated Product",
    "description": "Updated description",
    "price": 39.99
  }
  ```

- **Response:**
  - **Success (200 OK):** Product updated successfully.
  - **Error (400 Bad Request):** Invalid product data.
  - **Error (404 Not Found):** Product not found.

##### Delete Product by ID

- **URL:** `/products/:id`
- **Method:** `DELETE`
- **Description:** Delete a product by its ID.
- **Response:**
  - **Success (204 No Content):** Product deleted successfully.
  - **Error (404 Not Found):** Product not found.

#### Cart Routes

##### Get User Cart

- **URL:** `/cart`
- **Method:** `GET`
- **Description:** Get the contents of the user’s shopping cart.
- **Response:**
  - **Success (200 OK):** List of cart items.

##### Add Product to Cart

- **URL:** `/cart/add/:productId`
- **Method:** `POST`
- **Description:** Add a product to the user’s shopping cart by its ID.
- **Response:**
  - **Success (200 OK):** Product added to the cart.
  - **Error (400 Bad Request):** Invalid request or product not found.

##### Update Cart Item Quantity

- **URL:** `/cart/update/:productId`
- **Method:** `PUT`
- **Description:** Update the quantity of a cart item by its product ID.
- **Request Body (example):**

  ```json
  {
    "quantity": 3
  }
  ```

- **Response:**
  - **Success (200 OK):** Cart item quantity updated.
  - **Error (400 Bad Request):** Invalid request or product not found.

##### Remove Product from Cart

- **URL:** `/cart/remove/:productId`
- **Method:** `DELETE`
- **Description:** Remove a product from the user’s shopping cart by its product ID.
- **Response:**
  - **Success (204 No Content):** Product removed from the cart.
  - **Error (404 Not Found):** Product not found.

#### Payment Routes

##### Create Payment Intent

- **URL:** `/payment/create-intent`
- **Method:** `POST`
- **Description:** Create a payment intent for the user’s cart.
- **Response:**
  - **Success (200 OK):** Payment intent created.
  - **Error (400 Bad Request):** Invalid request or cart is empty.

##### Complete Payment

- **URL:** `/payment/complete`
- **Method:** `POST`
- **Description:** Complete the payment process.
- **Request Body (example):**

  ```json
  {
    "paymentMethodId": "pm_card_visa",
    "currency": "usd"
  }
  ```

- **Response:**
  - **Success (200 OK):** Payment completed.
  - **Error (400 Bad Request):** Invalid request or payment failed.

## Todo List for ShopExpress API

### User Authentication:
- [ ] Create token-based authentication middleware.
- [ ] Add password hashing for user security.

### Product Management:
- [ ] Build CRUD endpoints for products (Create, Read, Update, Delete).
- [ ] Implement product validation to ensure data consistency.
- [ ] Create a route to fetch a specific product by its ID.

### Shopping Cart:
- [ ] Implement cart calculations for subtotal and total amounts.
- [ ] Add cart validation to handle edge cases.
- [ ] Create a checkout endpoint to finalize cart purchases.

### Payment Integration:
- [ ] Implement a payment intent creation endpoint.
- [ ] Develop a payment completion endpoint with support for different payment methods.
- [ ] Add error handling and logging for payment processes.

### Additional Features:
- [ ] Implement user profile management (update user details).
- [ ] Develop user-specific endpoints for managing past orders.
- [ ] Add product categories and filtering options.
- [ ] Implement user reviews and ratings for products.

### Testing and Quality Assurance:
- [ ] Write unit tests for API routes and functions.
- [ ] Set up automated testing workflows (e.g., using Jest or Mocha).
- [ ] Perform security testing to identify and fix vulnerabilities.
- [ ] Conduct load testing to ensure API scalability.

### Deployment and Scaling:
- [ ] Deploy the API to a production server (e.g., AWS, Heroku).
- [ ] Configure scaling options to handle increased traffic.
- [ ] Set up monitoring and alerting for server health.

### User Interface (Frontend):
- [ ] Create a user registration page with Bootstrap.
- [ ] Develop product listing and shopping cart interfaces.
- [ ] Integrate API endpoints with the frontend for a seamless user experience.

### Contributing and Version Control:
- [ ] Set up a version control system (e.g., Git) for collaborative development.
- [ ] Define contribution guidelines for external contributors.
- [ ] Review and merge pull requests from the community.

### License and Legal:
- [ ] Choose and apply an open-source license for the project.
- [ ] Ensure compliance with any legal requirements for payment processing.
