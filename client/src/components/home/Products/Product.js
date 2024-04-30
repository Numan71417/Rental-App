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

const Product = ({id,img, productName, price}) => {
  

  // const dispatch = useDispatch();
  const _id = id;
  const idString = (_id) => {
    return String(_id).toLowerCase().split(" ").join("");
  };
  const rootId = idString(_id);
  const [wishList, setWishList] = useState([]);
  const navigate = useNavigate();
  
  const productItem = {id,img, productName, price};
  // console.log(productItem);
  const handleProductDetails = () => {
    navigate(`/product/${rootId}`, {
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
        <div onClick={handleProductDetails}>
          
          {/* <Image className="w-full h-full" imgSrc={img} /> */}
            hi

        </div>
        <div className="absolute top-6 left-8">
          {price && <Badge text="New" />}
        </div>
        <div className="w-full h-32 absolute bg-white -bottom-[130px] group-hover:bottom-0 duration-700">
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
        </div>
      </div>
      <div className="max-w-80 py-6 flex flex-col gap-1 border-[1px] border-t-0 px-4">
        <div className="flex items-center justify-between font-titleFont">
          <h2 className="text-lg text-primeColor font-bold">
            {productName}
          </h2>
          <p className="text-[#767676] text-[14px]">$ {price}</p>
        </div>
      </div>
    </div>
  );
};

export default Product;
