'use client';
import { useState } from 'react';
import Link from 'next/link';
import MainLayout from '../layouts/MainLayout';
import { useNavigation } from '../utils/navigation';

const TYMarkaEsleme = () => {
  const { handleGoBack } = useNavigation();

  return (
    <MainLayout>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link href="/" className="text-decoration-none">Anasayfa</Link>
          </li>
          <li className="breadcrumb-item active">Trendyol Marka Eşleme</li>
        </ol>
      </nav>

      <div className="row">
        <div className="col-12 mb-4">
          <div className="card">
            <div className="card-body">
              <button 
                onClick={handleGoBack}
                className="btn custom-btn-soft-danger"
              >
                <i className="bi bi-arrow-left me-2"></i>
                Geri Git
              </button>
            </div>
          </div>
        </div>

        {/* İçerik buraya gelecek */}
      </div>
    </MainLayout>
  );
};

export default TYMarkaEsleme; 