/**
 * Script to copy files from oldblog to a new location with content-aware filenames
 * 
 * This script:
 * 1. Reads each file from the oldblog
 * 2. For Markdown files, extracts the title from frontmatter to use as filename
 * 3. For images, attempts to create a meaningful name based on context
 * 4. Organizes files in appropriate directories based on their category/content
 */

const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');
const matter = require('gray-matter');
const slugify = require('slugify'); // We'll need to install this

// Configuration
const OLD_BLOG_PATH = path.join(process.cwd(), 'oldblog');
const TARGET_PATH = path.join(process.cwd(), 'content');

// Create target directory structure
const DIRECTORIES = [
  'blog',
  'portfolio',
  'about',
  'career',
  'images',
  'images/portfolio',
  'images/blog'
];

// Create directory structure
DIRECTORIES.forEach(dir => {
  fs.ensureDirSync(path.join(TARGET_PATH, dir));
});

// Helper function to create slug from text
function createSlug(text) {
  return slugify(text, {
    lower: true,           // Convert to lowercase
    strict: true,          // Strip special characters
    remove: /[*+~.()'"!:@]/g // Custom characters to remove
  });
}

// Function to get a meaningful name from markdown frontmatter
function getMeaningfulNameFromMarkdown(filePath) {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContent);
    
    // Use title if available, otherwise use the original filename
    if (data.title) {
      return createSlug(data.title);
    }
  } catch (error) {
    console.error(`Error extracting title from ${filePath}:`, error);
  }
  
  // Fallback to original filename without extension
  return path.basename(filePath, path.extname(filePath));
}

// Function to determine the appropriate target directory based on content
function determineTargetDirectory(filePath) {
  const relativePath = path.relative(OLD_BLOG_PATH, filePath);
  
  // Determine category based on directory structure
  if (relativePath.includes('/portfolio/')) {
    return 'portfolio';
  } else if (relativePath.includes('/about/')) {
    return 'about';
  } else if (relativePath.includes('/career/')) {
    return 'career';
  } else if (relativePath.includes('/content/')) {
    return 'blog';
  }
  
  // Default to blog
  return 'blog';
}

// Function to determine appropriate image directory
function determineImageDirectory(filePath) {
  const relativePath = path.relative(OLD_BLOG_PATH, filePath);
  
  if (relativePath.includes('/portfolio/')) {
    return 'images/portfolio';
  }
  
  return 'images/blog';
}

// Process markdown files
function processMarkdownFiles() {
  const markdownFiles = glob.sync(`${OLD_BLOG_PATH}/MyungBlog/content/**/*.md`);
  console.log(`Found ${markdownFiles.length} markdown files`);
  
  markdownFiles.forEach(file => {
    // Skip index files
    if (file.includes('_index.md') || file.includes('index.md')) {
      return;
    }
    
    try {
      // Get meaningful name based on content
      const meaningfulName = getMeaningfulNameFromMarkdown(file);
      
      // Determine target directory
      const category = determineTargetDirectory(file);
      
      // Create new filename
      const newFileName = `${meaningfulName}.md`;
      const targetPath = path.join(TARGET_PATH, category, newFileName);
      
      // Read file content to potentially modify it
      const content = fs.readFileSync(file, 'utf8');
      
      // Write to new location
      fs.writeFileSync(targetPath, content);
      console.log(`Copied: ${file} -> ${targetPath}`);
    } catch (error) {
      console.error(`Error processing ${file}:`, error);
    }
  });
}

// Process image files
function processImageFiles() {
  const imagePatterns = [
    `${OLD_BLOG_PATH}/MyungBlog/static/img/**/*.{jpg,jpeg,png,gif,svg}`,
    `${OLD_BLOG_PATH}/MyungBlog/content/**/assets/**/*.{jpg,jpeg,png,gif,svg}`
  ];
  
  const imageFiles = imagePatterns.flatMap(pattern => glob.sync(pattern));
  console.log(`Found ${imageFiles.length} image files`);
  
  imageFiles.forEach(file => {
    try {
      // Determine image name
      const originalName = path.basename(file);
      
      // Clean up name - remove special characters, convert to lowercase
      const cleanName = originalName.replace(/[^a-zA-Z0-9.]/g, '-').toLowerCase();
      
      // Determine target directory
      const imageDir = determineImageDirectory(file);
      
      // Create target path
      const targetPath = path.join(TARGET_PATH, imageDir, cleanName);
      
      // Copy image
      fs.copySync(file, targetPath);
      console.log(`Copied: ${file} -> ${targetPath}`);
    } catch (error) {
      console.error(`Error processing image ${file}:`, error);
    }
  });
}

// Main function
async function copyWithContentAwareNames() {
  console.log('Starting content-aware copy...');
  
  // Process markdown content files
  processMarkdownFiles();
  
  // Process image files
  processImageFiles();
  
  console.log('\nContent-aware copy completed!');
  console.log(`Files have been organized in: ${TARGET_PATH}`);
}

// Run the script
copyWithContentAwareNames().catch(err => {
  console.error('Error:', err);
  process.exit(1);
}); 