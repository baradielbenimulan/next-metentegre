'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';

export default function MainLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const { user, loading } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Mobil cihazlarda sidebar'ı otomatik gizle
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 992;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    // Sayfa yüklendiğinde kontrol et
    handleResize();

    // Pencere boyutu değiştiğinde kontrol et
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Dışarı tıklama kontrolü
  const handleOutsideClick = (e) => {
    if (isMobile && sidebarOpen) {
      // Sidebar ve toggle butonuna tıklanmadığını kontrol et
      const sidebar = document.querySelector('.sidebar');
      const toggleBtn = document.querySelector('.sidebar-toggle');
      if (!sidebar?.contains(e.target) && !toggleBtn?.contains(e.target)) {
        setSidebarOpen(false);
      }
    }
  };

  if (loading || !user) {
    return null;
  }

  return (
    <div className="d-flex min-vh-100" onClick={handleOutsideClick}>
      <Sidebar 
        isOpen={sidebarOpen} 
        isMobile={isMobile} 
        setSidebarOpen={setSidebarOpen}
      />
      
      <div className="flex-grow-1 d-flex flex-column" style={{ 
        marginLeft: !isMobile && sidebarOpen ? '250px' : '0',
        transition: 'margin 0.3s',
        width: '100%'
      }}>
        <Navbar toggleSidebar={toggleSidebar} />
        <main className="flex-grow-1">
          <div className="container-fluid p-4">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
} 