import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Redirect only if the request is to the root route `/`
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/home', request.url))
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/',
}
