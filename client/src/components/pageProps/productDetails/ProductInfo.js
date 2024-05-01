import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/orebiSlice";
import { getUserID } from "../../../api";

const ProductInfo = ({ productInfo }) => {
  const {
    id,
    photo,
    item_name,
    price,
    owner_name,
    owner,
    category,
    description,
    pic2,
  } = productInfo;
const usrid = getUserID()
console.log(usrid, owner);
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-4xl font-semibold">{item_name}</h2>
      <p className="text-2xl font-semibold">
        Rent {" : "} ₹ {price} /Day
      </p>
      <hr />

      <h1 className="text-2xl font-bold text-gray-600">Product Details</h1>
      <div className="flex border justify-between">
        <div className="p-3 text-lg w-full border">
          Category
          <p className="text-xl font-bold text-slate-800">
            {" : " + category}
          </p>
        </div>
        <div className="p-3 text-lg w-full border">
        Owner Name
          <p className="text-xl font-bold text-slate-800">
            {" : " +   owner_name}
          </p>
        </div>
        <div className="p-3 text-lg w-full border">
        Delivery Charges
          <p className="text-xl font-bold text-slate-800">
            {" : ₹20/-"}
          </p>
        </div>
      </div>

      <div className="text-base text-gray-600">
        <h2 className="text-xl font-bold">Description</h2>
        <p>{description}</p>
      </div>

     {  owner == usrid ?
      <div className="flex text-xl font-bold bg-slate-900 text-white p-3">You are the owner , You cannot rent this</div>
      :
     <button
        onClick={() =>
          dispatch(
            addToCart({
              _id: id,
              name: item_name,
              quantity: 1,
              image: photo,
              badge: pic2,
              price: price,
              category,
              description,
              owner_name,
              owner,
            })
          )
        }
        className="w-full py-4 bg-blue-500 hover:bg-blue-600 duration-300 text-white text-lg font-titleFont"
      >
        Add to Cart
      </button>
     }
    </div>
  );
};

export default ProductInfo;
