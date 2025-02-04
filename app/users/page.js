'use client';
import { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import MainLayout from '../layouts/MainLayout';
import { useNavigation } from '../utils/navigation';
import { API_ENDPOINTS } from '../config/api';
import Cookies from 'js-cookie';
import Link from 'next/link';

const Users = () => {
  const { handleGoBack } = useNavigation();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = Cookies.get('token');
      if (!token) {
        setError('Token bulunamadı');
        return;
      }

      const response = await fetch(API_ENDPOINTS.USERS_LIST, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const result = await response.json();

      if (result.status) {
        const formattedUsers = result.data.map(user => ({
          id: user.id,
          name: user.name || '',
          email: user.mail || '',
          phone: user.phone || '',
          type: user.type,
          status: user.status === 1,
          image: user.image || `https://ui-avatars.com/api/?name=${user.name}&background=random`
        }));
        setUsers(formattedUsers);
      } else {
        setError(result.message || 'Kullanıcılar yüklenirken hata oluştu');
      }
    } catch (error) {
      console.error('API hatası:', error);
      setError('Kullanıcılar yüklenirken bir hata oluştu');
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
      name: 'Profil',
      width: '80px',
      cell: row => (
        <img
          src={row.image}
          alt={row.name}
          style={{ width: '40px', height: '40px' }}
          className="rounded-circle"
        />
      ),
    },
    {
      name: 'Ad Soyad',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'E-posta',
      selector: row => row.email,
      sortable: true,
    },
    {
      name: 'Telefon',
      selector: row => row.phone,
      sortable: true,
    },
    {
      name: 'Yetki',
      selector: row => row.type,
      sortable: true,
      cell: row => (
        <span className={`badge ${row.type === 1 ? 'bg-primary' : 'bg-secondary'}`}>
          {row.type === 1 ? 'Admin' : 'Kullanıcı'}
        </span>
      ),
    },
    {
      name: 'Durum',
      selector: row => row.status,
      sortable: true,
      cell: row => (
        <button 
          type="button" 
          className={`btn btn-sm ${row.status ? 'btn-success' : 'btn-danger'}`}
          style={{ minWidth: '90px' }}
        >
          {row.status ? 'Aktif' : 'Pasif'}
        </button>
      ),
    },
    {
      name: 'İşlem',
      width: '100px',
      cell: row => (
        <div className="d-flex gap-2">
          <button 
            className="btn btn-sm btn-primary"
            onClick={() => handleEdit(row.id)}
          >
            <i className="bi bi-pencil-square"></i>
          </button>
          <button 
            className="btn btn-sm btn-danger"
            onClick={() => handleDelete(row.id)}
          >
            <i className="bi bi-trash"></i>
          </button>
        </div>
      ),
    },
  ];

  const handleEdit = (id) => {
    // Düzenleme işlemi için
    console.log('Edit:', id);
  };

  const handleDelete = (id) => {
    // Silme işlemi için
    console.log('Delete:', id);
  };

  return (
    <MainLayout>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link href="/" className="text-decoration-none">Anasayfa</Link>
          </li>
          <li className="breadcrumb-item active">Kullanıcı Yönetimi</li>
        </ol>
      </nav>

      <div className="row">
        <div className="col-12 mb-4">
          <div className="card">
            <div className="card-body d-flex justify-content-between align-items-center">
              <button 
                onClick={handleGoBack}
                className="btn custom-btn-soft-danger"
              >
                <i className="bi bi-arrow-left me-2"></i>
                Geri Git
              </button>

              <button 
                className="btn btn-primary"
                onClick={() => console.log('Yeni kullanıcı ekle')}
              >
                <i className="bi bi-plus-lg me-2"></i>
                Yeni Kullanıcı
              </button>
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
                  data={users}
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
                      Kayıtlı kullanıcı bulunamadı
                    </div>
                  }
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Users; 