import { toast } from "react-toastify";
import { api, getAccessToken, getUserID } from ".";

const accessToken = getAccessToken();
const userID = getUserID();

export const rentProduct = async(rentData) =>{
    try {
        console.log(rentData);
        const response = await fetch(api+'/rentals/add', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(rentData)
        });

        if (response.ok) {
            toast.success("Product is rented Successfully")
            return true
        } else {
            console.error('Error:', response.statusText);
            throw new Error('Failed to rent product');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to rent product. Please try again.');
    }
}



export const getAllRentals = async () => {
    try {
        if (!accessToken) {
            throw new Error('Access token not found');
        }

        const response = await fetch(api + '/rentals/', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();
            // console.log("all Rentals", data);
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
 

export const myRentals = async (setRentals) => {
    try {
        const allRentals = await getAllRentals();
        console.log("All rentals:", allRentals);

        const myRentals = [];
        allRentals.forEach((rental) => {
            // console.log("Rental:", rental.renter);
            if (rental.renter == userID) {
                myRentals.push(rental);
            }
        });

        console.log("My rentals:", myRentals);
        setRentals(myRentals);
    } catch (error) {
        console.error('Error fetching rentals:', error);
        toast.error(error.message); // Assuming toast is available in the scope
    }
};

export const deleteMyRental = async (id) => {
    try {
        if (!accessToken) {
            throw new Error('Access token not found');
        }

        const response = await fetch(api + '/rentals/delete/'+id, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
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

