"Development use this middleware export function"
// import { NextRequest, NextResponse } from "next/server";

// export function middleware(request:NextRequest){
//   let response = NextResponse.next()
//   return response
// }

// middleware.ts
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

const protectedRoutes: Record<string, string[]> = {
  '/retailer': ['RETAILER'],
  '/agent': ['AGENT'],
  '/distributor': ['DISTRIBUTOR'],
  '/dashboard': ['RETAILER', 'AGENT', 'DISTRIBUTOR', 'USER'],
  '/profile': ['RETAILER', 'AGENT', 'DISTRIBUTOR', 'USER'],
  '/admin': ['ADMIN'], // Changed to only ADMIN
  '/user-only': ['USER']
}

export async function middleware(request: NextRequest) {
  let response = NextResponse.next()

  // 1. Setup Supabase client
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          request.cookies.set({ name, value, ...options })
          response = NextResponse.next({
            request: { headers: request.headers }
          })
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: any) {
          request.cookies.set({ name, value: '', ...options })
          response = NextResponse.next({ request: { headers: request.headers } })
          response.cookies.set({ name, value: '', ...options })
        }
      }
    }
  )
  // 2. Check auth session
  const { data: { user } } = await supabase.auth.getUser()
  const path = request.nextUrl.pathname

  // 3. Find matching protected route
  const matchedRoute = Object.keys(protectedRoutes).find(route =>
    path.startsWith(route)
  )

  if (!matchedRoute) return response

  // 4. If no user, redirect to login
  if (!user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // 5. Get role from cookie (set during login)
  const userRole = request.cookies.get('user_role')?.value
  console.log("middlewa role", userRole)

  // 6. If no role in cookie, redirect to unauthorized
  if (!userRole) {
    return NextResponse.redirect(new URL('/unauthorized', request.url))
  }

  // 7. Check if user has required role
  if (!protectedRoutes[matchedRoute].includes(userRole)) {
    return NextResponse.redirect(new URL('/unauthorized', request.url))
  }

  // 8. Add role to headers for downstream use
  response.headers.set('x-user-role', userRole)

  return response
}