import React, { useState } from 'react';
import { addItems } from '../../api/items';

const AddItems = () => {

    const categories = [
        'Sports', 'Gadgets', 'Musical Instrument', 'Vehicle', 'Electronics', 'Furniture', 'Decoratives', ''
    ]



    const [productName, setProductName] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [owner, setOwner] = useState(null)

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData) {
            setOwner(userData.id);
        }
      }, []);


    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('item_name', productName);
        formData.append('category', category);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('photo', image1);
        formData.append('pic1', image2);
        formData.append('owner', owner);

        if(await addItems(formData)){
            setProductName('');
            setCategory('');
            setDescription('');
            setPrice('');
            setImage1(null);
            setImage2(null);
        }
      
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="productName">Product Name:</label>
            <input
                type="text"
                id="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
            />
            <label htmlFor="category">Category:</label>
            <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
            >
                <option value="">Select Category</option>
                {/* Populate options with categories */}
            </select>
            <label htmlFor="description">Description:</label>
            <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <label htmlFor="price">Price:</label>
            <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
            />
            <label htmlFor="image1">Product Image:</label>
            <input
                type="file"
                id="image1"
                accept="image/*"
                onChange={(e) => setImage1(e.target.files[0])}
                required
            />
            <label htmlFor="image2">Second Image:</label>
            <input
                type="file"
                id="image2"
                accept="image/*"
                onChange={(e) => setImage2(e.target.files[0])}
                required
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default AddItems;

