import { NextResponse } from 'next/server';

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const isPublicPath = pathname === '/login' || pathname === '/register';
  const token = request.cookies.get('token')?.value;

  // Token yoksa ve public path değilse login'e yönlendir
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Token varsa ve public path ise ana sayfaya yönlendir
  if (token && isPublicPath) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/register',
    '/settings',
    '/ty-kategori-esleme/:path*',
    '/ty-varyant-esleme/:path*',
    '/ty-marka-esleme/:path*',
    '/ty-giden-urunler/:path*',
    '/ty-urun-listeleme/:path*',
    '/ty-ayarlar/:path*',
  ],
}; 