document.addEventListener('DOMContentLoaded', () => {
    // Dark Mode Toggle + Ripple
    const toggleButton = document.getElementById('darkModeToggle');
    const modeIcon = document.getElementById('modeIcon');
    const ripple = document.getElementById('ripple');

    // Function to update project images based on mode
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

    toggleButton.addEventListener('click', () => {
        ripple.style.transition = 'none';
        ripple.style.transform = 'scale(0)';
        ripple.style.opacity = '0.5';

        void ripple.offsetWidth;

        ripple.style.transition = 'transform 0.8s ease-out, opacity 0.8s ease-out';
        ripple.style.transform = 'scale(50)';
        ripple.style.opacity = '0';

        setTimeout(() => {
            document.body.classList.toggle('dark-mode');

            if (document.body.classList.contains('dark-mode')) {
                modeIcon.textContent = "🌙"; 
            } else {
                modeIcon.textContent = "☀️"; 
            }

            updateProjectImages(); // Update project images after theme switch
        }, 300);
    });

    // About Me: Smooth "Keep Reading" Expand/Collapse
    const toggleButtonAbout = document.getElementById('toggleMoreAboutMe');
    const moreAboutMe = document.getElementById('moreAboutMe');

    toggleButtonAbout.addEventListener('click', () => {
        if (moreAboutMe.classList.contains('expanded')) {
            // Collapse
            moreAboutMe.style.height = moreAboutMe.scrollHeight + 'px'; // Set height to current to trigger transition
            requestAnimationFrame(() => {
                moreAboutMe.style.height = '0';
                moreAboutMe.classList.remove('expanded');
            });
            toggleButtonAbout.textContent = 'Keep Reading';
        } else {
            // Expand
            moreAboutMe.style.height = 'auto';
            const fullHeight = moreAboutMe.scrollHeight + 'px';
            moreAboutMe.style.height = '0'; // Reset to 0 first
            requestAnimationFrame(() => {
                moreAboutMe.style.height = fullHeight;
                moreAboutMe.classList.add('expanded');
            });
            toggleButtonAbout.textContent = 'Show Less';
        }
    });

    // Reset height to auto after expand animation ends
    moreAboutMe.addEventListener('transitionend', () => {
        if (moreAboutMe.classList.contains('expanded')) {
            moreAboutMe.style.height = 'auto';
        }
    });

    // Hamburger Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when a nav link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Initial check: If page loads already in dark mode (e.g., user reloads while dark mode is active)
    updateProjectImages();


    // Flashlight effect (only active in dark mode)
    const flashlight = document.getElementById('flashlight');

    document.addEventListener('mousemove', (e) => {
        if (document.body.classList.contains('dark-mode')) {
            flashlight.style.opacity = '1';
            flashlight.style.left = `${e.clientX}px`;
            flashlight.style.top = `${e.clientY}px`;
        } else {
            flashlight.style.opacity = '0';
        }
    });


    // Scroll fade for timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');

    const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
        entry.target.classList.add('active');
        } else {
        entry.target.classList.remove('active');
        }
    });
    }, {
    threshold: 0.3
    });

    timelineItems.forEach(item => {
    observer.observe(item);
    });

});
