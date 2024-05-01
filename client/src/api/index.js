import { saveToLocal } from "./savetoLocal";

export const api = "http://localhost:5000/api/v1"
// export const api = "https://rental-app-api.vercel.app/api/v1"



export function registerUser(userData) {

    fetch(api+'/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => {
        if (response.ok) {

            // localStorage.setItem('userData', JSON.stringify(userData));
            saveToLocal('userData', userData )
            console.log("registered");
           
            return userData
        } else {
            throw new Error('Failed to register user');
        }
    })
    .catch(error => {
        console.error('Error registering user:', error);
    });
}

export function loginUser(email, password) {
    // Define the login credentials
    const loginData = {
        email: email,
        password: password
    };

    // Make a POST request to the login API endpoint
    fetch(api+'/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    })
    .then(response => {
        if (response.ok) {
            // Parse the JSON response to get the token
            return response.json();
        } else {
            throw new Error('Login failed. Please check your email and password.');
        }
    })
    .then(data => {
        // Save the token to localStorage
        localStorage.setItem('accessToken', data.token);
        localStorage.setItem('userId', data.userId);
        console.log(data.token);
        // Redirect to dashboard or home page after successful login
        window.location.href = '/';
    })
    .catch(error => {
        console.error('Error logging in:', error);
        // Display error message to the user
        alert('Error logging in. Please try again.');
    });
}


export function getAccessToken() {

    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
        return accessToken;
    } else {
        return null;
    }
}

export function getUserID() {

    const userID = localStorage.getItem('userId');

    if (userID) {
        return userID;
    } else {
        return null;
    }
}

export const logout = ()=>{
    localStorage.clear();
    window.location.href = '/signin'; 
}


