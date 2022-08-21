import axios from 'axios';

const baseUrl = 'http://localhost:5000'
const access_token = localStorage.getItem('access_token')
//const baseUrl = process.env.URL_AUTH_API


const API = axios.create({
    baseURL: baseUrl,
    headers:{'authorization': `Bearer ${access_token}`}
})

export default API