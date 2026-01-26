export default function Vision() {
  return (
    <section
      id="vision"
      className="scroll-mt-32 py-28 bg-gray-50 px-6"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

        {/* VISION */}
        <div className="bg-white p-10 rounded-3xl shadow-lg hover:shadow-xl transition">
          <h3 className="text-2xl font-bold mb-4 text-gray-900">
            Vision
          </h3>

          <div className="w-16 h-[3px] bg-blue-500 mb-6 rounded-full" />

          <p className="text-gray-600 leading-relaxed">
            Menjadi perusahaan terpercaya dan unggul dalam layanan profesional
            dengan mengedepankan kreativitas, teknologi, dan kepuasan klien.
          </p>
        </div>

        {/* MISSION */}
        <div className="bg-white p-10 rounded-3xl shadow-lg hover:shadow-xl transition">
          <h3 className="text-2xl font-bold mb-4 text-gray-900">
            Mission
          </h3>

          <div className="w-16 h-[3px] bg-blue-500 mb-6 rounded-full" />

          <ul className="space-y-3 text-gray-600 list-disc ml-5 leading-relaxed">
            <li>Menyediakan layanan berkualitas tinggi</li>
            <li>Membangun hubungan jangka panjang dengan klien</li>
            <li>Mengutamakan kepuasan pelanggan</li>
            <li>Menghadirkan solusi kreatif dan inovatif</li>
          </ul>
        </div>

      </div>
    </section>
  )
}
