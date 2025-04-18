// 'use server'

// import { cookies } from 'next/headers'
// import { createClient } from '@/utils/supabase/server'
// import { prisma } from '@/utils/prisma'
// import { redirect } from 'next/navigation'

// export async function login(prevState: { error: string } | null, formData: FormData) {
//   const supabase = await createClient()
//   const cookieStore = cookies()

//   const credential = {
//     email: formData.get('email') as string,
//     password: formData.get('password') as string,
//   }

//   try {
//     const { data, error } = await supabase.auth.signInWithPassword(credential)

//     if (error) {
//       return { error: error.message }
//     }

//     if (!data.user.id) {
//       return { error: 'Authentication failed: No user ID returned' }
//     }

//     const userData = await prisma.user.findUnique({ 
//       where: { authId: data.user.id }, 
//       select: { role: true } 
//     })

//     cookieStore.set('user_role', userData?.role || "USER", {
//       path: '/',
//       maxAge: 60 * 60 * 24 * 30,
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: 'strict',
//       httpOnly: true,
//     })

//     redirect('/')
//     return null // This won't actually execute due to redirect

//   } catch (err) {
//     console.error(err)
//     return { error: err instanceof Error ? err.message : 'Something went wrong' }
//   }
// }

// // Create a wrapper function for the form action
// export async function loginFormAction(formData: FormData) {
//   return login(null, formData)
// }

'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { prisma } from '@/utils/prisma'
import { cookies } from 'next/headers'

export async function login(formData: FormData) {
  const supabase = await createClient()
  const cookieStore = cookies()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { data: userData, error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect("/error")
  }

  const respoinse = await prisma.user.findUnique({ where: { authId: userData.user.id }, select: { role: true } })
  console.log("logindsfdcer", respoinse?.role)

    ; (await cookieStore).set('user_role', respoinse?.role || "USER", {
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      httpOnly: true,
    })

  if (!respoinse?.role) {
    redirect("/error")
  }
  redirect("/")
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}