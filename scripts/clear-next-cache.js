/**
 * Script to clear Next.js cache
 * 
 * This script:
 * 1. Removes the .next directory
 * 2. Helps ensure changes are recognized when rebuilding
 */

const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const NEXT_CACHE_DIR = path.join(process.cwd(), '.next');

// Main function
async function clearNextCache() {
  console.log('Clearing Next.js cache...');
  
  try {
    // Check if .next directory exists
    if (fs.existsSync(NEXT_CACHE_DIR)) {
      // Remove the directory
      fs.removeSync(NEXT_CACHE_DIR);
      console.log(`Successfully removed ${NEXT_CACHE_DIR}`);
    } else {
      console.log(`${NEXT_CACHE_DIR} does not exist, no cleanup needed.`);
    }
    
    // Touch the pages file to ensure it's recognized as changed
    const targetFile = path.join(process.cwd(), 'src/app/blog/[slug]/page.tsx');
    if (fs.existsSync(targetFile)) {
      const stats = fs.statSync(targetFile);
      const now = new Date();
      fs.utimesSync(targetFile, now, now);
      console.log(`Updated timestamp for ${targetFile}`);
    }
    
    console.log('\nNext.js cache cleared successfully. Please restart your development server:');
    console.log('npm run dev');
  } catch (error) {
    console.error('Error clearing Next.js cache:', error);
    process.exit(1);
  }
}

// Run the script
clearNextCache().catch(err => {
  console.error('Error:', err);
  process.exit(1);
}); 