document.addEventListener('DOMContentLoaded', () => {
    // Dark Mode Toggle + Ripple
    const toggleButton = document.getElementById('darkModeToggle');
    const modeIcon = document.getElementById('modeIcon');
    const ripple = document.getElementById('ripple');

    // On page load, apply saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if (modeIcon) modeIcon.textContent = "🌙";
    } else {
        document.body.classList.remove('dark-mode');
        if (modeIcon) modeIcon.textContent = "☀️";
    }

    if (toggleButton && ripple) {
        toggleButton.addEventListener('click', () => {
            ripple.style.transition = 'none';
            ripple.style.transform = 'scale(0)';
            ripple.style.opacity = '0.5';

            // Force reflow (restart animation)
            void ripple.offsetWidth;

            ripple.style.transition = 'transform 0.8s ease-out, opacity 0.8s ease-out';
            ripple.style.transform = 'scale(50)';
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
            }, 300);
        });
    }

    // Hamburger Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when a nav link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // Flashlight effect (only active in dark mode)
    const flashlight = document.getElementById('flashlight');

    if (flashlight) {
        document.addEventListener('mousemove', (e) => {
            if (document.body.classList.contains('dark-mode')) {
                flashlight.style.opacity = '1';
                flashlight.style.left = `${e.clientX}px`;
                flashlight.style.top = `${e.clientY}px`;
            } else {
                flashlight.style.opacity = '0';
            }
        });
    }

    // Ambient Audio Control
    const audio = document.getElementById('ambientAudio');
    const audioToggle = document.getElementById('audioToggle');
    const volumeSlider = document.getElementById('volumeSlider');

    if (audio && audioToggle && volumeSlider) {
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
    }

    // Play click sound on interactive elements
    const clickSound = document.getElementById('clickSound');

    if (clickSound) {
        clickSound.volume = 0.33;

        document.addEventListener('click', (event) => {
            const target = event.target;

            if (target.closest('a, button, input[type="button"], input[type="submit"]')) {
                clickSound.currentTime = 0;
                clickSound.play();
            }
        });
    }

    // Smooth fade out when clicking nav links
    document.querySelectorAll('a').forEach(link => {
        // Only apply to navigation links, not review action links
        if (link.closest('.nav-links') || link.closest('.actions')) {
            link.addEventListener('click', function(event) {
                // Skip if it's an external link or anchor link
                const href = this.getAttribute('href');
                if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto')) {
                    return;
                }

                event.preventDefault();
                document.body.classList.add('fade-out');

                setTimeout(() => {
                    window.location.href = href;
                }, 500);
            });
        }
    });

    // Particle Background System
    const canvas = document.getElementById('particles');
    if (canvas) {
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
        
        // Initialize particles
        initParticles();
        animateParticles();
    }

    // Animate hero content after particle system is initialized
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        // Add a small delay to ensure particles are rendering
        setTimeout(() => {
            heroContent.classList.add('active');
        }, 100);
    }

    // Load reviews after DOM is ready
    loadReviews();
});

