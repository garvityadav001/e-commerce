import React, { useContext } from 'react'
import Title from './Title';
import { ShopContext } from '../context/ShopContextValue';

const CartTotal = () => {
  const {currency, delivery_fee, getCartAmount } = useContext(ShopContext);
  const subtotal = getCartAmount();
  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1={"CART"} text2={"TOTALS"} />
      </div>

      <div className='flex flex-col gap-2 mt-2 text-sm'>
        <div className='flex justify-between'>
          <p>Subtotal</p>
          <p>{currency} {subtotal.toFixed(2)}</p>
        </div>

        <hr className='text-gray-300'/>
        <div className='flex justify-between'>
          <p>Shipping Fee</p>
          <p>{currency} {delivery_fee}.00</p>
        </div>

        <hr className='text-gray-300'/>
        <div className='flex justify-between'>
          <b>Total</b>
          <b>{currency} {subtotal === 0 ? '0.00' : (subtotal + delivery_fee).toFixed(2)}</b>
        </div>
      
      </div>

    </div>
  )
}

export default CartTotal