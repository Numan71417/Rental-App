import React, { useEffect, useState } from 'react';
import { addItems } from '../../api/items';
import { uploadToFirebase } from '../../api/firebaseUpload';

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
    console.log("user id: ",userData.id);
 

      const handleImage1 = async(e)=>{
            const file = e.target.files[0]
            const url = await uploadToFirebase(file)
            console.log("url check",url);
            setImage1(url)
      }

      const handleImage2 = async(e)=>{
            const file = e.target.files[0]
            const url = await uploadToFirebase(file)
            console.log("url check2",url);
            setImage2(url)
      }


    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = {
            item_name: productName,
            category: category,
            description: description,
            price: price,
            photo: image1,
            pic1: image2,
            ownerId: userData.id,
        }
       
        console.log(formData);

        if(await addItems(formData)){
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
    <form onSubmit={handleSubmit} className='flex flex-col gap-5 mx-12 my-5'>
        <h1 className="text-2xl font-bold align-center">Add your Product to Rent</h1>
        <div className="flex gap-2">
         <label htmlFor="productName">Product Name:</label>
         <input
             type="text"
             id="productName"
             className='border'
             placeholder="Enter product name"
             value={productName}
             onChange={(e) => setProductName(e.target.value)}
             required
         />
        </div>
        
     <div className="flex gap-2">
 
         <label htmlFor="category">Category:</label>
         <select
             id="category"
             className='border'
             value={category}
             onChange={(e) => setCategory(e.target.value)}
             required
         >
             <option value="">Select Category</option>
             {
                 categories.map((c,i)=>(
                     <option key={i} value={c}>{c}</option>
                 ))
             }
         </select>
     </div>
 
     <div className="flex gap-2">
         <label htmlFor="description">Description:</label>
         <textarea
             id="description"
             className='border'
             placeholder="Enter product description"
             rows={'5'}
             cols={'50'}
             value={description}
             onChange={(e) => setDescription(e.target.value)}
             required
         />
     </div>
 
     <div className="flex gap-2">
         
         <label htmlFor="price">Price: {" (per Day)"} </label>
         <input
             type="number"
             className='border'
             id="price"
             placeholder="Enter product price"
             value={price}
             onChange={(e) => setPrice(e.target.value)}
             required
         />
     </div>
 
         
     <div className="flex gap-2"> 
         <label htmlFor="image1">Product Image:</label>
         <input
             type="file"
             id="image1"
             accept="image/*"
             onChange={(e)=>handleImage1(e)}
             required
             />
     </div>
 
     
     <div className="flex gap-2">
           <label htmlFor="image2">Second Image:</label>
         <input
             type="file"
             id="image2"
             accept="image/*"
             onChange={(e)=>handleImage2(e)}
             required
         />
     </div>
       
         <button type="submit" className=' bg-slate-700 rounded-sm text-white  w-24'>Submit</button>
 </form>
 
    );
};

export default AddItems;

