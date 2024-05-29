
import Brand from "./shopBy/Brand";
import Category from "./shopBy/Category";
import Color from "./shopBy/Color";
import Price from "./shopBy/Price";
import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import MultiRangeSlider from "multi-range-slider-react";
import { allCategories } from "../../../constants";


const ShopSideNav = ({
  priceRange,
  setPriceRange,
  categories,
  setCategories,

}) => {

  const handleInput = (e) => {
    setPriceRange({
      min: e.minValue,
      max: e.maxValue,
    });
  };

  const handleCategoryChange = (category) => {
    setCategories((prevCategories) => {
      if (prevCategories.includes(category)) {
        return prevCategories.filter((c) => c !== category);
      } else {
        return [...prevCategories, category];
      }
    });
  };

 


  const clearFilter = ()=>{
    setCategories([]);
    setPriceRange({min:0,max:5000});
  }
  
  //logic for responsive menu icon
  const [side, setSide] = useState(false);
  const toggleSideBar = () => {
    setSide(!side);
  };




  return (
    <div className="w-full flex flex-col gap-6">
       <div className="flex flex-row ">
      <div
        className={`px-8  ${side ? "flex" : "hidden" } flex-col gap-4 md:flex  bg-slate-800 text-white md:w-[250px] w-full overflow-hidden`}
      >
        <div className="my-5  ">
          <button
            onClick={clearFilter}
            type="button"
            className= {`bg-slate-600 p-3 font-semibold rounded-2xl flex gap-2 justify-center items-center hover:bg-red-300 hover:text-slate-800 `} 
          >
            <span>Clear Filter</span>
            <FaFilter />
          </button>
        </div>

        <p className="border border-white w-full mb-3"></p>

        <div>
          <h2 className="text-lg font-bold text-slate-300 mb-4">
            Price Range <span> (in ₹) </span>{" "}
          </h2>
          <MultiRangeSlider
            min={1}
            max={1000}
            step={10}
            ruler={false}
            label={false}
            barInnerColor={"rgb(30 41 59)"}
            barLeftColor="white "
            barRightColor="white"
            thumbLeftColor="rgb(100 116 139)"
            thumbRightColor="rgb(100 116 139)"
            style={{ boxShadow: "none", border: "none" }}
            minValue={priceRange.min}
            maxValue={priceRange.max}
            stepOnly={true}
            onInput={(e) => {
              handleInput(e);
            }}
          />

          <p className="block">
            {priceRange.min === priceRange.max
              ? "₹" + priceRange.min
              : priceRange.min + " - " + priceRange.max + " ₹"}
          </p>
        </div>

        <p className="border border-white w-full mb-3 mt-3"></p>

        <div>
          <h3 className="text-lg font-bold text-slate-300 mb-4">Categories</h3>

          <div>
            {allCategories.map(
              (category, index) => (
                <label key={index} className="flex gap-2">
                  <input
                    type="checkbox"
                    checked={categories.includes(category)}
                    onChange={() => {
                      handleCategoryChange(category);
                      
                    }}
                  />
                  <p>{category}</p>
                </label>
              )
            )}
          </div>
        </div>

        <p className="border border-white w-full mb-3 mt-3"></p>

        {/* <div className="mb-10">
          <h2 className="text-lg font-bold text-slate-300 mb-3">Size</h2>

          <div className="flex flex-col">
            {sizesArray.map((size, index) => (
              <label key={index} className="flex gap-2">
                <input
                  type="checkbox"
                  checked={sizes.includes(size)}
                  onChange={() => {
                    handleSizeChange(size);
                  
                  }}
                />
                {size}
              </label>
            ))}
          </div>
        </div> */}

      </div>

      <div
        className={` px-2 flex flex-col gap-4 md:hidden  bg-slate-900 text-white  ${!side?'w-full':''}`}
      >
        <div
          className="flex my-5 cursor-pointer px-2"
          onClick={toggleSideBar}
        >
          {side ? <IoClose size={30} /> : <FiMenu size={30} />}
        </div>
      </div>
    </div>
    </div>
  );
};

export default ShopSideNav;
