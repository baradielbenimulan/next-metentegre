import { cookies } from 'next/headers';

export async function GET() {
  const sessionId = cookies().get('sessionId');

  if (sessionId) {
    // Test için sabit kullanıcı bilgileri
    return Response.json({
      id: 1,
      type: 0,
      email: 'admin@mail.com',
      name: 'Admin User',
      avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=random'
    });
  }

  return Response.json({ error: 'Unauthorized' }, { status: 401 });
} 