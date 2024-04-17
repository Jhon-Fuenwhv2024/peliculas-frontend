import axios from 'axios';

const axiosInstance = axios.create({
    //baseURL: 'http://localhost:3001/'
    baseURL: 'https://peliculas-bk.onrender.com'
});

export {
    axiosInstance,
}