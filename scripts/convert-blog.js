/**
 * Script to convert Hugo blog Markdown files to Next.js JSON format
 * 
 * This script:
 * 1. Reads Markdown files from oldblog/MyungBlog/content
 * 2. Parses the frontmatter and content
 * 3. Converts to the required JSON format
 * 4. Copies images to the public directory
 * 5. Saves the converted content to src/data/posts.json
 */

const fs = require('fs-extra');
const path = require('path');
const matter = require('gray-matter');
const glob = require('glob');
const { v4: uuidv4 } = require('uuid');

// Path configurations
const oldBlogPath = path.join(process.cwd(), 'oldblog/MyungBlog/content');
const targetPostsJsonPath = path.join(process.cwd(), 'src/data/posts.json');
const targetImagesDir = path.join(process.cwd(), 'public/images/blog');

// Ensure the target directories exist
fs.ensureDirSync(targetImagesDir);

// Function to generate slug from filename
function generateSlug(filePath) {
  const fileName = path.basename(filePath, path.extname(filePath));
  return fileName === '_index' || fileName === 'index' 
    ? path.basename(path.dirname(filePath))
    : fileName;
}

// Function to process image paths in Markdown content
function processImagePaths(content, sourceDirPath) {
  // Match markdown image syntax: ![alt](/path/to/image.jpg)
  const imageRegex = /!\[.*?\]\((\/.*?)\)/g;
  
  return content.replace(imageRegex, (match, imagePath) => {
    const imageFileName = path.basename(imagePath);
    
    // Try to find the image in the old blog
    let sourceImagePath;
    // Check if it's an image in the portfolio assets
    if (imagePath.includes('/portfolio/assets/')) {
      sourceImagePath = path.join(oldBlogPath, 'portfolio/assets', imageFileName);
    } 
    // Check if it's in the general img directory
    else if (imagePath.includes('/img/')) {
      sourceImagePath = path.join(oldBlogPath, '..', 'static/img', imageFileName);
    }
    // Otherwise, try to find it relative to the current content file
    else {
      const assetsDir = path.join(path.dirname(sourceDirPath), 'assets');
      sourceImagePath = path.join(assetsDir, imageFileName);
    }
    
    // Target path for the image in the public directory
    const targetImagePath = path.join(targetImagesDir, imageFileName);
    
    // Copy the image if it exists
    if (fs.existsSync(sourceImagePath)) {
      fs.copySync(sourceImagePath, targetImagePath);
      return `![${imageFileName.split('.')[0]}](/images/blog/${imageFileName})`;
    } else {
      console.warn(`Warning: Could not find image ${sourceImagePath}`);
      return match;
    }
  });
}

// Function to convert a Markdown file to a JSON blog post
function convertMarkdownToJson(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);
  
  // Process the content to fix image paths
  const processedContent = processImagePaths(content, filePath);
  
  // Generate slug
  const slug = generateSlug(filePath);
  
  // Get category based on the directory structure
  const relativePath = path.relative(oldBlogPath, filePath);
  const category = relativePath.split(path.sep)[0].toLowerCase();
  
  return {
    id: uuidv4(),
    slug,
    title: data.title || 'Untitled',
    date: data.date ? new Date(data.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    excerpt: data.excerpt || data.subtitle || '',
    content: processedContent,
    category,
    tags: data.tags || [],
    series: data.series || []
  };
}

// Main function to convert all blog content
async function convertBlog() {
  console.log('Starting blog conversion...');
  
  // Find all Markdown files in the oldblog content directory
  const markdownFiles = glob.sync(`${oldBlogPath}/**/*.md`);
  console.log(`Found ${markdownFiles.length} Markdown files.`);
  
  // Convert each Markdown file to a JSON blog post
  const posts = markdownFiles
    .filter(file => !file.includes('_index.md')) // Skip index files
    .map(convertMarkdownToJson);
  
  // Read existing posts.json if it exists
  let existingPosts = [];
  if (fs.existsSync(targetPostsJsonPath)) {
    try {
      existingPosts = JSON.parse(fs.readFileSync(targetPostsJsonPath, 'utf8'));
    } catch (err) {
      console.warn('Error reading existing posts.json, creating new file:', err);
    }
  }
  
  // Combine the converted posts with existing posts
  const combinedPosts = [...existingPosts, ...posts];
  
  // Sort posts by date
  combinedPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  // Write the combined posts to posts.json
  fs.writeFileSync(targetPostsJsonPath, JSON.stringify(combinedPosts, null, 2));
  
  console.log(`Successfully converted ${posts.length} posts and saved to ${targetPostsJsonPath}`);
}

// Execute the conversion
convertBlog().catch(err => {
  console.error('Error converting blog:', err);
  process.exit(1);
}); 