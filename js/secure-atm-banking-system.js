// Apply saved theme on project pages
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark-mode');
} else {
  document.body.classList.remove('dark-mode');
}

// Dark Mode Toggle + Ripple
const toggleButton = document.getElementById('darkModeToggle');
const modeIcon = document.getElementById('modeIcon');
const ripple = document.getElementById('ripple');

function updateProjectImages() {
  const isDarkMode = document.body.classList.contains('dark-mode');
  const projectImages = document.querySelectorAll('.project-img');

  projectImages.forEach(img => {
    if (isDarkMode) {
      img.src = img.getAttribute('data-dark');
    } else {
      img.src = img.getAttribute('data-light');
    }
  });
}

// Set correct theme icon on load
if (modeIcon) {
  if (document.body.classList.contains('dark-mode')) {
    modeIcon.textContent = "🌙";
  } else {
    modeIcon.textContent = "☀️";
  }
}
updateProjectImages();

// Dark mode toggle functionality with ripple
if (toggleButton) {
  toggleButton.addEventListener('click', (e) => {
    const x = e.clientX;
    const y = e.clientY;

    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.transition = 'none';
    ripple.style.transform = 'scale(0)';
    ripple.style.opacity = '0.5';

    void ripple.offsetWidth; // Force reflow

    ripple.style.transition = 'transform 0.8s ease-out, opacity 0.8s ease-out';
    ripple.style.transform = 'scale(80)';
    ripple.style.opacity = '0';

    setTimeout(() => {
      document.body.classList.toggle('dark-mode');

      if (document.body.classList.contains('dark-mode')) {
        modeIcon.textContent = "🌙";
        localStorage.setItem('theme', 'dark');
      } else {
        modeIcon.textContent = "☀️";
        localStorage.setItem('theme', 'light');
      }

      updateProjectImages();
    }, 300);
  });
}

// Flashlight Effect
document.addEventListener('mousemove', function(e) {
  document.documentElement.style.setProperty('--cursorX', e.clientX + 'px');
  document.documentElement.style.setProperty('--cursorY', e.clientY + 'px');
});



// Floating Particles in Hero Section
const canvas = document.getElementById('heroParticles');
const ctx = canvas.getContext('2d');
let particlesArray;

function initParticles() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  particlesArray = [];

  const numberOfParticles = 50;
  for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
    });
  }
}

function handleParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < particlesArray.length; i++) {
    const p = particlesArray[i];
    p.x += p.speedX;
    p.y += p.speedY;

    // If particle goes off screen, reposition
    if (p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
      p.x = Math.random() * canvas.width;
      p.y = Math.random() * canvas.height;
      p.size = Math.random() * 3 + 1;
      p.speedX = (Math.random() - 0.5) * 0.5;
      p.speedY = (Math.random() - 0.5) * 0.5;
    }

    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function animateParticles() {
  handleParticles();
  requestAnimationFrame(animateParticles);
}

window.addEventListener('resize', initParticles);

initParticles();
animateParticles();









// Ambient Audio Control
const audio = document.getElementById('ambientAudio');
const audioToggle = document.getElementById('audioToggle');
const volumeSlider = document.getElementById('volumeSlider');

// Set initial volume
audio.volume = 0.05;
audio.muted = true;

// Try to autoplay muted (browser safe)
audio.play().catch(e => console.log("Autoplay muted."));

function unmuteAudio() {
  audio.muted = false;
  audio.play();
  document.body.removeEventListener('click', unmuteAudio);
  document.body.removeEventListener('keydown', unmuteAudio);
  document.body.removeEventListener('scroll', unmuteAudio);
}
document.body.addEventListener('click', unmuteAudio);
document.body.addEventListener('keydown', unmuteAudio);
document.body.addEventListener('scroll', unmuteAudio);

// Mute/unmute button
if (audioToggle) {
  audioToggle.addEventListener('click', () => {
    if (audio.muted) {
      audio.muted = false;
      audio.play();
      audioToggle.textContent = "🔊";
    } else {
      audio.muted = true;
      audioToggle.textContent = "🔈";
    }
  });
}

// Volume slider
if (volumeSlider) {
  volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value / 100;
  });
}

// Mouse Click Sound
const clickSound = document.getElementById('clickSound');
if (clickSound) {
  clickSound.volume = 0.33; // Adjust click sound volume

  document.addEventListener('click', (event) => {
    const target = event.target;
    if (target.closest('a, button, input[type="button"], input[type="submit"]')) {
      clickSound.currentTime = 0;
      clickSound.play();
    }
  });
}






// Scroll-based features (fade-in sections + progress bar)
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('.project-section');
  const progressBar = document.getElementById('progress-bar');

  // Fade in/out sections
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      section.classList.add('fade-in');
    } else {
      section.classList.remove('fade-in');
    }
  });

  // Update scroll progress bar
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  if (progressBar) {
    progressBar.style.width = scrollPercent + '%';
  }
});

// Expand/collapse collaborator links
function toggleCollaborator(element) {
  element.classList.toggle('open');
}
