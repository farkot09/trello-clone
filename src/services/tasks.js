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

export const assingTask = async (id, data, token) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return axios.patch(`${VITE_API_URL}/tasks/${id}/assign`, data)
}

export const changeStatusTask = async (id, data, token) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return axios.patch(`${VITE_API_URL}/tasks/changeStatus/${id}`, data)
}

export const getTasksAssignedByuserId = async (id, token) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return axios.get(`${VITE_API_URL}/tasks/assigned/${id}`)
}