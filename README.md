## RIDE-HAILING APP (BACKEND)

A backend API for a ride-hailing service where users can register, login, view available cabs and book rides.

## Features :
1) User registration and authentication (JWT-based)
2)  View available cabs
3)  Create ride orders (pickup/drop location, cab selection)

## Tech Stack :
- Node.js
-  Express.js
- MongoDB with Mongoose
- bcryptjs for password hashing
- JSON Web Tokens (JWT)
-  Postman (for testing API endpoints)

## Folder structure :
- `/controllers` - Route handlers for users, cabs, and orders
- `/models`      - Mongoose models for User, Cab, and Order
- `/routes`      - Express routes
- `/config`      - DB connection config
- `index.js`   - Main entry point
