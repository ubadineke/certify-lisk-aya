# CERTIFY THE APP

## DEPLOYED SMART CONTRACT

<H3 style="color: black; background-color:grey; padding: 1rem">0x5b3808cA145Ff92190aDf242cbAD06cef5eA08da</H3>

## Table of Contents

-   [Installation](#installation)
-   [Environment Variables](#environment-variables)
-   [Running the Application](#running-the-application)
    -   [Development](#development)
    -   [Production](#production)
-   [License](#license)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/ubadineke/certify-lisk-aya.git
    cd certify-lisk-aya
    ```

2. Install the dependencies

    ```bash
    npm install
    ```

## Environment Variables

Before running the project, you need to create a .env file in the root of your project directory.

1.  Create a `.env` file:

    ```bash
    touch .env
    ```

2.  Add the following variable to the `.env` file:
    ```bash
    WALLET_KEY=your_wallet_key_here
    ```
    Replace `your_wallet_key_here` with your acutal wallet key.

## Running the Application

### Development

To run the application in development mode:

1. Ensure you have `nodemon` installed globally for auto-restarting the server when changes are made:

    ```bash
    npm install -g nodemon
    ```

2. Start the development server:

    ```bash
     npm run dev
    ```

    This command typically uses `nodemon` for atuomatically restarting the server during development.

### Production

To run the application in production mode:

1. Build the project(if applicable):

    ```bash
    npm run build
    ```

2. Start the production server:
   `bash
npm start
`
   This command runs the application with the production settings.

## MOBILE FRONTEND APP REPO

https://github.com/Immadominion/CERTIFY---THE-MVP

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
