import axios from 'axios';
import Cookies from 'js-cookie';

axios.interceptors.request.use(
  (config) => {
    const token = Cookies.get('jwt');
    if (token) {
      // config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA0OTA1YzgyLTdlY2MtNDVjZS1hNTMyLTJlYTNlN2YzYzY0NCIsImlhdCI6MTcyNzA4OTAzNSwiZXhwIjoxNzI3MTEwNjM1fQ.jEBzXW8iz1p9X_QIXR04csL2e3elkUn4NPBbNjOA9zs`;
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('[Request Error]', error);
    return Promise.reject(error);
  }
);

export default axios;
// login HOC and interceptor