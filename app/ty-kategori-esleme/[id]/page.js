'use client';
import { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { useNavigation } from '../../utils/navigation';

const TYKategoriDetay = () => {
  const { handleGoBack } = useNavigation();
  const [kategori] = useState({
    baslik: "Erkek Giyim",
    yol: "Giyim > Erkek",
    tyKategori: "Erkek Tekstil"
  });

  return (
    <MainLayout>
      {/* Üst Butonlar Card */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col text-start">
                  <button 
                    onClick={handleGoBack} 
                    className="btn custom-btn-soft-danger"
                  >
                    <i className="bi bi-arrow-left me-2"></i>
                    Geri Git
                  </button>
                </div>
                <div className="col text-end">
                  <button 
                    type="button" 
                    className="btn btn-success me-2" 
                    data-bs-toggle="modal" 
                    data-bs-target="#stokSifirlamaModal"
                  >
                    TY Stok Sıfırlama
                  </button>
                  <button 
                    className="btn btn-warning" 
                    data-bs-toggle="modal" 
                    data-bs-target="#topluGonderModal"
                  >
                    Kategorideki Ürünleri Gönder / Güncelle
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Kategori Bilgileri Card */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-4">Kategori Bilgileri</h5>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <div className="form-group">
                    <label className="form-label">Kategori Başlığı</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={kategori.baslik} 
                      readOnly 
                    />
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="form-group">
                    <label className="form-label">Kategori Yolu</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={kategori.yol} 
                      readOnly 
                    />
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="form-group">
                    <label className="form-label">TY Kategorisi</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={kategori.tyKategori} 
                      readOnly 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modallar */}
      {/* Stok Sıfırlama Modal */}
      <div className="modal fade" id="stokSifirlamaModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">TY Stok Sıfırlama</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              {/* Modal içeriği */}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">İptal</button>
              <button type="button" className="btn btn-success">Onayla</button>
            </div>
          </div>
        </div>
      </div>

      {/* Toplu Gönder Modal */}
      <div className="modal fade" id="topluGonderModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Kategorideki Ürünleri Gönder / Güncelle</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              {/* Modal içeriği */}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">İptal</button>
              <button type="button" className="btn btn-warning">Onayla</button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default TYKategoriDetay; 