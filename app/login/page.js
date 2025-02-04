'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Swal from 'sweetalert2';
import AuthLayout from '../layouts/AuthLayout';
import { useAuth } from '../context/AuthContext';

const slides = [
  {
    image: "https://picsum.photos/800/600?random=1",
    title: "Hoş Geldiniz",
    description: "Admin paneline giriş yaparak tüm özelliklere erişebilirsiniz."
  },
  {
    image: "https://picsum.photos/800/600?random=2",
    title: "Güvenli Yönetim",
    description: "Güvenli ve kolay yönetim deneyimi için hemen giriş yapın."
  },
  {
    image: "https://picsum.photos/800/600?random=3",
    title: "7/24 Erişim",
    description: "Dilediğiniz zaman, dilediğiniz yerden erişim imkanı."
  }
];

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();
  const { login, user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      router.push('/');
    }
  }, [user, loading, router]);

  useEffect(() => {
    // Otomatik slider
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Her 5 saniyede bir değiş

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const success = await login(email, password);
    if (success) {
      // Başarılı giriş alert'i
      await Swal.fire({
        title: 'Giriş Başarılı!',
        text: 'Ana sayfaya yönlendiriliyorsunuz...',
        icon: 'success',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });
      
      router.push('/');
    } else {
      setError('Geçersiz e-posta veya şifre');
    }
  };

  if (loading || user) {
    return null;
  }

  return (
    <div className="min-vh-100 d-flex align-items-center bg-light py-5">
      <div className="container">
        <div className="card shadow-sm overflow-hidden">
          <div className="row g-0">
            {/* Login Formu - Sol Taraf */}
            <div className="col-lg-6 border-end">
              <div className="p-4 p-lg-5">
                <div className="mb-4">
                  <h2 className="h3 text-center mb-4">Giriş Yap</h2>
                  {error && (
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
                  )}
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">E-posta</label>
                    <input 
                      type="email" 
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required 
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Şifre</label>
                    <input 
                      type="password" 
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required 
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100 mb-3">
                    Giriş Yap
                  </button>
                  <div className="text-center">
                    <p className="mb-0">
                      Hesabınız yok mu?{' '}
                      <Link href="/register" className="text-decoration-none">
                        Üye Ol
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>

            {/* Slider Bölümü - Sağ Taraf */}
            <div className="col-lg-6 d-none d-lg-block ps-3">
              <div className="position-relative h-100">
                {slides.map((slide, index) => (
                  <div
                    key={index}
                    className="position-absolute w-100 h-100"
                    style={{
                      opacity: currentSlide === index ? 1 : 0,
                      transition: 'opacity 0.5s ease-in-out',
                    }}
                  >
                    <div className="position-relative h-100">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-100 h-100"
                        style={{ objectFit: 'cover' }}
                      />
                      <div 
                        className="position-absolute bottom-0 w-100 text-white p-4"
                        style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.7))' }}
                      >
                        <h3>{slide.title}</h3>
                        <p className="mb-0">{slide.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
                {/* Slider Noktaları */}
                <div className="position-absolute bottom-0 start-50 translate-middle-x mb-3 z-1">
                  <div className="d-flex gap-2">
                    {slides.map((_, index) => (
                      <button
                        key={index}
                        className={`btn btn-sm rounded-circle ${
                          currentSlide === index ? 'btn-light' : 'btn-light opacity-50'
                        }`}
                        style={{ width: '10px', height: '10px', padding: 0 }}
                        onClick={() => setCurrentSlide(index)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 