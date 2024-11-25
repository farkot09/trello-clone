import axios from 'axios'

const VITE_API_URL = import.meta.env.VITE_API_URL;

export const getCommentsByTask = async (task_id, token) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;    
    return axios.get(`${VITE_API_URL}/comments/${task_id}/comments`)
}

export const createComment = async (dataComment, token) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;  
    console.log(dataComment);   // for debugging purposes, remove before production  
    return axios.post(`${VITE_API_URL}/comments`, dataComment)
}
