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