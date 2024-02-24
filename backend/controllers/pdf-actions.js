// Load environment variables from .env file
require("dotenv").config();

// Import required modules
const express = require("express");
const convertapi = require("convertapi")(process.env.APP_CONVERTAPI_SECRET_ID);
const path = require("path");

// Function to generate PDF from provided URL
const generatePDF = async (req, res) => {
  try {
    let { url } = req.body; // Extract URL from request body
    let fileName = Date.now(); // Generate a unique file name based on current timestamp
    // Convert URL to PDF using ConvertAPI
    let result = await convertapi
      .convert(
        "pdf",
        {
          Url: url,
          PageRange: "1-2",
          ConversionDelay: "2",
          LoadLazyContent: "true",
          ViewportWidth: "1800",
          ViewportHeight: "2200",
          Scale: "80",
          Timeout:"800"
        },
        "web"
      )
      .then(async function (result) {
        // Save the generated PDF file
        const resp = await result
          .saveFiles(`./public/${fileName}.pdf`)
          .then((res) => {
            return "resp"; // Return a response indicating success
          });
        return "done2"; // Return a response indicating success
      })
      .catch((error) => {
        throw Error(error); // Throw an error to be caught by the catch block
      });
    res.json({ status: "success", fileName }); // Respond with success status and generated file name
  } catch (error) {
    return res.json({ status: "error", message: error.message }); // Respond with error status and error message
  }
};

// Function to download generated PDF file
const downloadPDF = (req, res) => {
  try {
    const pdfPath = path.join(__dirname, "../public", req.params.fileName); // Construct path to the PDF file
    res.download(pdfPath); // Download the PDF file
  } catch (error) {
    res.send("some error occured");
  }
};

// Export functions for use in other modules
module.exports = { generatePDF, downloadPDF };
