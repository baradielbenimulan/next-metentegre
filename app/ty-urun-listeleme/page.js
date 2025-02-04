'use client';
import { useState } from 'react';
import Link from 'next/link';
import MainLayout from '../layouts/MainLayout';
import { useNavigation } from '../utils/navigation';

const TYUrunListeleme = () => {
  const { handleGoBack } = useNavigation();

  // Dummy/simüle edilmiş değerler:
  // Örneğin, URL'den alınan veya API'den çekilen veriler
  const [second, setSecond] = useState(''); // Eğer boş ise false olacak
  const [statusFilter, setStatusFilter] = useState(''); // URL query'sinden gelebilir
  const [tyStokOld, setTyStokOld] = useState(false);

  // second varsa true, yoksa false
  const secondStatus = second !== '';

  // Örneğin, ty_products sorgusundan dönen kayıt sayısı:
  const tyProductsCount = 0; // Gerçek veride API'den gelecek
  // Eğer ürün yoksa:
  if (tyProductsCount === 0 && !tyStokOld) {
    setTyStokOld(true);
  }

  // Eğer secondStatus true ise; form verileri (dummy)
  const productData = {
    id: second,
    name: 'Şamil Servet Avcı',
    email: 'bekekgaj@gmail.com',
    tel: '0533 196 2780',
    password: 'password',
    about: '',
  };

  // Eğer secondStatus false ise; ürün listesi (dummy)
  const products = [
    {
      product_id: 1,
      name: 'Ürün 1',
      category: 'Kategori 1',
      categories: 'Alt Kategori 1',
      status: 1,
      text: 'Açıklama 1',
      id: 101,
    },
    {
      product_id: 2,
      name: 'Ürün 2',
      category: 'Kategori 2',
      categories: 'Alt Kategori 2',
      status: 0,
      text: 'Açıklama 2',
      id: 102,
    },
  ];

  // PHP'deki SendStatus fonksiyonuna denk gelen fonksiyon:
  const sendStatus = (status) => (status === 1 ? 'Aktif' : 'Pasif');

  // Kategori eşleşme kontrolü için dummy fonksiyon:
  const getCategoryStatus = (category, categories) => {
    // Örneğin, categories doluysa true döndür.
    return !!categories;
  };

  // Toplu gönder için örnek ürün listesi
  const sampleProducts = [
    104359,
    104359,
    104359,
    105482,
    105482,
    107273,
    107273,
    107350,
    107350,
    107350,
    107576,
    107576,
    107576,
    107668,
    107668,
    107668,
    107669,
    107669,
    108064,
    108064,
    147025,
    147025,
    147025,
    147115,
    147115,
    147444,
    147444,
    148049,
    148049,
    187595,
    187595,
    187595,
    187595,
    191493,
    191493,
    191493,
    235511,
    235511,
    245107,
    245107,
    259615,
    259615,
    259615,
    260943,
    260943,
    268320,
    268320,
    268619,
    268619,
    268619,
    271810,
    271810,
    271849,
    271849,
    272563,
    272563,
    272563,
    272763,
    272763,
    272763,
    272766,
    272766,
    272766,
    273896,
    273896,
    273896,
    273896,
    275415,
    275415,
    275415,
    275424,
    275424,
    275424,
    276800,
    276800,
    295743,
    295743,
    295743,
    295743,
    300948,
    300948,
    300948,
    300948,
    300948,
    302460,
    302460,
    302460,
    320615,
    320615,
    320615,
    320615,
    320640,
    320640,
    320640,
    320640,
    320911,
    320911,
    320911,
    359721,
    359721,
    359820,
    359820,
    359820,
    360159,
    360159,
    360285,
    360285,
    360749,
    360749,
    360749,
    360793,
    360793,
    360793,
    369861,
    369861,
    369861,
    369863,
    369863,
    369863,
    369863,
    370382,
    370382,
    370382,
    370382,
    371004,
    371004,
    371004,
    371004,
    371019,
    371019,
    371019,
    371021,
    371021,
    371021,
    371025,
    371025,
    371031,
    371031,
    371031,
    384301,
    384301,
    385667,
    385667,
    385667,
    385667,
    385667,
    385679,
    385679,
    385679,
    385820,
    385820,
    385820,
    386831,
    386831,
    386891,
    386891,
    386891,
    387349,
    387349,
    387349,
    387735,
    387735,
    388233,
    388233,
    388233,
    388234,
    388234,
    388234,
    390900,
    390900,
    390900,
    390949,
    390949,
    390949,
    390949,
    397193,
    397193,
    397193,
    397207,
    397207,
    397208,
    397208,
    397208,
    397208,
    397211,
    397211,
    397211,
    397273,
    397273,
    397273,
    397276,
    397276,
    397276,
    397277,
    397277,
    397546,
    397546,
    397546,
    397546,
    397549,
    397549,
    397549,
    397551,
    397551,
    397551,
    397551,
    397562,
    397562,
    397562,
    397563,
    397563,
    397563,
    397564,
    397564,
    397564,
    397566,
    397566,
    397566,
    397566,
    397680,
    397680,
    397681,
    397681,
    397681,
    397719,
    397719,
    397719,
    397719,
    397838,
    397838,
    397838,
    397841,
    397841,
    397844,
    397844,
    397844,
    397845,
    397845,
    397848,
    397848,
    397848,
    397848,
    397876,
    397876,
    397876,
    398059,
    398059,
    404416,
    404416,
    404416,
    405543,
    405543,
    405543,
    405543,
    408156,
    408156,
    408156,
    408156,
    408158,
    408158,
    408158,
    408159,
    408159,
    408159,
    408159,
    415033,
    415033,
    415033,
    416469,
    416469,
    416470,
    416470,
    416559,
    416559,
    417714,
    417714,
    417714,
    418620,
    418620,
    418620,
    418620,
    419980,
    419980,
    419980,
    425825,
    425825,
    425825,
    425849,
    425849,
    425849,
    425849,
    425850,
    425850,
    425850,
    425905,
    425905,
    425905,
    434283,
    434283,
    434286,
    434286,
    434286,
    434286,
    434367,
    434367,
    434367,
    434617,
    434617,
    434617,
    434617,
    437120,
    437120,
    437120,
    461719,
    461719,
    461719,
    461719,
    463846,
    463846,
    463846,
    463846,
    464380,
    464380,
    464380,
    464380,
    464468,
    464468,
    468817,
    468817,
    468818,
    468818,
    468818,
    468818,
    470043,
    470043,
    470043,
    470043,
    470043,
    470049,
    470049,
    470049,
    470049,
    470053,
    470053,
    470055,
    470055,
    470055,
    470056,
    470056,
    470056,
    470056,
    470058,
    470058,
    472782,
    472782,
    472782,
    473822,
    473822,
    473822,
    473822,
    479044,
    479044,
    479044,
    479048,
    479048,
    479048,
    479281,
    479286,
    481036,
    481036,
    482500,
    482500,
    482500,
    482500,
    482882,
    482882,
    482882,
    482923,
    482923,
    484344,
    484344,
    484344,
    484347,
    484347,
    484348,
    484348,
    484348,
    484614,
    484614,
    484614,
    484614,
    484614,
    484620,
    484620,
    484620,
    484620,
    484621,
    484621,
    484621,
    484621,
    484650,
    484650,
    484650,
    484812,
    484812,
    484812,
    484812,
    485195,
    485195,
    485195,
    485204,
    485204,
    485204,
    485208,
    485208,
    485208,
    485208,
    485230,
    485230,
    485230,
    486376,
    486376,
    486376,
    487999,
    487999,
    487999,
    487999,
    488004,
    488004,
    488004,
    488008,
    488008,
    488008,
    488401,
    488401,
    488401,
    488401,
    488401,
    488404,
    488404,
    488406,
    488406,
    488406,
    488406,
    488406,
    488407,
    488407,
    488407,
    488407,
    488408,
    488408,
    488408,
    488408,
    488409,
    488409,
    488409,
    488409,
    488410,
    488410,
    488410,
    488946,
    488946,
    488946,
    488946,
    488946,
    488947,
    488947,
    488947,
    488948,
    488948,
    488948,
    488948,
    488948,
    489175,
    489175,
    489176,
    489176,
    489535,
    489535,
    489535,
    489535,
    490079,
    490079,
    490087,
    490087,
    490378,
    490378,
    490378,
    490390,
    490390,
    490390,
    490390,
    490434,
    490434,
    490434,
    490576,
    490576,
    490576,
    490577,
    490577
  ];

  const handleTopluGonder = () => {
    const resultList = document.getElementById('resultListTYEslesen_gonder');
    resultList.innerHTML = ''; // Listeyi temizle

    // Ürünleri 5'erli gruplara böl
    const chunks = sampleProducts.reduce((acc, _, i) => {
      if (i % 5 === 0) acc.push(sampleProducts.slice(i, i + 5));
      return acc;
    }, []);

    // Her grubu 2 saniye arayla işle
    chunks.forEach((chunk, groupIndex) => {
      setTimeout(() => {
        chunk.forEach(product => {
          const li = document.createElement('li');
          li.className = 'text-success';
          li.innerHTML = `<i class="bi bi-check-circle me-2"></i>MYDR-${product} ÜRÜNÜ GÖNDERİLDİ`;
          resultList.appendChild(li);
        });
      }, groupIndex * 2000);
    });
  };

  return (
    <MainLayout>
      <div className="content">
        <div className="container-fluid">
          {/* Sayfa Başlığı */}
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-flex justify-content-between align-items-center">
                <h4 className="page-title">TY Ürün Listeleme</h4>
                <div className="page-title-right">
                  <div className="col text-start">
                    <button onClick={handleGoBack} className="btn btn-soft-danger">
                      <i className="uil uil-left-arrow-to-left"></i> Geri Git
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* secondStatus false ise; işlemlere ait butonlar */}
          {!secondStatus && (
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col">
                        <div className="row g-3">
                          <div className="col-4">
                            <button
                              type="button"
                              className="btn btn-danger"
                              data-bs-toggle="modal"
                              data-bs-target="#myModal_ty_sendStokMevcutOld"
                            >
                              TY Stok Sıfırlama (Riskli)
                            </button>
                          </div>
                          <div className="col-4">
                            <button
                              type="button"
                              className="btn btn-warning btn-equal"
                              data-bs-toggle="modal"
                              data-bs-target="#myModal_ty_AktifEsitleme"
                            >
                              Aktif Ürün Eşitleme
                            </button>
                          </div>
                          <div className="col-4">
                            <button
                              type="button"
                              className="btn btn-danger btn-equal"
                              data-bs-toggle="modal"
                              data-bs-target="#myModal_ty_sendStokOld"
                            >
                              Kritik Stok Sıfırla
                            </button>
                          </div>
                          <div className="col-4">
                            <button
                              type="button"
                              className="btn btn-success btn-equal"
                              data-bs-toggle="modal"
                              data-bs-target="#myModal_ty_sendStok"
                            >
                              Giden TY Stok Sıfırlama
                            </button>
                          </div>
                          <div className="col-4">
                            <button
                              type="button"
                              className="btn btn-primary btn-equal"
                              data-bs-toggle="modal"
                              data-bs-target="#myModal_ty_sendTopluEslesen_gonder"
                              onClick={handleTopluGonder}
                            >
                              Toplu Gönder
                            </button>
                          </div>
                          <div className="col-4">
                            <button
                              type="button"
                              className="btn btn-warning btn-equal"
                              data-bs-toggle="modal"
                              data-bs-target="#myModal_ty_sendTopluEslesen_guncelle"
                            >
                              Toplu Güncelle
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <style jsx>{`
            .btn-equal {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 100%;
              height: 100%;
              text-align: center;
              font-size: 0.875rem;
              padding: 10px;
              border-radius: 8px;
            }
          `}</style>

          {/* Modaller */}
          {/* Modal: TY Stok Mevcut Old */}
          <div
            id="myModal_ty_sendStokMevcutOld"
            className="modal fade"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="myModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="myModalLabel">
                    Toplu Stok Sıfırla
                  </h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                  <div id="oncekiSonuclar" className="mb-3">
                    <h5>Trendyol üzerindeki eski kayıtlar çekiliyor. Lütfen Bekleyin.</h5>
                    <ul id="resultListTYStokMevcutOld"></ul>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-light" data-bs-dismiss="modal">
                    Kapat
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Modal: Aktif Ürün Eşitleme */}
          <div
            id="myModal_ty_AktifEsitleme"
            className="modal fade"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="myModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="myModalLabel">
                    Aktif Ürün Eşitleme
                  </h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                  <div className="progress" style={{ height: '20px' }}>
                    <div
                      id="progressBar"
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: '0%' }}
                      aria-valuenow="0"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      0%
                    </div>
                  </div>
                  <div className="d-flex justify-content-between mt-3">
                    <button id="esitlenenBtn" className="btn btn-success">
                      Eşitlenen Ürün: 0
                    </button>
                    <button id="esitlenmeyenBtn" className="btn btn-danger">
                      Eşitlenmeyen Ürün: 0
                    </button>
                  </div>
                  <h5 id="satisUrunSayisi" className="mt-3">
                    Satışta Olan Ürün Sayısı: 0
                  </h5>
                  <div id="oncekiSonuclar" className="mb-3">
                    <h5>Sonuçlar:</h5>
                    <h5 id="modalDurationTYEsitleme"></h5>
                    <ul id="resultListTYEslesen"></ul>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-light" data-bs-dismiss="modal">
                    Kapat
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Modal: Kritik Stok Sıfırla */}
          <div
            id="myModal_ty_sendStokOld"
            className="modal fade"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="myModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="myModalLabel">
                    Kritik Stok Sıfırla
                  </h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                  <div id="oncekiSonuclar" className="mb-3">
                    <h5>Önceki Sonuçlar.</h5>
                    <h5 id="modalDurationTYStokOld"></h5>
                    <ul id="resultListTYStokOld"></ul>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-light" data-bs-dismiss="modal">
                    Kapat
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Modal: Toplu Stok Sıfırla */}
          <div
            id="myModal_ty_sendStok"
            className="modal fade"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="myModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="myModalLabel">
                    Toplu Stok Sıfırla
                  </h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                  <div id="oncekiSonuclar" className="mb-3">
                    <h5>Önceki Sonuçlar</h5>
                    <ul id="resultListTYStok"></ul>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-light" data-bs-dismiss="modal">
                    Kapat
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Modal: Toplu Gönder */}
          <div
            id="myModal_ty_sendTopluEslesen_gonder"
            className="modal fade"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="myModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="myModalLabel">
                    Toplu Gönder
                  </h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                  <div id="oncekiSonuclar" className="mb-3">
                    <h5>İşlem Sonuçları</h5>
                    <ul id="resultListTYEslesen_gonder" className="list-unstyled"></ul>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-light" data-bs-dismiss="modal">
                    Kapat
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Modal: Toplu Güncelle */}
          <div
            id="myModal_ty_sendTopluEslesen_guncelle"
            className="modal fade"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="myModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="myModalLabel">
                    Toplu Güncelle
                  </h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                  <div id="oncekiSonuclar" className="mb-3">
                    <h5>Önceki Sonuçlar</h5>
                    <h5 id="modalDurationEslesen_guncelle"></h5>
                    <ul id="resultListTYEslesen_guncelle"></ul>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-light" data-bs-dismiss="modal">
                    Kapat
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Modal: Toplu Listele */}
          <div
            id="myModal_ty_sendToplu"
            className="modal fade"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="myModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="myModalLabel">
                    Toplu Listele
                  </h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                  <div id="oncekiSonuclar" className="mb-3">
                    <h5>Önceki Sonuçlar</h5>
                    <ul id="resultListTY"></ul>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-light" data-bs-dismiss="modal">
                    Kapat
                  </button>
                </div>
              </div>
            </div>
          </div>

          {secondStatus ? (
            // secondStatus true ise; ürün güncelleme formu
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <form
                      className="form-horizontal"
                      method="post"
                      action="/assets/ortak-sonuc.php?islem=site-update"
                      encType="multipart/form-data"
                    >
                      <div className="row">
                        <div className="col">
                          <div className="mb-3 row">
                            <label className="col-lg-2 col-form-label" htmlFor="simpleinput">
                              İsim
                            </label>
                            <div className="col-lg-10">
                              <input
                                type="text"
                                className="form-control"
                                id="simpleinput"
                                defaultValue={productData.name}
                              />
                            </div>
                          </div>
                          <div className="mb-3 row">
                            <label className="col-lg-2 col-form-label" htmlFor="example-email">
                              Mail
                            </label>
                            <div className="col-lg-10">
                              <input
                                type="email"
                                id="example-email"
                                name="example-email"
                                className="form-control"
                                placeholder="Mail"
                                defaultValue={productData.email}
                              />
                            </div>
                          </div>
                          <div className="mb-3 row">
                            <label className="col-lg-2 col-form-label">Telefon</label>
                            <div className="col-lg-10">
                              <input
                                className="form-control"
                                type="tel"
                                name="tel"
                                defaultValue={productData.tel}
                              />
                            </div>
                          </div>
                          <div className="mb-3 row">
                            <label className="col-lg-2 col-form-label" htmlFor="example-password">
                              Şifre
                            </label>
                            <div className="col-lg-10">
                              <input
                                type="password"
                                className="form-control"
                                id="example-password"
                                defaultValue={productData.password}
                              />
                            </div>
                          </div>
                          <div className="mb-3 row">
                            <label className="col-lg-2 col-form-label" htmlFor="example-textarea">
                              Hakkımda
                            </label>
                            <div className="col-lg-10">
                              <textarea
                                className="form-control"
                                rows="5"
                                id="example-textarea"
                                defaultValue={productData.about}
                              ></textarea>
                            </div>
                          </div>
                          <div className="mb-3 row">
                            <label className="col-lg-2 col-form-label" htmlFor="example-fileinput">
                              Fotoğraf
                            </label>
                            <div className="col-lg-10">
                              <input type="file" className="form-control" id="example-fileinput" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <input type="hidden" name="ID" value={second} />
                      <button type="submit" className="form-control btn btn-warning">
                        Güncelle
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // secondStatus false ise; ürün tablosu
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body" style={{ overflowX: 'auto' }}>
                    <h4 className="header-title mt-0 mb-1">Kayıtlar</h4>
                    <table id="basic-datatable" className="table table-striped dt-responsive nowrap w-100">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Başlık</th>
                          <th>Kategori</th>
                          <th>Yol</th>
                          <th>Kategori Durum</th>
                          <th>Durum</th>
                          <th>Açıklama</th>
                          <th>İşlem</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((product) => {
                          const categoryStatus = getCategoryStatus(product.category, product.categories);
                          return (
                            <tr key={product.product_id}>
                              <td>{product.product_id}</td>
                              <td>{product.name}</td>
                              <td>{product.category}</td>
                              <td>{product.categories}</td>
                              <td>
                                {categoryStatus ? (
                                  <button type="button" className="btn btn-sm btn-success">
                                    Eşlendi
                                  </button>
                                ) : (
                                  <button type="button" className="btn btn-sm btn-danger">
                                    Eşlenmedi
                                  </button>
                                )}
                              </td>
                              <td>{sendStatus(product.status)}</td>
                              <td>{product.text}</td>
                              <td>
                                <Link href={`/ty-urun-gonder/${product.id}`} className="btn btn-warning">
                                  <i className="uil uil-edit"></i>
                                </Link>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default TYUrunListeleme;
