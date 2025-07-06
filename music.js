const toggleBtn = document.getElementById('togglePlaylist');
const closeBtn = document.getElementById('closePlaylist');
const musicPanel = document.getElementById('musicPanel');
const spotifyContainer = document.getElementById('spotifyContainer');

let iframeLoaded = false;

toggleBtn.addEventListener('click', () => {
  musicPanel.classList.add('active');

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
});
