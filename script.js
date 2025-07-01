// Global variables
let currentSearchQuery = '';

// Initialize the appropriate page
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname;
    
    if (currentPage.includes('search.html')) {
        initializeSearchPage();
    } else {
        initializeHomePage();
    }
});

// Homepage initialization
function initializeHomePage() {
    const searchInput = document.getElementById('searchInput');
    const googleSearchBtn = document.getElementById('googleSearchBtn');
    const feelingLuckyBtn = document.getElementById('feelingLuckyBtn');
    
    if (!searchInput || !googleSearchBtn || !feelingLuckyBtn) {
        console.error('Homepage elements not found');
        return;
    }
    
    // Handle search input
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            performSearch();
        }
    });
    
    // Handle button clicks
    googleSearchBtn.addEventListener('click', function(e) {
        e.preventDefault();
        performSearch();
    });
    
    feelingLuckyBtn.addEventListener('click', function(e) {
        e.preventDefault();
        // Go to random project
        const projects = ['project1.html', 'project2.html', 'project3.html', ' project4.html',];
        const randomProject = projects[Math.floor(Math.random() * projects.length)];
        window.location.href = randomProject;
    });
    
    // Focus on search input
    searchInput.focus();
}

// Search page initialization
function initializeSearchPage() {
    // Get search query from URL
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q') || '';
    const tab = urlParams.get('tab') || 'all';
    
    currentSearchQuery = query;
    
    // Update search input
    const searchInput = document.getElementById('headerSearchInput');
    if (searchInput) {
        searchInput.value = query;
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const newQuery = this.value.trim();
                if (newQuery) {
                    updateSearchResults(newQuery, getActiveTab());
                }
            }
        });
    }
    
    // Initialize tabs
    initializeTabs(tab);
    
    // Display search results
    updateSearchResults(query, tab);
    
    // Add click handlers for tabs
    document.querySelectorAll('.tab').forEach(tabElement => {
        tabElement.addEventListener('click', function(e) {
            e.preventDefault();
            const tabName = this.getAttribute('data-tab');
            switchTab(tabName);
        });
    });
}

// Perform search from homepage
function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput ? searchInput.value.trim() : '';
    
    if (query) {
        window.location.href = `search.html?q=${encodeURIComponent(query)}&tab=all`;
    } else {
        window.location.href = 'search.html?tab=all';
    }
}

// Initialize tabs
function initializeTabs(activeTab = 'all') {
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
        if (tab.getAttribute('data-tab') === activeTab) {
            tab.classList.add('active');
        }
    });
}

// Switch between tabs
function switchTab(tabName) {
    // Update active tab
    setActiveTab(tabName);
    
    // Update URL
    const query = getCurrentQuery();
    updateURL(query, tabName);
    
    // Update search results
    updateSearchResults(query, tabName);
}

// Set active tab
function setActiveTab(tabName) {
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
        if (tab.getAttribute('data-tab') === tabName) {
            tab.classList.add('active');
        }
    });
}

// Get active tab
function getActiveTab() {
    const activeTab = document.querySelector('.tab.active');
    return activeTab ? activeTab.getAttribute('data-tab') : 'all';
}

// Get current search query
function getCurrentQuery() {
    const searchInput = document.getElementById('headerSearchInput');
    return searchInput ? searchInput.value.trim() : currentSearchQuery;
}

// Update URL without page reload
function updateURL(query, tab) {
    const url = new URL(window.location);
    if (query) {
        url.searchParams.set('q', query);
    } else {
        url.searchParams.delete('q');
    }
    url.searchParams.set('tab', tab);
    window.history.pushState({}, '', url);
}

// Update search results based on query and tab
function updateSearchResults(query, tab) {
    currentSearchQuery = query;
    
    const resultsContainer = document.getElementById('searchResults');
    const searchInfo = document.getElementById('searchInfo');
    
    if (!resultsContainer) return;
    
    // Show loading
    showLoading();
    
    // Simulate search delay
    setTimeout(() => {
        hideLoading();
        
        // Update search info
        updateResultsInfo(query);
        
        // Clear previous results
        resultsContainer.innerHTML = '';
        
        // Generate results based on tab
        switch (tab) {
            case 'all':
                displayAllResults(query);
                break;
            case 'images':
                displayImageResults(query);
                break;
            case 'design':
                displayDesignResults(query);
                break;
            case 'portfolio':
                displayPortfolioResults(query);
                break;
            case 'about':
                displayAboutResults(query);
                break;
            default:
                displayAllResults(query);
        }
    }, 300);
}

// Update results info text
function updateResultsInfo(query) {
    const searchInfo = document.getElementById('searchInfo');
    if (searchInfo) {
        if (query) {
            searchInfo.textContent = `About 3,420 results (0.52 seconds) for "${query}"`;
        } else {
            searchInfo.textContent = 'About 3,420 results (0.52 seconds)';
        }
    }
}

