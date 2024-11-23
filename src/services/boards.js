import axios from 'axios'

const VITE_API_URL = import.meta.env.VITE_API_URL;

export const getBoardsByUserId = async (id, token) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;    
    return axios.get(`${VITE_API_URL}/board/user/${id}`)
}

export const getBoardById = async (id, token) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;    
    return axios.get(`${VITE_API_URL}/board/${id}`)
}

export const createBoard = async (data, token) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;    
    return axios.post(`${VITE_API_URL}/board`, data)
}

export const assingUserToBoard = async (id, data, token) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;    
    return axios.patch(`${VITE_API_URL}/board/${id}`, data)
}