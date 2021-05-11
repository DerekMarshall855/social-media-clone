import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:9000/post_api'
});

export const createPost = (payload:any) => api.post('/create', payload);
export const searchPostContent = (message:String) => api.get(`/search/message/${message}`);
export const searchPostUser = (username:String) => api.get(`/search/name/${username}`);
export const getAllPosts = () => api.get(`/search/all`);
export const getAllComments = (id:String) => api.get(`/search/comments/${id}`);
export const deleteUser = (id:String) => api.delete(`/delete/${id}`);
export const editPost = (id:String, payload:any) => api.put(`/edit/${id}`, payload)

const apis = {
    createPost,
    searchPostContent,
    searchPostUser,
    getAllPosts,
    getAllComments,
    deleteUser,
    editPost
};

export default apis;