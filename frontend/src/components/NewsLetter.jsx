import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContextValue'

const NewsLetter = () => {
  const [email, setEmail] = useState('')
  const { subscribeNewsletter } = useContext(ShopContext)

  const onSubmitHandler = (event) => {
    event.preventDefault();
    subscribeNewsletter(email)
    toast.success('Subscribed! Use code FOREVER20 for 20% off your order.')
    setEmail('')
}

    return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</p>
        <p className='text-gray-400 mt-3'>Join our newsletter and stay updated on the latest offers.</p>
        <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
          <input type='email' value={email} onChange={(event)=>setEmail(event.target.value)} placeholder='Enter your email' className='w-full sm:flex-1 outline-none' required/>
            <button type='submit' className='bg-black text-white text-xs px-10 py-4'>SUBSCRIBE</button>
        </form>
    </div>
  )
}

export default NewsLetter