document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Custom Cursor ---
    const customCursor = document.getElementById('custom-cursor');

    // Only enable custom cursor if it's not a touch device
    if (window.matchMedia("(pointer: fine)").matches) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;
            
            // Fast follow for custom cursor
            if (customCursor) {
                customCursor.style.left = `${posX}px`;
                customCursor.style.top = `${posY}px`;
            }
        });

        // Hover effect for interactive elements
        const iterables = document.querySelectorAll('a, button, .glass-card');
        iterables.forEach((el) => {
            el.addEventListener('mouseenter', () => {
                document.body.classList.add('hover-active');
            });
            el.addEventListener('mouseleave', () => {
                document.body.classList.remove('hover-active');
            });
        });
    }

    // --- 2. Loading Screen ---
    const loader = document.getElementById('loader');
    const progressFill = document.getElementById('progress-fill');

    let progress = 0;
    const totalDuration = 1000; // Exactly 1 second
    const intervalTime = 20;    // Smoothness (20ms updates)
    const increment = (intervalTime / totalDuration) * 100;

    const loadInterval = setInterval(() => {
        progress += increment;

        if (progress >= 100) {
            progress = 100;
            clearInterval(loadInterval);

            // Short pause at 100% for visual satisfaction, then fade
            setTimeout(() => {
                loader.classList.add('fade-out');
            }, 200);
        }

        progressFill.style.width = `${progress}%`;
    }, intervalTime);

    // --- 3. Navbar Sticky Effect & Scroll spy ---
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link logic
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });


});

// --- Modal Logic (Global Scope) ---
function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // prevent background scrolling
    }
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = "none";
        document.body.style.overflow = 'auto';
    }
}
