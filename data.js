// Portfolio data storage
const portfolioProjects = [
    {
        id: 1,
        title: "Branding Design Portfolio - DavaNico Creative Studio",
        description: "Kumpulan desain branding dan identitas visual untuk berbagai klien. Meliputi logo design, brand guidelines, dan aplikasi visual yang konsisten untuk membangun identitas brand yang kuat.",
        image: "https://via.placeholder.com/800x600/4285f4/ffffff?text=Branding+Design",
        link: "project1.html",
        url: "https://davanico.com/portfolio/branding-design",
        category: "branding"
    },
    {
        id: 2,
        title: "UI/UX Design Projects - Mobile & Web Interface",
        description: "Proyek desain antarmuka pengguna (UI) dan pengalaman pengguna (UX) untuk aplikasi mobile dan website. Fokus pada usability, accessibility, dan desain yang user-centered.",
        image: "https://via.placeholder.com/800x600/34a853/ffffff?text=UI%2FUX+Design",
        link: "project2.html",
        url: "https://davanico.com/portfolio/ui-ux-design",
        category: "ui-ux"
    },
    {
        id: 3,
        title: "Web Development Portfolio - Frontend & Backend",
        description: "Showcase pengembangan website dan aplikasi web menggunakan teknologi modern. Dari landing page hingga aplikasi web kompleks dengan performa optimal dan responsive design.",
        image: "https://via.placeholder.com/800x600/fbbc05/ffffff?text=Web+Development",
        link: "project3.html",
        url: "https://davanico.com/portfolio/web-development",
        category: "web-development"
    },
    {
        id: 4,
        title: "Graphic Design Works - Print & Digital Media",
        description: "Karya desain grafis untuk media cetak dan digital. Termasuk poster, flyer, social media graphics, dan berbagai materi promosi dengan konsep kreatif yang menarik.",
        image: "https://via.placeholder.com/800x600/ea4335/ffffff?text=Graphic+Design",
        link: "project4.html",
        url: "https://davanico.com/portfolio/graphic-design",
        category: "graphic-design"
    },
    {
        id: 5,
        title: "Photography Portfolio - Commercial & Creative",
        description: "Koleksi foto komersial dan kreatif untuk berbagai kebutuhan. Spesialisasi dalam product photography, portrait, dan dokumentasi event dengan hasil yang profesional.",
        image: "https://via.placeholder.com/800x600/1a73e8/ffffff?text=Photography",
        link: "project5.html",
        url: "https://davanico.com/portfolio/photography",
        category: "photography"
    },
    {
        id: 6,
        title: "About DavaNico - Creative Professional Profile",
        description: "Profil profesional DavaNico sebagai creative designer dan developer. Pengalaman, skill, dan filosofi dalam menciptakan solusi kreatif yang inovatif dan berdampak.",
        image: "https://via.placeholder.com/800x600/681da8/ffffff?text=About+Me",
        link: "about.html",
        url: "https://davanico.com/about",
        category: "about"
    }
];

// Function to get all projects
function getAllProjects() {
    return portfolioProjects;
}

// Function to get project by ID
function getProjectById(id) {
    return portfolioProjects.find(project => project.id === id);
}

// Function to get projects by category
function getProjectsByCategory(category) {
    return portfolioProjects.filter(project => project.category === category);
}

// Function to search projects
function searchProjects(query) {
    if (!query) return portfolioProjects;
    
    const searchTerm = query.toLowerCase();
    return portfolioProjects.filter(project => 
        project.title.toLowerCase().includes(searchTerm) ||
        project.description.toLowerCase().includes(searchTerm) ||
        project.category.toLowerCase().includes(searchTerm)
    );
}

// Function to add new project (for admin panel)
function addProject(projectData) {
    const newProject = {
        id: Math.max(...portfolioProjects.map(p => p.id)) + 1,
        ...projectData
    };
    portfolioProjects.push(newProject);
    return newProject;
}

// Function to update project (for admin panel)
function updateProject(id, projectData) {
    const index = portfolioProjects.findIndex(project => project.id === id);
    if (index !== -1) {
        portfolioProjects[index] = { ...portfolioProjects[index], ...projectData };
        return portfolioProjects[index];
    }
    return null;
}

// Function to delete project (for admin panel)
function deleteProject(id) {
    const index = portfolioProjects.findIndex(project => project.id === id);
    if (index !== -1) {
        return portfolioProjects.splice(index, 1)[0];
    }
    return null;
}

// Function to save data to localStorage
function saveToLocalStorage() {
    localStorage.setItem('portfolioProjects', JSON.stringify(portfolioProjects));
}

// Function to load data from localStorage
function loadFromLocalStorage() {
    const saved = localStorage.getItem('portfolioProjects');
    if (saved) {
        portfolioProjects.length = 0;
        portfolioProjects.push(...JSON.parse(saved));
    }
}

// Load data on page load
if (typeof window !== 'undefined') {
    loadFromLocalStorage();
}