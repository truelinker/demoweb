/**
 * Script to fix image paths in Markdown files
 * 
 * This script:
 * 1. Searches all Markdown files in the content directory
 * 2. Replaces image references from /img/ to /images/blog/
 * 3. Saves the updated files
 */

const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');

// Configuration
const CONTENT_DIR = path.join(process.cwd(), 'content');

// Function to fix image paths in a file
function fixImagePaths(filePath) {
  try {
    // Read the file content
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Replace image paths
    const updatedContent = content.replace(/!\[.*?\]\(\/img\/(.*?)\)/g, '![alt](/images/blog/$1)');
    
    // Save if changes were made
    if (content !== updatedContent) {
      fs.writeFileSync(filePath, updatedContent);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error);
    return false;
  }
}

// Main function
async function fixAllImagePaths() {
  console.log('Fixing image paths in Markdown files...');
  
  // Find all Markdown files
  const markdownFiles = glob.sync(`${CONTENT_DIR}/**/*.md`);
  console.log(`Found ${markdownFiles.length} Markdown files.`);
  
  let fixedCount = 0;
  
  // Process each file
  for (const file of markdownFiles) {
    const wasFixed = fixImagePaths(file);
    if (wasFixed) {
      fixedCount++;
      console.log(`Fixed image paths in: ${file}`);
    }
  }
  
  console.log(`\nFinished processing files. Fixed ${fixedCount} out of ${markdownFiles.length} files.`);
}

// Run the script
fixAllImagePaths().catch(err => {
  console.error('Error:', err);
  process.exit(1);
}); 