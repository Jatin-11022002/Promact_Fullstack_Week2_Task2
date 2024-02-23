// Load environment variables from .env file
require("dotenv").config();

// Import required modules
const express = require("express");
var cors = require("cors");
const app = express();
const path = require("path");
const router = require("./routes");

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// Parse URL-encoded requests with extended options
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Mount the router middleware for handling routes
app.use("/", router);

// Start the server, listening on the specified port or defaulting to port 8000
app.listen(process.env.APP_PORT || 8000, () => {
  console.log("SERVER STARTED");
});
