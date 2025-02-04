import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ isOpen, isMobile, setSidebarOpen }) => {
  const { user } = useAuth();
  const [hrOpen, setHrOpen] = useState(false);
  const [trendyolOpen, setTrendyolOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path) => pathname === path;

  // Yetki kontrolü
  useEffect(() => {
    if (user?.type != 1) {
      // Admin değilse ve yetkisiz sayfadaysa ana sayfaya yönlendir
      const restrictedPaths = [
        '/users',
        '/ty-kategori-esleme',
        '/ty-varyant-esleme',
        '/ty-marka-esleme'
      ];
      
      if (restrictedPaths.some(path => pathname.startsWith(path))) {
        router.push('/');
      }
    }
  }, [pathname, user, router]);

  return (
    <>
      {/* Mobil için karartma overlay */}
      {isMobile && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 999,
            opacity: isOpen ? 1 : 0,
            visibility: isOpen ? 'visible' : 'hidden',
            transition: 'opacity 0.3s, visibility 0.3s',
          }}
        />
      )}

      <div className={`sidebar bg-light border-end shadow-sm ${isOpen ? 'show' : ''}`} style={{
        width: '250px',
        height: '100vh',
        position: 'fixed',
        left: '0',
        top: '0',
        zIndex: 1000,
        transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.3s ease-in-out',
      }}>
        <div className="p-3 text-center">
          {isMobile && isOpen && (
            <button 
              className="btn position-absolute top-0 end-0 mt-2 me-2"
              onClick={() => setSidebarOpen(false)}
            >
              <i className="bi bi-x-lg"></i>
            </button>
          )}
          <Link href="/" style={{ cursor: 'pointer' }}>
            <img 
              src="https://ent.samil.dev/assets/images/100d9f3.png" 
              alt="Logo" 
              width={120} 
              height={120}
              className="mb-4"
            />
          </Link>
        </div>
        
        <ul className="nav flex-column">
          <li className="nav-item mb-3">
            <Link 
              href="/" 
              className={`nav-link px-3 py-2 d-block hover-bg-light cursor-pointer ${
                isActive('/') ? 'text-primary fw-semibold' : 'text-dark'
              }`}
            >
              <i className="bi bi-house-door me-2"></i>
              Anasayfa
            </Link>
          </li>

          {/* İnsan Kaynakları - Sadece admin görebilir */}
          {user?.type == 1 && (
            <li className="nav-item mb-3">
              <button 
                className={`nav-link w-100 text-start border-0 bg-transparent d-flex align-items-center px-3 py-2 hover-bg-light cursor-pointer ${
                  pathname.includes('/users') ? 'text-primary fw-semibold' : 'text-dark'
                }`}
                onClick={() => setHrOpen(!hrOpen)}
              >
                <i className="bi bi-people me-2"></i>
                İnsan Kaynakları
                <i className={`bi bi-chevron-${hrOpen ? 'down' : 'right'} ms-auto`}></i>
              </button>
              <div className={`submenu-collapse ${hrOpen ? 'show' : ''}`}>
                <ul className="nav flex-column py-2">
                  <li className="nav-item">
                    <Link 
                      href="/users" 
                      className={`nav-link px-4 py-2 d-block hover-bg-light cursor-pointer ${
                        isActive('/users') ? 'text-primary fw-semibold' : 'text-dark'
                      }`}
                    >
                      <i className="bi bi-person-vcard me-2"></i>
                      Kullanıcı Yönetimi
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
          )}

          {/* Trendyol Menüsü */}
          <li className="nav-item mb-3">
            <button 
              className={`nav-link w-100 text-start border-0 bg-transparent d-flex align-items-center px-3 py-2 hover-bg-light cursor-pointer ${
                pathname.includes('/ty-') ? 'text-primary fw-semibold' : 'text-dark'
              }`}
              onClick={() => setTrendyolOpen(!trendyolOpen)}
            >
              <i className="bi bi-shop me-2"></i>
              Trendyol
              <i className={`bi bi-chevron-${trendyolOpen ? 'down' : 'right'} ms-auto`}></i>
            </button>
            <div className={`submenu-collapse ${trendyolOpen ? 'show' : ''}`}>
              <ul className="nav flex-column py-2">
                {user?.type == 1 && (
                  <>
                    <li className="nav-item">
                      <Link href="/ty-kategori-esleme" className={`nav-link px-4 py-2 d-block hover-bg-light cursor-pointer ${
                        isActive('/ty-kategori-esleme') ? 'text-primary fw-semibold' : 'text-dark'
                      }`}>
                        <i className="bi bi-diagram-3 me-2"></i>
                        Kategori Eşlemeleri
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link href="/ty-varyant-esleme" className={`nav-link px-4 py-2 d-block hover-bg-light cursor-pointer ${
                        isActive('/ty-varyant-esleme') ? 'text-primary fw-semibold' : 'text-dark'
                      }`}>
                        <i className="bi bi-grid me-2"></i>
                        Varyant Eşlemeleri
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link href="/ty-marka-esleme" className={`nav-link px-4 py-2 d-block hover-bg-light cursor-pointer ${
                        isActive('/ty-marka-esleme') ? 'text-primary fw-semibold' : 'text-dark'
                      }`}>
                        <i className="bi bi-tags me-2"></i>
                        Marka Eşlemeleri
                      </Link>
                    </li>
                  </>
                )}
                
                {/* Herkes görebilir */}
                <li className="nav-item">
                  <Link href="/ty-giden-urunler" className={`nav-link px-4 py-2 d-block hover-bg-light cursor-pointer ${
                    isActive('/ty-giden-urunler') ? 'text-primary fw-semibold' : 'text-dark'
                  }`}>
                    <i className="bi bi-box-arrow-right me-2"></i>
                    Trendyol Giden Ürünler
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/ty-urun-listeleme" className={`nav-link px-4 py-2 d-block hover-bg-light cursor-pointer ${
                    isActive('/ty-urun-listeleme') ? 'text-primary fw-semibold' : 'text-dark'
                  }`}>
                    <i className="bi bi-list-ul me-2"></i>
                    Trendyol Ürün Listeleme
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/ty-ayarlar" className={`nav-link px-4 py-2 d-block hover-bg-light cursor-pointer ${
                    isActive('/ty-ayarlar') ? 'text-primary fw-semibold' : 'text-dark'
                  }`}>
                    <i className="bi bi-gear me-2"></i>
                    Trendyol Ayarları
                  </Link>
                </li>
              </ul>
            </div>
          </li>

          <li className="nav-item mb-3">
            <Link href="/settings" className={`nav-link px-3 py-2 d-block hover-bg-light cursor-pointer ${
              isActive('/settings') ? 'text-primary fw-semibold' : 'text-dark'
            }`}>
              <i className="bi bi-gear me-2"></i>
              Ayarlar
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar; 