/**
 * Script to convert posts.json data to individual Markdown files
 * 
 * This script:
 * 1. Reads the posts.json file
 * 2. Creates a content directory with subdirectories for categories
 * 3. Converts each post to a Markdown file with proper frontmatter
 * 4. Organizes files by category
 */

const fs = require('fs-extra');
const path = require('path');

// Configuration
const POSTS_JSON_PATH = path.join(process.cwd(), 'src/data/posts.json');
const CONTENT_DIR = path.join(process.cwd(), 'content');

// Create category directories
const CATEGORIES = ['blog', 'portfolio', 'about', 'career'];

// Ensure content directory and its subdirectories exist
fs.ensureDirSync(CONTENT_DIR);
CATEGORIES.forEach(category => {
  fs.ensureDirSync(path.join(CONTENT_DIR, category));
});

// Function to convert a JSON post to Markdown with frontmatter
function convertPostToMarkdown(post) {
  // Create frontmatter
  const frontmatter = [
    '---',
    `id: ${post.id}`,
    `title: "${post.title.replace(/"/g, '\\"')}"`,
    `date: ${post.date}`,
    `excerpt: "${post.excerpt ? post.excerpt.replace(/"/g, '\\"') : ''}"`,
    post.category ? `category: ${post.category}` : '',
    post.tags && post.tags.length ? `tags:\n${post.tags.map(tag => `  - ${tag}`).join('\n')}` : '',
    post.series && post.series.length ? `series:\n${post.series.map(item => `  - ${item}`).join('\n')}` : '',
    '---',
    '',
  ].filter(Boolean).join('\n');

  // Combine frontmatter and content
  return `${frontmatter}${post.content}`;
}

// Function to get a safe filename from a slug
function getFilenameFromSlug(slug) {
  return `${slug.replace(/[^a-z0-9-]/gi, '-').toLowerCase()}.md`;
}

// Function to determine the appropriate category directory
function getCategoryDir(post) {
  if (post.category && CATEGORIES.includes(post.category)) {
    return post.category;
  }
  return 'blog'; // Default to blog category
}

// Main function to convert all posts
async function convertJsonToMarkdown() {
  try {
    console.log('Starting conversion of posts.json to Markdown files...');
    
    // Read the posts.json file
    const postsJson = fs.readFileSync(POSTS_JSON_PATH, 'utf8');
    const posts = JSON.parse(postsJson);
    
    console.log(`Found ${posts.length} posts to convert.`);
    
    // Convert each post and write to a Markdown file
    posts.forEach(post => {
      const category = getCategoryDir(post);
      const filename = getFilenameFromSlug(post.slug);
      const filePath = path.join(CONTENT_DIR, category, filename);
      
      const markdownContent = convertPostToMarkdown(post);
      fs.writeFileSync(filePath, markdownContent);
      
      console.log(`Converted: ${post.title} -> ${filePath}`);
    });
    
    console.log('\nConversion completed successfully!');
    console.log(`Markdown files have been saved to: ${CONTENT_DIR}`);
  } catch (error) {
    console.error('Error converting posts.json to Markdown:', error);
    process.exit(1);
  }
}

// Run the conversion
convertJsonToMarkdown(); 