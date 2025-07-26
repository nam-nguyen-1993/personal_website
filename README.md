# Personal Portfolio Website

A modern, stylistic personal portfolio website featuring a **Neo-Brutalist** design theme. Showcase your writing, AI projects, and professional experience with a unique, eye-catching design.

## 🎨 Design Features

- **Neo-Brutalist Theme**: Bold typography, harsh shadows, high contrast
- **Custom Cursor**: Interactive cursor that responds to hover states
- **Smooth Animations**: CSS transitions and scroll-triggered animations
- **Responsive Design**: Works perfectly on all devices
- **Content Management**: Easy-to-use admin panel for adding content

## 📁 Project Structure

```
personal-portfolio/
├── index.html              # Main homepage
├── css/
│   └── style.css          # Main stylesheet with Neo-Brutalist theme
├── js/
│   └── main.js            # Interactive JavaScript features
├── admin/                 # Content management system
│   ├── writing.html       # Add/manage writing pieces
│   ├── projects.html      # Add/manage AI projects
│   ├── admin.css          # Admin panel styles
│   └── admin.js           # Admin functionality
├── writing/               # Generated writing pages (created when you publish)
├── projects/              # Generated project pages (created when you publish)
├── images/                # Your photos and project images
└── data/                  # JSON data storage (local storage backup)
```

## 🚀 Getting Started

### 1. Customize Your Information

Open `index.html` and replace the placeholder content:

- **Line 8**: Change the title and meta description
- **Line 34**: Replace "YOUR.NAME" with your actual name
- **Lines 47-50**: Update the hero title and name
- **Lines 51-55**: Add your professional tagline and description
- **Lines 72-85**: Update the About section with your information
- **Lines 86-102**: Add your actual skills and experience
- **Lines 104-120**: Update the stats with your real numbers
- **Lines 298-320**: Update the work timeline with your experience
- **Lines 340-355**: Add your contact information

### 2. Add Your Content

#### Using the Admin Panel:

1. Open `admin/writing.html` in your browser
2. Fill out the form to add your writing pieces
3. Open `admin/projects.html` to add your AI projects
4. The system will generate HTML files for each piece

#### Manual Content Addition:

You can also edit the JavaScript in `js/main.js` to add default content that loads when the site starts.

### 3. Customize the Design

#### Colors (in `css/style.css`):
```css
:root {
    --primary-color: #FF3366;    /* Main accent color */
    --secondary-color: #00FF88;  /* Secondary accent */
    --accent-color: #3366FF;     /* Third accent color */
    /* Change these to match your brand */
}
```

#### Typography:
The site uses Google Fonts:
- **Space Grotesk**: Main font family
- **JetBrains Mono**: Monospace font for code/technical elements

## 📝 Adding Your Writing

### Method 1: Admin Panel (Recommended)

1. Navigate to `admin/writing.html`
2. Fill out the form with:
   - **Title**: Your article title
   - **Category**: essays, fiction, technical, or personal
   - **Excerpt**: Brief 2-3 sentence description
   - **Full Content**: Your complete article (supports basic HTML)
   - **Read Time**: Estimated reading time
   - **Date**: Publication date
   - **Tags**: Comma-separated keywords

3. Click "PUBLISH WRITING"
4. Download the generated HTML file
5. Upload it to your `writing/` folder

### Method 2: Manual HTML Creation

Create files in the `writing/` folder following this structure:
```html
<!DOCTYPE html>
<html>
<head>
    <title>Your Article Title</title>
    <link rel="stylesheet" href="../css/style.css">
</head>
<body>
    <!-- Your article content -->
</body>
</html>
```

## 🤖 Adding AI Projects

### Using the Admin Panel:

1. Navigate to `admin/projects.html`
2. Fill out the comprehensive form with:
   - **Project Title & Description**
   - **Technical Details**: Methodology, challenges, solutions
   - **Technologies Used**: Python, TensorFlow, etc.
   - **Performance Metrics**: Accuracy, F1-score, dataset size
   - **Links**: GitHub repository, live demo
   - **Project Image**: Screenshot or diagram URL

