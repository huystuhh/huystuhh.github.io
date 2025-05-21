// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const sunIcon = document.querySelector('.sun-icon');
const moonIcon = document.querySelector('.moon-icon');
const socialIcons = document.querySelectorAll('.social-media img');

// Function to update social icons based on theme
function updateSocialIcons(isDark) {
    socialIcons.forEach(icon => {
        const currentSrc = icon.src;
        if (isDark) {
            // In dark mode, use color version by default
            icon.src = currentSrc.replace('.png', '-color.png');
            icon.onmouseover = function() {
                this.src = this.src.replace('-color.png', '.png');
            };
            icon.onmouseout = function() {
                this.src = this.src.replace('.png', '-color.png');
            };
        } else {
            // In light mode, use normal version by default
            icon.src = currentSrc.replace('-color.png', '.png');
            icon.onmouseover = function() {
                this.src = this.src.replace('.png', '-color.png');
            };
            icon.onmouseout = function() {
                this.src = this.src.replace('-color.png', '.png');
            };
        }
    });
}

// Function to set theme
function setTheme(isDark) {
    if (isDark) {
        document.documentElement.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
        updateSocialIcons(true);
    } else {
        document.documentElement.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
        updateSocialIcons(false);
    }
}

// Initialize theme on page load
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Use saved theme if it exists, otherwise use system preference
    const isDark = savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches);
    setTheme(isDark);
}

// Initialize theme when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeTheme);

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
    const isDark = !document.documentElement.classList.contains('dark-theme');
    setTheme(isDark);
});