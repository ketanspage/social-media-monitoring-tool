import React from 'react'
import {FcGoogle} from 'react-icons/fc';
import {signIn} from 'next-auth/react';
import {FaGithub} from 'react-icons/fa';
import {Button} from '@/components/ui/button';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
export const Social = () => {
    const onClick = (provider: "google"|"github") => { 
        signIn(provider,{
            callbackUrl: DEFAULT_LOGIN_REDIRECT
        })
    }
    return (
    <div className='flex items-center w-full gap-x-2'>  
        
            <Button
               
                size="lg"
                variant="outline"
                className='w-full'
                onClick={() => onClick('google')}
            >
                <FcGoogle className='w-5 h-5'/>
                <span> Google</span>
            </Button>
            
            <Button
               
                size="lg"
                variant="outline"
                className='w-full'
                onClick={() => onClick('github')}
            >
                <FaGithub className='w-5 h-5'/>
                <span> Github</span>
            </Button>

    
        
    </div>
  )
}

