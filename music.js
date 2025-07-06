document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.getElementById('togglePlaylist');
  const closeBtn = document.getElementById('closePlaylist');
  const musicPanel = document.getElementById('musicPanel');

  if (toggleBtn && closeBtn && musicPanel) {
    toggleBtn.addEventListener('click', () => {
      musicPanel.classList.add('active');
    });

    closeBtn.addEventListener('click', () => {
      musicPanel.classList.remove('active');
    });
  }
});
