# Project Setup Guide

## Overview

This guide provides step-by-step instructions to set up the project, run the server, execute tests, understand project requirements, and review highlighted changes.

## Database Setup

Setting up the PostgreSQL database:

1. **Using PostgreSQL Docker Container locally:**

    ```bash
    ./scripts/run_postgresql_docker.sh
    ```

2. **Creating Test Database:**

    ```sql
    CREATE DATABASE store_test ;

    OR         
    CREATE USER mohamed SUPERUSER WITH PASSWORD '123';                   
    CREATE DATABASE store ;
    CREATE DATABASE store_test ;
    ```

## Docker Image for the Project

- Run the Docker image containing Node.js, NVM, and NPM installed under the user 'mohamed'.

    ```bash
    ./scripts/run_nodedev_docker.sh
    ```

- Install Node modules using npm.

    ```bash
    ./scripts/install_container_modules.sh
    ```
## Tools

The project utilizes several tools, libraries, and frameworks to enhance development and functionality:

### TypeScript

- **Purpose:** Superset of JavaScript that adds static typing.
- **Usage:** Used for strong typing and improved tooling support, enhancing code reliability and scalability.

### Express.js

- **Purpose:** Web application framework for Node.js.
- **Usage:** Used as the backend framework for building APIs and web applications.

### PostgreSQL

- **Purpose:** Relational database management system.
- **Usage:** Used to store and manage project-related data, providing a robust and scalable database solution.

### Bcrypt

- **Purpose:** Password hashing library.
- **Usage:** Utilized for securely hashing passwords, enhancing security measures in user authentication within the project.

### Jasmine

- **Purpose:** Behavior-driven development (BDD) testing framework for JavaScript.
- **Usage:** Employed for writing and running tests in a BDD style, ensuring the reliability and correctness of the codebase.


## Running the Server

- Run database migrations and start the server.

    ```bash
    ./scripts/run.sh
    ```

- Execute unit tests using npm.

    ```bash
    npm run test
    ```

- Use the [store.postman_collection](./store.postman_collection_v3.json) to test endpoints locally.

## Project Requirements

Detailed project requirements and database design are available in:

- [REQUIREMENTS.md](./REQUIREMENTS.md)
- [database-design](./database-design/)
