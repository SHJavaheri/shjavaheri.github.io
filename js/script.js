document.addEventListener('DOMContentLoaded', () => {
    // Animate hero content after page load
    document.querySelector('.hero-content').classList.add('active');

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
  


    // Smooth fade out when clicking project links
    document.querySelectorAll('a.project-card').forEach(link => {
        link.addEventListener('click', function(event) {
        event.preventDefault(); // Stop immediate navigation
        const href = this.getAttribute('href');
    
        document.body.classList.add('fade-out');
    
        setTimeout(() => {
            window.location.href = href;
        }, 500); // Matches your CSS transition time (0.5s)
        });
    });

  
        // Animated Typing Tagline
        const taglineElement = document.getElementById('animated-tagline');
        const taglines = [
            "Built this site instead of studying. 📚🤓",
            "Cloud Architect. ☁️🏗️",
            "Ammar was here. 🧠👀",
            "I love coding. 💻❤️",
            "Professional Googler. 🔍👨‍💻",
            "Fullstack Developer. 🖥️🔧",
            "Coffee is my compiler. ☕💬",
            "Ctrl + C, Ctrl + V Expert. 📋🖱️",
            "Problem Solver. 🧩🛠️",
            "Music Lover. 🎶🎧",
            "404: Sleep Not Found. 🛌🚫",
            "AI Enthusiast. 🤖🚀",
            "I love learning. 📚🔥",
            "Drummer. 🥁🎵",
            "plz hire me... 🙏💼",
            "Pushing to GitHub like a boss. 🧑‍💻🚀",
            "Documented my bugs better than my code. 🐛📜",
            "Still figuring it out. 🤔🛤️",
            "Dreaming in Python. 🐍💭",
            "Definitely not AI... or am I? 🤖👻",
            "StackOverflow disciple. 🧠🧑‍🏫",
            "Saving the world, one line of code at a time. 🌎💻",
            "Turning caffeine into code. ☕➡️💻",
            "Future Tech Wizard. 🧙‍♂️💻",
            "Building the future, one pixel at a time. 🖥️✨",
            "Debugging my way through life. 🐞🔍",
            "Code, coffee, repeat. ☕💻🔁"  
        ];
        let taglineIndex = 0;
        let charIndex = 0;
        let typing = true;
    
        function typeTagline() {
            const currentTagline = taglines[taglineIndex];
            if (typing) {
                taglineElement.textContent = currentTagline.slice(0, ++charIndex);
                if (charIndex === currentTagline.length) {
                    typing = false;
                    setTimeout(typeTagline, 2000); // wait 2 seconds after full tagline
                    return;
                }
            } else {
                taglineElement.textContent = currentTagline.slice(0, --charIndex);
                if (charIndex === 0) {
                    typing = true;
                    taglineIndex = (taglineIndex + 1) % taglines.length;
                }
            }
            setTimeout(typeTagline, typing ? 80 : 50);
        }
    
        typeTagline();


        // Particle Background
        const canvas = document.getElementById('particles');
        const ctx = canvas.getContext('2d');
        let particlesArray;
        let mouse = { x: null, y: null };
        
        function initParticles() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        
            particlesArray = [];
            const numberOfParticles = 150;
            for (let i = 0; i < numberOfParticles; i++) {
                particlesArray.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    baseX: 0,
                    baseY: 0,
                    size: Math.random() * 2 + 1.5,
                    speedX: (Math.random() - 0.5) * 1,
                    speedY: (Math.random() - 0.5) * 1,
                });
            }
        
            // Store base positions
            particlesArray.forEach(p => {
                p.baseX = p.x;
                p.baseY = p.y;
            });
        }
        
        function connectParticles() {
            let opacityThreshold = 100;
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a + 1; b < particlesArray.length; b++) {
                    let dx = particlesArray[a].x - particlesArray[b].x;
                    let dy = particlesArray[a].y - particlesArray[b].y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < opacityThreshold) {
                        ctx.strokeStyle = document.body.classList.contains('dark-mode') ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.stroke();
                    }
                }
            }
        }
        
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = document.body.classList.contains('dark-mode') ? '#ffffffcc' : '#000000cc';
        
            particlesArray.forEach(p => {
                // Apply small parallax movement based on mouse position
                const dx = (mouse.x - canvas.width / 2) * 0.0005;
                const dy = (mouse.y - canvas.height / 2) * 0.0005;                
        
                p.x += p.speedX + dx;
                p.y += p.speedY + dy;
        
                // Bounce off edges
                if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
                if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
        
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            });
        
            connectParticles();
            requestAnimationFrame(animateParticles);
        }
        
        window.addEventListener('resize', initParticles);
        
        // Mouse Move Event
        window.addEventListener('mousemove', function (event) {
            mouse.x = event.x;
            mouse.y = event.y;
        });
        
        // Initialize
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

        // As soon as user interacts, unmute
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

        // Volume slider
        volumeSlider.addEventListener('input', () => {
            audio.volume = volumeSlider.value / 100;
        });

        // Play click sound on interactive elements
        const clickSound = document.getElementById('clickSound');

        // Set manual volume here:
        clickSound.volume = 0.33; // Adjust between 0.0 (silent) to 1.0 (full volume)

        document.addEventListener('click', (event) => {
        const target = event.target;

        if (target.closest('a, button, input[type="button"], input[type="submit"]')) {
            clickSound.currentTime = 0;
            clickSound.play();
        }
        });


        // Initialize EmailJS (make sure this is BEFORE you send anything)
        (function() {
            emailjs.init('gecWJH-I3-MRPCysp'); // Your Public Key here
        })();

        // Initialize EmailJS
        (function() {
            emailjs.init('gecWJH-I3-MRPCysp');
        })();
        
        const contactForm = document.getElementById('contact-form');
        const formStatus = document.getElementById('form-status');
        
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
        
            formStatus.textContent = "Sending...";
        
            const rawMessage = document.getElementById('message').value.trim();
            const formattedMessage = `<pre>${rawMessage}</pre>`;
        
            const now = new Date();
            const formattedTime = now.toLocaleString('en-US', { 
            weekday: 'short', 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
            });
        
            emailjs.send('service_vgzb3g5', 'template_8j8hn8b', {
            user_email: document.getElementById('user_email').value,
            user_name: document.getElementById('user_name').value.split('@')[0], // Default name if you don't have a "Name" field
            subject: document.getElementById('subject').value,
            message: formattedMessage,
            time_sent: formattedTime
            })
            .then(() => {
            formStatus.textContent = "✅ Message Sent Successfully!";
            contactForm.reset();
            })
            .catch((error) => {
            console.error('FAILED...', error);
            formStatus.textContent = "❌ Failed to Send. Please Try Again.";
            });
        });
        
        const clockCanvas = document.getElementById('availabilityClock');
        const clockCtx = clockCanvas.getContext('2d');
        const statusText = document.getElementById('availability-status');
        
        function getLocalESTTime() {
            const now = new Date();
            const offset = now.getTimezoneOffset();
            const isDST = now.getMonth() > 2 && now.getMonth() < 10; // Rough DST check
            const estOffset = isDST ? -4 : -5; // EDT in summer, EST in winter
            const localEST = new Date(now.getTime() + (offset + estOffset * 60) * 60000);
            return localEST;
        }
        
        function drawClock() {
            const est = getLocalESTTime();
        
            const hours = est.getHours();
            const minutes = est.getMinutes();
            const seconds = est.getSeconds();
        
            const isWeekend = (est.getDay() === 0 || est.getDay() === 6); // Sunday=0, Saturday=6
            const availableStart = isWeekend ? 10 : 9;
            const availableEnd = isWeekend ? 18 : 21;
        
            const isAvailable = hours >= availableStart && hours < availableEnd;
        
            // Update text
            statusText.textContent = isAvailable ? "✅ Currently Available" : "❌ Currently Unavailable";
            statusText.style.color = isAvailable ? "green" : "red";
        
            // Clear and center
            clockCtx.clearRect(0, 0, clockCanvas.width, clockCanvas.height);
            const centerX = clockCanvas.width / 2;
            const centerY = clockCanvas.height / 2;
            const radius = centerX * 0.9;
            clockCtx.save();
            clockCtx.translate(centerX, centerY);
        
            // Background circle
            clockCtx.beginPath();
            clockCtx.arc(0, 0, radius, 0, 2 * Math.PI);
            clockCtx.fillStyle = getComputedStyle(document.body).getPropertyValue('--section-background').trim();
            clockCtx.fill();
            clockCtx.closePath();
        
            // Availability Circle (FULL green or red based on availability)
            clockCtx.beginPath();
            clockCtx.lineWidth = 10;
            clockCtx.strokeStyle = isAvailable ? "lightgreen" : "lightcoral";
            clockCtx.arc(0, 0, radius * 0.85, 0, 2 * Math.PI);
            clockCtx.stroke();
            clockCtx.closePath();
        
            // Tick marks
            for (let i = 0; i < 12; i++) {
                const angle = (i * Math.PI) / 6;
                const inner = radius * 0.8;
                const outer = radius * 0.9;
                clockCtx.beginPath();
                clockCtx.moveTo(inner * Math.cos(angle), inner * Math.sin(angle));
                clockCtx.lineTo(outer * Math.cos(angle), outer * Math.sin(angle));
                clockCtx.strokeStyle = document.body.classList.contains('dark-mode') ? '#ccc' : '#555';
                clockCtx.lineWidth = 2;
                clockCtx.stroke();
            }
        
            // Hands
            drawHand((hours % 12 + minutes / 60) * 30, radius * 0.5, 6, clockCtx); // hour
            drawHand((minutes + seconds / 60) * 6, radius * 0.7, 4, clockCtx);      // minute
            drawHand(seconds * 6, radius * 0.8, 2, clockCtx, "#e63946");            // second (red)
        
            clockCtx.restore();
        }
        
        function drawHand(angleDegrees, length, width, ctx, color = "#333") {
            const angleRadians = (Math.PI / 180) * angleDegrees;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.rotate(angleRadians);
            ctx.lineTo(0, -length);
            ctx.strokeStyle = color;
            ctx.lineWidth = width;
            ctx.lineCap = "round";
            ctx.stroke();
            ctx.rotate(-angleRadians);
        }
        
        // Animate clock
        setInterval(drawClock, 1000);
        drawClock();
        

});
