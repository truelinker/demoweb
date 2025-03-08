/**
 * Simple script to rename the oldblog directory
 */

const fs = require('fs-extra');
const path = require('path');

// Configuration
const OLD_BLOG_PATH = path.join(process.cwd(), 'oldblog');
const DATE_STAMP = new Date().toISOString().split('T')[0];
const NEW_NAME = `oldblog_archive_${DATE_STAMP}`;
const NEW_PATH = path.join(process.cwd(), NEW_NAME);

// Main function to rename the directory
function renameOldBlog() {
  console.log(`Renaming: ${OLD_BLOG_PATH} -> ${NEW_PATH}`);
  
  try {
    // Check if the oldblog directory exists
    if (!fs.existsSync(OLD_BLOG_PATH)) {
      console.error(`Error: ${OLD_BLOG_PATH} does not exist.`);
      process.exit(1);
    }
    
    // Check if the target directory already exists
    if (fs.existsSync(NEW_PATH)) {
      console.error(`Error: Target directory ${NEW_PATH} already exists.`);
      process.exit(1);
    }
    
    // Rename the directory
    fs.moveSync(OLD_BLOG_PATH, NEW_PATH);
    
    console.log(`Successfully renamed oldblog to ${NEW_NAME}`);
    console.log('Now you can create a new oldblog directory if needed.');
  } catch (error) {
    console.error('Error renaming directory:', error);
    process.exit(1);
  }
}

// Run the rename function
renameOldBlog(); 