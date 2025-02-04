export default function AuthLayout({ children }) {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          {children}
        </div>
      </div>
    </div>
  );
} 