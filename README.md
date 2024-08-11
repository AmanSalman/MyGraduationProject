# Curious Minds World - Graduation Project

## Project Overview

**Curious Minds World** is a custom software solution developed for a local small business to streamline their inventory management process and significantly improve efficiency. The project includes a comprehensive system for managing inventory, purchasing books, and an admin dashboard for overseeing operations.

## Table of Contents

- [Project Description](#project-description)
- [Technologies Used](#technologies-used)
- [Folder Structure](#folder-structure)
- [Installation Instructions](#installation-instructions)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Project Description

Our graduation project involves the development of a custom software solution aimed at enhancing the efficiency of a local small business's inventory management system. The key objectives were to:

- Streamline the inventory management process
- Improve the efficiency of book purchasing
- Provide a robust admin dashboard for managing operations

## Technologies Used

- **Frontend:** React, React Native, Bootstrap, HTML, CSS, JavaScript, Redux Toolkit
- **Backend:** Node.js, Mongoose, MongoDB, Express.js
- **Deployment:** Render
- **Version Control:** GitHub
- **API Testing:** Postman
- **Development Environment:** Visual Studio Code

## Folder Structure

- **`BackEndSide/`**: Contains the backend code including server setup, API routes, and database models.
- **`Dashboard/`**: Contains the code for the admin dashboard used for managing inventory and overseeing operations.
- **`FrontEndSide/`**: Contains the frontend code including user interfaces, components, and styles.

## Installation Instructions

1. **Clone the Repository:**

    ```bash
    git clone https://github.com/AmanSalman/MyGraduationProject.git
    ```

2. **Navigate to the Project Directory:**

    ```bash
    cd MyGraduationProject
    ```

3. **Install Dependencies:**

    For the backend:

    ```bash
    cd BackEndSide
    npm install
    ```

    For the frontend:

    ```bash
    cd ../FrontEndSide
    npm install
    ```

4. **Set Up Environment Variables:**

    Create a `.env` file in the `BackEndSide` directory and add your environment variables. Refer to `.env.example` for the required variables.

5. **Start the Development Servers:**

    For the backend:

    ```bash
    cd BackEndSide
    npm run dev
    ```

    For the frontend:

    ```bash
    cd ../FrontEndSide
    npm run start 
    ```

   For the Dashboard:

    ```bash
    cd ../Dashboard
    npm run dev 
    ``` 

## Usage

Once the servers are running, The backend services will be available at `http://localhost:3000`. The admin dashboard can be accessed from `http://localhost:5173`.

