import React from 'react'
import { userAuthStore } from '../store/userAuth';
import { LogOut } from 'lucide-react';

const Home = () => {
  const { logout, authUser} = userAuthStore();
  return (
    <div>
      <div className='text-[20px] text-center pb-[30px]'>
        <p>Welcome to your dashboard <br/>
        {authUser.username}</p>
      </div>
      <div className='flex items-center justify-center'>
        <button className="flex gap-2 items-center  cursor-pointer " onClick={logout}>
      <LogOut className="size-5 " />
      <span className="sm:inline">Logout</span>
    </button>
      </div>
    </div>
  )
}

export default Home