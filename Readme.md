# Book Borrowing Application

# Overview
# The Book Borrowing Application is a web-based platform that enables users to explore and borrow books online.
# This README provides a comprehensive overview of the application, including its components, setup instructions, and usage guidelines.

## Features
# - User Sign In and Sign Up
# - Book search functionality
# - Book borrowing and bookLending
# - dashboard for all the books available to borrow
# - View books added by the user
# - View books borrowed by the user
# - User name and Tokens Available visible in the header


## Technologies Used
# - Angular: A widely-used JavaScript framework for developing the frontend.
# - ASP.NET: A robust web development framework employed for constructing the backend.
# - Database (DB) first approach: A development methodology where the database schema is designed first, and the code is generated based on the database structure.

## Prerequisites
# Before initiating the setup process for the Book Borrowing Application, ensure that you have the following prerequisites installed:
# - Node.js: Install the latest LTS version of Node.js to run Angular.
# - .NET SDK: Ensure that you have the latest .NET SDK installed to run the ASP.NET backend.
# - Microsoft SQL Server: Set up a SQL Server instance or have access to an existing SQL Server.

## Installation
# To install and configure the Book Borrowing Application, adhere to these steps

# 1. Navigate to the project directory:
#    shell
#    cd book-borrowing-app

# 2. Install the frontend dependencies:
#    shell
#    cd BookBorrowingUI
#    npm install

# 3. Install the backend dependencies:
#    shell
#    cd ../BookBorrowingBackendApi
#    dotnet restore

## Configuration
# Before launching the application, configure the database connection by following these steps:

# 1. Open the Tools section in Visual Studio -> Nuget Package Manager -> Package Manager Console.
# 2. Run the `update-database` command.

## Dependencies
# Add dependencies for UI in `package.json`:
#   - "@fortawesome/angular-fontawesome": "^0.13.0",
#   - "@fortawesome/fontawesome-svg-core": "^6.4.0",
#   - "@fortawesome/free-solid-svg-icons": "^6.4.0",
#   - "bootstrap": "^5.3.0"

## Running the Application
# To run the Book Borrowing App, follow these steps:

# 1. Start the backend server:
#    shell
#    cd BookBorrowingBackendApi
#    dotnet run

# 2. Initiate the frontend development server:
#    shell
#    cd BookBorrowingUI
#    ng serve

# The frontend development server should now be accessible at http://localhost:4200.



## Usage
# To use the Book Borrowing Application, open your web browser and navigate to http://localhost:4200. You should land on the application's homepage, where you can log in to access the full range of features and borrow books.
