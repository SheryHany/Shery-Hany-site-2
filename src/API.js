import axios from 'axios';
import { Helper } from './Helper';


axios.defaults.baseURL = 'http://localhost:3001';
axios.defaults.headers.post['Content-Type'] = 'application/json';


export const login = async (userCredentials, history) => {
    const token = await axios.post('/users/login', userCredentials);
    debugger;
    localStorage.setItem('AwesomeReads', token.data);
    history.push('/');
}

export const signup = async (user, history) => {
    debugger;
    const token = await axios.post('/users/', user, { headers: { 'content-type': 'multipart/form-data' } });
    localStorage.setItem('AwesomeReads', token.data);
    history.push('/');
}



export const getUserInfo = async () => {
    const res = await axios.get('/users/', { headers: { "Authorization": `Bearer ${localStorage.getItem('AwesomeReads')}` } });
    debugger;
    const user = res.data;
    let photo;
    if (user.photo !== null) {
        const stringPhoto = Helper.arrayBufferToBase64(user.photo.data);
        photo = `data:${user.photo.contentType};base64,${stringPhoto}`;
    } else {
        photo = null;
    }
    return { ...res.data, photo: photo };
}
