import { cookies } from 'next/headers';
import { API_ENDPOINTS } from '../../../config/api';

export async function POST(request) {
  try {
    const body = await request.json();
    const { email: mail, password: pass } = body;

    const response = await fetch(API_ENDPOINTS.LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mail, pass }),
    });

    const data = await response.json();

    if (response.ok && data.token) {
      // Session cookie'sini ayarla
      cookies().set('sessionId', data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 365, // 1 yıl
        path: '/'
      });

      // Kullanıcı bilgilerini döndür
      return Response.json({
        id: data.data.id,
        type: data.data.type,
        email: data.data.mail,
        name: `${data.data.name} ${data.data.surname}`,
        avatar: data.data.image || `https://ui-avatars.com/api/?name=${data.data.name}+${data.data.surname}&background=random`,
        phone: data.data.phone
      });
    }

    return Response.json({ error: 'Geçersiz kullanıcı adı veya şifre' }, { status: 401 });
  } catch (error) {
    console.error('Login error:', error);
    return Response.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
} 