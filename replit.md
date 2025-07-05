# Portfolio Website - Davanico

## Overview

This is a creative portfolio website designed to showcase various projects and creative work. The website mimics a Google-style search interface as the main homepage, providing a unique and engaging user experience. The site includes project showcases, search functionality, and an admin panel for content management.

## System Architecture

### Frontend Architecture
- **Pure HTML/CSS/JavaScript**: Static website with no backend framework
- **Google-inspired Design**: Homepage mimics Google's search interface with custom branding
- **Responsive Design**: Mobile-first approach with flexible layouts
- **Static File Structure**: All content served as static files

### Content Management
- **Data-driven Architecture**: Projects stored in JavaScript data files
- **Admin Panel**: Separate admin interface for content management
- **Manual Deployment**: Content updates require manual file editing

## Key Components

### Core Pages
1. **Homepage (index.html)**: Google-style search interface with "Davanico" branding
2. **Search Results (search.html)**: Displays all projects in a search-like format
3. **Project Detail Pages**: Individual HTML files for each project showcase
4. **Admin Panel (admin.html)**: Content management interface for adding/editing projects

### Assets and Styling
- **style.css**: Main stylesheet with Google-inspired design system
- **script.js**: JavaScript for search functionality and page interactions
- **data.js**: Central data store for all portfolio projects
- **img/**: Static images and favicon assets

### Project Types
- Graphic Design Projects
- Branding & Visual Identity
- Illustration & Media Promotion
- Interactive Games (Memory Card Flip)
- Photography Portfolio
- Packaging Design

## Data Flow

1. **Content Storage**: All project data stored in `data.js` as JavaScript arrays
2. **Dynamic Loading**: JavaScript loads project data and renders content dynamically
3. **Search Functionality**: Client-side search filters projects based on user input
4. **Admin Interface**: Generates JavaScript array code for manual copying to `data.js`

## External Dependencies

### Fonts
- **Google Fonts**: Roboto and Inter font families for consistent typography
- **System Fonts**: Fallback to system fonts for optimal performance

### Assets
- **Static Images**: All images hosted locally or via external URLs
- **Favicon**: Complete favicon package for all device types

## Deployment Strategy

### Static Hosting
- **Vercel Configuration**: `vercel.json` defines custom routes and redirects
- **Clean URLs**: Routes map to specific project pages without file extensions
- **404 Handling**: Custom not-found page for invalid routes

### Route Structure
- `/` → Homepage (index.html)
- `/search` → Search results page
- `/desain` → Design project showcase
- `/branding` → Branding project showcase
- `/ilustrasi` → Illustration project showcase
- Additional project-specific routes

## Changelog
- July 05, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.