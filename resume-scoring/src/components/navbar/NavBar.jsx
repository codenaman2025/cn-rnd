import React, { useState } from 'react'
import { BsFillSuitcaseLgFill } from "react-icons/bs";
import { ImStatsDots } from "react-icons/im";
import { useContext } from 'react';
import { AuthContext } from '../../auth/AuthContext';

const NavBar = () => {
    const {user,logout} = useContext(AuthContext)

    const logo = {
        link:'',
        altText: 'Resume-Points'
    }
    const navItems = [
        {
            id:0,
            name:'Home',
            slug:'/',

        },
        {
            id:1,
            name:'Apply',
            slug:'/apply'
        },
        // {
        //     id:2,
        //     name:'Manager',
        //     slug:'/manager'
        // }    
    ]

    const btnData = [
        {
            id:0,
            type:'Apply',
            style:'flex items-center gap-x-2 border border-gray-400 !p-1 !pl-4 !pr-4 rounded-xs cursor-pointer hover:bg-gray-200 transition-colors duration-200',
            icon:<BsFillSuitcaseLgFill />
        },
        {
            id:1,
            type:'Dashboard',
            style:'flex items-center gap-x-2 border border-white bg-black text-white !p-1 !pl-4 !pr-4 rounded-xs cursor-pointer hover:bg-gray-800 transition-colors duration-200',
            icon:<ImStatsDots />
        }
    ]
  return (
    <div>
        <nav className='w-screen bg-white h-[45px] !p-2 text-black flex justify-evenly items-center border-b-[0.5px] border-gray-500'>
           <div className="">
            <img  alt="ResumeScorer" className='font-bold text-sm'/>
           </div>
           <div className="">
            <ul className='text-gray-500 flex gap-x-4 text-sm'>
                {navItems.map((items)=>{
                      return <li className='cursor-pointer hover:text-black hover: '><a href={items.slug}>{items.name}</a></li>
                })}
            </ul>
           </div>
         

<div className="flex gap-x-3">
  {/* <button className="flex items-center gap-x-2 border border-gray-400 !p-1 !pl-4 !pr-4 rounded-xs cursor-pointer hover:bg-gray-200 transition-colors duration-200">
    <BsFillSuitcaseLgFill />
    <span>Apply</span>
  </button>

  <button className="flex items-center gap-x-2 border border-white bg-black text-white !p-1 !pl-4 !pr-4 rounded-xs cursor-pointer hover:bg-gray-800 transition-colors duration-200">
    <ImStatsDots />
    <span>Apply</span>
  </button> */}

{/* {btnData.map((item)=>{
  return <button className={item.style}>
   {item.icon}
   <span>{item.type}</span>
  </button>
})} */}
{/* {
  user?.role && (user?.role === 'job_seeker' || user?.role === 'hiring_manager' ) &&<button className={btnData[0].style} onClick={logout}>
 
  <span>LogOut</span>
 </button>
} */}
{user?.role && (
  <button onClick={logout}>Logout</button>
)}


</div>

        </nav>
    </div>
  )
}

export default NavBar