// Typing animation for hero section
const typeText = () => {
    const text = "Welcome to My Portfolio";
    const element = document.querySelector('.animate-typing');
    let index = 0;
    
    element.textContent = '';
    
    const typing = setInterval(() => {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
        } else {
            clearInterval(typing);
        }
    }, 100);
};

// Trigger typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    typeText();
    initializeCodingProfiles();
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Highlight active section in navigation
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('text-blue-600');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('text-blue-600');
        }
    });
});

// Enhanced scroll animations with Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
            
            // Add extra animations for specific elements
            if (entry.target.classList.contains('skill-card')) {
                entry.target.style.transitionDelay = entry.target.dataset.delay || '0ms';
            }
        }
    });
}, observerOptions);

// Apply animations to elements
document.querySelectorAll('.skill-card, .project-card, .animate-fade-in').forEach((el, index) => {
    el.classList.add('opacity-0', 'translate-y-10', 'transition-all', 'duration-500');
    el.dataset.delay = `${index * 100}ms`;
    animateOnScroll.observe(el);
});

// Particle effect for hero section background
const createParticles = () => {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'absolute inset-0 overflow-hidden pointer-events-none';
    document.querySelector('#home').appendChild(particlesContainer);

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute bg-white rounded-full';
        particle.style.width = Math.random() * 4 + 'px';
        particle.style.height = particle.style.width;
        particle.style.opacity = Math.random() * 0.5;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${Math.random() * 10 + 5}s linear infinite`;
        particlesContainer.appendChild(particle);
    }
};

createParticles();

// Add hover effect for skill cards
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.querySelector('i').classList.add('animate-bounce');
    });
    card.addEventListener('mouseleave', () => {
        card.querySelector('i').classList.remove('animate-bounce');
    });
});

// Coding Profiles Configuration
const LEETCODE_USERNAME = 'varshith89';
const GFG_USERNAME = 'varshith892005';

async function updateLeetCodeStats() {
    try {
        const response = await fetch(`https://leetcode-stats-api.herokuapp.com/${LEETCODE_USERNAME}`);
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        
        document.getElementById('leetcode-easy').textContent = data.easySolved || '0';
        document.getElementById('leetcode-medium').textContent = data.mediumSolved || '0';
        document.getElementById('leetcode-hard').textContent = data.hardSolved || '0';
        document.getElementById('leetcode-total').textContent = data.totalSolved || '0';
        document.getElementById('leetcode-ranking').textContent = data.ranking ? `#${data.ranking}` : 'N/A';
        
        document.getElementById('leetcode-profile').href = `https://leetcode.com/${LEETCODE_USERNAME}`;
    } catch (error) {
        console.error('Error fetching LeetCode stats:', error);
        ['easy', 'medium', 'hard', 'total', 'ranking'].forEach(id => {
            document.getElementById(`leetcode-${id}`).textContent = 'Failed to load';
        });
    }
}

async function updateGFGStats() {
    try {
        // Note: GFG doesn't have a public API, using placeholder stats
        document.getElementById('gfg-school').textContent = '25';
        document.getElementById('gfg-basic').textContent = '15';
        document.getElementById('gfg-hard').textContent = '5';
        document.getElementById('gfg-total').textContent = '45';
        document.getElementById('gfg-score').textContent = '250';
        document.getElementById('gfg-rank').textContent = '#500';
        
        document.getElementById('gfg-profile').href = `https://auth.geeksforgeeks.org/user/${GFG_USERNAME}`;
    } catch (error) {
        console.error('Error updating GFG stats:', error);
        ['school', 'basic', 'hard', 'total', 'score', 'rank'].forEach(id => {
            document.getElementById(`gfg-${id}`).textContent = 'Failed to load';
        });
    }
}

// Add loading animation
function addLoadingAnimation() {
    const stats = document.querySelectorAll('#leetcode-easy, #leetcode-medium, #leetcode-hard, #leetcode-total, #leetcode-ranking, #gfg-school, #gfg-basic, #gfg-hard, #gfg-total, #gfg-score, #gfg-rank');
    stats.forEach(stat => {
        stat.classList.add('animate-pulse');
    });
}

// Remove loading animation
function removeLoadingAnimation() {
    const stats = document.querySelectorAll('#leetcode-easy, #leetcode-medium, #leetcode-hard, #leetcode-total, #leetcode-ranking, #gfg-school, #gfg-basic, #gfg-hard, #gfg-total, #gfg-score, #gfg-rank');
    stats.forEach(stat => {
        stat.classList.remove('animate-pulse');
    });
}

// Initialize coding profiles
async function initializeCodingProfiles() {
    await Promise.all([
        updateLeetCodeStats(),
        updateGFGStats()
    ]);
}

document.addEventListener('DOMContentLoaded', initializeCodingProfiles);