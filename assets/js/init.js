// Immediately set theme before page renders
(function() {
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const currentTheme = localStorage.getItem('theme');
    
    if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
        document.documentElement.classList.add('dark-theme');
    } else {
        document.documentElement.classList.remove('dark-theme');
    }
})();

// About section carousel logic

document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('.about-carousel .carousel-img');
  if (!images.length) return;
  let current = 0;
  let interval = null;

  function showImage(idx) {
    images.forEach((img, i) => {
      img.classList.toggle('active', i === idx);
    });
  }

  function nextImage() {
    current = (current + 1) % images.length;
    showImage(current);
  }

  // Auto-advance every 3 seconds
  function startCarousel() {
    if (interval) clearInterval(interval);
    interval = setInterval(nextImage, 3000);
  }

  // Swipe support for mobile
  let startX = null;
  const carousel = document.querySelector('.about-carousel .carousel-images');
  if (carousel) {
    carousel.addEventListener('touchstart', e => startX = e.touches[0].clientX);
    carousel.addEventListener('touchend', e => {
      if (startX === null) return;
      let endX = e.changedTouches[0].clientX;
      if (endX - startX > 50) {
        current = (current - 1 + images.length) % images.length;
        showImage(current);
        startCarousel();
      }
      if (startX - endX > 50) {
        nextImage();
        startCarousel();
      }
      startX = null;
    });
  }

  showImage(current);
  startCarousel();
});