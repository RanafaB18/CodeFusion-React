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
1. cd CodeFusion-React
2. cd frontend
3. npm install
4. npm run dev
5. Visit the link in a web browser to view the application. Link will be of the form http://localhost:<PORT>

In the following code snippet of ./src/context/RoomContext.jsx,
const socket = io('http://localhost:<PORT>');
and in ./src/services.js
change the baseUrl and rootUrl to reflect your localhost.

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

## Start signaling server
To start the signalling server:
1. cd y-webtrc
2. npm install
3. Run PORT=4444 node ./bin/server.js in the commandline
In the ./src/components/PermissionModal.jsx file of the frontend, specify your localhost as a signalling server.
For example,
```javascript
const provider = new WebrtcProvider('your-room-name', ydoc, { signaling: ['wss://y-webrtc-production-2501.up.railway.app', 'ws://localhost:4444'] })
```

## Acknowledgements
This application, both frontend and backend was developed as a final year project by Baba Abdul-Raziq and Boateng Kofi Frimpong. Special thanks to Dr. Dominic Asamoah for his dearest supervision.
