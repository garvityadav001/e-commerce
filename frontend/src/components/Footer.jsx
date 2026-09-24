import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm '>
        <div>
          <img src={assets.logo} alt='Logo' className='mb-5 w-32' />
          <p className='w-full md-2/3 text-gray-600'>Your trusted source for the latest trends in fashion.</p>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'> COMPANY </p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/about'>About us</Link></li>
            <li><Link to='/contact'>Delivery</Link></li>
            <li><Link to='/contact'>Privacy policy</Link></li>
          </ul>
        </div >

        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>support@example.com</li>
            <li>+123 456 7890</li>
          </ul>
        </div>
      </div >

       <div className='text-gray-600'>
          <hr />
          <p className='py-5 text-sm text-center'>Copyright 2025@ forever.com - All Right Reserved</p>
        </div>
    </div >
  )
}

export default Footer