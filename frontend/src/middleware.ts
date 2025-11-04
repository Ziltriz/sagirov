  import { NextRequest, NextResponse } from 'next/server';
  import { getAccessToken } from '@/core/models/User';

  const publicPaths = ['/'];

  export default function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    
    const isPublicPath = publicPaths.some(publicPath => 
      pathname.startsWith(publicPath)
    );

    const token = getAccessToken();

    if (!token && !isPublicPath) {
      const loginUrl = new URL('/', request.url);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  }