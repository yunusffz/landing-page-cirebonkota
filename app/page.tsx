export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section id="home" className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Selamat Datang di
            <br />
            <span className="text-yellow-300">Cirebon Kota</span>
          </h1>
          <p className="text-xl lg:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Portal resmi Pemerintah Kota Cirebon. Melayani masyarakat dengan 
            transparansi, akuntabilitas, dan inovasi.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-yellow-400 text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors">
              Layanan Online
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors">
              Informasi Publik
            </button>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Tentang Cirebon Kota
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏛️</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Pemerintahan</h3>
              <p className="text-gray-600">
                Pemerintahan yang transparan dan akuntabel untuk kemajuan kota.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Pelayanan</h3>
              <p className="text-gray-600">
                Pelayanan prima untuk kesejahteraan dan kemakmuran masyarakat.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌱</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Pembangunan</h3>
              <p className="text-gray-600">
                Pembangunan berkelanjutan menuju Cirebon yang maju dan sejahtera.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Layanan Publik
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              'Kependudukan',
              'Perizinan',
              'Pajak & Retribusi',
              'Pengaduan',
              'Informasi Publik',
              'Layanan Digital',
              'Bantuan Sosial',
              'Pembangunan'
            ].map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-gray-900 mb-2">{service}</h3>
                <p className="text-sm text-gray-600">Akses layanan dengan mudah dan cepat</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section id="news" className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Berita Terkini
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <article key={item} className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gradient-to-r from-blue-400 to-blue-600"></div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2 text-gray-900">
                    Berita Terkini Cirebon Kota #{item}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Informasi terbaru tentang perkembangan dan program pemerintah kota.
                  </p>
                  <span className="text-blue-600 text-sm font-medium">Baca Selengkapnya →</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">Hubungi Kami</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="font-semibold mb-2">Alamat</h3>
              <p className="text-blue-100">
                Jl. Siliwangi No. 84<br />
                Cirebon, Jawa Barat 45111
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Telepon</h3>
              <p className="text-blue-100">
                (0231) 123456<br />
                (0231) 789012
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-blue-100">
                info@cirebonkota.go.id<br />
                humas@cirebonkota.go.id
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}     
