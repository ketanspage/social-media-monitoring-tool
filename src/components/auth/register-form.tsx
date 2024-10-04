"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { SetStateAction, useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { RegisterSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,  
} from "@/components/ui/form";
import { CardWrapper } from "@/components/auth/card-wrapper"
import { Button } from "@/components/ui/button";
import {Sign} from "@/actions/sign";

export const RegisterForm = () => {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string|undefined>("");
  const [success, setSuccess] = useState<string|undefined>("");
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      
    },
  });
  const onSubmit = (data: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      Sign(data)
        .then((data) => {
          setError(data.error);
          setSuccess(data.success);
        })
    })
  }

  return (
    <CardWrapper
      headerLabel="Create an account"
      backButtonLabel="already have an account?"
      backButtonHref="/auth/login"
      showSocial
    >
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
        <div className="space-y-4">
        <FormField 
            control={form.control}
            name="name"
            render={({field})=>(
                <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} 
                      placeholder="john doe"
                     />
                      
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
            />
            <FormField 
            control={form.control}
            name="email"
            render={({field})=>(
                <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} 
                      placeholder="john.doe@example.com"
                      type="email" />
                      
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
            />
            <FormField 
            control={form.control}
            name="password"
            render={({field})=>(
                <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} 
                      placeholder="******"
                      type="password" />
                      
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
            />
            
        </div>
        <FormError message={error}/>
        <FormSuccess message={success}/>
        <Button type="submit" className="w-full">sign up</Button>
        </form>
      </Form>
    </CardWrapper>
  );
};