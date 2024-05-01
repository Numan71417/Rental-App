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
            // return data;
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
        console.log(formData);
        // Post form data to the API endpoint
        const response = await fetch(api+'/items/add', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            console.log('Product added successfully!');
            saveToLocal('yourProducts',formData )
            
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

export const getItemById = async(setItem, id) => {
    try {
        if (!accessToken) {
            throw new Error('Access token not found');
        }

        const response = await fetch(api + '/items/'+id, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();
            console.log("single item-------"+data);
            setItem(data[0])
            // return data;
        } else {
            console.log('Error:', response.statusText);
            throw new Error('Failed to fetch items');
        }
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to fetch items');
    }
}