const axios = require("axios");
const { log } = require("./utils"); // Adjust the path as necessary
const settings = require("./config/config");

const urlChecking = "https://raw.githubusercontent.com/zainarain279/APIs-checking/refs/heads/main/endpoints.json";

async function checkBaseUrl() {
  console.log("Checking API...".blue);
  
  if (settings.ADVANCED_ANTI_DETECTION) {
    const result = await getBaseApi(urlChecking);
    if (result.endpoint) {
      log("No change in API!", "success");
      console.log("Message from API:", result.message); // Print the message from API
      return result;
    }
  } else {
    return {
      endpoint: settings.BASE_URL,
      message: "No additional message available."
    };
  }
}

async function getBaseApi(url) {
  try {
    const response = await axios.get(url);
    const content = response.data;
    
    if (content?.magic) {
      return { 
        endpoint: content.magic, 
        message: content.message || "No message provided." // Print message from JSON
      };
    } else {
      return { 
        endpoint: null, 
        message: "No valid API found." 
      };
    }
  } catch (e) {
    return { 
      endpoint: null, 
      message: "Error fetching API data." 
    };
  }
}

module.exports = { checkBaseUrl };