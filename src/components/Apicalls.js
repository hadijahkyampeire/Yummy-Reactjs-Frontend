import axios from 'axios';

/**
 * Component for handling Api calls without duplicating in each file.
 * @author [Hadijah kyampeire](https://github.com/hadijahkyampeire/Yummy_Reactjs_frontend)
 */
const axiosInstance = axios.create({
  baseURL: 'https://hadijahyummyrecipe-api.herokuapp.com/api/v1/',
  headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
});

axiosInstance.interceptors.request.use((config) => {
  if (localStorage.getItem('accessToken') && config.headers.Authorization === 'Bearer null') {
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
  }
  return config;
});

export default axiosInstance;
