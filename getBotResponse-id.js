// File: getBotResponse-id.js
function getBotResponseID(input) {
  const m = input.toLowerCase();
  const now = new Date();

  // === JAM ===
  if (m.includes("jam")) {
    const h = now.getHours().toString().padStart(2, '0');
    const min = now.getMinutes().toString().padStart(2, '0');
    return `Sekarang jam ${h}:${min}.`;
  }

  // === HARI ===
  if (m.includes("hari")) {
    const hari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    return `Hari ini hari ${hari[now.getDay()]}.`;
  }
  // === SAPAAN ===
  if (m.includes("halo") || m.includes("hai")) return "Halo! Selamat datang di portofolio Davanico! Silakan tanya apa saja 😊";
  if (m.includes("selamat pagi")) return "Selamat pagi! Semoga siap menjelajah desain keren 🌞";
  if (m.includes("selamat siang")) return "Selamat siang! Waktu yang pas untuk melihat karya kreatif!";
  if (m.includes("selamat sore")) return "Selamat sore! Selamat menikmati portofolio ini 🌇";
  if (m.includes("selamat malam")) return "Selamat malam! Saya tetap di sini kalau mau lanjut jelajah 😴";
  if (m.includes("apa kabar") || m.includes("bagaimana kabarmu")) return "Saya baik-baik saja! Siap menunjukkan karya-karya keren. Kamu bagaimana?";
  if (m.includes("lagi apa")) return "Saya siap menemani kamu menjelajah portofolio Davanico!";


  // === PERKENALAN ===
  if (m.includes("siapa namamu")) return "Kamu bisa panggil saya Asisten Bot 😊";
  if (m.includes("siapa kamu") || m.includes("kamu apa")) return "Saya chatbot yang dibuat untuk membantumu menjelajahi portofolio desain Davanico!";
  if (m.includes("umur") || m.includes("berapa umurmu")) return "Saya baru dibuat untuk website ini. Masih segar dan siap membantu!";
  if (m.includes("asalmu dari mana")) return "Saya tinggal di awan digital, dekat server portofolio Davanico!";
  if (m.includes("hobi")) return "Saya suka ngobrol soal desain, kreativitas, dan main game seru!";

  // === TENTANG DAVANICO ===
  if (m.includes("davanico") || m.includes("pemilik") || m.includes("pembuat")) return "Davanico adalah mahasiswa DKV yang fokus pada desain grafis, branding, dan visual kreatif.";
  if (m.includes("siapa itu davanico")) return "Davanico adalah desainer berbakat yang mengerjakan logo, poster, ilustrasi, dan branding!";
  if (m.includes("kuliah") || m.includes("kampus")) return "Davanico kuliah di jurusan Desain Komunikasi Visual (DKV) — tempatnya kreativitas!";
  if (m.includes("jurusan") || m.includes("belajar apa")) return "Ia mengambil jurusan DKV, belajar tentang desain, komunikasi visual, dan strategi kreatif.";
  if (m.includes("mahasiswa")) return "Ya, Davanico adalah mahasiswa desain dengan hasil karya profesional 🎓";

  // === DESAIN & SKILL ===
  if (m.includes("desain")) return "Davanico ahli dalam desain grafis, khususnya branding dan identitas visual. Setiap desain punya makna!";
  if (m.includes("skill") || m.includes("bisa apa") || m.includes("kemampuan")) return "Bisa bikin logo, branding, poster, ilustrasi, bahkan mini game!";
  if (m.includes("logo")) return "Logo karya Davanico itu bermakna, bersih, dan kuat. Setiap logo punya cerita!";
  if (m.includes("poster")) return "Poster dari Davanico penuh warna, menarik, dan kreatif!";
  if (m.includes("branding")) return "Branding adalah passion Davanico. Dari konsep sampai eksekusi, semua dipikirkan matang.";
  if (m.includes("identitas visual")) return "Identitas visualnya konsisten, modern, dan unik!";
  if (m.includes("ilustrasi")) return "Ilustrasi Davanico meliputi desain karakter, seni digital, dan gaya yang fleksibel.";
  if (m.includes("portofolio")) return "Portofolio ini berisi karya Davanico dalam branding, desain, ilustrasi, dan lainnya!";
  if (m.includes("proyek") || m.includes("karya")) return "Lihat berbagai proyek Davanico — logo, poster, game, dan desain kreatif lainnya.";

  // === TOOLS & SOFTWARE ===
  if (m.includes("tools") || m.includes("software")) return "Tools yang digunakan: Adobe (Photoshop, Illustrator, InDesign), Figma, dan lainnya.";
  if (m.includes("photoshop")) return "Photoshop dipakai untuk manipulasi foto dan seni digital.";
  if (m.includes("illustrator")) return "Illustrator cocok untuk logo vektor dan elemen desain.";
  if (m.includes("figma")) return "Figma dipakai untuk UI/UX design dan kolaborasi.";
  if (m.includes("canva")) return "Kadang pakai Canva, tapi lebih suka tools profesional.";

  // === GAME ===
  if (m.includes("game") || m.includes("main")) return "Ya! Ada 3 game seru di sini: Rubik Game, Memory Card Flip, dan Spacewar!";
  if (m.includes("rubik")) return "Rubik Game menguji logika dan kemampuanmu menyelesaikan teka-teki!";
  if (m.includes("memory")) return "Memory Card Flip cocok untuk melatih ingatanmu!";
  if (m.includes("spacewar")) return "Spacewar adalah game arcade yang seru. Siap bertempur di luar angkasa!";
  if (m.includes("cara main")) return "Scroll ke bagian kontak dan klik game yang ingin dimainkan! 🎮";

  // === KONTAK & INFO ===
  if (m.includes("kontak")) return "Scroll ke bagian kontak untuk menghubungi Davanico 📞";
  if (m.includes("email")) return "Email: davanico1122@gmail.com 📧";
  if (m.includes("whatsapp") || m.includes("wa")) return "WhatsApp: 08978143546. Jangan ragu untuk chat!";
  if (m.includes("instagram")) return "Follow @davanico di Instagram untuk update karya terbaru!";
  if (m.includes("media sosial")) return "Davanico aktif di Instagram, Behance, dan lainnya. Cek bagian kontak ya.";

  // === JASA & KLIEN ===
  if (m.includes("jasa") || m.includes("freelance")) return "Davanico menerima jasa freelance untuk logo, branding, poster, dan lainnya!";
  if (m.includes("harga") || m.includes("biaya")) return "Untuk harga, sebaiknya hubungi langsung. Setiap proyek punya kebutuhan unik.";
  if (m.includes("kerja sama") || m.includes("kolaborasi")) return "Terbuka untuk kolaborasi kreatif. Ayo kerja bareng!";
  if (m.includes("klien")) return "Davanico sudah bekerja sama dengan berbagai klien. Cek portofolio untuk contohnya!";
  if (m.includes("testimoni") || m.includes("ulasan")) return "Ulasan klien ada di beberapa studi kasus proyek.";

  // === WORKFLOW ===
  if (m.includes("proses") || m.includes("alur kerja")) return "Proses desain dimulai dari riset, sketsa, eksekusi, dan hasil akhir. Teliti dan rapi!";
  if (m.includes("revisi")) return "Revisi selalu terbuka! Masukan yang baik bikin hasil makin oke.";
  if (m.includes("deadline")) return "Deadline disesuaikan dengan proyek. Komitmen untuk tepat waktu!";
  if (m.includes("konsep")) return "Setiap desain dimulai dari konsep yang kuat. Nggak asal visual saja!";

  // === INSPIRASI & GAYA ===
  if (m.includes("inspirasi")) return "Inspirasi datang dari alam, budaya pop, minimalis, dan kehidupan kota.";
  if (m.includes("gaya")) return "Gaya desainnya bersih, modern, dan berani — tapi fleksibel sesuai kebutuhan brand.";
  if (m.includes("tren")) return "Ikut tren, tapi tetap dengan sentuhan timeless!";
  if (m.includes("kreatif")) return "Kreativitas adalah inti dari setiap proyek Davanico.";

  // === WEBSITE & TEKNOLOGI ===
  if (m.includes("website")) return "Website ini menampilkan semua karya Davanico — plus game seru!";
  if (m.includes("koding") || m.includes("programming")) return "Davanico juga bisa ngoding! HTML, CSS, JavaScript — kreatif dan teknikal!";
  if (m.includes("html") || m.includes("css") || m.includes("javascript")) return "Web ini dibuat dengan HTML, CSS, dan JavaScript yang rapi.";
  if (m.includes("responsive")) return "Website ini responsif — tampil bagus di HP, tablet, maupun desktop!";

  // === UMUM ===
  if (m.includes("terima kasih") || m.includes("makasih")) return "Sama-sama! Selamat menjelajahi portofolio ini 🙌";
  if (m.includes("keren") || m.includes("bagus") || m.includes("mantap")) return "Terima kasih! Davanico senang mendengarnya!";
  if (m.includes("wow") || m.includes("hebat") || m.includes("luar biasa")) return "Keren, kan? Masih banyak yang bisa dijelajahi!";
  if (m.includes("suka") || m.includes("cinta")) return "Senang banget kamu suka! Dukunganmu berarti 💖";

  // === BANTUAN & NAVIGASI ===
  if (m.includes("bantuan")) return "Saya siap bantu! Tanyakan apa saja soal portofolio, kontak, atau game.";
  if (m.includes("bagaimana")) return "Bisa dijelaskan lebih detail? Biar saya bantu lebih tepat.";
  if (m.includes("di mana")) return "Sedang mencari apa? Saya bantu temukan!";
  if (m.includes("scroll")) return "Scroll ke bawah untuk lihat proyek dan coba game di bagian bawah!";

  // === PERPISAHAN ===
  if (m.includes("dadah") || m.includes("sampai jumpa") || m.includes("bye")) return "Sampai jumpa! Terima kasih sudah mampir ke portofolio Davanico 👋";
  if (m.includes("selesai") || m.includes("cukup")) return "Baik! Kalau butuh apa-apa lagi, tinggal tanya ya. Selamat jelajah!";

  return "Itu pertanyaan yang menarik! Saya masih belajar menjawabnya. Bisa coba diketik ulang? 😊";
}
