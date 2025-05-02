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

// Check for saved theme preference or use system preference
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
    document.body.classList.add('dark-theme');
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'block';
    updateSocialIcons(true);
} else {
    document.body.classList.remove('dark-theme');
    sunIcon.style.display = 'block';
    moonIcon.style.display = 'none';
    updateSocialIcons(false);
}

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    
    if (isDark) {
        localStorage.setItem('theme', 'dark');
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
        updateSocialIcons(true);
    } else {
        localStorage.setItem('theme', 'light');
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
        updateSocialIcons(false);
    }
}); 