import { api, getAccessToken, getUserID } from ".";
import { saveToLocal } from "./savetoLocal";


const token = getAccessToken();
const userId = getUserID();

export const getUser = async () => {
    try {
        const id = getUserID();
        const accessToken = getAccessToken();
        if (!accessToken) {
            throw new Error('Access token not found');
        }

        const response = await fetch(api + '/users/' + id, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data[0]);
            saveToLocal('userData', data[0])
            // return data[0];
        } else {
            console.log('Error:', response.statusText);
            throw new Error('Failed to fetch users');
        }
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to fetch users');
    }
};

export const updateUser = async ( newData) => {
    try {

        if (!token) {
            throw new Error('Access token not found');
        }

        const response = await fetch(api + '/users/edit/' + userId, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newData)
        });

        if (response.ok) {
            const updatedData = await response.json();
            console.log('User updated:', updatedData);
            getUser()
            return updatedData;
        } else {
            console.log('Error:', response.statusText);
            throw new Error('Failed to update user');
        }
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to update user');
    }
};

export const becomeMerchant = async (newData) => {
    try {

        if (!token) {
            throw new Error('Access token not found');
        }

        const response = await fetch(api + '/users/merchant/' + userId, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newData)
        });

        if (response.ok) {
            // const updatedData = await response.json();
            console.log('User updated to merchant');
            getUser()
        } else {
            console.log('Error:', response.statusText);
            throw new Error('Failed to update user');
        }
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to update user');
    }
};

// export function getUserData() {
//     const userDataJSON = localStorage.getItem('userData');
//     var obj ={};
//     if (userDataJSON) {
//         obj = JSON.parse(userDataJSON);
//         return obj;
//     } else {
//         return {}; 
//     }
// }


