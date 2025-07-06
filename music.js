const toggleBtn = document.getElementById('togglePlaylist');
const closeBtn = document.getElementById('closePlaylist');
const musicPanel = document.getElementById('musicPanel');
const spotifyContainer = document.getElementById('spotifyContainer');

let iframeLoaded = false;
let scrollY = 0;

toggleBtn.addEventListener('click', () => {
  // Simpan posisi scroll
  scrollY = window.scrollY;

  // Tampilkan panel
  musicPanel.classList.add('active');

  // Kunci scroll di body agar tidak scroll ke bawah
  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollY}px`;
  document.body.style.width = '100%';

  // Tambahkan iframe hanya sekali dan tanpa fokus
  if (!iframeLoaded) {
    setTimeout(() => {
      const iframe = document.createElement('iframe');
      iframe.src = "https://open.spotify.com/embed/playlist/4OYcVeIeAB9xmEyFR9ZFJk?utm_source=generator";
      iframe.width = "100%";
      iframe.height = "160";
      iframe.allow = "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture";
      iframe.loading = "lazy";
      iframe.style.border = "none";
      iframe.style.borderRadius = "12px";
      iframe.setAttribute("tabindex", "-1"); // Cegah auto-focus
      iframe.setAttribute("title", "Spotify Playlist");

      spotifyContainer.insertBefore(iframe, spotifyContainer.firstChild);
      iframeLoaded = true;
    }, 250); // Delay render agar tidak terdeteksi langsung oleh browser
  }
});

closeBtn.addEventListener('click', () => {
  // Tutup panel
  musicPanel.classList.remove('active');

  // Aktifkan scroll kembali
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';
  window.scrollTo(0, scrollY); // Kembali ke posisi awal
});