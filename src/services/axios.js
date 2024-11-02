import axios from 'axios';

// Create an Axios instance
const apiClient = axios.create({
    // baseURL: 'https://cqnrvtvw-7073.uks1.devtunnels.ms',
    baseURL: 'https://cqnrvtvw-7073.uks1.devtunnels.ms', // Replace with your API's base URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the token in every request
apiClient.interceptors.request.use(
    (config) => {
        // Retrieve the token from localStorage or Vuex store
        const token = localStorage.getItem('token'); // or from Vuex store, wherever the token is stored

        if (token) {
            // If token exists, attach it to the Authorization header
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        // Handle any error that occurs during the request setup
        return Promise.reject(error);
    }
);

export default apiClient;