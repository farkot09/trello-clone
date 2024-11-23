import axios from 'axios'

const VITE_API_URL = import.meta.env.VITE_API_URL;

export const getUserByEmail = async (email, token) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;    
    return axios.get(`${VITE_API_URL}/users/email/${email}`)
}

export const getUserById = async (id, token) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;    
    return axios.get(`${VITE_API_URL}/users/${id}`)
}