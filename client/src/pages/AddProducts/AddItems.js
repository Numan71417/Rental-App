import React, { useEffect, useState } from 'react';
import { addItems } from '../../api/items';
import { uploadToFirebase } from '../../api/firebaseUpload';
import Header from '../Dashboard/Header';
import { Link } from 'react-router-dom';

const AddItems = () => {

    const categories = [
        'Books', 'Educational Item', 'Sports', 'Gadgets', 'Musical Instrument', 'Vehicle', 'Electronics', 'Furniture', 'Decoratives', 'House Holds',
    ]

    const [productName, setProductName] = useState('');
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image1, setImage1] = useState('');
    const [image2, setImage2] = useState('');

    const userData = JSON.parse(localStorage.getItem('userData'));
    console.log("user id: ", userData.id);


    const handleImage1 = async (e) => {
        const file = e.target.files[0]
        const url = await uploadToFirebase(file)
        console.log("url check", url);
        setImage1(url)
    }

    const handleImage2 = async (e) => {
        const file = e.target.files[0]
        const url = await uploadToFirebase(file)
        console.log("url check2", url);
        setImage2(url)
    }


    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = {
            item_name: productName,
            branch: userData.location,
            category: category,
            price: price,
            description: description,
            photo: image1,
            pic1: image2,
            quantity: 5,
        }

        console.log(formData);

        if (await addItems(formData)) {
            setProductName('');
            setCategory('');
            setDescription('');
            setPrice('');
            setImage1('');
            setImage2('');
        }

        // window.location.href = '/shop'

    };

    return (
        <>

            <nav className="bg-gray-800 p-4 text-white flex justify-between px-16">
                <Link to={'/dashboard'} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    ← Go Back
                </Link>
                <div className="text-xl font-bold">Admin Dashboard</div>
                <div className="text-xl font-bold"></div>
            </nav>

                <div className='flex justify-center items-center mt-5'>
            <form onSubmit={handleSubmit} className="  w-full max-w-xl bg-white p-8 rounded-lg shadow-md">


                    <h1 className="text-3xl font-bold mb-8 text-center">Add your Product to Rent</h1>
                    <div className="flex flex-col gap-4 mb-4">
                        <label htmlFor="productName" className="text-lg font-semibold">Product Name:</label>
                        <input
                            type="text"
                            id="productName"
                            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="Enter product name"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-4 mb-4">
                        <label htmlFor="category" className="text-lg font-semibold">Category:</label>
                        <select
                            id="category"
                            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        >
                            <option value="">Select Category</option>
                            {categories.map((c, i) => (
                                <option key={i} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col gap-4 mb-4">
                        <label htmlFor="description" className="text-lg font-semibold">Description:</label>
                        <textarea
                            id="description"
                            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="Enter product description"
                            rows="5"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-4 mb-4">
                        <label htmlFor="price" className="text-lg font-semibold">Price: (per Day)</label>
                        <input
                            type="number"
                            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
                            id="price"
                            placeholder="Enter product price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-4 mb-4">
                        <label htmlFor="image1" className="text-lg font-semibold">Product Image:</label>
                        <input
                            type="file"
                            id="image1"
                            accept="image/*"
                            onChange={handleImage1}
                            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-4 mb-4">
                        <label htmlFor="image2" className="text-lg font-semibold">Second Image:</label>
                        <input
                            type="file"
                            id="image2"
                            accept="image/*"
                            onChange={handleImage2}
                            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>

                    <button type="submit" className="w-full bg-slate-600 text-white font-bold py-2 rounded-md hover:bg-slate-800 focus:outline-none focus:bg-slate-700">
                        Submit
                    </button>
            </form>
                </div>
        </>
    );
};

export default AddItems;

