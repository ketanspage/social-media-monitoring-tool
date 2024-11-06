import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Poppins } from "next/font/google";
import { Button } from '@/components/ui/button';
import { cn } from "@/lib/utils";
import Link from 'next/link';
const Navbar = async () => {

  return (
    <div className="fixed top-0 left-0 w-full bg-black z-50 flex justify-between p-2 ">
      <Link href={'/home'}><h1 className={cn(
        "text-3xl font-semibold text-white drop-shadow-md flex flex-row",
      )}>
        Media<p className={cn(
          "text-3xl font-semibold text-gray-700 drop-shadow-md",
        )}>X</p>
      </h1></Link>
      {/* <li className='flex text-white items-center justify-center gap-20'>
        <a href="/" >Home</a>
        <a href="/youtube">Youtube</a>
        <a href="/">Twitter</a>
        
      </li> */}
     ]
    </div>
  )
}

export default Navbar
