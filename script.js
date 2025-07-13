// Global variables
let currentSearchQuery = '';

// Initialize the appropriate page
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname;
    
    if (currentPage.includes('/search')) {
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

    searchInput.placeholder = 'type your name';
    
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
        const projects = ['.', '.', '.', ' .',];
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
        window.location.href = '/search?tab=all';
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
            case 'random':
                displayRandomProjects(query); //  ini yang penting!
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
            searchInfo.textContent = `About 25 results (0.52 seconds) for "${query}"`;
        } else {
            searchInfo.textContent = 'About 25 results (0.52 seconds)';
        }
    }
}

// Display all results
function displayAllResults(query) {
    const resultsContainer = document.getElementById('searchResults');
    if (!resultsContainer) return;
    
    const projects = [
        {
            url: 'davanico.com/projects/project1',
            title: 'Design & Proyek saya',
            description: 'Menciptakan Solusi Visual Inovatif untuk Pengalaman Terbaik',
            link: '/project1'
        },
        {
            url: 'davanico.com/projects/project2',
            title: 'Branding & Identitas Visual',
            description: 'Membangun identitas merek yang kuat dan kohesif melalui eksplorasi logo, palet warna, tipografi, dan panduan gaya untuk berbagai klien dan kebutuhan.',
            link: '/project2'
        },
        {
            url: 'davanico.com/projects/project3',
            title: 'Ilustrasi & Media Promosi',
            description: 'Mengubah ide menjadi visual menarik melalui ilustrasi digital, desain poster, infografis, atau materi promosi lainnya untuk kampanye yang efektif.',
            link: '/project3'
        },
        {
            url: 'davanico.com/projects/project4',
            title: 'Memory Card Flip',
            description: 'Uji daya ingatmu! Balik kartu dan cari pasangan yang cocok. Selesaikan semua pasangannya secepat mungkin dan buktikan seberapa tajam memorimu!',
            link: '/project4'
        },
        {
            url: 'davanico.com/projects/project5',
            title: 'Visual Storytelling',
            description: 'Eksplorasi mendalam dalam dunia fotografi dan manipulasi digital - mengabadikan momen, menciptakan cerita, dan menghadirkan perspektif baru melalui lensa kreatif',
            link: '/project5'
        },
      
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
            src: 'img/poster-promosi.png',
            title: 'Poster Promosi',
            source: 'davanico.com',
            link: '#'
        },
        {
            src: 'img/logo-sederhana.png',
            title: 'Logo Sederhana',
            source: 'davanico.com',
            link: '#'
        },
        {
            src: 'img/konten-sosmed.png',
            title: 'Konten Sosial Media',
            source: 'davanico.com',
            link: '#'
        },
        {
            src: 'https://via.placeholder.com/300x200/fbbc05/ffffff?text=Web+Design',
            title: 'Undangan Digital',
            source: 'davanico.com',
            link: '#'
        },
        {
            src: 'https://via.placeholder.com/300x200/4285f4/ffffff?text=UI+Components',
            title: 'Banner & Flyer',
            source: 'davanico.com',
            link: '#'
        },
        {
            src: 'https://via.placeholder.com/300x200/ea4335/ffffff?text=Logo+Design',
            title: 'Template Presentasi',
            source: 'davanico.com',
            link: '#'
        },
        {
            src: 'https://via.placeholder.com/300x200/9c27b0/ffffff?text=Social+Dashboard',
            title: 'Social Media Dashboard',
            source: 'davanico.com',
            link: '#'
        },
        {
            src: 'https://via.placeholder.com/300x200/1a73e8/ffffff?text=FinTech+App',
            title: 'FinTech Mobile Banking',
            source: 'davanico.com',
            link: '#'
        },
        {
            src: 'https://via.placeholder.com/300x200/ff6f00/ffffff?text=E-Learning',
            title: 'E-Learning Platform',
            source: 'davanico.com',
            link: '#'
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
function displayRandomProjects() {
    const resultsContainer = document.getElementById('searchResults');
    if (!resultsContainer) return;

    const allProjects = [
        {
            url: 'davanico.com/design/color',
            title: 'Color Picker',
            description: 'Aplikasi web untuk mengambil warna dari gambar menggunakan EyeDropper API.',
            link: '/project1.c'
        },
        {
            url: 'davanico.com/design/branding',
            title: 'Brand Identity & Visual Design',
            description: 'Desain logo, panduan visual, dan branding profesional.',
            link: '/not-found'
        },
        {
            url: 'davanico.com/design/web',
            title: 'Web Design & Development',
            description: 'Desain web modern dan responsive.',
            link: '/not-found'
        },
        {
            url: 'davanico.com/design/dashboard',
            title: 'Dashboard Design',
            description: 'Antarmuka dashboard analytics & manajemen sosial media.',
            link: '/not-found'
        },
        {
            url: 'davanico.com/design/mobile-banking',
            title: 'Mobile Banking UI',
            description: 'UI FinTech untuk transaksi dan keamanan digital.',
            link: '/not-found'
        },
        {
            url: 'davanico.com/design/education',
            title: 'E-Learning Platform Design',
            description: 'Desain interaktif untuk pendidikan daring.',
            link: '/not-found'
        }
    ];

    // Kosongkan hasil lama
    resultsContainer.innerHTML = "";

    allProjects.forEach(project => {
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


 // portofolio
function displayPortfolioResults(query) {
    const resultsContainer = document.getElementById("searchResults");
    resultsContainer.innerHTML = "";

    const portfolioProjects = [
        {
            title: "Design dan Pengembang web",
            description: "Web developer pemula dengan semangat menciptakan solusi digital yang estetis dan menarik.",
            link: "https://davanico18.vercel.app/"
        },
        {
            title: "Memory Card Flip",
            description: "Game kartu sederhana untuk melatih daya ingat.",
            link: "/memori.card"
        },
        {
            title: "FinTech Mobile App",
            description: "Aplikasi keuangan digital dengan AI dan pelacak transaksi.",
            link: "/not-found"
        }
    ];

    let filtered = portfolioProjects.filter(project =>
        !query || project.title.toLowerCase().includes(query.toLowerCase()) ||
        project.description.toLowerCase().includes(query.toLowerCase())
    );

    // Jika tidak ada hasil cocok, tampilkan pesan dan tetap render semua project
    if (filtered.length === 0) {
        const msg = document.createElement("p");
        msg.style.color = "white";
        msg.textContent = `Tidak ada proyek ditemukan untuk "${query}", berikut beberapa portofolio saya:`;
        resultsContainer.appendChild(msg);
        filtered = portfolioProjects;
    }

    filtered.forEach(project => {
        const resultDiv = document.createElement("div");
        resultDiv.classList.add("result-item");

        resultDiv.innerHTML = `
            <div class="result-url">${project.link}</div>
            <a href="${project.link}" class="result-title">${project.title}</a>
            <div class="result-description">${project.description}</div>
        `;

        resultsContainer.appendChild(resultDiv);
    });
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
            <img src="img/profile.png" alt="Foto Profil Davanico" width="120" height="120" style="border-radius: 50%; object-fit: cover;" />
        </div>
        <div class="profile-details">
            <h2>Davanico</h2>
            <h3>Desainer Digital & Profesional Kreatif</h3>
            <p>Saya adalah siswa SMK jurusan DKV yang fokus pada desain digital yang tidak hanya fungsional,
            tapi juga komunikatif secara visual. Saya menyukai proses membangun identitas merek, mendesain antarmuka yang nyaman, dan menciptakan pengalaman digital yang berkesan.</p>
        </div>
    </div>
        
        <div class="skills-overview">
            <h3>Skills & Expertise</h3>
            <div class="skills-tags">
                <span class="skill-tag">Frontend Development</span>
                <span class="skill-tag">UI/UX Design</span>
                <span class="skill-tag">Brand Identity</span>
                <span class="skill-tag">Corel Draw</span>
                <span class="skill-tag">Photoshop</span>
                <span class="skill-tag">Adobe Creative Suite</span>
                <span class="skill-tag">Figma</span>
                <span class="skill-tag">Web Design</span>
                <span class="skill-tag">Adobe Illustrator</span>
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
                    <span>davaniko1122gmail.com</span>
                </div>
                <div class="contact-item">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#4285f4">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                    </svg>
                    <span>davanico ady Nugroho</span>
                </div>
                <div class="contact-item">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#4285f4">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    <span>Davanico1122</span>
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
