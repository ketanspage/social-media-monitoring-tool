"use server";
import * as z from "zod";
import bcrypt from "bcryptjs";
import {getUserByEmail} from "@/data/user";
import { db } from "@/lib/db";
import { RegisterSchema } from "@/schemas";
export const Sign = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, name } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser=await getUserByEmail(email);
    if (existingUser) {
        return { error: "User already exists!" };
    }
    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });

  return { success: "user created" };
};