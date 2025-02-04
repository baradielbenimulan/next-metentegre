import AuthLayout from '../layouts/AuthLayout';

export default function Register() {
  return (
    <AuthLayout>
      <div className="card">
        <div className="card-body">
          <h2 className="text-center mb-4">Kayıt Ol</h2>
          <form>
            <div className="mb-3">
              <label className="form-label">Ad Soyad</label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">E-posta</label>
              <input type="email" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">Şifre</label>
              <input type="password" className="form-control" />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Kayıt Ol
            </button>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
} 