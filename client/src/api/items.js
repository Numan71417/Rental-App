import { api, getAccessToken } from ".";
import { saveToLocal } from "./savetoLocal";


const accessToken = getAccessToken();

export const getAllItems = async (setItems) => {
    try {
        if (!accessToken) {
            throw new Error('Access token not found');
        }

        const response = await fetch(api + '/items', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            setItems(data)
            return data;
        } else {
            console.log('Error:', response.statusText);
            throw new Error('Failed to fetch items');
        }
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to fetch items');
    }
};

export const addItems = async (formData)=>{
    try {

        // Post form data to the API endpoint
        const response = await fetch(api+'/items/', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            console.log('Product added successfully!');
            saveToLocal('yourProducts',formData )
            window.location.href = '/shop'
            return true
        } else {
            console.error('Error:', response.statusText);
            throw new Error('Failed to add product');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to add product. Please try again.');
    }
}
