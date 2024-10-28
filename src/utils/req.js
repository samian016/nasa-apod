
const axios = require('axios');

/**
 * Function to make an HTTP request using Axios.
 * 
 * @param {string} method - HTTP method (GET, POST, PUT, DELETE, etc.).
 * @param {string} url - URL of the endpoint.
 * @param {object} data - Data to be sent in the request body (for POST and PUT requests).
 * @param {object} headers - Custom headers for the request.
 * @returns {Promise} - Promise object representing the HTTP request.
 */
async function request(method = 'GET', url, data = null, headers = {}) {
  try {
    const response = await axios({
      method: method,
      url: url,
      data: data,
      headers: headers
    });

    return response.data;
  } catch (error) {
    // Handle error
    console.error('Error in backend request:', error);
    throw error;
  }
}

// Export the backendRequest function
module.exports = request;
