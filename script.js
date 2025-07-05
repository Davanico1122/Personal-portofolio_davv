// Global variables
let currentSearchQuery = '';

// Initialize the appropriate page
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname;
    
    if (currentPage.includes('/search') || currentPage.includes('search.html')) {
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
    
    if (!searchInput) {
        console.error('Search input not found');
        return;
    }

    searchInput.placeholder = 'Cari nama Anda...';
    
    // Handle search input
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            performSearch();
        }
    });
    
    // Handle button clicks
    if (googleSearchBtn) {
        googleSearchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            performSearch();
        });
    }
    
    if (feelingLuckyBtn) {
        feelingLuckyBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Go to random project
            const projects = getAllProjects();
            if (projects.length > 0) {
                const randomProject = projects[Math.floor(Math.random() * projects.length)];
                window.location.href = randomProject.link;
            } else {
                window.location.href = 'search.html';
            }
        });
    }
    
    // Focus on search input
    searchInput.focus();
}

// Search page initialization
function initializeSearchPage() {
    // Get search query from URL
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q') || urlParams.get('nama') || '';
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
                updateSearchResults(newQuery, getActiveTab());
            }
        });
    }
    
    // Show welcome message if name is provided
    const welcomeMessage = document.getElementById('welcomeMessage');
    if (query && welcomeMessage) {
        welcomeMessage.textContent = `Selamat datang, ${query}! Ini adalah portfolio saya.`;
        welcomeMessage.style.display = 'block';
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
        window.location.href = `search.html?nama=${encodeURIComponent(query)}&tab=all`;
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
        url.searchParams.set('nama', query);
    } else {
        url.searchParams.delete('nama');
    }
    url.searchParams.set('tab', tab);
    window.history.pushState({}, '', url);
}

// Update search results based on query and tab
function updateSearchResults(query, tab) {
    currentSearchQuery = query;
    
    const resultsContainer = document.getElementById('searchResults');
    const searchInfo = document.querySelector('.search-info');
    
    if (!resultsContainer) return;
    
    // Show loading
    showLoading();
    
    // Simulate search delay
    setTimeout(() => {
        hideLoading();
        
        // Get projects based on tab
        let projects = [];
        switch (tab) {
            case 'all':
                projects = getAllProjects();
                break;
            case 'images':
                projects = getProjectsByCategory('photography');
                break;
            case 'design':
                projects = getProjectsByCategory('graphic-design');
                break;
            case 'portfolio':
                projects = getProjectsByCategory('branding');
                break;
            case 'about':
                projects = getProjectsByCategory('about');
                break;
            default:
                projects = getAllProjects();
        }
        
        // Filter by search query if provided
        if (query) {
            projects = projects.filter(project => 
                project.title.toLowerCase().includes(query.toLowerCase()) ||
                project.description.toLowerCase().includes(query.toLowerCase()) ||
                project.category.toLowerCase().includes(query.toLowerCase())
            );
        }
        
        // Update search info
        if (searchInfo) {
            const resultsCount = document.querySelector('.results-count');
            if (resultsCount) {
                resultsCount.textContent = `Sekitar ${projects.length} hasil portfolio`;
            }
        }
        
        // Clear previous results
        resultsContainer.innerHTML = '';
        
        if (projects.length === 0) {
            resultsContainer.innerHTML = `
                <div style="text-align: center; padding: 40px; color: #70757a;">
                    <h3>Tidak ada hasil yang ditemukan</h3>
                    <p>Coba kata kunci yang berbeda atau lihat semua portfolio</p>
                </div>
            `;
            return;
        }
        
        // Display results
        projects.forEach(project => {
            const resultElement = document.createElement('div');
            resultElement.className = 'search-result';
            resultElement.innerHTML = `
                <div class="result-url">${project.url}</div>
                <h3 class="result-title">
                    <a href="${project.link}">${project.title}</a>
                </h3>
                <div class="result-description">${project.description}</div>
            `;
            resultsContainer.appendChild(resultElement);
        });
        
    }, 300);
}

// Show loading state
function showLoading() {
    const resultsContainer = document.getElementById('searchResults');
    if (resultsContainer) {
        resultsContainer.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #70757a;">
                <div>Mencari...</div>
            </div>
        `;
    }
}

// Hide loading state
function hideLoading() {
    // Loading is hidden when results are displayed
}

// Scroll to top
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Debounce function for search optimization
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

// Track events (placeholder for analytics)
function trackEvent(category, action, label) {
    console.log('Event tracked:', { category, action, label });
}

// Track search queries
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
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Mobile menu toggle (if needed)
function toggleMobileMenu() {
    const menu = document.querySelector('.mobile-menu');
    if (menu) {
        menu.classList.toggle('active');
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initLazyLoading();
    
    // Add search functionality to voice and camera icons
    document.querySelectorAll('.mic-icon').forEach(icon => {
        icon.addEventListener('click', function() {
            alert('Fitur pencarian suara akan segera hadir!');
        });
    });
    
    document.querySelectorAll('.camera-icon').forEach(icon => {
        icon.addEventListener('click', function() {
            alert('Fitur pencarian gambar akan segera hadir!');
        });
    });
});