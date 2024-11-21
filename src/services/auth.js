import axios from 'axios'

const VITE_API_URL = import.meta.env.VITE_API_URL;

export const register = async (userData) => {
    return axios.post(`${VITE_API_URL}/auth/register`, userData)
}

export const login = async (userData) => {
    return axios.post(`${VITE_API_URL}/auth/login`, userData)
}
