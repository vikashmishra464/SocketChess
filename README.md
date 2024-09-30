# SocketChess
ChessMate is a real-time multiplayer chess game built with Node.js, Socket.io, and Chess.js. Two players can compete while others join as spectators. The game validates moves, ensuring fair play, and updates the board in real time. With a responsive, user-friendly UI, it offers seamless gameplay on both desktop and mobile devices.

ChessMate
A real-time multiplayer chess game built using Node.js, Socket.io, and Express.js. Two players can connect to the game, while additional users can watch as spectators.

Table of Contents
Features
Tech Stack
Setup and Installation
How to Play
Contributing
License
Features
Real-time gameplay: Two players can connect and play in real time.
Spectator mode: Additional users can join as spectators.
Move validation: Moves are validated using the chess.js library.
Responsive UI: Frontend is styled to fit both desktop and mobile screens.
Tech Stack
Backend: Node.js, Express.js, Socket.io, Chess.js
Frontend: HTML, CSS, JavaScript
Views: EJS (can be converted to HTML for static deployment)
WebSocket Communication: Real-time data exchange using Socket.io
Setup and Installation
To run this project locally, follow these steps:

Clone the repository:

git clone https://github.com/vikashmishra464/SocketChess.git

Navigate to the project directory:


cd ChessMate

Install dependencies:


npm install

Run the development server:

node app.js

Open your browser and go to http://localhost:3000 to view the app.

Follow these steps to contribute:

Fork the repository.
Create a new branch (git checkout -b feature-branch).
Commit your changes (git commit -m 'Add some feature').
Push to the branch (git push origin feature-branch).
Open a pull request.
License
This project is licensed under the MIT License - see the LICENSE file for details.
