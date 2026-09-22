import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'

const Profile = () => {
  const { token, user, navigate } = useContext(ShopContext)

  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [token, navigate])

  if (!token) return null

  return (
    <section className='border-t pt-16 min-h-[55vh]'>
      <h1 className='text-3xl font-medium mb-10'>My Profile</h1>
      <div className='max-w-xl flex flex-col gap-6 text-gray-700'>
        <div>
          <p className='font-medium text-black mb-1'>Name:</p>
          <p className='text-lg'>{user?.name || 'Name unavailable'}</p>
        </div>
        <div>
          <p className='font-medium text-black mb-1'>Email:</p>
          <p className='text-lg break-all'>{user?.email || 'Email unavailable'}</p>
        </div>
        {user?._id && (
          <div>
            <p className='font-medium text-black mb-1'>User ID:</p>
            <p className='text-sm break-all'>{user._id}</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default Profile