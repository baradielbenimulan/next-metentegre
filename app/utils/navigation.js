'use client';
import { useRouter } from 'next/navigation';

export const useNavigation = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return { handleGoBack };
}; 