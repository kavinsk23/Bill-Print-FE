import axios from 'axios';

const API_URL = `http://localhost:8080/api/v1/auth`;

const SignUp = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        const { token } = response.data;
        if (token) {
            localStorage.setItem('accessToken', token);
        }
        return response.data; 
    } catch (error) {
        console.error('Error during registration:', error.response ? error.response.data : error.message);
        throw error; 
    }
};

const SignIn = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/authenticate`, userData);
        const { token } = response.data;
        if (token) {
            localStorage.setItem('accessToken', token);
        }
        return response.data; 
    } catch (error) {
        console.error('Error during sign-in:', error.response ? error.response.data : error.message);
        throw error; 
    }
};

export { SignIn, SignUp };
