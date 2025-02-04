'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import DataTable from 'react-data-table-component';
import MainLayout from '../layouts/MainLayout';
import { useNavigation } from '../utils/navigation';
import { API_ENDPOINTS } from '../config/api';
import Cookies from 'js-cookie';

const TYKategoriEsleme = () => {
  const { handleGoBack } = useNavigation();
  const router = useRouter();
  const [filterStatus, setFilterStatus] = useState('all');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchKategoriEsleme();
  }, []);

  const fetchKategoriEsleme = async () => {
    try {
      const token = Cookies.get('token');
      if (!token) {
        setError('Token bulunamadı');
        return;
      }

      const response = await fetch(API_ENDPOINTS.TY_KATEGORI_ESLE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const result = await response.json();

      if (result.status) {
        const formattedData = result.data.map(item => ({
          id: item.id,
          status: item.categories_ty_id !== 0,
          coleziumTitle: item.categories_ty_title || '',
          coleziumPath: item.categories_ty_sub_title || '',
          tyTitle: item.title || '',
          tyPath: item.sub_title || '',
          tyCategoryId: item.categories_ty_id || '0',
        }));
        setData(formattedData);
      } else {
        setError(result.message || 'Veri çekme hatası');
      }
    } catch (error) {
      console.error('API hatası:', error);
      setError('Veriler yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      name: '#',
      selector: row => row.id,
      sortable: true,
      width: '70px',
    },
    {
      name: 'Durum',
      selector: row => row.status,
      sortable: true,
      width: '120px',
      cell: row => (
        <button 
          type="button" 
          className={`btn btn-sm ${row.status ? 'btn-success' : 'btn-danger'}`}
          style={{ minWidth: '90px' }}
        >
          {row.status ? 'Eşlendi' : 'Eşlenmedi'}
        </button>
      ),
    },
    {
      name: 'Colezium Başlık',
      selector: row => row.coleziumTitle,
      sortable: true,
      wrap: true,
    },
    {
      name: 'Colezium Yol',
      selector: row => row.coleziumPath,
      sortable: true,
      wrap: true,
    },
    {
      name: 'TY Başlık',
      selector: row => row.tyTitle,
      sortable: true,
      wrap: true,
    },
    {
      name: 'TY Yol',
      selector: row => row.tyPath,
      sortable: true,
      wrap: true,
    },
    {
      name: 'TY Kategori ID',
      selector: row => row.tyCategoryId,
      sortable: true,
    },
    {
      name: 'İşlem',
      width: '100px',
      cell: row => (
        <button 
          onClick={() => router.push(`/ty-kategori-esleme/${row.id}`)}
          className="btn btn-sm btn-primary"
        >
          <i className="bi bi-pencil-square"></i>
        </button>
      ),
    },
  ];

  const filteredData = data.filter(item => {
    if (filterStatus === 'matched') return item.status;
    if (filterStatus === 'unmatched') return !item.status;
    return true;
  });

  return (
    <MainLayout>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link href="/" className="text-decoration-none">Anasayfa</Link>
          </li>
          <li className="breadcrumb-item active">Trendyol Kategori Eşleme</li>
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

        <div className="col-12 mb-4">
          <div className="card">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-md-3">
                  <label className="form-label">Kategori Durumu</label>
                  <select 
                    className="form-select"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="all">Tümü</option>
                    <option value="matched">Eşleşen Kategoriler</option>
                    <option value="unmatched">Eşleşmeyen Kategoriler</option>
                  </select>
                </div>
                <div className="col-md-9 text-md-end mt-3 mt-md-0">
                  <button 
                    onClick={fetchKategoriEsleme} 
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    <i className="bi bi-arrow-clockwise me-2"></i>
                    Yenile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12">
          <div className="card">
            <div className="card-body">
              {error ? (
                <div className="alert alert-danger">{error}</div>
              ) : (
                <DataTable
                  columns={columns}
                  data={filteredData}
                  pagination
                  responsive
                  highlightOnHover
                  striped
                  progressPending={loading}
                  progressComponent={
                    <div className="p-4 text-center">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Yükleniyor...</span>
                      </div>
                    </div>
                  }
                  noDataComponent={
                    <div className="p-4 text-center">
                      Kayıt bulunamadı
                    </div>
                  }
                  customStyles={{
                    headRow: {
                      style: {
                        backgroundColor: '#f8f9fa',
                        borderTop: '1px solid #dee2e6',
                      },
                    },
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default TYKategoriEsleme; 