// axios.js

import axios from 'axios';
const instance = axios.create({
    baseURL: 'http://localhost:3000/abhom-api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default instance;