// Reviews functionality (FIXED VERSION)
async function loadReviews() {
    const csvUrl =
        (typeof window !== "undefined" && window.REVIEWS_CSV_URL) ||
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vR_W-Xrxcmum83gHN5CERgH0ZOmoUCUcB-OJex4VdH9SY0oFNhl5eZciObbWvD3aIKFjJjzSBtW8ETF/pub?gid=180390069&single=true&output=csv";

    const list = document.getElementById("reviews");
    const avgBadge = document.getElementById("avg");
    const avgNum = document.getElementById("avgNum");
    const avgStars = document.getElementById("avgStars");
    const totalCountEl = document.getElementById("totalCount");
    const distRows = document.getElementById("distRows");
    const loading = document.getElementById("loading");
    const err = document.getElementById("err");
    const empty = document.getElementById("empty");

    try {
        if (!csvUrl) throw new Error("CSV URL missing");
        const res = await fetch(csvUrl, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch CSV (" + res.status + ")");
        const text = await res.text();

        if (typeof Papa === "undefined") throw new Error("Papa Parse not loaded");
        const parsed = Papa.parse(text, { header: true, skipEmptyLines: true });

        const reviews = (parsed.data || [])
            .map(r => ({
                name: (r["Display Name"] || "").trim(),
                rating: Number(r["Rating"]),
                comment: (r["Comment"] || "").trim()
            }))
            .filter(r => r.name && r.comment && r.rating >= 1 && r.rating <= 5);

        if (loading) loading.style.display = "none";

        if (!reviews.length) {
            if (empty) empty.style.display = "block";
            return;
        }

        // Average and total
        const total = reviews.length;
        const avg = reviews.reduce((s, r) => s + r.rating, 0) / total;
        const avgFixed = avg.toFixed(1);
        
        if (avgNum) avgNum.textContent = avgFixed;
        if (avgBadge) avgBadge.textContent = `${avgFixed}/5`;
        if (totalCountEl) totalCountEl.textContent = String(total);
        if (avgStars) avgStars.innerHTML = makeStars(Math.round(avg));

        // Distribution counts (5..1)
        const counts = [0, 0, 0, 0, 0, 0]; // index by rating
        reviews.forEach(r => counts[r.rating]++);
        
        if (distRows) {
            distRows.innerHTML = "";
            for (let star = 5; star >= 1; star--) {
                const count = counts[star];
                const pct = total > 0 ? Math.round((count / total) * 100) : 0;
                const row = document.createElement("div");
                row.className = "dist-row";
                row.innerHTML = `
                    <div class="dist-label">${star}.0</div>
                    <div class="dist-track">
                        <div class="dist-fill" data-width="${pct}"></div>
                    </div>
                    <div class="dist-count">${count} ${count === 1 ? "review" : "reviews"}</div>
                `;
                distRows.appendChild(row);
            }
            
            // Animate bars after DOM insertion
            // Animate bars after DOM insertion (better timing with requestAnimationFrame)
            const fills = distRows.querySelectorAll('.dist-fill');
            requestAnimationFrame(() => {
                fills.forEach(fill => {
                    let raw = (fill.getAttribute('data-width') || '').trim();
                    let num = parseFloat(raw);
                    if (isNaN(num)) num = 0;
                    num = Math.max(0, Math.min(100, num));
                    fill.style.width = num + '%';
                });
            });
            console.log("Bar widths:", Array.from(fills).map(f => f.getAttribute("data-width")));
        }

        // Render review cards with staggered animation
        if (list) {
            list.innerHTML = "";
            reviews.forEach((r, idx) => {
                const li = document.createElement("li");
                li.className = "review card";
                li.style.animationDelay = `${idx * 0.1}s`;
                const initials = getInitials(r.name);
                li.innerHTML = `
                    <div class="row">
                        <div class="identity">
                            <div class="avatar">${escapeHtml(initials)}</div>
                            <div>
                                <div class="name">${escapeHtml(r.name)}</div>
                                <div class="small-muted"></div>
                            </div>
                        </div>
                        <div class="stars" aria-label="${r.rating} out of 5 stars">
                            ${makeStars(r.rating)}
                        </div>
                    </div>
                    <div class="comment">${escapeHtml(r.comment)}</div>
                `;
                list.appendChild(li);
            });
        }
    } catch (e) {
        console.error(e);
        if (loading) loading.style.display = "none";
        if (err) err.style.display = "block";
    }
}

function makeStars(n) {
    const rating = Math.max(1, Math.min(5, Number(n) || 0));
    return "★".repeat(rating) + "☆".repeat(5 - rating);
}

function getInitials(name) {
    const parts = name.split(/\s+/).filter(Boolean);
    if (parts.length === 0) return "?";
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function escapeHtml(s) {
    return s.replace(/[&<>"']/g, c => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
    }[c]));
}
