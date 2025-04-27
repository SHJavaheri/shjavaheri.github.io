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
  