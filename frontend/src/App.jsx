import React, { useEffect, useState } from "react";
import "./App.css"; // Import your CSS file for styling
import { ThreeDots } from "react-loader-spinner"; // Import loader spinner component
import { ToastContainer, toast } from "react-toastify"; // Import toast notifications component
import "react-toastify/dist/ReactToastify.css"; // Import toast notifications styles
import axios from "axios"; // Import Axios for making HTTP requests

function App() {
  // State variables to manage URL input, PDF URL, loading status, and download URL
  const [url, setUrl] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");
  const backend_url = import.meta.env.VITE_BACKEND_URL; // Backend URL obtained from environment variable

  // useEffect hook to generate PDF when loading state changes
  useEffect(() => {
    if (loading) {
      generatePdf();
    }
  }, [loading]);

  // useEffect hook to download PDF when pdfUrl state changes
  useEffect(() => {
    if (pdfUrl === "") return;
    downloadPdf();
  }, [pdfUrl]);

  // Function to validate URL format
  const isValidUrl = (url) => {
    const urlPattern =
      /^(https?):\/\/(?:www\.)?([a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})+)(\/[^ "]+)?$/;

    if (!url) {
      return "URL is required.";
    }

    const match = url.match(urlPattern);
    if (!match) {
      return "Please enter a valid URL starting with 'http://' or 'https://'.";
    }

    const protocol = match[1];
    const domain = match[2];
    const path = match[3] || "";

    if (protocol !== "http" && protocol !== "https") {
      return "Unsupported protocol. Please enter a URL starting with 'http://' or 'https://'.";
    }

    if (domain.length > 255) {
      return "Domain name is too long.";
    }

    if (path.length > 0 && !path.startsWith("/")) {
      return "Invalid path format. Path must start with a forward slash.";
    }

    return "valid";
  };

  // Function to generate PDF from URL
  const generatePdf = async () => {
    try {
      // Validate URL
      const isValidUrlMessage = isValidUrl(url);
      if (isValidUrlMessage !== "valid") {
        toast.error(isValidUrlMessage);
        setPdfUrl("");
        return;
      }
      // Make POST request to backend to generate PDF
      const { data } = await axios.post(`${backend_url}/convert`, { url });
      const { status, message, fileName } = data;
      if (status === "error") {
        throw Error(message);
      } else {
        // Render generated PDF
        renderPdf(fileName);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  // Function to render PDF
  const renderPdf = async (fileName) => {
    try {
      const pdfUrl = `${backend_url}/${fileName}.pdf`;
      setPdfUrl(pdfUrl); // Set PDF URL state
    } catch (error) {
      toast.error(error);
    }
  };

  // Function to download PDF
  const downloadPdf = async () => {
    try {
      const urlObj = new URL(pdfUrl);
      const fileUrl = `${urlObj.origin}/getFile${urlObj.pathname}`;
      setDownloadUrl(fileUrl); // Set download URL state
      return fileUrl;
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      {/* Toast container for displaying notifications */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {/* Main wrapper */}
      <div className="wrapper">
        {/* Header */}
        <div className="head-wrapper">
          <h1>Web To PDF</h1>
        </div>
        {/* Main container */}
        <div className="container">
          {/* Input column */}
          <div className="input-column">
            <h2>Website URL</h2>
            {/* Input field for entering URL */}
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter URL"
              className="url-input"
            />
            {/* Button to generate PDF */}
            <button
              onClick={() => setLoading(true)}
              className={loading ? "disabled btn" : "btn"}
            >
              Generate PDF
            </button>
            {/* Button to download PDF */}
            {downloadUrl && !loading ? (
              <a href={downloadUrl} className="btn-link">
                <button className="btn" disabled={loading}>
                  Download
                </button>
              </a>
            ) : (
              ""
            )}
          </div>
          {/* PDF column */}
          <div className="pdf-column">
            {/* Loader spinner while loading */}
            {loading ? (
              <ThreeDots
                height="100"
                width="100"
                radius="9"
                color="white"
                wrapperClass={"spinner"}
                secondaryColor="black"
              />
            ) : pdfUrl ? (
              /* Display PDF in iframe */
              <iframe
                title="Generated PDF"
                src={pdfUrl}
                className="pdf-preview"
              ></iframe>
            ) : (
              /* Placeholder text when no PDF generated */
              <h1 className="placeholder">Nothing To Display</h1>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
