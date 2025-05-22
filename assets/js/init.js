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
  const carousel = document.querySelector('.about-carousel');
  if (!carousel) return;

  const images = carousel.querySelectorAll('.carousel-img');
  if (!images.length) return;

  let current = 0;
  let startX = null;
  let currentX = null;
  let isDragging = false;

  // Create navigation arrows
  const prevButton = document.createElement('button');
  prevButton.className = 'carousel-nav prev';
  prevButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>';
  
  const nextButton = document.createElement('button');
  nextButton.className = 'carousel-nav next';
  nextButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>';

  carousel.appendChild(prevButton);
  carousel.appendChild(nextButton);

  function showImage(idx) {
    images.forEach((img, i) => {
      img.classList.toggle('active', i === idx);
    });
  }

  function nextImage() {
    current = (current + 1) % images.length;
    showImage(current);
  }

  function prevImage() {
    current = (current - 1 + images.length) % images.length;
    showImage(current);
  }

  // Touch and mouse event handlers
  const carouselImages = carousel.querySelector('.carousel-images');

  function handleDragStart(e) {
    isDragging = true;
    startX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
    currentX = startX;
    carouselImages.style.cursor = 'grabbing';
  }

  function handleDragMove(e) {
    if (!isDragging) return;
    e.preventDefault();
    currentX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
    const diff = currentX - startX;
    const activeImage = carouselImages.querySelector('.carousel-img.active');
    activeImage.style.transform = `translateX(${diff}px)`;
  }

  function handleDragEnd(e) {
    if (!isDragging) return;
    isDragging = false;
    carouselImages.style.cursor = 'grab';
    
    const diff = currentX - startX;
    const activeImage = carouselImages.querySelector('.carousel-img.active');
    activeImage.style.transform = '';

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        prevImage();
      } else {
        nextImage();
      }
    }
  }

  // Event listeners
  carouselImages.addEventListener('mousedown', handleDragStart);
  carouselImages.addEventListener('touchstart', handleDragStart);
  
  document.addEventListener('mousemove', handleDragMove);
  document.addEventListener('touchmove', handleDragMove);
  
  document.addEventListener('mouseup', handleDragEnd);
  document.addEventListener('touchend', handleDragEnd);

  // Navigation button event listeners
  prevButton.addEventListener('click', prevImage);
  nextButton.addEventListener('click', nextImage);

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prevImage();
    } else if (e.key === 'ArrowRight') {
      nextImage();
    }
  });

  // Initial display
  showImage(current);
});