const toggleBtn = document.getElementById('togglePlaylist');
const closeBtn = document.getElementById('closePlaylist');
const musicPanel = document.getElementById('musicPanel');
const body = document.body;

// Toggle panel
toggleBtn.addEventListener('click', () => {
  musicPanel.classList.add('active');
  body.classList.add('no-scroll');
});

// Tutup panel
closeBtn.addEventListener('click', () => {
  musicPanel.classList.remove('active');
  body.classList.remove('no-scroll');
});
