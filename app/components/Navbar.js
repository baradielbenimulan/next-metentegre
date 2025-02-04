'use client';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

const Navbar = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg bg-light shadow-sm border-bottom" style={{ height: '56px' }}>
      <div className="container-fluid">
        <button 
          className="btn d-lg-none me-3 sidebar-toggle" 
          onClick={toggleSidebar}
        >
          <i className="bi bi-list fs-4"></i>
        </button>
        
        <div className="d-flex ms-auto">
          {!user ? (
            <>
              <Link href="/login" className="btn btn-outline-primary me-2">Giriş</Link>
              <Link href="/register" className="btn btn-primary">Kayıt Ol</Link>
            </>
          ) : (
            <div className="dropdown">
              <button 
                className="btn btn-link text-dark text-decoration-none dropdown-toggle d-flex align-items-center"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img 
                  src={user.avatar}
                  alt={user.name}
                  className="rounded-circle me-2"
                  width="32"
                  height="32"
                />
                <span>{user.name}</span>
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <Link href="/settings" className="dropdown-item">
                    <i className="bi bi-gear me-2"></i>
                    Hesap Ayarları
                  </Link>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <button onClick={handleLogout} className="dropdown-item text-danger">
                    <i className="bi bi-box-arrow-right me-2"></i>
                    Çıkış Yap
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 