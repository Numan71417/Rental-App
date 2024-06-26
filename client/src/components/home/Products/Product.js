import React, { useEffect, useState } from "react";
import { BsSuitHeartFill } from "react-icons/bs";
import { GiReturnArrow } from "react-icons/gi";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineLabelImportant } from "react-icons/md";
import Image from "../../designLayouts/Image";
import Badge from "./Badge";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/orebiSlice";
import { toast } from "react-toastify";
import { getAllItems } from "../../../api/items";
import { getUserID } from "../../../api";

const Product = ({id,img, productName, price,branch_name, category, description,img2}) => {
  
  const productItem = {
    id,
    photo:img,
    item_name:productName,
    price,
    branch_name,
    category, 
    description,
    pic2:img2
  }

  const descrip  = description?.substring(0,40)+"..."
  const dispatch = useDispatch();
  const _id = id;
  const idString = (_id) => {
    return String(_id).toLowerCase().split(" ").join("");
  };
  const rootId = idString(_id);
  const [wishList, setWishList] = useState([]);
  const navigate = useNavigate();
  
  // console.log("produts: ",productItem);
  const handleProductDetails = () => {
    navigate(`/product/${id}`, {
      state: {
        item: productItem,
      },
    });
  };

  // const handleWishList = () => {
  //   toast.success("Product add to wish List");
  //   setWishList(wishList.push(items));
  //   console.log(wishList);
  // };


  return (
    <div className="w-full relative group rounded-sm">
      <div className="max-w-80 max-h-80 relative overflow-y-hidden ">
        <div onClick={handleProductDetails} className=" cursor-pointer">
          {img && <Image className="w-full " imgSrc={img} />}
        </div>
      </div>
      
      <div className="max-w-80 py-6 flex flex-col gap-1 border-[1px] border-t-0 px-4">
        
        <div className="flex items-center justify-around font-titleFont">
          
          <h2 className="text-md w-[70%] text-primeColor font-bold">
            {productName}
          </h2>

          <p className="text-slate-800 px-2 text-[14px] w-[30%] font-bold text-md">₹ {price}/day</p>

        </div>

        <div className=" flex gap-2 justify-between mt-5">
          {/* <div className="">Location: <p className="font-bold">{branch_name}</p> </div> */}
          <div className="">Category<p className="font-bold  border bg-slate-500 rounded-md p-1 px-2 text-white">{category}</p></div>
        </div>

        <div className=" flex gap-1 my-2 justify-between">
            <p className="w-[60%]">{descrip}</p>
           {img2 && <img src={img2} className="rounded" alt={productName}  width={'40px'} height={'50px'}/>}
        </div>

    
       
        <div className="flex justify-between ">
          <button className="bg-slate-300 p-2 underline " onClick={handleProductDetails}>More Details</button>
          <button className="bg-slate-900 text-white p-2 rounded-sm" 
             onClick={() =>
                dispatch(
                  addToCart({
                    _id: id,
                    name: productName,
                    quantity: 1,
                    image: img,
                    badge: img2,
                    price: price,
                    category,
                    description,
                    
                    
                  }))}
          >
          Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
