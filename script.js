// DOM elements
const searchInput = document.getElementById('searchInput');
const headerSearchInput = document.getElementById('headerSearchInput');
const viewPortfolioBtn = document.getElementById('viewPortfolioBtn');
const feelingCreativeBtn = document.getElementById('feelingCreativeBtn');
const resultsInfo = document.getElementById('resultsInfo');

// Tab functionality
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the search page
    if (window.location.pathname.includes('search.html')) {
        initializeSearchPage();
    } else if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        initializeHomePage();
    }
});

// Homepage initialization
function initializeHomePage() {
    // Handle search input
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    // Handle buttons
    if (viewPortfolioBtn) {
        viewPortfolioBtn.addEventListener('click', function() {
            window.location.href = 'search.html';
        });
    }
    
    if (feelingCreativeBtn) {
        feelingCreativeBtn.addEventListener('click', function() {
            window.location.href = 'search.html';
        });
    }
}

// Search page initialization
function initializeSearchPage() {
    // Get query from URL
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');
    const tab = urlParams.get('tab') || 'all';
    
    // Set search input value
    if (headerSearchInput && query) {
        headerSearchInput.value = query;
    }
    
    // Hide results info since this is now for name entry, not search
    if (resultsInfo) {
        resultsInfo.style.display = 'none';
    }
    
    // Set active tab
    setActiveTab(tab);
    
    // Handle search input - now just for name entry
    if (headerSearchInput) {
        headerSearchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const name = headerSearchInput.value.trim();
                if (name) {
                    // Just keep the name in the input, no URL changes needed
                    console.log('Name entered:', name);
                }
            }
        });
    }
    
    // Handle tab clicks
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            
            // Switch tab content
            switchTab(tabName);
            
            // Update URL without query (since this is just for browsing portfolio)
            updateURL('', tabName);
        });
    });
    
    // Handle browser back/forward
    window.addEventListener('popstate', function(e) {
        const urlParams = new URLSearchParams(window.location.search);
        const tab = urlParams.get('tab') || 'all';
        
        setActiveTab(tab);
    });
}

// Perform search from homepage
function performSearch() {
    const query = searchInput.value.trim();
    if (query) {
        // Redirect directly to search page without query parameter for name entry
        window.location.href = 'search.html';
    }
}

// Switch tabs
function switchTab(tabName) {
    // Remove active class from all tabs and contents
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));
    
    // Add active class to selected tab and content
    const activeTabBtn = document.querySelector(`[data-tab="${tabName}"]`);
    const activeTabContent = document.getElementById(`${tabName}-content`);
    
    if (activeTabBtn) {
        activeTabBtn.classList.add('active');
    }
    
    if (activeTabContent) {
        activeTabContent.classList.add('active');
    }
}

// Set active tab
function setActiveTab(tabName) {
    switchTab(tabName);
}

// Get current active tab
function getActiveTab() {
    const activeTab = document.querySelector('.tab-btn.active');
    return activeTab ? activeTab.getAttribute('data-tab') : 'all';
}

// Get current query
function getCurrentQuery() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('q') || '';
}

// Update URL without page reload
function updateURL(query, tab) {
    const url = new URL(window.location);
    
    if (query) {
        url.searchParams.set('q', query);
    } else {
        url.searchParams.delete('q');
    }
    
    if (tab && tab !== 'all') {
        url.searchParams.set('tab', tab);
    } else {
        url.searchParams.delete('tab');
    }
    
    // Use pushState to update URL without reload
    window.history.pushState({}, '', url);
}

// Update results info
function updateResultsInfo(query) {
    if (resultsInfo) {
        if (query) {
            resultsInfo.innerHTML = `Results for: '<strong>${query}</strong>'`;
        } else {
            resultsInfo.innerHTML = '';
        }
    }
}

// Handle image clicks in gallery
function handleImageClick(projectUrl) {
    window.open(projectUrl, '_blank');
}

// Smooth scroll to top function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Handle external links
document.addEventListener('click', function(e) {
    // Handle social media links
    if (e.target.classList.contains('social-btn')) {
        e.preventDefault();
        // In a real implementation, these would link to actual social profiles
        console.log('Social link clicked:', e.target.textContent);
    }
});

// Add loading states for better UX
function showLoading() {
    // Could add loading spinner or skeleton screens
    console.log('Loading...');
}

function hideLoading() {
    console.log('Loading complete');
}

// Handle responsive menu for mobile
function toggleMobileMenu() {
    // Implementation for mobile menu if needed
    console.log('Mobile menu toggled');
}

// Utility function to debounce input
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

// Enhanced search with debouncing (for future implementation)
const debouncedSearch = debounce(function(query) {
    // Could implement real-time search suggestions here
    console.log('Searching for:', query);
}, 300);

// Add event listeners for enhanced search (optional)
if (headerSearchInput) {
    headerSearchInput.addEventListener('input', function() {
        const query = this.value.trim();
        if (query.length > 2) {
            debouncedSearch(query);
        }
    });
}

// Handle keyboard navigation
document.addEventListener('keydown', function(e) {
    // ESC key to clear search or go back
    if (e.key === 'Escape') {
        if (headerSearchInput && headerSearchInput.value) {
            headerSearchInput.value = '';
            headerSearchInput.focus();
        }
    }
    
    // Ctrl/Cmd + K for quick search focus
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (searchInput) {
            searchInput.focus();
        } else if (headerSearchInput) {
            headerSearchInput.focus();
        }
    }
});

// Analytics tracking (placeholder for future implementation)
function trackEvent(category, action, label) {
    console.log('Analytics event:', category, action, label);
    // In a real implementation, this would send data to analytics service
}

// Track tab switches
tabButtons.forEach(button => {
    button.addEventListener('click', function() {
        const tabName = this.getAttribute('data-tab');
        trackEvent('Navigation', 'Tab Switch', tabName);
    });
});

// Track search queries
function trackSearch(query) {
    trackEvent('Search', 'Query', query);
}

// Enhanced error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // In production, you might want to send this to an error tracking service
});

// Service worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Service worker would be registered here for offline functionality
        console.log('Service worker support detected');
    });
}

// Performance monitoring
window.addEventListener('load', function() {
    // Monitor page load performance
    if (window.performance && window.performance.timing) {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        console.log('Page load time:', loadTime + 'ms');
    }
});

// Intersection Observer for lazy loading (future enhancement)
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        // Observe all images with data-src attribute
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', initLazyLoading);
