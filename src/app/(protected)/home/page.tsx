'use client';

import React, { useState } from 'react'
import { Poppins } from "next/font/google";
import { FaYoutube } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
})

const Page = () => {
  const router = useRouter();
  const [keyword, setKeyword] = useState('');
  const [date, setDate] = useState(''); 
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>, path: string) => {
    event.preventDefault();
    router.push(`/${path}?q=${keyword}&date=${date}`);
  }

  return (
    <form className=' p-[40px] items-center w-3/4 flex'>
      <main className="flex flex-col w-full gap-10">
      <h1 className={cn(
          "text-6xl font-semibold text-white items-center justify-center drop-shadow-md flex flex-row gap-2",
          font.className,
        )}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-14 h-14 text-black font-bold">
  <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>

          <p>Search</p>
        </h1>
        <div className='gap-4 flex flex-row justify-center items-center'>
        <Input type="text" placeholder='Enter your keyword...' className='w-2/4' value={keyword} onChange={(e) => setKeyword(e.target.value)} />
        <Input type="datetime-local" className='w-fit items-center justify-center flex'  value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div className='flex flex-row items-center justify-center gap-4'>
          <Button variant={'secondary'} type='submit' className='gap-2' onClick={(e:any) => handleSubmit(e, 'youtube')}><FaYoutube className='w-5 h-5' /><p>Youtube</p></Button>
          <Button type='submit' className='gap-2' onClick={(e:any) => handleSubmit(e, 'twitter')}><FaTwitter className='w-5 h-5' /><p>Twitter</p></Button>
        </div>
      </main>
    </form>
  )
}

export default Page;