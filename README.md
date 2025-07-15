URL Shortener App — Afford Medical Assessment Project
This is a simple React-based URL Shortener application built as part of the Afford Medical Technologies Online Assessment.

Users can enter a long URL, optionally provide a custom short code, and get a shortened version of the link.

It also includes a custom Logging Middleware that logs important events (info, errors, etc.) to the evaluation server using the provided token.

Features
Enter any valid long URL

 Optional custom short code

 Generates a working short URL

 Error handling (invalid URL / server down)

 Logging middleware that logs actions like:

Button click

API success

API failure

Server error

Tech Stack Used
React.js (Frontend)

Material UI (for styling)

JavaScript (ES6)

Fetch API for backend integration


How to Run This Project Locally
Clone this repo or copy the code files.

Install dependencies:

nginx
Copy
Edit
npm install
Start the development server:

sql
Copy
Edit
npm start
Open in browser:

arduino
Copy
Edit
http://localhost:3000


Logging Middleware (Important)
This project includes a reusable logging function called logEvent that sends logs to Afford’s test server.

Each time something meaningful happens (like user clicking button, getting success, or an error occurs), this log is sent via a POST request.



 Logs are sent to:
POST http://20.244.56.144/evaluation-service/logs
Example 
logEvent("frontend", "info", "api", "User clicked shorten button");
It helps monitor application behavior & is part of the evaluation criteria.

Your provided API server is down
