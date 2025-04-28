// Fade in sections on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.project-section');
    
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
  
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        section.classList.add('fade-in');
      } else {
        section.classList.remove('fade-in');
      }
    });
  });
  
  // Expand/collapse collaborator links
  function toggleCollaborator(element) {
    element.classList.toggle('open');
  }
  
  // Scroll Progress Bar
  window.addEventListener('scroll', () => {
    const progressBar = document.getElementById('progress-bar');
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
  });
