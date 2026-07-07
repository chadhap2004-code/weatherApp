import axios from "axios";

const api = axios.create({
    baseURL :  'https://api.openweathermap.org/data/2.5',
    timeout: 8000,
});

api.interceptors.request.use(
    config => {
        console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
        return config;
    }
);

api.interceptors.response.use(
    response => 
        response , error => {
            if(error.response?.status === 404){
                error.message = 'CIty not found. Please check the spelling.';
            } else if (error.response?.status === 401){
                error.message = 'Invalid API key';
            } else if(error.code === 'ECONNABORTED'){
                 error.message = 'Request timed out. Check your connection.';
            } else if (!error.response) {
      error.message = 'Network error. Check your connection.';
    }
         return Promise.reject(error);
        }
);

export default api;