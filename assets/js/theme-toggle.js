// assets/js/theme-toggle.js
(function() {
    const toggleButton = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    const defaultTheme = 'dark'; // Your specified default
  
    function setTheme(theme) {
      htmlElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
      updateButton(theme);
    }
  
    function updateButton(theme) {
      if (!toggleButton) return; // Exit if button not found
  
      const isDark = theme === 'dark';
      const newLabel = isDark ? 'Activate light mode' : 'Activate dark mode';
      toggleButton.setAttribute('title', newLabel);
      toggleButton.setAttribute('aria-label', newLabel);
  
      // No need to toggle icon visibility with JS if CSS handles it
      // Just ensure the correct icon is initially visible based on the theme
      // The CSS rules `html:not([data-theme="dark"]) .fa-moon { display: none; }`
      // and `html[data-theme="dark"] .fa-sun { display: none; }` handle this.
    }
  
    function toggleTheme() {
      const activeTheme = htmlElement.getAttribute('data-theme');
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    }
  
    function initializeTheme() {
      // 1. Check localStorage
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        setTheme(savedTheme);
        return; // Exit if we found a saved theme
      }
  
      // 2. Check system preference
      if (prefersDark.matches) {
        setTheme('dark');
        return; // Exit if system preference is dark
      }
  
      // 3. Apply default theme (specified as 'dark')
      setTheme(defaultTheme);
    }
  
    // Add click listener to the button
    if (toggleButton) {
      toggleButton.addEventListener('click', toggleTheme);
    } else {
      console.warn("Theme toggle button #theme-toggle not found.");
    }
  
    // Listen for changes in system preference (optional but recommended)
    prefersDark.addEventListener('change', (e) => {
      // Important: Only change theme based on system preference
      // IF the user hasn't manually set a theme via the toggle (i.e., no localStorage item)
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    });
  
    // Run theme initialization on load
    initializeTheme();
  
  })();