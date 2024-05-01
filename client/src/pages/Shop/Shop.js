import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import Pagination from "../../components/pageProps/shopPage/Pagination";
import ProductBanner from "../../components/pageProps/shopPage/ProductBanner";
import ShopSideNav from "../../components/pageProps/shopPage/ShopSideNav";
import { getAllItems } from "../../api/items";

const Shop = () => {
  const [itemsPerPage, setItemsPerPage] = useState(48);
  const itemsPerPageFromBanner = (itemsPerPage) => {
    setItemsPerPage(itemsPerPage);
  };

const [products, setProducts] = useState([])

  useEffect(()=>{
    getAllItems(setProducts);
  },[])


  const [priceRange, setPriceRange] = useState({
    min:100,
    max:1000
  });
  const [categories, setCategories] = useState([]);
  const [sizes, setSizes] = useState([]);

  const filteredProducts = products.filter((product) => {
    const categoryMatch = categories.length === 0 || categories.includes(product.category);
    const sizeMatch = sizes.length === 0 || product.size.some((size) => sizes.includes(size));
    const priceMatch = product.price >= priceRange.min && product.price <= priceRange.max;
  
    return categoryMatch && sizeMatch && priceMatch;
  });

  



  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Products" />
      {/* ================= Products Start here =================== */}
      <div className="w-full h-full flex pb-20 gap-10">
        <div className="w-[20%] lgl:w-[25%] hidden mdl:inline-flex h-full">
          <ShopSideNav 
           priceRange={priceRange}
           setPriceRange={setPriceRange}
           categories={categories}
           setCategories={setCategories}
           sizes={sizes}
           setSizes={setSizes}
          />
        </div>
        <div className="w-full mdl:w-[80%] lgl:w-[75%] h-full flex flex-col gap-10">
          <ProductBanner itemsPerPageFromBanner={itemsPerPageFromBanner} />

          
          <Pagination itemsPerPage={itemsPerPage} filteredProducts={filteredProducts} />
          
        </div>
      </div>
      {/* ================= Products End here ===================== */}
    </div>
  );
};

export default Shop;
