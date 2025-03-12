/**
 * Script to convert markdown files to MDX format
 * 
 * This script:
 * 1. Finds all markdown files in the content/career and content/portfolio directories
 * 2. Converts markdown tables to MDX table components
 * 3. Creates new MDX files with the converted content
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Function to convert markdown table to MDX table component
function convertTableToMDX(tableMatch) {
  // Split the table into rows
  const rows = tableMatch.split('\n').filter(row => row.trim());
  
  // Extract header row and separator row
  const headerRow = rows[0];
  const separatorRow = rows[1];
  const bodyRows = rows.slice(2);
  
  // Parse header cells
  const headerCells = headerRow
    .split('|')
    .filter(cell => cell.trim())
    .map(cell => cell.trim());
  
  // Create TableHead component
  let mdxTable = '<Table>\n  <TableHead>\n    <TableRow>\n';
  headerCells.forEach(cell => {
    mdxTable += `      <TableHeader>${cell}</TableHeader>\n`;
  });
  mdxTable += '    </TableRow>\n  </TableHead>\n';
  
  // Create TableBody component
  mdxTable += '  <TableBody>\n';
  bodyRows.forEach(row => {
    const cells = row
      .split('|')
      .filter(cell => cell.trim())
      .map(cell => cell.trim());
    
    mdxTable += '    <TableRow>\n';
    cells.forEach(cell => {
      mdxTable += `      <TableCell>${cell}</TableCell>\n`;
    });
    mdxTable += '    </TableRow>\n';
  });
  mdxTable += '  </TableBody>\n</Table>';
  
  return mdxTable;
}

// Function to convert markdown content to MDX
function convertToMDX(content) {
  // Regular expression to match markdown tables
  const tableRegex = /\|[^\n]+\|\n\|[\-\|]+\|\n(\|[^\n]+\|\n)+/g;
  
  // Replace markdown tables with MDX table components
  return content.replace(tableRegex, convertTableToMDX);
}

// Function to process a markdown file and create an MDX version
function processFile(filePath) {
  try {
    // Read the markdown file
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Convert to MDX
    const mdxContent = convertToMDX(content);
    
    // Create the MDX file path
    const mdxFilePath = filePath.replace(/\.md$/, '.mdx');
    
    // Write the MDX file
    fs.writeFileSync(mdxFilePath, mdxContent);
    
    console.log(`Converted ${filePath} to ${mdxFilePath}`);
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
}

// Find all markdown files in content/career and content/portfolio
const careerFiles = glob.sync('content/career/*.md');
const portfolioFiles = glob.sync('content/portfolio/*.md');
const allFiles = [...careerFiles, ...portfolioFiles];

// Process each file
allFiles.forEach(processFile);

console.log(`Converted ${allFiles.length} files to MDX format.`); 