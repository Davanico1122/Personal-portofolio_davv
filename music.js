let scrollY = 0;

toggleBtn.addEventListener('click', () => {
  musicPanel.classList.add('active');

  // Cegah scroll halaman
  scrollY = window.scrollY;
  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollY}px`;
  document.body.style.width = '100%';

  if (!iframeLoaded) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('iframe-wrapper');

    const iframe = document.createElement('iframe');
    iframe.src = "https://open.spotify.com/embed/playlist/4OYcVeIeAB9xmEyFR9ZFJk?utm_source=generator";
    iframe.width = "100%";
    iframe.height = "160";
    iframe.allow = "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture";
    iframe.loading = "lazy";
    iframe.style.border = "none";
    iframe.style.borderRadius = "12px";
    iframe.tabIndex = "-1";

    wrapper.appendChild(iframe);
    spotifyContainer.insertBefore(wrapper, spotifyContainer.firstChild);
    iframeLoaded = true;
  }
});

closeBtn.addEventListener('click', () => {
  musicPanel.classList.remove('active');

  // Aktifkan kembali scroll halaman
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';
  window.scrollTo(0, scrollY);
});
