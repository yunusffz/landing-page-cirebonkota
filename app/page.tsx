export default function Home() {
  return (
    <div className="min-h-screen">
      <section id="home" className="h-[calc(100vh-80px)] bg-contain bg-center bg-no-repeat text-white flex items-center justify-center relative" style={{ backgroundImage: 'url(/bg-main.png)', backgroundSize: 'cover', backgroundPosition: 'center top' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-[49px] font-bold mb-6 font-lora text-[#022b55]">
            Ekosistem Data Kota Cirebon
          </h1>
          <p className=" mb-8 text-gray-500 max-w-3xl font-inter">
            Platform terintegrasi untuk akses data terbuka, transparansi informasi publik, 
            dan inovasi digital Pemerintah Kota Cirebon. Menghubungkan data, 
            kebijakan, dan layanan dalam satu ekosistem yang mudah diakses masyarakat.
          </p>
        </div>
      </section>

    </div>
  );
}     
