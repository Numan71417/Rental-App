import React, { useEffect, useState } from "react";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import { getAllItems } from "../../../api/items";

const BestSellers = () => {

  const [fItems, setFItems ] = useState([])

  useEffect(()=>{
    getAllItems(setFItems);
  },[])


  return (
    <div className="w-full pb-20">
      <Heading heading="Trending Now" />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-4 gap-10">
        {fItems &&
          fItems.map((item, i) => (
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
          ))}
      </div>
    </div>
  );
};

export default BestSellers;
