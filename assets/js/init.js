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
  const carousel = document.querySelector('.carousel');
  if (!carousel) return;

  const images = carousel.querySelectorAll('.carousel-img');
  if (!images.length) return;

  let current = 0;

  // Remove any existing navigation elements
  const existingNav = carousel.querySelector('.carousel-nav');
  if (existingNav) existingNav.remove();

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