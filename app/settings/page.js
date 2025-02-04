'use client';
import MainLayout from '../layouts/MainLayout';

export default function Settings() {
  return (
    <MainLayout>
      <div className="card">
        <div className="card-body">
          <h2>Ayarlar</h2>
          <form>
            <div className="mb-3">
              <label className="form-label">Tema</label>
              <select className="form-select">
                <option>Açık</option>
                <option>Koyu</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Bildirimler</label>
              <div className="form-check">
                <input type="checkbox" className="form-check-input" />
                <label className="form-check-label">E-posta bildirimleri</label>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Kaydet
            </button>
          </form>
        </div>
      </div>
    </MainLayout>
  );
} 