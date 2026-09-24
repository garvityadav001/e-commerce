import React, { useContext } from 'react'
import {Link} from 'react-router-dom';
import { ShopContext } from '../context/ShopContextValue';
import { products as localProducts } from '../assets/assets';

const ProductItem = ({id, image, name, price}) => {
  const {currency} = useContext(ShopContext);
  const localProduct = localProducts.find((product) => product._id === id);
  const productImage = image?.[0] || localProduct?.image?.[0];

  return (
    <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
      <div className="overflow-hidden aspect-13/15">
        <img src={productImage} alt={name} className="w-full h-full object-cover transform-gpu transition-transform duration-500 ease-out hover:scale-110" />
      </div>
      <h2 className="pt-2 pb-1 text-sm">{name}</h2>
      <p className="text-sm font-medium">{currency}{price}</p>
    </Link>
  )
}

export default ProductItem