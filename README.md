# Railway Management System

This project is a simple railway management system that allows users to view and book train tickets. It uses **Node.js** for the backend, with **PostgreSQL** for database management.

## Prerequisites

Before running the project, make sure you have the following installed on your system:
- **Node.js** (v14 or higher)
- **npm** (Node package manager)
- **PostgreSQL** (for database management)

## Installation

- **Clone the repository:**
   ```bash
   git clone <repository_url>
   cd <repository_name>

- . **Install dependendencies:**
   ```bash
   npm install
## Set up PostgreSQL database:
- ** Create a database in PostgreSQL:**
```bash
    CREATE DATABASE railway_db;
```
** Create the necessary tables in PostgreSQL by running the SQL commands below::**
```bash
    CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(10) CHECK (role IN ('admin', 'user'))
);

CREATE TABLE trains (
    id SERIAL PRIMARY KEY,
    train_name VARCHAR(255) UNIQUE NOT NULL,
    source VARCHAR(255) NOT NULL,
    destination VARCHAR(255) NOT NULL,
    total_seats INT NOT NULL,
    available_seats INT NOT NULL
);

CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  train_id INT NOT NULL REFERENCES trains(id),
  user_id INT NOT NULL REFERENCES users(id),
  source VARCHAR(255) NOT NULL,
  destination VARCHAR(255) NOT NULL,
  seat_numbers INT[] NOT NULL,  -- Array of seat numbers
  status VARCHAR(50) DEFAULT 'booked',
  booked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

# Running the Project
* Run the server: 

    nodemon server.js 
 
**Access the application: **

http://localhost:5000 (or the port specified in your server.js file).
  

# Project Structure
- server.js: Main file to start the server and define API routes.
- models/: Contains database models and queries (optional if using an ORM).
- controllers/: Handles the business logic for the API routes (optional).
- routes/: Defines the application routes (optional).
    
    
