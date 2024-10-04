import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Poppins } from "next/font/google";
import { signOut } from '@/auth';
import { Button } from '@/components/ui/button';
import { cn } from "@/lib/utils";
import {auth} from '@/auth'
import Link from 'next/link';
const Navbar = async () => {
  const session = await auth();
  const user = session?.user;
  const avatar = user?.image;

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
      <div className="flex flex-row gap-4">
        <Avatar className="border-white">
          <AvatarImage className="border-white" src={avatar ?? ''} alt='image'/>
          <AvatarFallback><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>
        </AvatarFallback>
        </Avatar>
        <form action={async()=>{"use server"
          await signOut();}}>
          <Button variant={'outline'}>Sign Out</Button>
        </form>
      </div>
    </div>
  )
}

export default Navbar
