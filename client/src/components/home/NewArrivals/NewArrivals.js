import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import {
  newArrOne,
  newArrTwo,
  newArrThree,
  newArrFour,
} from "../../../assets/images/index";
import SampleNextArrow from "./SampleNextArrow";
import SamplePrevArrow from "./SamplePrevArrow";
import { getAllItems } from "../../../api/items";

const NewArrivals = () => {

  const [fItems, setFItems ] = useState([])

  useEffect(()=>{
    getAllItems(setFItems);
  },[])


  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };
  return (
    <div className="w-full pb-16 mt-8">
      <Heading heading="Latest Listings" />
      <Slider {...settings}>
       
    {fItems &&  fItems.map((item, i)=>(

     <div className="px-2" key={i}>
          <Product
            id={item.id}
            img={item.photo}
            productName={item.item_name}
            price={item.price}
            ownerName={item.owner_name}
            ownerId={item.owner}
            category={item.category}
            description={item.description}
            img2={item.pic1}
            
          />
        </div>
    ))  
        }

       
      </Slider>
    </div>
  );
};

export default NewArrivals;
