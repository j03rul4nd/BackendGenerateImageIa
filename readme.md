# **Backend Project for AI Image Generation**

This project is a backend that receives a prompt from a webpage, consumes an artificial intelligence API to generate an image based on the provided prompt, and returns the generated image to the frontend for display.

## **Description**

The backend is built with Node.js and uses Express to handle HTTP requests and WebSocket for real-time communication with the frontend. The artificial intelligence API used is Replicate, which allows generating images based on user-provided prompts.

## **Requirements**

- Node.js (v14 or higher)
- npm (v6 or higher)

## **Installation**

1. Clone the repository:
    
    ```bash
    git clone https://github.com/j03rul4nd/BackendGenerateImageIa.git
    cd your-repo
    ```
    
2. Install the dependencies:
    
    ```bash
    npm install
    ```
    
3. Create a **`.env`** file in the root of the project and add your Replicate access token:
    
    ```makefile
    REPLICATE_AUTH_TOKEN=your_replicate_token
    ```
    

## **Usage**

1. Start the server:
    
    ```bash
    npm start
    ```
    
2. The server will be listening on port 3000 (or the port configured in your **`.env`** file).
3. Send a prompt from the frontend via WebSocket and receive the image generated by the Replicate API.

## **Dependencies**

This project uses several key dependencies for its functionality. Below are the dependencies used and their purposes:

- **express**: Node.js framework for building web applications and APIs.
- **ws**: WebSocket library, used for real-time communication between the frontend and backend.
- **replicate**: Client for interacting with the Replicate API, used for generating images based on prompts.
- **dotenv**: Library for loading environment variables from a **`.env`** file.