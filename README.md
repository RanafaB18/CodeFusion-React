# Collaborative code and text editor for pair programming
An online platform that provides a real-time code and text editor to enhance pair programming and promote cooperation and

## Prerequisites
Before you begin, ensure you have met the following requirements:
- You have Node 16.18.1 or higher installed
- You have a Windows, Linux or macOS machine
- Web browser to view the application

## Setting up the Frontend
To start the frontend, follow these steps:
On the terminal, run:
```bash
cd CodeFusion-React
cd frontend
npm install
npm run dev
```
5. Visit the link in a web browser to view the application. Link will be of the form `http://localhost:<PORT>`

In the following code snippet of ./src/context/RoomContext.jsx,
```javascript
const socket = io('http://localhost:<PORT>');
```
and in `./src/services.js`
change the `baseUrl` and `rootUrl` to reflect your localhost.

## Setting up the Backend
To start the frontend, follow these steps:
On the terminal, run:
```bash
cd CodeFusion-React
cd backend
npm install
npm run dev
```
In the following code snippet of index.js, change the value of `origin`
to your localhost.
```javascript
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:<PORT>'
    }
})
```