// Display all results
function displayAllResults(query) {
    const resultsContainer = document.getElementById('searchResults');
    if (!resultsContainer) return;
    
    const projects = [
        {
            url: 'davanico.com/projects/ecommerce',
            title: 'E-commerce Platform - Modern Online Store',
            description: 'A comprehensive e-commerce solution featuring responsive design, secure payment integration, and advanced product catalog management. Built with modern web technologies.',
            link: 'project1.html'
        },
        {
            url: 'davanico.com/projects/taskmanager',
            title: 'Task Manager Mobile App - Productivity Solution',
            description: 'An intuitive mobile application for task management and productivity tracking. Features include real-time collaboration, deadline reminders, and progress analytics.',
            link: 'project2.html'
        },
        {
            url: 'davanico.com/projects/branding',
            title: 'Brand Identity Design - Creative Branding Solutions',
            description: 'Complete brand identity package including logo design, color schemes, typography, and brand guidelines. Professional creative services for businesses.',
            link: 'project3.html'
        },
        {
            url: 'davanico.com/projects/social-dashboard',
            title: 'Social Media Dashboard - Analytics & Management Platform',
            description: 'A comprehensive social media management dashboard that provides real-time analytics, content scheduling, and engagement tracking across multiple platforms.',
            link: 'project4.html'
        },
        {
            url: 'davanico.com/projects/fintech-app',
            title: 'FinTech Mobile App - Digital Banking Solution',
            description: 'Modern mobile banking application with secure transactions, budget tracking, investment management, and AI-powered financial insights.',
            link: 'project5.html'
        },
        {
            url: 'davanico.com/projects/learning-platform',
            title: 'E-Learning Platform - Interactive Education Portal',
            description: 'Comprehensive online learning platform featuring video courses, interactive quizzes, progress tracking, and collaborative learning tools.',
            link: 'project6.html'
        }
    ];
    
    projects.forEach(project => {
        const resultItem = document.createElement('div');
        resultItem.className = 'result-item';
        resultItem.innerHTML = `
            <div class="result-url">${project.url}</div>
            <a href="${project.link}" class="result-title">${project.title}</a>
            <div class="result-description">${project.description}</div>
        `;
        resultsContainer.appendChild(resultItem);
    });
}

// Display image results
function displayImageResults(query) {
    const resultsContainer = document.getElementById('searchResults');
    if (!resultsContainer) return;
    
    const imagesGrid = document.createElement('div');
    imagesGrid.className = 'images-grid';
    
    const images = [
        {
            src: 'https://via.placeholder.com/300x200/4285f4/ffffff?text=E-commerce+Design',
            title: 'E-commerce Platform Design',
            source: 'davanico.com',
            link: 'project1.html'
        },
        {
            src: 'https://via.placeholder.com/300x200/ea4335/ffffff?text=Mobile+App+UI',
            title: 'Task Manager Mobile UI',
            source: 'davanico.com',
            link: 'project2.html'
        },
        {
            src: 'https://via.placeholder.com/300x200/34a853/ffffff?text=Brand+Identity',
            title: 'Brand Identity Package',
            source: 'davanico.com',
            link: 'project3.html'
        },
        {
            src: 'https://via.placeholder.com/300x200/fbbc05/ffffff?text=Web+Design',
            title: 'Responsive Web Design',
            source: 'davanico.com',
            link: 'project1.html'
        },
        {
            src: 'https://via.placeholder.com/300x200/4285f4/ffffff?text=UI+Components',
            title: 'UI Component Library',
            source: 'davanico.com',
            link: 'project2.html'
        },
        {
            src: 'https://via.placeholder.com/300x200/ea4335/ffffff?text=Logo+Design',
            title: 'Creative Logo Designs',
            source: 'davanico.com',
            link: 'project3.html'
        },
        {
            src: 'https://via.placeholder.com/300x200/9c27b0/ffffff?text=Social+Dashboard',
            title: 'Social Media Dashboard',
            source: 'davanico.com',
            link: 'project4.html'
        },
        {
            src: 'https://via.placeholder.com/300x200/1a73e8/ffffff?text=FinTech+App',
            title: 'FinTech Mobile Banking',
            source: 'davanico.com',
            link: 'project5.html'
        },
        {
            src: 'https://via.placeholder.com/300x200/ff6f00/ffffff?text=E-Learning',
            title: 'E-Learning Platform',
            source: 'davanico.com',
            link: 'project6.html'
        }
    ];
    
    images.forEach(image => {
        const imageItem = document.createElement('div');
        imageItem.className = 'image-item';
        imageItem.innerHTML = `
            <img src="${image.src}" alt="${image.title}">
            <div class="image-info">
                <div class="image-title">${image.title}</div>
                <div class="image-source">${image.source}</div>
            </div>
        `;
        imageItem.addEventListener('click', () => handleImageClick(image.link));
        imagesGrid.appendChild(imageItem);
    });
    
    resultsContainer.appendChild(imagesGrid);
}

