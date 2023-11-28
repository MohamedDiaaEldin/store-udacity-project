# Store Backend API Setup Guide

This guide provides step-by-step instructions to use store backend API,  and understand the API endpoints along with the database schema.

## Server Setup

The server's entry point is `index.ts`, running on the loopback IP address on port 5000. The PostgreSQL database server operates on port 5432.

## API Endpoints

### Authentication

- `POST /login`
- `GET /logout`

### Products

- `GET /products`: Retrieves all products (Index)
- `GET /products/:id`: Retrieves a specific product by ID (Show)
- `POST /products`: Adds a new product (Create) [Token Required]

### Users (Customers)

- `GET /customers`: Retrieves all customers (Index) [Token Required]
- `GET /customers/:id`: Retrieves a specific customer by ID (Show) [Token Required]
- `POST /customers`: Adds a new customer (Create) [Token Required]

### Orders

- `GET /orders/:user_id`: Retrieves orders for a specific user (Show) [Token Required]
- `POST /orders`: Creates a new order (Create) [Token Required]



## Database Schema

### Customer Table

- `id`: integer (Primary Key)
- `first_name`: varchar(30)
- `last_name`: varchar(30)
- `password`: varchar(150)

### Products Table

- `id`: integer (Primary Key)
- `name`: varchar(100)
- `price`: double

### Orders Table

- `id`: integer (Primary Key)
- `customer`: customer_id (Foreign Key)

### Orders and Products Relation

- `id`: integer (Primary Key)
- `quantity`: integer
- `order_id`: integer (Foreign Key)
- `product_id`: integer (Foreign Key)

## Environment Variables Used
```
PGHOST=IP 
PGUSER=user_name PGDATABASE=store PGDATABASETEST=store_test PGPASSWORD=password 
PGPORT=5432

