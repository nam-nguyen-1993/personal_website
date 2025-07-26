// Mondrian-Inspired Dynamic Portfolio JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Content Management System
    class MondrianContentManager {
        constructor() {
            this.writingData = [];
            this.projectsData = [];
            this.readingsData = [];
            this.activeBlock = null;
            this.init();
        }
        
        init() {
            this.loadContent();
            this.setupBlockInteractions();
            this.setupNavigation();
            this.setupModal();
            this.startAnimations();
        }
        
        loadContent() {
            // Load writing from localStorage or use default content
            const savedWriting = localStorage.getItem('portfolioWriting');
            if (savedWriting) {
                this.writingData = JSON.parse(savedWriting);
            } else {
                // Default writing pieces
                this.writingData = [
                    {
                        id: '1',
                        title: 'The Compounding Returns of Infrastructure',
                        excerpt: 'How foundational technologies create exponential progress.',
                        date: '2025-01-20',
                        category: 'essays'
                    },
                    {
                        id: '2',
                        title: 'Why Smart People Build Dumb Startups',
                        excerpt: 'Intelligence can be a liability in early-stage startups.',
                        date: '2025-01-18',
                        category: 'essays'
                    },
                    {
                        id: '3',
                        title: 'The AI Alignment Tax',
                        excerpt: 'Why building aligned AI systems costs more.',
                        date: '2025-01-22',
                        category: 'technical'
                    }
                ];
                localStorage.setItem('portfolioWriting', JSON.stringify(this.writingData));
            }
            // Writing preview removed - only showing title and description
            
            // Load projects from localStorage or use default content
            const savedProjects = localStorage.getItem('portfolioProjects');
            if (savedProjects) {
                this.projectsData = JSON.parse(savedProjects);
            } else {
                // Default AI projects
                this.projectsData = [
                    {
                        id: '1',
                        title: 'Sentiment Analysis Engine',
                        description: 'ML model analyzing text sentiment with 94% accuracy.',
                        technologies: ['Python', 'PyTorch', 'NLP'],
                        status: 'completed'
                    },
                    {
                        id: '2',
                        title: 'Geometric Art Generator',
                        description: 'AI system creating Mondrian-inspired compositions.',
                        technologies: ['JavaScript', 'Canvas API', 'ML'],
                        status: 'in-progress'
                    }
                ];
                localStorage.setItem('portfolioProjects', JSON.stringify(this.projectsData));
            }
            // Projects preview removed - only showing title and description
            
            // Load readings from localStorage or use default content
            const savedReadings = localStorage.getItem('portfolioReadings');
            if (savedReadings) {
                this.readingsData = JSON.parse(savedReadings);
            } else {
                // Curated readings on AI, fintech, technology strategy
                this.readingsData = {
                    'AI': [
                        'Attention Is All You Need - Vaswani et al.',
                        'The Bitter Lesson - Richard Sutton',
                        'GPT-3: Language Models are Few-Shot Learners',
                        'Scaling Laws for Neural Language Models',
                        'AI and the Future of Work - Daron Acemoglu'
                    ],
                    'Fintech': [
                        'The PayPal Wars - Eric Jackson',
                        'Digital Gold - Nathaniel Popper',
                        'The Age of Cryptocurrency - Vigna & Casey',
                        'Open Banking Revolution - Paulo Barros',
                        'Blockchain Revolution - Tapscott & Tapscott'
                    ],
                    'Strategy': [
                        'Zero to One - Peter Thiel',
                        'The Innovator\'s Dilemma - Clayton Christensen',
                        'Crossing the Chasm - Geoffrey Moore',
                        'Platform Revolution - Parker, Van Alstyne & Choudary',
                        'Blitzscaling - Reid Hoffman'
                    ],
                    'History': [
                        'The Idea Factory - Jon Gertner',
                        'Where Wizards Stay Up Late - Hafner & Lyon',
                        'The Dream Machine - M. Mitchell Waldrop',
                        'Dealers of Lightning - Michael Hiltzik',
                        'Fire in the Valley - Freiberger & Swaine'
                    ],
                    'Philosophy': [
                        'The Design of Everyday Things - Don Norman',
                        'Mindstorms - Seymour Papert',
                        'The Art of Computer Programming - Donald Knuth',
                        'Gödel, Escher, Bach - Douglas Hofstadter',
                        'The Structure of Scientific Revolutions - Thomas Kuhn'
                    ],
                    'Trading': [
                        'Market Wizards - Jack Schwager',
                        'Reminiscences of a Stock Operator - Edwin Lefèvre',
                        'The Intelligent Investor - Benjamin Graham',
                        'Flash Boys - Michael Lewis',
                        'Dark Pools - Scott Patterson'
                    ]
                };
                localStorage.setItem('portfolioReadings', JSON.stringify(this.readingsData));
            }
            // Readings preview removed - only showing title and description
        }
        
        // Preview rendering methods removed - tiles now show only titles and descriptions
        
        // Links section removed - now using readings block
        
        setupBlockInteractions() {
            const blocks = document.querySelectorAll('.mondrian-block');
            
            blocks.forEach(block => {
                // Enhanced hover effects
                block.addEventListener('mouseenter', () => {
                    this.animateBlockEntry(block);
                    this.highlightRelatedBlocks(block);
                });
                
                block.addEventListener('mouseleave', () => {
                    this.animateBlockExit(block);
                    this.clearHighlights();
                });
                
                // Click to expand content
                block.addEventListener('click', () => {
                    this.expandBlock(block);
                });
                
                // Touch support for mobile
                block.addEventListener('touchstart', () => {
                    this.animateBlockEntry(block);
                });
                
                block.addEventListener('touchend', () => {
                    setTimeout(() => this.animateBlockExit(block), 1000);
                });
            });
        }
        
        animateBlockEntry(block) {
            // Add ripple effect
            this.createRipple(block);
            
            // Subtle rotation based on block type
            const contentType = block.dataset.content;
            let rotation = 0;
            
            switch(contentType) {
                case 'about': rotation = 1; break;
                case 'writing': rotation = -1; break;
                case 'projects': rotation = 2; break;
                case 'links': rotation = -2; break;
            }
            
            block.style.transform += ` rotate(${rotation}deg)`;
        }
        
        animateBlockExit(block) {
            block.style.transform = block.style.transform.replace(/rotate\([^)]*\)/g, '');
        }
        
        createRipple(block) {
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.4);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
                top: 50%;
                left: 50%;
                width: 20px;
                height: 20px;
                margin-left: -10px;
                margin-top: -10px;
                z-index: 100;
            `;
            
            block.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        }
        
        highlightRelatedBlocks(activeBlock) {
            const contentType = activeBlock.dataset.content;
            const allBlocks = document.querySelectorAll('.mondrian-block');
            
            allBlocks.forEach(block => {
                if (block !== activeBlock) {
                    block.style.opacity = '0.7';
                    block.style.filter = 'grayscale(0.3)';
                }
            });
        }
        
        clearHighlights() {
            const allBlocks = document.querySelectorAll('.mondrian-block');
            allBlocks.forEach(block => {
                block.style.opacity = '';
                block.style.filter = '';
            });
        }
        
        expandBlock(block) {
            const contentType = block.dataset.content;
            let modalContent = '';
            
            switch(contentType) {
                case 'about':
                    modalContent = this.generateAboutModal();
                    break;
                case 'writing':
                    modalContent = this.generateWritingModal();
                    break;
                case 'projects':
                    modalContent = this.generateProjectsModal();
                    break;
                case 'readings':
                    modalContent = this.generateReadingsModal();
                    break;
                case 'contact':
                    modalContent = this.generateContactModal();
                    break;
                default:
                    return;
            }
            
            this.showModal(modalContent);
        }
        
        generateAboutModal() {
            return `
                <h2 style="color: var(--mondrian-red); margin-bottom: 20px;">About Me</h2>
                <p>I'm a creative technologist passionate about the intersection of art, technology, and human expression. My work explores how digital tools can amplify creativity rather than replace it.</p>
                <p>Inspired by the geometric precision of Piet Mondrian and the De Stijl movement, I believe in the power of constraint to unleash creativity. This portfolio itself is a living example of that philosophy.</p>
                <p>I build things that matter, write about ideas that inspire, and constantly seek the balance between form and function.</p>
                <div style="margin-top: 30px;">
                    <h3>Skills & Interests</h3>
                    <ul style="text-align: left; margin-top: 15px;">
                        <li>Creative Coding & Generative Art</li>
                        <li>Machine Learning & AI Applications</li>
                        <li>User Experience Design</li>
                        <li>Technical Writing</li>
                        <li>Geometric Design Systems</li>
                    </ul>
                </div>
            `;
        }
        
        generateWritingModal() {
            const writingList = this.writingData.map(item => `
                <div style="margin-bottom: 25px; padding: 15px; border-left: 4px solid var(--mondrian-blue);">
                    <h3 style="margin-bottom: 8px;">${item.title}</h3>
                    <p style="margin-bottom: 8px; opacity: 0.8;">${item.excerpt}</p>
                    <small style="color: var(--mondrian-blue);">${this.formatDate(item.date)} · ${item.category}</small>
                </div>
            `).join('');
            
            return `
                <h2 style="color: var(--mondrian-blue); margin-bottom: 20px;">Writing</h2>
                <p>Essays on technology, creativity, and the human condition. Exploring ideas at the intersection of art and code.</p>
                <div style="margin-top: 30px;">
                    ${writingList}
                </div>
                <div style="text-align: center; margin-top: 30px;">
                    <a href="admin/dashboard.html" style="background: var(--mondrian-blue); color: white; padding: 10px 20px; text-decoration: none; font-weight: bold;">Admin Dashboard</a>
                </div>
            `;
        }
        
        generateProjectsModal() {
            const projectsList = this.projectsData.map(item => `
                <div style="margin-bottom: 25px; padding: 15px; border-left: 4px solid var(--mondrian-yellow);">
                    <h3 style="margin-bottom: 8px;">${item.title}</h3>
                    <p style="margin-bottom: 12px;">${item.description}</p>
                    <div style="margin-bottom: 8px;">
                        <strong>Technologies:</strong> ${item.technologies ? item.technologies.join(', ') : 'N/A'}
                    </div>
                    <div style="margin-bottom: 8px;">
                        <strong>Status:</strong> <span style="color: var(--mondrian-yellow); font-weight: bold;">${item.status}</span>
                    </div>
                </div>
            `).join('');
            
            return `
                <h2 style="color: var(--mondrian-yellow); margin-bottom: 20px;">Projects</h2>
                <p>AI experiments, creative coding projects, and technical explorations. Building the future through code.</p>
                <div style="margin-top: 30px;">
                    ${projectsList}
                </div>
                <div style="text-align: center; margin-top: 30px;">
                    <a href="admin/dashboard.html" style="background: var(--mondrian-yellow); color: black; padding: 10px 20px; text-decoration: none; font-weight: bold;">Admin Dashboard</a>
                </div>
            `;
        }
        
        generateReadingsModal() {
            const allCategories = Object.keys(this.readingsData);
            
            const readingsList = allCategories.map(category => {
                const items = this.readingsData[category] || [];
                const itemsList = items.map(item => `
                    <li style="margin-bottom: 8px; font-family: 'Space Mono', monospace; font-size: 0.9rem; line-height: 1.4;">${item}</li>
                `).join('');
                
                return `
                    <div style="margin-bottom: 35px;">
                        <h3 style="color: var(--mondrian-red); margin-bottom: 15px; font-family: 'JetBrains Mono', monospace; text-transform: uppercase; font-size: 1rem; letter-spacing: 0.05em;">${category}</h3>
                        <ul style="list-style: none; padding-left: 0;">
                            ${itemsList}
                        </ul>
                    </div>
                `;
            }).join('');
            
            return `
                <h2 style="color: var(--mondrian-black); margin-bottom: 20px; font-family: 'JetBrains Mono', monospace;">CURATED READINGS</h2>
                <p style="margin-bottom: 30px; font-style: italic;">Essential books and papers on technology, strategy, and human-computer interaction.</p>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px;">
                    ${readingsList}
                </div>
                
                <div style="margin-top: 40px; padding: 20px; background: var(--mondrian-light-gray); text-align: center;">
                    <p style="font-family: 'Inter', sans-serif; font-size: 0.9rem; margin: 0;">
                        These readings shape how I think about technology, design, and the future. 
                        Each represents a shift in perspective or breakthrough in understanding.
                    </p>
                </div>
            `;
        }
        
        generateContactModal() {
            return `
                <h2 style="color: var(--mondrian-black); margin-bottom: 20px;">Contact</h2>
                <p>Let's collaborate on something amazing. I'm always interested in creative projects that push boundaries.</p>
                <div style="margin-top: 30px; text-align: center;">
                    <div style="margin-bottom: 20px;">
                        <a href="mailto:nam.nguyen@chicagobooth.edu" style="display: inline-block; background: var(--mondrian-red); color: white; padding: 15px 30px; text-decoration: none; font-weight: bold; margin: 10px;">Email Me</a>
                    </div>
                    <div style="margin-bottom: 20px;">
                        <a href="https://github.com/nam-nguyen-1993" target="_blank" style="display: inline-block; background: var(--mondrian-blue); color: white; padding: 15px 30px; text-decoration: none; font-weight: bold; margin: 10px;">GitHub</a>
                    </div>
                    <div style="margin-bottom: 20px;">
                        <a href="https://linkedin.com/in/namhoangnguyen1" target="_blank" style="display: inline-block; background: var(--mondrian-yellow); color: black; padding: 15px 30px; text-decoration: none; font-weight: bold; margin: 10px;">LinkedIn</a>
                    </div>
                </div>
                <div style="margin-top: 40px; padding: 20px; background: var(--mondrian-light-gray); text-align: center;">
                    <p><strong>Current Status:</strong> Available for new projects</p>
                    <p><strong>Response Time:</strong> Usually within 24 hours</p>
                </div>
            `;
        }
        
        setupNavigation() {
            const navItems = document.querySelectorAll('.nav-item');
            navItems.forEach(item => {
                item.addEventListener('click', () => {
                    const target = item.dataset.target;
                    const targetBlock = document.querySelector(`[data-content="${target}"]`);
                    if (targetBlock) {
                        this.highlightBlock(targetBlock);
                        setTimeout(() => this.expandBlock(targetBlock), 500);
                    }
                });
            });
        }
        
        highlightBlock(block) {
            // Temporary highlight effect
            const originalTransform = block.style.transform;
            block.style.transform = 'scale(1.1) rotate(2deg)';
            block.style.zIndex = '15';
            
            setTimeout(() => {
                block.style.transform = originalTransform;
                block.style.zIndex = '';
            }, 1000);
        }
        
        setupModal() {
            const modal = document.getElementById('modalOverlay');
            const closeBtn = document.getElementById('modalClose');
            
            closeBtn.addEventListener('click', () => this.hideModal());
            modal.addEventListener('click', (e) => {
                if (e.target === modal) this.hideModal();
            });
            
            // Keyboard support
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && modal.classList.contains('active')) {
                    this.hideModal();
                }
            });
        }
        
        showModal(content) {
            const modal = document.getElementById('modalOverlay');
            const modalBody = document.getElementById('modalBody');
            
            modalBody.innerHTML = content;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        
        hideModal() {
            const modal = document.getElementById('modalOverlay');
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        startAnimations() {
            // Random block animations
            setInterval(() => {
                this.randomBlockAnimation();
            }, 5000);
            
            // No grid lines to animate anymore
        }
        
        randomBlockAnimation() {
            const decorativeBlocks = document.querySelectorAll('[data-content="decorative"]');
            const randomBlock = decorativeBlocks[Math.floor(Math.random() * decorativeBlocks.length)];
            
            if (randomBlock) {
                randomBlock.classList.add('animated');
                setTimeout(() => {
                    randomBlock.classList.remove('animated');
                }, 3000);
            }
        }
        
        // Line animation removed - no grid lines anymore
        
        formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
        }
        
        // Content management methods removed from public interface
        // Use admin dashboard for content management
    }
    
    // Initialize the Mondrian portfolio
    const portfolio = new MondrianContentManager();
    
    // Portfolio manager for public interface only
    // Admin functions moved to dashboard
    
    // Add dynamic CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @keyframes lineGlow {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.8; box-shadow: 0 0 10px var(--mondrian-black); }
        }
        
        .preview-item {
            margin-bottom: 12px;
            padding-bottom: 8px;
            border-bottom: 1px solid rgba(0,0,0,0.1);
        }
        
        .preview-item:last-child {
            border-bottom: none;
        }
    `;
    document.head.appendChild(style);
    
    // Console art
    console.log(`
    ╔══════════════════════════════════╗
    ║   MONDRIAN PORTFOLIO LOADED      ║
    ║   Inspired by De Stijl Movement  ║
    ║   Click blocks to explore...     ║
    ╚══════════════════════════════════╝
    `);
});