// Display design results
function displayDesignResults(query) {
    const resultsContainer = document.getElementById('searchResults');
    if (!resultsContainer) return;
    
    const designProjects = [
        {
            url: 'davanico.com/design/ui-ux',
            title: 'UI/UX Design Portfolio - User Experience Design',
            description: 'Comprehensive collection of user interface and user experience design projects. Featuring modern design principles, accessibility, and user-centered design approaches.',
            link: 'project2.html'
        },
        {
            url: 'davanico.com/design/branding',
            title: 'Brand Identity & Visual Design - Creative Solutions',
            description: 'Professional brand identity design services including logo creation, brand guidelines, and visual identity systems for businesses and organizations.',
            link: 'project3.html'
        },
        {
            url: 'davanico.com/design/web',
            title: 'Web Design & Development - Digital Solutions',
            description: 'Modern web design and development services focusing on responsive design, performance optimization, and seamless user experiences across all devices.',
            link: 'project1.html'
        },
        {
            url: 'davanico.com/design/dashboard',
            title: 'Dashboard Design - Data Visualization & Analytics',
            description: 'Professional dashboard designs for social media management and analytics platforms. Clean interfaces with intuitive data visualization and user-friendly controls.',
            link: 'project4.html'
        },
        {
            url: 'davanico.com/design/mobile-banking',
            title: 'Mobile Banking UI - FinTech App Design',
            description: 'Secure and user-friendly mobile banking interface design. Focus on accessibility, security features, and seamless financial transaction flows.',
            link: 'project5.html'
        },
        {
            url: 'davanico.com/design/education',
            title: 'Educational Platform Design - E-Learning Interface',
            description: 'Interactive e-learning platform design with engaging user interfaces, progress tracking, and collaborative learning tools for modern education.',
            link: 'project6.html'
        }
    ];
    
    designProjects.forEach(project => {
        const resultItem = document.createElement('div');
        resultItem.className = 'result-item';
        resultItem.innerHTML = `
            <div class="result-url">${project.url}</div>
            <a href="${project.link}" class="result-title">${project.title}</a>
            <div class="result-description">${project.description}</div>
        `;
        resultsContainer.appendChild(resultItem);
    });
}

// Display portfolio results
function displayPortfolioResults(query) {
    displayAllResults(query); // Same as all results for portfolio
}

// Display about results
function displayAboutResults(query) {
    const resultsContainer = document.getElementById('searchResults');
    if (!resultsContainer) return;
    
    // Create About Me profile section
    const aboutSection = document.createElement('div');
    aboutSection.className = 'about-me-section';
    aboutSection.innerHTML = `
        <div class="about-profile">
            <div class="profile-image">
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                    <circle cx="60" cy="60" r="60" fill="#4285f4"/>
                    <circle cx="60" cy="45" r="20" fill="white"/>
                    <path d="M20 100 C20 80, 35 65, 60 65 C85 65, 100 80, 100 100" fill="white"/>
                </svg>
            </div>
            <div class="profile-details">
                <h2>Davanico</h2>
                <h3>Creative Professional & Digital Designer</h3>
                <p>Passionate about creating innovative digital solutions that make a difference. Experienced in web development, UI/UX design, and brand identity creation.</p>
            </div>
        </div>
        
        <div class="skills-overview">
            <h3>Skills & Expertise</h3>
            <div class="skills-tags">
                <span class="skill-tag">Frontend Development</span>
                <span class="skill-tag">UI/UX Design</span>
                <span class="skill-tag">Brand Identity</span>
                <span class="skill-tag">React & Vue.js</span>
                <span class="skill-tag">Node.js</span>
                <span class="skill-tag">Adobe Creative Suite</span>
                <span class="skill-tag">Figma</span>
                <span class="skill-tag">Web Design</span>
                <span class="skill-tag">Mobile App Design</span>
                <span class="skill-tag">Logo Design</span>
            </div>
        </div>
        
        <div class="contact-info">
            <h3>Get In Touch</h3>
            <div class="contact-links">
                <div class="contact-item">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#4285f4">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                    <span>hello@davanico.com</span>
                </div>
                <div class="contact-item">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#4285f4">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                    </svg>
                    <span>linkedin.com/in/davanico</span>
                </div>
                <div class="contact-item">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#4285f4">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    <span>github.com/davanico</span>
                </div>
            </div>
        </div>
    `;
    
    resultsContainer.appendChild(aboutSection);
}

// Handle image click
function handleImageClick(projectUrl) {
    if (projectUrl && projectUrl !== '#') {
        window.location.href = projectUrl;
    }
}

// Show loading indicator
function showLoading() {
    const resultsContainer = document.getElementById('searchResults');
    if (resultsContainer) {
        resultsContainer.innerHTML = '<div style="text-align: center; padding: 40px; color: #70757a;">Loading...</div>';
    }
}

// Hide loading indicator
function hideLoading() {
    // Loading will be hidden when results are displayed
}

// Scroll to top function
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Analytics tracking (placeholder)
function trackEvent(category, action, label) {
    // Placeholder for analytics tracking
    console.log(`Analytics: ${category} - ${action} - ${label}`);
}

function trackSearch(query) {
    trackEvent('Search', 'Query', query);
}

// Initialize lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Mobile menu toggle (if needed)
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('active');
    }
}
