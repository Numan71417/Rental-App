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

const Product = ({id,img, productName, price,ownerName, ownerId, category, description,img2}) => {
  
  const productItem = {
    id,
    photo:img,
    item_name:productName,
    price,
    owner_name:ownerName,
    owner:ownerId,
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
    <div className="w-full relative group">
      <div className="max-w-80 max-h-80 relative overflow-y-hidden ">
        <div onClick={handleProductDetails} className=" cursor-pointer">
          
         {img && <Image className="w-full " imgSrc={img} />}
            

        </div>

        {/* <div className="absolute top-6 left-8">
          {price && <Badge text="New" />} */}
        {/* </div> */}

        {/* <div className="w-full h-32 absolute bg-white -bottom-[130px] group-hover:bottom-0 duration-700">
          <ul className="w-full h-full flex flex-col items-end justify-center gap-2 font-titleFont px-2 border-l border-r">
            
            <li
              // onClick={() =>
                // dispatch(
                //   addToCart({
                //     _id: items._id,
                //     name: items.productName,
                //     quantity: 1,
                //     image: items.img,
                //     badge: items.badge,
                //     price: items.price,
                //     colors: items.color,
                //   })
                // )
              // }
              className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
            >
              Add to Cart
              <span>
                <FaShoppingCart />
              </span>
            </li>
            <li
              onClick={handleProductDetails}
              className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
            >
              View Details
              <span className="text-lg">
                <MdOutlineLabelImportant />
              </span>
            </li>
            
          </ul>
        </div> */}

      </div>
      
      <div className="max-w-80 py-6 flex flex-col gap-1 border-[1px] border-t-0 px-4">
        <div className="flex items-center justify-between font-titleFont">
          <h2 className="text-lg text-primeColor font-bold">
            {productName}
          </h2>
          <p className="text-[#767676] text-[14px]">$ {price}</p>
        </div>

        <div className=" flex gap-2 justify-between">
          <div className="">Rented by  <p className="font-bold">{ownerName}</p> </div>
          <div className="">Category<p className="font-bold  border bg-slate-500 rounded-md p-1 px-2 text-white">{category}</p></div>
        </div>

        <div className=" flex gap-1 my-2 justify-between">
            <p className="w-[60%]">{descrip}</p>
           {img2 && <img src={img2} className="rounded" alt={productName}  width={'40px'} height={'50px'}/>}
        </div>

       {ownerId == getUserID() ?
       <div className="flex text-xl font-bold">You are the owner , You cannot rent this</div>
       :
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
                    ownerName,
                    ownerId
                    
                  }))}
          >
          Add To Cart
          </button>
        </div>}
      </div>
    </div>
  );
};

export default Product;
