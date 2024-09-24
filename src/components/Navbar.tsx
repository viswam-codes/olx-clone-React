/* eslint-disable @typescript-eslint/no-explicit-any */
import olx from '../assets/olx.png'
import lens from "../assets/lens.png"
import arrow from "../assets/arrow.png"
import search from "../assets/search.png"
import Login from './Login'
import { useState,useContext } from 'react'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

import { auth } from "../firebase/setup"
import { UserContext } from './UserContext'

type searchProp = {
    setSearch:any
}

const Navbar = (props:searchProp) => {
    const [loginPop,setLoginPop]=useState(false);
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = async ()=>{
      try{
        await signOut(auth);
        setUser(null);
        setLoginPop(false);
      }catch(err){
        console.log("Error during sign out",err)
      }
    }

    const handleSellClick = () => {
      if (user) {
          navigate("/post-ad"); // Navigate to post-ad if the user is logged in
      } else {
          setLoginPop(true); // Show login popup if user is not logged in
      }
  };


  return (
    <>
     <div className='flex p-4 bg-slate-100 shadow-md justify-between'>
        <img src={olx} className='w-11 h-9'/>
        <div className='flex border border-spacing-1 w-64 p-2 border-black ml-5 bg-white'>
            <img src={lens} className='w-6 h-5 mt-1'/>
            <input placeholder='Location' className='ml-3 outline-none'/>
            <img src={arrow} className='w-8 h-7' />
        </div>
        <div className='flex h-12 ml-4 border-2 border-black bg-white'>
            <input onChange={(e)=>props?.setSearch(e.target.value)} placeholder='Find Cars,Mobile phones and more' className='ml-3 w-96 outline-none' />
            <img src={search} />
        </div>
        <div className='flex h-12 p-3 ml-10 cursor-pointer'>
            <h1 className='font-semibold'>ENGLISH</h1>
            <img src={arrow} className='w-8 h-7'/>
        </div>
        {user ? (
          <div className='flex h-12 p-3 ml-6'>
            <h1 onClick={handleLogout} className='font-bold text-lg cursor-pointer'>Hello, {user?.displayName}</h1>
          </div>
        ) : (
          <div onClick={() => setLoginPop(!loginPop)} className='flex h-12 p-3 ml-6 cursor-pointer underline hover:no-underline'>
            <h1 className='font-bold text-lg'>Login</h1>
          </div>
        )}

        <div onClick={handleSellClick} className='w-28 flex h-12 p-2 ml-6 cursor-pointer rounded-full border border-yellow-500'>
            <h1 className='font-bold text-lg ml-3'>+ SELL</h1>
        </div>
    </div>

{loginPop&&<Login setLoginPop={setLoginPop} setUser={setUser}/>}   
 </>
   
  )
}

export default Navbar