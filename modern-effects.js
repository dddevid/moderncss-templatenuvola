/**
 * modern-effects.js - Modern UI effects and animations for Nuvola
 * Complements the modern-dark.css theme with interactive elements
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize the theme
  initTheme();
  
  // Add animation classes to elements
  addAnimations();
  
  // Add glassmorphism effects
  enhanceGlassmorphism();
  
  // Create and add dark mode toggle
  createDarkModeToggle();
  
  // Add hover effects to cards
  addCardEffects();
});

/**
 * Initialize the theme by adding the CSS link to the head
 */
function initTheme() {
  // Check if the CSS is already loaded
  if (!document.querySelector('link[href="modern-dark.css"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = 'modern-dark.css';
    document.head.appendChild(link);
  }
  
  // Add a class to the body for theme-specific styling
  document.body.classList.add('modern-dark-theme');
}

/**
 * Add animation classes to various elements
 */
function addAnimations() {
  // Stagger the animation of cards
  const cards = document.querySelectorAll('.Card-sc-e52eln-0, .HomeCard__Paper-sc-715mop-0');
  cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
  });
  
  // Add subtle entrance animations to other elements
  const headers = document.querySelectorAll('h1, h2, h3');
  headers.forEach((header) => {
    header.style.opacity = '0';
    header.style.animation = 'fadeIn 0.5s ease-out forwards';
  });
}

/**
 * Enhance glassmorphism effects by adding dynamic blur on scroll
 */
function enhanceGlassmorphism() {
  // Get all elements with glassmorphism
  const glassElements = document.querySelectorAll(
    '.Card-sc-e52eln-0, .HomeCard__Paper-sc-715mop-0, .Paper-sc-1mh5yij-0, .MuiPaper-root, nav, .AppBar-sc-1386zak-0, .MuiAppBar-root'
  );
  
  // Add scroll event to adjust blur intensity
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const maxBlur = 15; // Maximum blur in pixels
    const minBlur = 5;  // Minimum blur in pixels
    
    // Calculate blur based on scroll position (more scroll = more blur)
    const scrollFactor = Math.min(scrollPosition / 500, 1);
    const blurValue = minBlur + (scrollFactor * (maxBlur - minBlur));
    
    // Apply to all glass elements
    glassElements.forEach(element => {
      element.style.backdropFilter = `blur(${blurValue}px)`;
      element.style.webkitBackdropFilter = `blur(${blurValue}px)`;
    });
  });
}

/**
 * Create and add a dark mode toggle button
 */
function createDarkModeToggle() {
  // Create the toggle button
  const toggle = document.createElement('div');
  toggle.className = 'dark-mode-toggle';
  toggle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
  
  // Add click event to toggle between light and dark themes
  toggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    
    // Update the icon based on current theme
    if (document.body.classList.contains('light-theme')) {
      toggle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
    } else {
      toggle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
    }
    
    // Add a pulse animation to the toggle
    toggle.style.animation = 'pulse 0.5s';
    setTimeout(() => {
      toggle.style.animation = '';
    }, 500);
  });
  
  // Add to the document
  document.body.appendChild(toggle);
}

/**
 * Add interactive effects to cards
 */
function addCardEffects() {
  const cards = document.querySelectorAll('.Card-sc-e52eln-0, .HomeCard__Paper-sc-715mop-0');
  
  cards.forEach(card => {
    // Add 3D tilt effect on mouse move
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within the element
      const y = e.clientY - rect.top;  // y position within the element
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const deltaX = (x - centerX) / centerX * 10; // max 10 degrees
      const deltaY = (y - centerY) / centerY * 10;
      
      card.style.transform = `perspective(1000px) rotateX(${-deltaY}deg) rotateY(${deltaX}deg) translateZ(10px)`;
    });
    
    // Reset transform on mouse leave
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateZ(0)';
      card.style.transition = 'transform 0.5s ease';
    });
    
    // Add subtle glow effect on hover
    card.addEventListener('mouseenter', () => {
      card.style.boxShadow = `0 10px 30px rgba(8, 73, 205, 0.3), 0 0 20px rgba(90, 148, 255, 0.2)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.boxShadow = '';
    });
  });
}

/**
 * Create a notification element
 * @param {string} message - The notification message
 * @param {string} type - The type of notification (success, warning, error)
 * @param {number} duration - How long to show the notification in ms
 */
function showNotification(message, type = 'success', duration = 3000) {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = message;
  
  // Add to document
  document.body.appendChild(notification);
  
  // Position it
  notification.style.position = 'fixed';
  notification.style.top = '20px';
  notification.style.right = '20px';
  notification.style.zIndex = '9999';
  
  // Add close button
  const closeBtn = document.createElement('span');
  closeBtn.innerHTML = '&times;';
  closeBtn.style.marginLeft = '10px';
  closeBtn.style.cursor = 'pointer';
  closeBtn.addEventListener('click', () => {
    notification.style.opacity = '0';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  });
  notification.appendChild(closeBtn);
  
  // Auto remove after duration
  setTimeout(() => {
    notification.style.opacity = '0';
    setTimeout(() => {
      if (notification.parentNode) {
        document.body.removeChild(notification);
      }
    }, 300);
  }, duration);
}

/**
 * Add a loading spinner to an element
 * @param {HTMLElement} element - The element to add the spinner to
 * @param {boolean} show - Whether to show or hide the spinner
 */
function toggleLoadingSpinner(element, show = true) {
  if (show) {
    const spinner = document.createElement('div');
    spinner.className = 'loading-spinner';
    element.appendChild(spinner);
  } else {
    const spinner = element.querySelector('.loading-spinner');
    if (spinner) {
      element.removeChild(spinner);
    }
  }
}

// Export functions for external use
window.nuvolaModernUI = {
  showNotification,
  toggleLoadingSpinner
};
