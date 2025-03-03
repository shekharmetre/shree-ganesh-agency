'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { hashPassword } from '@/utils/helper'
import { prisma } from '@/utils/prisma'

export async function login(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  console.log(data);

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()
  // Extract form data
  const email = formData.get('email') as string;
  const passwords = formData.get('password') as string;
  const fullName = formData.get('fullName') as string;
  const shopName = formData.get('shopName') as string;
  const businessType = formData.get('businessType') as string;
  const phone = formData.get('phone') as string;
  const username = formData.get('username') as string || "nbrk_user";

  console.log(fullName,shopName,businessType,phone,username,"frontend info")

  // Hash the password
  const secure_password = await hashPassword({ code: passwords, saltRounds: 10 });

  // First save user to Prisma (the database)
  try {
    await prisma.user.create({
      data: {
        fullName,
        shopName,
        businessType,
        email,
        username,
        phone,
        password :secure_password,
        // authorId : "ef85a124-3716-445c-a383-9e4b81bad0bf"
     // Hash the password before saving it
      }
    });
  } catch (error) {
    console.error("Error creating user in Prisma:", error);
    return redirect('/error');
  }

  // Then register the user in Supabase Auth
  const { error } = await supabase.auth.signUp({
    email,
    password: passwords, // Supabase handles password hashing internally]

  });

  if (error) {
    console.error("Error signing up with Supabase:", error.message);
    return redirect('/error');
  }

  // Successfully signed up, redirect to homepage
  revalidatePath('/', 'layout');
  redirect('/');
}