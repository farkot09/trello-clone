import axios from 'axios'

const VITE_API_URL = import.meta.env.VITE_API_URL;

export const getBoardsByUserId = async (id, token) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;    
    return axios.get(`${VITE_API_URL}/board/user/${id}`)
}