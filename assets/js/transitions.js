document.addEventListener('DOMContentLoaded', () => {
  // Add transition class to the main content
  const content = document.querySelector('section');
  content.classList.add('page-transition');

  // Handle all internal navigation
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;
    
    // Only handle internal links
    if (link.hostname !== window.location.hostname) return;
    if (link.target === '_blank') return;
    
    e.preventDefault();
    
    // Add fade-out class
    content.classList.add('fade-out');
    
    // Navigate after animation
    setTimeout(() => {
      window.location = link.href;
    }, 300);
  });

  // Add fade-in class when page loads
  content.classList.add('fade-in');
}); 