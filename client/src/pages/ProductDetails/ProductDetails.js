import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import ProductInfo from "../../components/pageProps/productDetails/ProductInfo";
import { FaDownload } from "react-icons/fa";
import { getAllItems, getItemById } from "../../api/items";

const tabs = [
  {
    id: "Fiche Technique",
    label: "Fiche Technique",
  },
  {
    id: "Description",
    label: "Description",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    id: "Video",
    label: "Video",
    content: (
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/watch?v=6e0yIRDVPlA&list=RD6e0yIRDVPlA&start_radio=1"
        title="YouTube Video"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    ),
  },
  // Add more tabs as needed
];

const ProductDetails = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");
  const [productInfo, setProductInfo] = useState({});
  // const [productId, setProductId] = useState("");
  // const [activeTab, setActiveTab] = useState(tabs[0].id);

 
  useEffect(() => {
    setProductInfo(location.state.item);
    setPrevLocation(location.pathname);
  }, [location, productInfo.ficheTech]);

  console.log(productInfo);

  console.log("product info--------"+productInfo);

  const singleProduct = {}
  // productInfo?.filter(item => item.id === productId)

  // console.log("single product " + singleProduct);

  return (
    <div className="w-full mx-auto border-b-[1px] border-b-gray-300">
      <div className="max-w-container mx-auto px-4">
        <div className="xl:-mt-10 -mt-7">
          <Breadcrumbs title="" prevLocation={prevLocation} />
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 h-full -mt-5 xl:-mt-8 pb-10 bg-gray-100 p-4">
          <div className="h-full xl:col-span-2">
            <img
              className="w-full h-full "
              src={productInfo.photo }
              alt={productInfo.photo}
            />
          </div>
          <div className="h-full w-full md:col-span-2 xl:col-span-4 xl:px-4 flex flex-col gap-6 justify-center">
            <ProductInfo productInfo={productInfo} />
          </div>
        </div>
        <div>
          
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
