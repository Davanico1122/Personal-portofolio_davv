const openBtn = document.querySelector('.open-btn');
const musicSlide = document.querySelector('.music-slide');
const body = document.body;

openBtn.addEventListener('click', () => {
  musicSlide.classList.toggle('active');

  // Toggle scroll website
  if (musicSlide.classList.contains('active')) {
    body.classList.add('no-scroll');
  } else {
    body.classList.remove('no-scroll');
  }
});
