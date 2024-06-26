import React from 'react';

const ItemTable = ({ items }) => {

  const getShort = (str) => {
    return str.substring(0, 30) + '...';
  }


  console.log(items);
  return (
    <div className="overflow-x-auto my-6 ">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="w-1/6 px-2 py-2">Item id</th>
            <th className="w-1/6 px-2 py-2">Item Name</th>
            <th className="w-1/6 px-2 py-2">Description</th>
            <th className="w-1/6 px-2 py-2">Category</th>
            <th className="w-1/6 px-2 py-2">Price</th>
            <th className="w-1/6 px-2 py-2">Photo</th>
          </tr>
        </thead>
        <tbody>
          {items && items.map((item) => (
            <tr>
              <td className="border px-4 py-2 text-center">{item.id}</td>
              <td className="border px-4 py-2 text-center">{item.item_name}</td>
              <td className="border px-4 py-2 text-center">{getShort(item.description)}</td>
              <td className="border px-4 py-2 text-center">{item.category}</td>
              <td className="border px-4 py-2 text-center">{item.price}</td>
              <td className="border px-4 py-4 flex items-center justify-center h-full">
                <img src={item.photo} alt='img' className='h-full object-contain' width={'50px'} height={'100%'} />
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemTable;