3. Click "ADD PROJECT"
4. Download the generated HTML file
5. Upload it to your `projects/` folder

## 🌐 Publishing Online

### Option 1: GitHub Pages (Free)

1. **Create a GitHub Repository**:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio commit"
   git remote add origin https://github.com/yourusername/portfolio.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository settings
   - Scroll to "Pages" section
   - Select "Deploy from branch: main"
   - Your site will be available at: `https://yourusername.github.io/portfolio`

### Option 2: Netlify (Free with Custom Domain)

1. **Deploy to Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop your project folder
   - Get instant deployment at: `https://random-name.netlify.app`

2. **Custom Domain**:
   - Purchase a domain (GoDaddy, Namecheap, etc.)
   - In Netlify settings, add your custom domain
   - Follow DNS configuration instructions

### Option 3: Vercel (Free)

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   cd your-portfolio-folder
   vercel
   ```

3. **Follow prompts** for instant deployment

### Option 4: Traditional Web Hosting

1. **Choose a hosting provider**:
   - Bluehost, SiteGround, HostGator, etc.
   - Purchase hosting plan ($3-10/month)

2. **Upload files**:
   - Use FTP client (FileZilla) or hosting file manager
   - Upload all files to public_html folder

3. **Configure domain**:
   - Point your domain to hosting provider
   - Access via your domain name

## 💾 Content Management

Your content is stored in the browser's local storage. To backup:

1. Open browser developer tools (F12)
2. Go to Application > Local Storage
3. Export `portfolioWriting` and `portfolioProjects` data
4. Save as JSON files for backup

## 🎯 SEO Optimization

### Update Meta Tags:
```html
<meta name="description" content="Your compelling description">
<meta property="og:title" content="Your Name - Portfolio">
<meta property="og:description" content="Your description">
<meta property="og:image" content="your-photo.jpg">
```

### Add Analytics:
Insert Google Analytics or other tracking code before `</head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
```

## 🔧 Customization Tips

### Change the Color Scheme:
1. Update CSS custom properties in `:root`
2. Test contrast ratios for accessibility
3. Consider your brand colors

### Add New Sections:
1. Follow the existing HTML structure
2. Add navigation links
3. Implement smooth scrolling
4. Add to the JavaScript scroll detection

### Performance Optimization:
- Optimize images (use WebP format)
- Minify CSS and JavaScript for production
- Enable compression on your web server
- Use a CDN for faster loading

## 📱 Mobile Responsiveness

The site is fully responsive and includes:
- Mobile navigation menu
- Responsive grid layouts
- Touch-friendly buttons
- Optimized typography scaling

## 🎨 Design Customization

### Font Changes:
Replace Google Fonts imports in `index.html` and update CSS variables:
```css
--font-primary: 'Your-Font', sans-serif;
--font-mono: 'Your-Mono-Font', monospace;
```

### Layout Modifications:
- Grid layouts are flexible and can be easily modified
- Use CSS Grid inspector in browser dev tools
- Adjust breakpoints in media queries

## 🔒 Security Considerations

- No server-side processing required
- Content stored in local storage (client-side only)
- For production, consider server-side content management
- Regular backups of your content data

## 📞 Support

If you need help customizing or deploying your portfolio:

1. Check browser console for JavaScript errors
2. Validate HTML/CSS using online validators
3. Test on multiple devices and browsers
4. Consider hiring a web developer for advanced customizations

## 🚀 Next Steps

1. **Customize** all placeholder content with your information
2. **Add** your first writing piece and AI project
3. **Deploy** to your chosen hosting platform
4. **Share** your portfolio URL on social media and resumes
5. **Update** regularly with new content

Your professional portfolio is now ready to showcase your work to the world! 🌟