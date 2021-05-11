import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:9000/user_api'
});

export const createUser = (payload:any) => api.post('/create', payload);
export const authUser = (payload:any) => api.post('/auth', payload);
export const getUserByName = (username:String) => api.get(`/${username}`);
export const deleteUser = (username:String) => api.delete(`/${username}`);

const apis = {
    createUser,
    getUserByName,
    deleteUser,
    authUser
};

export default apis;