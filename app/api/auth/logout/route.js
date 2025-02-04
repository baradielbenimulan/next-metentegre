import { cookies } from 'next/headers';

export async function POST() {
  cookies().delete('sessionId');
  return Response.json({ success: true });
} 