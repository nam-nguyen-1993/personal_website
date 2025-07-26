// Admin Panel JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Writing Management
    class WritingManager {
        constructor() {
            this.form = document.getElementById('writingForm');
            this.writingList = document.getElementById('writingList');
            this.init();
        }
        
        init() {
            if (this.form) {
                this.form.addEventListener('submit', (e) => this.handleSubmit(e));
                this.loadExistingWriting();
            }
        }
        
        handleSubmit(e) {
            e.preventDefault();
            
            const formData = new FormData(this.form);
            const writingData = {
                id: Date.now().toString(),
                title: formData.get('title') || document.getElementById('title').value,
                category: formData.get('category') || document.getElementById('category').value,
                excerpt: formData.get('excerpt') || document.getElementById('excerpt').value,
                content: formData.get('content') || document.getElementById('content').value,
                readTime: formData.get('readTime') || document.getElementById('readTime').value,
                date: this.formatDate(formData.get('date') || document.getElementById('date').value),
                tags: (formData.get('tags') || document.getElementById('tags').value).split(',').map(tag => tag.trim()),
                link: this.generateLink(formData.get('title') || document.getElementById('title').value)
            };
            
            this.saveWriting(writingData);
            this.createWritingPage(writingData);
            this.showSuccess('Writing piece published successfully!');
            this.form.reset();
        }
        
        formatDate(dateString) {
            const date = new Date(dateString);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}.${month}.${day}`;
        }
        
        generateLink(title) {
            const slug = title.toLowerCase()
                .replace(/[^a-z0-9 -]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-');
            return `writing/${slug}.html`;
        }
        
        saveWriting(writingData) {
            let existingWriting = JSON.parse(localStorage.getItem('portfolioWriting')) || [];
            existingWriting.push(writingData);
            localStorage.setItem('portfolioWriting', JSON.stringify(existingWriting));
            
            // Update the main site if it's open in another tab
            if (window.portfolioContentManager) {
                window.portfolioContentManager.addWriting(writingData);
            }
            
            this.loadExistingWriting();
        }
        
        createWritingPage(writingData) {
            const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${writingData.title} - Nam H Nguyen</title>
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="../css/article.css">
</head>
<body>
    <nav class="navbar">
        <div class="nav-container">
            <div class="nav-brand">
                <span class="brand-text">YOUR.NAME</span>
            </div>
            <ul class="nav-menu">
                <li><a href="../index.html" class="nav-link">← BACK HOME</a></li>
                <li><a href="../index.html#writing" class="nav-link">ALL WRITING</a></li>
            </ul>
        </div>
    </nav>

    <article class="article-main">
        <div class="container">
            <header class="article-header">
                <div class="article-meta">
                    <span class="article-category">${writingData.category.toUpperCase()}</span>
                    <span class="article-date">${writingData.date}</span>
                    <span class="article-read-time">${writingData.readTime}</span>
                </div>
                <h1 class="article-title">${writingData.title}</h1>
                <div class="article-tags">
                    ${writingData.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </header>
            
            <div class="article-content">
                ${this.formatContent(writingData.content)}
            </div>
            
            <footer class="article-footer">
                <div class="article-share">
                    <h3>SHARE THIS PIECE</h3>
                    <div class="share-buttons">
                        <a href="#" class="share-btn">TWITTER</a>
                        <a href="#" class="share-btn">LINKEDIN</a>
                        <a href="#" class="share-btn">EMAIL</a>
                    </div>
                </div>
                <div class="article-navigation">
                    <a href="../index.html#writing" class="btn btn-secondary">← BACK TO WRITING</a>
                </div>
            </footer>
        </div>
    </article>
</body>
</html>`;
            
            // This would typically be sent to a server to create the file
            // For now, we'll show instructions to the user
            console.log('HTML file content generated for:', writingData.title);
            
            // You could save this to a file using a server-side script or file API
            this.downloadHTML(htmlContent, writingData.title);
        }
        
        formatContent(content) {
            // Simple content formatting - converts line breaks to paragraphs if no HTML tags present
            if (!content.includes('<')) {
                return content.split('\n\n').map(paragraph => 
                    paragraph.trim() ? `<p>${paragraph.trim()}</p>` : ''
                ).join('');
            }
            return content;
        }
        
        downloadHTML(content, title) {
            const blob = new Blob([content], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.html`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            this.showInfo('HTML file downloaded! Upload it to your writing/ folder on your web server.');
        }
        
        loadExistingWriting() {
            const existingWriting = JSON.parse(localStorage.getItem('portfolioWriting')) || [];
            
            if (this.writingList) {
                this.writingList.innerHTML = '';
                
                if (existingWriting.length === 0) {
                    this.writingList.innerHTML = '<p style="text-align: center; color: var(--gray-800);">No writing pieces yet. Add your first one above!</p>';
                    return;
                }
                
                existingWriting.forEach(item => {
                    const listItem = document.createElement('div');
                    listItem.className = 'list-item';
                    listItem.innerHTML = `
                        <div class="item-info">
                            <h3>${item.title}</h3>
                            <p>${item.category} • ${item.date} • ${item.readTime}</p>
                        </div>
                        <div class="item-actions">
                            <button class="btn-small btn-secondary" onclick="editWriting('${item.id}')">EDIT</button>
                            <button class="btn-small btn-danger" onclick="deleteWriting('${item.id}')">DELETE</button>
                        </div>
                    `;
                    this.writingList.appendChild(listItem);
                });
            }
        }
        
        showSuccess(message) {
            this.showMessage(message, 'success');
        }
        
        showInfo(message) {
            this.showMessage(message, 'info');
        }
        
        showMessage(message, type) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `form-${type}`;
            messageDiv.textContent = message;
            
            const form = document.querySelector('.admin-form');
            form.insertBefore(messageDiv, form.firstChild);
            
            setTimeout(() => {
                messageDiv.remove();
            }, 5000);
        }
    }
    
    // Projects Management
    class ProjectsManager {
        constructor() {
            this.form = document.getElementById('projectForm');
            this.projectsList = document.getElementById('projectsList');
            this.init();
        }
        
        init() {
            if (this.form) {
                this.form.addEventListener('submit', (e) => this.handleSubmit(e));
                this.loadExistingProjects();
            }
        }
        
        handleSubmit(e) {
            e.preventDefault();
            
            const formData = new FormData(this.form);
            const projectData = {
                id: Date.now().toString(),
                title: formData.get('projectTitle') || document.getElementById('projectTitle').value,
                description: formData.get('projectDescription') || document.getElementById('projectDescription').value,
                details: formData.get('projectDetails') || document.getElementById('projectDetails').value,
                type: formData.get('projectType') || document.getElementById('projectType').value,
                status: formData.get('projectStatus') || document.getElementById('projectStatus').value,
                tags: (formData.get('projectTags') || document.getElementById('projectTags').value).split(',').map(tag => tag.trim()),
                githubLink: formData.get('githubLink') || document.getElementById('githubLink').value,
                demoLink: formData.get('demoLink') || document.getElementById('demoLink').value,
                image: formData.get('projectImage') || document.getElementById('projectImage').value,
                features: formData.get('keyFeatures') || document.getElementById('keyFeatures').value,
                accuracy: formData.get('accuracy') || document.getElementById('accuracy').value,
                dataset: formData.get('dataset') || document.getElementById('dataset').value,
                link: this.generateProjectLink(formData.get('projectTitle') || document.getElementById('projectTitle').value)
            };
            
            this.saveProject(projectData);
            this.createProjectPage(projectData);
            this.showSuccess('AI project added successfully!');
            this.form.reset();
        }
        
        generateProjectLink(title) {
            const slug = title.toLowerCase()
                .replace(/[^a-z0-9 -]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-');
            return `projects/${slug}.html`;
        }
        
        saveProject(projectData) {
            let existingProjects = JSON.parse(localStorage.getItem('portfolioProjects')) || [];
            existingProjects.push(projectData);
            localStorage.setItem('portfolioProjects', JSON.stringify(existingProjects));
            
            // Update the main site if it's open in another tab
            if (window.portfolioContentManager) {
                window.portfolioContentManager.addProject(projectData);
            }
            
            this.loadExistingProjects();
        }
        
        createProjectPage(projectData) {
            const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${projectData.title} - Nam H Nguyen</title>
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="../css/project.css">
</head>
<body>
    <nav class="navbar">
        <div class="nav-container">
            <div class="nav-brand">
                <span class="brand-text">YOUR.NAME</span>
            </div>
            <ul class="nav-menu">
                <li><a href="../index.html" class="nav-link">← BACK HOME</a></li>
                <li><a href="../index.html#projects" class="nav-link">ALL PROJECTS</a></li>
            </ul>
        </div>
    </nav>

    <main class="project-main">
        <div class="container">
            <header class="project-header">
                <div class="project-meta">
                    <span class="project-type">${projectData.type.replace('-', ' ').toUpperCase()}</span>
                    <span class="project-status">${projectData.status.replace('-', ' ').toUpperCase()}</span>
                </div>
                <h1 class="project-title">${projectData.title}</h1>
                <p class="project-description">${projectData.description}</p>
                <div class="project-tags">
                    ${projectData.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <div class="project-links">
                    ${projectData.githubLink ? `<a href="${projectData.githubLink}" class="btn btn-primary">VIEW CODE</a>` : ''}
                    ${projectData.demoLink ? `<a href="${projectData.demoLink}" class="btn btn-secondary">LIVE DEMO</a>` : ''}
                </div>
            </header>
            
            ${projectData.image ? `
            <div class="project-image">
                <img src="${projectData.image}" alt="${projectData.title}">
            </div>` : ''}
            
            <div class="project-content">
                <section class="project-overview">
                    <h2>PROJECT OVERVIEW</h2>
                    ${this.formatContent(projectData.details)}
                </section>
                
                ${projectData.features ? `
                <section class="project-features">
                    <h2>KEY FEATURES</h2>
                    ${this.formatContent(projectData.features)}
                </section>` : ''}
                
                ${projectData.accuracy || projectData.dataset ? `
                <section class="project-metrics">
                    <h2>PERFORMANCE METRICS</h2>
                    <div class="metrics-grid">
                        ${projectData.accuracy ? `<div class="metric"><span class="metric-label">Accuracy/Performance</span><span class="metric-value">${projectData.accuracy}</span></div>` : ''}
                        ${projectData.dataset ? `<div class="metric"><span class="metric-label">Dataset Size</span><span class="metric-value">${projectData.dataset}</span></div>` : ''}
                    </div>
                </section>` : ''}
                
                <section class="project-tech">
                    <h2>TECHNOLOGIES USED</h2>
                    <div class="tech-stack">
                        ${projectData.tags.map(tech => `<span class="tech-item">${tech}</span>`).join('')}
                    </div>
                </section>
            </div>
            
            <footer class="project-footer">
                <div class="project-navigation">
                    <a href="../index.html#projects" class="btn btn-secondary">← BACK TO PROJECTS</a>
                    ${projectData.githubLink ? `<a href="${projectData.githubLink}" class="btn btn-primary">VIEW ON GITHUB</a>` : ''}
                </div>
            </footer>
        </div>
    </main>
</body>
</html>`;
            
            this.downloadHTML(htmlContent, projectData.title);
        }
        
        formatContent(content) {
            if (!content.includes('<')) {
                return content.split('\n').map(line => 
                    line.trim() ? (line.startsWith('•') ? `<li>${line.substring(1).trim()}</li>` : `<p>${line.trim()}</p>`) : ''
                ).join('');
            }
            return content;
        }
        
        downloadHTML(content, title) {
            const blob = new Blob([content], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.html`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            this.showInfo('HTML file downloaded! Upload it to your projects/ folder on your web server.');
        }
        
        loadExistingProjects() {
            const existingProjects = JSON.parse(localStorage.getItem('portfolioProjects')) || [];
            
            if (this.projectsList) {
                this.projectsList.innerHTML = '';
                
                if (existingProjects.length === 0) {
                    this.projectsList.innerHTML = '<p style="text-align: center; color: var(--gray-800);">No projects yet. Add your first AI project above!</p>';
                    return;
                }
                
                existingProjects.forEach(item => {
                    const listItem = document.createElement('div');
                    listItem.className = 'list-item';
                    listItem.innerHTML = `
                        <div class="item-info">
                            <h3>${item.title}</h3>
                            <p>${item.type.replace('-', ' ')} • ${item.tags.slice(0, 3).join(', ')} • ${item.status}</p>
                        </div>
                        <div class="item-actions">
                            <button class="btn-small btn-secondary" onclick="editProject('${item.id}')">EDIT</button>
                            <button class="btn-small btn-danger" onclick="deleteProject('${item.id}')">DELETE</button>
                        </div>
                    `;
                    this.projectsList.appendChild(listItem);
                });
            }
        }
        
        showSuccess(message) {
            this.showMessage(message, 'success');
        }
        
        showInfo(message) {
            this.showMessage(message, 'info');
        }
        
        showMessage(message, type) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `form-${type}`;
            messageDiv.textContent = message;
            
            const form = document.querySelector('.admin-form');
            form.insertBefore(messageDiv, form.firstChild);
            
            setTimeout(() => {
                messageDiv.remove();
            }, 5000);
        }
    }
    
    // Global functions for edit/delete (to be implemented)
    window.editWriting = function(id) {
        alert('Edit functionality coming soon! For now, you can delete and re-add the writing piece.');
    };
    
    window.deleteWriting = function(id) {
        if (confirm('Are you sure you want to delete this writing piece?')) {
            let existingWriting = JSON.parse(localStorage.getItem('portfolioWriting')) || [];
            existingWriting = existingWriting.filter(item => item.id !== id);
            localStorage.setItem('portfolioWriting', JSON.stringify(existingWriting));
            
            // Reload the list
            if (window.writingManager) {
                window.writingManager.loadExistingWriting();
            }
        }
    };
    
    window.editProject = function(id) {
        alert('Edit functionality coming soon! For now, you can delete and re-add the project.');
    };
    
    window.deleteProject = function(id) {
        if (confirm('Are you sure you want to delete this project?')) {
            let existingProjects = JSON.parse(localStorage.getItem('portfolioProjects')) || [];
            existingProjects = existingProjects.filter(item => item.id !== id);
            localStorage.setItem('portfolioProjects', JSON.stringify(existingProjects));
            
            // Reload the list
            if (window.projectsManager) {
                window.projectsManager.loadExistingProjects();
            }
        }
    };
    
    // Initialize managers
    if (document.getElementById('writingForm')) {
        window.writingManager = new WritingManager();
    }
    
    if (document.getElementById('projectForm')) {
        window.projectsManager = new ProjectsManager();
    }
    
    // Auto-populate date field with today's date
    const dateField = document.getElementById('date');
    if (dateField) {
        dateField.value = new Date().toISOString().split('T')[0];
    }
    
    console.log('🔧 Admin panel loaded successfully!');
});