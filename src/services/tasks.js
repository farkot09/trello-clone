import axios from 'axios'

const VITE_API_URL = import.meta.env.VITE_API_URL;

export const getTaskByUser = async (id, token) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;    
    return axios.get(`${VITE_API_URL}/tasks/user/${id}`)
}

export const createTask = async (dataTask, token) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;    
    return axios.post(`${VITE_API_URL}/tasks`, dataTask)
}

export const getTaskByBoardId = async (id, token) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return axios.get(`${VITE_API_URL}/tasks/board/${id}`)
}