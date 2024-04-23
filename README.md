
# A-Z Rental Platform

Welcome to A-Z Rental Platform! This platform is built using Express.js, MySQL, and React, offering a comprehensive solution for managing rental listings.

## Setup

Follow these steps to set up and run the A-Z Rental Platform locally:

### Prerequisites

- Node.js and npm installed on your machine
- MySQL installed and running locally

### Installation

1. Clone the repository to your local machine:

   ```
   git clone https://github.com/Numan71417/Rental-App.git
   ```

2. Navigate to the project directory:

   ```
   cd Rental-App
   ```

3. Install dependencies for both the server and client:

   ```
   cd server
   npm install
   
   cd ../client
   npm install
   ```

4. Set up MySQL database:

   - Create a new MySQL database for the project.
   - Import the database schema from `server/database/schema.sql`.

5. Configure environment variables:

   - Create a `.env` file in the `server` directory.
   - Define the following environment variables in the `.env` file:
     ```
     PORT=3001
     DB_HOST=localhost
     DB_USER=<your-mysql-username>
     DB_PASSWORD=<your-mysql-password>
     DB_NAME=<your-mysql-database-name>
     ```

### Running the Application

1. Start the Express server:

   ```
   cd server
   npm run dev
   ```

2. Start the React client:

   ```
   cd client
   npm run dev
   ```

3. Access the application in your web browser at `http://localhost:5173`.

## Usage

The A-Z Rental Platform allows users to:

- View available rental listings
- Search for specific listings by location, price, etc.
- Add new rental listings
- Edit existing rental listings
- Delete rental listings

To use the application locally:

1. Register for an account or log in if you already have one.
2. Browse available rental listings on the homepage.
3. Use the search functionality to filter listings based on your preferences.
4. Add new listings by navigating to the "Add Listing" page.
5. Edit or delete existing listings from the "My Listings" page.
6. Log out when finished using the application.


