import axios from 'axios';
import Cookies from 'js-cookie';

// Flag to prevent further requests after logout
let isLoggedOut = false;

// Function to refresh access token
const refreshAccessToken = async () => {
  try {
    const refreshToken = Cookies.get('refreshToken');
    const response = await axios.post(`http://localhost:5000/refresh-token`, { refreshToken });
    const newAccessToken = response.data.accessToken;
    
    // Set the new access token as a cookie
    Cookies.set('jwt', newAccessToken);
    
    // Update the header for the next request
    axios.defaults.headers['Authorization'] = `Bearer ${newAccessToken}`;
    
    return newAccessToken;
  } catch (error) {
    console.error("Failed to refresh access token:", error);
    await handleLogout(); // Handle logout if refresh token fails
  }
};

// Request interceptor to add JWT token to headers
axios.interceptors.request.use(
  (config) => {
    const token = Cookies.get('jwt');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('[Request Error]', error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401 errors (token expiration)
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401 && !isLoggedOut) {
      isLoggedOut = true; // Prevent further requests

      // Try to refresh the access token
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        isLoggedOut = false; // Reset logout flag after refreshing
        return axios(error.config); // Retry the original request
      }
    }
    return Promise.reject(error);
  }
);

// Logout function
const handleLogout = async () => {
  try {
    await axios.post(`http://localhost:5000/logout`);
    // Remove cookies and local storage data
    Cookies.remove("jwt");
    Cookies.remove("refreshToken"); // Make sure to remove refresh token
    localStorage.removeItem("role");
    localStorage.removeItem("uid");

    // Redirect to login page only if not already redirected
    if (window.location.pathname !== "/login") {
      window.location.href = "/login";
    }
  } catch (error) {
    console.error("Logout error:", error);
    isLoggedOut = false; 
  }
};

export default axios;
