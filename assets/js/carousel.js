// Carousel logic
document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.querySelector('.about-carousel');
  if (!carousel) return;

  const images = carousel.querySelectorAll('.carousel-img');
  if (!images.length) return;

  let current = 0;
  let startX = null;
  let currentX = null;
  let isDragging = false;
  let animationFrame = null;

  // Create navigation arrows
  const prevButton = document.createElement('button');
  prevButton.className = 'carousel-nav prev';
  prevButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>';
  
  const nextButton = document.createElement('button');
  nextButton.className = 'carousel-nav next';
  nextButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>';

  // Create dots indicator
  const dotsContainer = document.createElement('div');
  dotsContainer.className = 'carousel-dots';
  const dots = [];

  for (let i = 0; i < images.length; i++) {
    const dot = document.createElement('div');
    dot.className = 'carousel-dot';
    dot.addEventListener('click', () => {
      current = i;
      showImage(current);
      updateDots();
    });
    dotsContainer.appendChild(dot);
    dots.push(dot);
  }

  carousel.appendChild(prevButton);
  carousel.appendChild(nextButton);
  carousel.appendChild(dotsContainer);

  function updateDots() {
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === current);
    });
  }

  function showImage(idx) {
    images.forEach((img, i) => {
      img.classList.toggle('active', i === idx);
    });
    updateDots();
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
    
    // Cancel any ongoing animation
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
    }
  }

  function handleDragMove(e) {
    if (!isDragging) return;
    e.preventDefault();
    
    currentX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
    const diff = currentX - startX;
    
    // Add resistance to the drag
    const resistance = 0.5;
    const resistedDiff = diff * resistance;
    
    const activeImage = carouselImages.querySelector('.carousel-img.active');
    activeImage.style.transform = `translateX(${resistedDiff}px)`;
  }

  function handleDragEnd(e) {
    if (!isDragging) return;
    isDragging = false;
    carouselImages.style.cursor = 'grab';
    
    const diff = currentX - startX;
    const activeImage = carouselImages.querySelector('.carousel-img.active');
    
    // Smoothly animate back to center or to next/prev
    const threshold = 50;
    const targetX = Math.abs(diff) > threshold ? 
      (diff > 0 ? -375 : 375) : 0;
    
    const startX = parseFloat(activeImage.style.transform.replace('translateX(', '').replace('px)', '')) || 0;
    const startTime = performance.now();
    const duration = 300; // ms

    function animate(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentX = startX + (targetX - startX) * easeProgress;
      
      activeImage.style.transform = `translateX(${currentX}px)`;
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        activeImage.style.transform = '';
        if (Math.abs(diff) > threshold) {
          if (diff > 0) {
            prevImage();
          } else {
            nextImage();
          }
        }
      }
    }
    
    animationFrame = requestAnimationFrame(animate);
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