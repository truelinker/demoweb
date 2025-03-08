/**
 * Script to backup important content from oldblog before deletion
 * 
 * This script:
 * 1. Creates a backup directory
 * 2. Copies all content files (markdown, images, etc.) to the backup
 * 3. Preserves the directory structure for future reference
 * 4. Skips unnecessary files like .git, node_modules, etc.
 */

const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');

// Configuration
const OLD_BLOG_PATH = path.join(process.cwd(), 'oldblog');
const BACKUP_PATH = path.join(process.cwd(), 'oldblog_backup');
const DATE_STAMP = new Date().toISOString().split('T')[0];

// Directories and files to exclude
const EXCLUDE_PATTERNS = [
  '**/.git/**',
  '**/.DS_Store',
  '**/node_modules/**',
  '**/public/build/**',
  '**/resources/_gen/**'
];

// Create timestamped backup directory
const backupDir = `${BACKUP_PATH}_${DATE_STAMP}`;
console.log(`Creating backup directory: ${backupDir}`);
fs.ensureDirSync(backupDir);

// Function to check if a file should be excluded
function shouldExclude(filePath) {
  const relativePath = path.relative(OLD_BLOG_PATH, filePath);
  return EXCLUDE_PATTERNS.some(pattern => {
    const minimatch = require('minimatch');
    return minimatch(relativePath, pattern);
  });
}

// Function to copy a file with directory structure
function copyFile(source, baseDir, targetDir) {
  const relativePath = path.relative(baseDir, source);
  const targetPath = path.join(targetDir, relativePath);
  
  // Create directory if it doesn't exist
  const targetDirectory = path.dirname(targetPath);
  fs.ensureDirSync(targetDirectory);
  
  // Copy the file
  fs.copySync(source, targetPath);
  return relativePath;
}

// Main backup function
async function backupOldBlog() {
  console.log('Starting oldblog backup...');
  
  // Copy content files (markdown)
  const contentFiles = glob.sync(`${OLD_BLOG_PATH}/MyungBlog/content/**/*.md`);
  console.log(`Found ${contentFiles.length} content files`);
  
  for (const file of contentFiles) {
    if (!shouldExclude(file)) {
      const relativePath = copyFile(file, OLD_BLOG_PATH, backupDir);
      console.log(`Copied: ${relativePath}`);
    }
  }
  
  // Copy image files
  const imagePatterns = [
    `${OLD_BLOG_PATH}/MyungBlog/static/img/**/*.{jpg,jpeg,png,gif,svg}`,
    `${OLD_BLOG_PATH}/MyungBlog/content/**/assets/**/*.{jpg,jpeg,png,gif,svg}`
  ];
  
  const imageFiles = imagePatterns.flatMap(pattern => glob.sync(pattern));
  console.log(`Found ${imageFiles.length} image files`);
  
  for (const file of imageFiles) {
    if (!shouldExclude(file)) {
      const relativePath = copyFile(file, OLD_BLOG_PATH, backupDir);
      console.log(`Copied: ${relativePath}`);
    }
  }
  
  // Copy configuration files
  const configFiles = [
    `${OLD_BLOG_PATH}/MyungBlog/config.toml`,
    `${OLD_BLOG_PATH}/MyungBlog/README.md`
  ];
  
  for (const file of configFiles) {
    if (fs.existsSync(file)) {
      const relativePath = copyFile(file, OLD_BLOG_PATH, backupDir);
      console.log(`Copied: ${relativePath}`);
    }
  }
  
  console.log(`\nBackup completed to: ${backupDir}`);
  console.log('You can now safely delete the oldblog directory if the backup looks good.');
}

// Run the backup
backupOldBlog().catch(err => {
  console.error('Error during backup:', err);
  process.exit(1);
}); 