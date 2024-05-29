import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Product from "../../home/Products/Product";
import { useSelector } from "react-redux";
import { paginationItems } from "../../../constants";
import { getAllItems } from "../../../api/items";
const notfound = 'https://cdni.iconscout.com/illustration/premium/thumb/not-found-7621869-6167023.png?f=webp'

const items = paginationItems;

function Items({
  currentItems,
  selectedBrands,
  selectedCategories,
  filteredProducts,
}) {
  return (
    <>
      {      
          filteredProducts.map((item) => (
            <div key={item.id} className="w-full">
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
    </>
  );
}

const Pagination = ({ itemsPerPage, filteredProducts }) => {
  const [itemOffset, setItemOffset] = useState(0);
  const [itemStart, setItemStart] = useState(1);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const selectedBrands = useSelector(
    (state) => state.orebiReducer.checkedBrands
  );
  const selectedCategories = useSelector(
    (state) => state.orebiReducer.checkedCategorys
  );
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    const newStart = newOffset + 1; // Adjust the start index

    setItemOffset(newOffset);
    setItemStart(newStart);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mdl:gap-4 lg:gap-10">
        <Items
          currentItems={currentItems}
          selectedBrands={selectedBrands}
          selectedCategories={selectedCategories}
          filteredProducts={filteredProducts}
        />
      </div>

      {
        filteredProducts.length===0 &&
        <div className="flex w-full flex-col justify-center items-center">
            <img src={notfound} className="w-1/2" alt="notfound" />
            <h1 className="text-xl font-bold ">Looks Like product is unavailable</h1>
            <h1 className="text-lg font-semibold">Please clear filter</h1>
        </div>
      }

    {filteredProducts.length!=0 &&
      <div className="flex flex-col mdl:flex-row justify-center mdl:justify-between items-center">
        <ReactPaginate
          nextLabel=""
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel=""
          pageLinkClassName="w-9 h-9 border-[1px] border-lightColor hover:border-gray-500 duration-300 flex justify-center items-center"
          pageClassName="mr-6"
          containerClassName="flex text-base font-semibold font-titleFont py-10"
          activeClassName="bg-black text-white"
        />

        <p className="text-base font-normal text-lightText">
          Products from {itemStart} to {Math.min(endOffset, items.length)} of{" "}
          {items.length}
        </p>
      </div>
    }


    </div>
  );
};

export default Pagination;
