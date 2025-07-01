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
        const projects = ['project1.html', 'project2.html', 'project3.html'];
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
    
    const aboutItems = [
        {
            url: 'davanico.com/about',
            title: 'About Davanico - Creative Professional',
            description: 'Learn about Davanico\'s background, skills, and passion for creating innovative digital solutions. Experienced in web development, UI/UX design, and brand identity.',
            link: '#'
        },
        {
            url: 'davanico.com/contact',
            title: 'Contact & Collaboration - Get In Touch',
            description: 'Ready to start your next project? Contact Davanico for creative collaboration, freelance opportunities, and professional design services.',
            link: '#'
        },
        {
            url: 'davanico.com/skills',
            title: 'Skills & Expertise - Technical Proficiencies',
            description: 'Comprehensive overview of technical skills including web development, design tools, programming languages, and creative software proficiencies.',
            link: '#'
        }
    ];
    
    aboutItems.forEach(item => {
        const resultItem = document.createElement('div');
        resultItem.className = 'result-item';
        resultItem.innerHTML = `
            <div class="result-url">${item.url}</div>
            <a href="${item.link}" class="result-title">${item.title}</a>
            <div class="result-description">${item.description}</div>
        `;
        resultsContainer.appendChild(resultItem);
    });
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