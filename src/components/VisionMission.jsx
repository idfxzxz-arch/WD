export default function VisionMission() {
  return (
    <section id="vision" className="bg-gray-50 py-20 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        <div className="bg-white p-8 rounded-2xl shadow">
          <h3 className="text-2xl font-bold mb-4">Vision</h3>
          <p className="text-gray-600">
            Menjadi perusahaan terpercaya dan unggul dalam layanan profesional.
          </p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow">
          <h3 className="text-2xl font-bold mb-4">Mission</h3>
          <ul className="list-disc ml-5 text-gray-600 space-y-2">
            <li>Menyediakan layanan berkualitas tinggi</li>
            <li>Membangun hubungan jangka panjang</li>
            <li>Mengutamakan kepuasan klien</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
