// Import the Express framework
const express = require("express");

// Create a new router instance
const router = express.Router();

// Import the controller functions for handling PDF actions
const { downloadPDF, generatePDF } = require("./controllers/pdf-actions.js");

// Define routes for PDF conversion and file download
router.route("/convert").post(generatePDF); // Endpoint for generating PDF from URL
router.route("/getFile/:fileName").get(downloadPDF); // Endpoint for downloading generated PDF file

// Export the router for use in other modules
module.exports = router;
