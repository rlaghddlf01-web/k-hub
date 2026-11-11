import type { DetailCopy } from '../detail-types';

export const detail: DetailCopy = {
  nav: { market: "Barang bekas", tax: "Pengembalian pajak", telecom: "Ponsel & paket" },
  featuresLabel: "Fitur utama",
  forWhoLabel: "Cocok untuk",

  services: {
    market: {
      eyebrow: "Barang bekas · Jual pindahan",
      headline: "Lepaskan barang yang tidak terpakai dengan mudah, dan temukan yang Anda butuhkan di dekat Anda",
      desc: "Pasar untuk pekerja asing dan mahasiswa: jual beli barang bekas, barang gratis, dan jual pindahan sebelum meninggalkan Korea. Bertemu langsung di dekat asrama atau kampus, dan gunakan terjemahan AI saat Anda tidak memiliki bahasa yang sama.",
      features: [
        { icon: 'globe', title: "Dukungan terjemahan AI", text: "Deskripsi barang dan pesan diterjemahkan ke bahasa Anda, sehingga Anda tetap bisa memahami transaksi meskipun berbeda bahasa." },
        { icon: 'gift', title: "Barang gratis & jual pindahan", text: "Bagikan barang yang tidak lagi dipakai, atau lepaskan peralatan elektronik dan furnitur sekaligus lewat bagian jual pindahan sebelum pulang ke negara asal." },
        { icon: 'map', title: "Transaksi langsung di dekat Anda", text: "Atur lokasi dan radius di peta untuk menemukan barang terdekat, lalu tentukan tempat dan waktu bertemu." },
        { icon: 'shield', title: "Verifikasi identitas & peringatan penipuan", text: "Pengenalan foto kartu identitas dan verifikasi SMS membantu memastikan pendaftaran, dan kata-kata mencurigakan seperti meminta pembayaran di muka atau mengajak pindah ke aplikasi pesan lain akan memicu peringatan." },
        { icon: 'users', title: "Kabar lingkungan & tips hidup", text: "Baca papan lingkungan serta blog kehidupan dan pajak untuk hidup di Korea, dan pasang di layar utama agar bisa dipakai seperti aplikasi." },
      ],
      forWho: ["Pekerja yang tinggal di dekat asrama atau kawasan industri", "Orang yang sedang berkemas sebelum meninggalkan Korea", "Pendatang baru yang membutuhkan peralatan elektronik atau furnitur", "Mahasiswa"],
    },
    tax: {
      eyebrow: "Pengembalian pajak",
      headline: "Pahami pengembalian pajak Anda selangkah demi selangkah, dalam bahasa Anda sendiri",
      desc: "Cari tahu apakah Anda bisa mendapatkan kembali pajak penghasilan yang dibayar selama bekerja di Korea, lalu ajukan, dengan panduan dalam bahasa Anda. Mulai dari memperkirakan jumlah, mengisi dokumen, tanda tangan elektronik, hingga memantau perkembangan, semuanya berupa satu alur yang terhubung, dan pelaporan pajaknya sendiri ditangani melalui akuntan pajak mitra.",
      features: [
        { icon: 'calc', title: "Perkirakan pengembalian Anda", text: "Masukkan masa kerja, gaji, dan jenis visa untuk menghitung kemungkinan jumlah pengembalian terlebih dahulu." },
        { icon: 'camera', title: "Isi otomatis dari foto kartu identitas", text: "Foto kartu registrasi orang asing Anda dan AI akan membaca datanya agar Anda tidak perlu mengetik banyak. Anda dapat memperbaiki bagian yang salah terbaca." },
        { icon: 'file', title: "Tanda tangan elektronik di layar", text: "Tanda tangani surat kuasa dan kontrak dengan jari di layar, sehingga tidak perlu menyiapkan dokumen kertas." },
        { icon: 'bell', title: "Kabar perkembangan lewat pesan teks", text: "Saat status berubah, Anda menerima pesan teks dalam bahasa Anda, dan dapat melanjutkan percakapan lewat Telegram, WhatsApp, Facebook, atau KakaoTalk." },
        { icon: 'support', title: "Manajer dukungan & panduan", text: "Tanyakan kepada manajer dukungan AI saat Anda mengalami kesulitan, dan administrator dapat membalas langsung bila diperlukan. Tersedia juga FAQ dan panduan keringanan pajak penghasilan untuk usia muda." },
      ],
      forWho: ["Pekerja asing yang membayar pajak penghasilan di Korea", "Siapa saja yang ingin memeriksa kelayakan terlebih dahulu", "Orang yang merasa istilah pajak bahasa Korea sulit dipahami"],
    },
    telecom: {
      eyebrow: "Ponsel & paket",
      headline: "Jelajahi ponsel, paket, dan internet dalam bahasa Anda sendiri, semuanya di satu tempat",
      desc: "Lihat ponsel pintar, paket, dan produk internet/IPTV dalam bahasa Anda dan kirim permintaan pendaftaran. Setelah Anda mengirim, staf akan menghubungi Anda untuk memverifikasi identitas dan membantu aktivasi.",
      features: [
        { icon: 'globe', title: "Tersedia dalam 17 bahasa", text: "Paket, perangkat, acara, dan FAQ ditampilkan dalam 17 bahasa." },
        { icon: 'phone', title: "Lihat paket & perangkat", text: "Lihat informasi paket dan produk ponsel. Harga dan ketentuan dikonfirmasi pada konsultasi akhir." },
        { icon: 'file', title: "Permintaan pendaftaran online", text: "Pilih nomor baru atau pindah nomor, operator, dan USIM atau eSIM, lalu kirim. Formulir ini tidak meminta nomor registrasi orang asing Anda." },
        { icon: 'sim', title: "Panduan eSIM", text: "Pelajari terlebih dahulu apa itu eSIM dan cara menggunakannya di halaman panduan." },
        { icon: 'chat', title: "Manajer dukungan AI", text: "Tanyakan tentang paket dan ponsel dalam bahasa Anda. Jawabannya dibatasi pada katalog dan diatur agar tidak mengarang harga atau hasil pemeriksaan." },
      ],
      forWho: ["Orang yang pertama kali memiliki nomor di Korea", "Siapa saja yang bingung dengan pilihan paket", "Penghuni kamar kecil yang membutuhkan internet atau IPTV"],
    },
  },

  intentTitle: "Layanan mana yang cocok untuk Anda?",
  intentSub: "Ketuk kalimat yang paling sesuai dengan kebutuhan Anda saat ini.",
  intents: [
    { text: "Saya ingin menjual atau mencari peralatan elektronik dan furnitur bekas", service: 'market' },
    { text: "Saya ingin membereskan barang-barang sebelum meninggalkan Korea", service: 'market' },
    { text: "Saya ingin tahu apakah pajak yang saya bayar di Korea bisa dikembalikan", service: 'tax' },
    { text: "Saya ingin melihat ponsel dan paket dalam bahasa saya", service: 'telecom' },
    { text: "Saya butuh internet atau IPTV untuk kamar saya", service: 'telecom' },
  ],

  howTitle: "Cara kerjanya",
  steps: [
    { title: "Pilih bahasa Anda", text: "Pilih salah satu dari 17 bahasa. Alamat berubah menjadi seperti /vi, dan bahasa yang sama diteruskan ke layanan. Bahasa yang tidak didukung suatu layanan akan diarahkan ke bahasa Inggris." },
    { title: "Pilih layanan", text: "Ketuk barang bekas, pengembalian pajak, atau ponsel & paket untuk membuka situs web layanan tersebut." },
    { title: "Lanjutkan di layanan", text: "Di hub tidak ada pendaftaran atau login. Pendaftaran dan pengajuan dilakukan di masing-masing layanan." },
  ],

  faqTitle: "Pertanyaan yang sering diajukan",
  faq: [
    { q: "Apakah saya perlu mendaftar di hub?", a: "Tidak. Hub hanya memperkenalkan layanan dan menghubungkan Anda ke sana, jadi tidak ada pendaftaran atau login. Anda mendaftar dan mengajukan di masing-masing layanan." },
    { q: "Apakah ketiga layanan terhubung ke satu akun?", a: "Saat ini hub tidak menerima login, dan akun serta pengajuan dikelola terpisah oleh masing-masing layanan." },
    { q: "Bahasa apa saja yang didukung?", a: "Hub mendukung 17 bahasa. Setiap layanan memiliki daftar bahasanya sendiri; misalnya Korea Tax Refund Service mendukung 15 bahasa (tanpa bahasa Jepang dan Rusia). Bahasa yang tidak didukung diarahkan ke bahasa Inggris." },
    { q: "Berapa biayanya?", a: "Menggunakan hub tidak dikenakan biaya. Untuk biaya dan ketentuan tiap layanan, silakan periksa informasi di layanan tersebut." },
    { q: "Apakah manajer dukungan itu manusia?", a: "Di Korea Tax Refund Service dan K-Telecom, manajer dukungan menjawab lebih dulu dengan AI. Di Korea Tax Refund Service, administrator juga dapat membalas langsung bila diperlukan." },
    { q: "Apa yang dicatat oleh hub?", a: "Hanya untuk statistik kunjungan, hub mencatat ID pengunjung anonim dan cara Anda tiba (misalnya tag iklan). Hub tidak mengumpulkan nama atau kontak Anda." },
  ],

  disclaimer: "Isi layanan, harga, dan bahasa yang didukung dapat berubah tergantung masing-masing layanan. Silakan periksa ketentuan akhir di setiap layanan.",
};
