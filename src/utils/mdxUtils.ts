import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost } from './blogUtils';

// Content directory path
const contentDirectory = path.join(process.cwd(), 'content');

// Function to generate a numeric ID from a string (same as in markdownUtils)
function generateNumericId(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

// Function to read and parse an MDX file
export function readMDXFile(filePath: string): BlogPost | null {
  try {
    // Read the file content
    const fileContents = fs.readFileSync(filePath, 'utf8');
    
    // Parse the frontmatter and content
    const { data, content } = matter(fileContents);
    
    // Get the filename without extension to use as slug if not provided
    const fileName = path.basename(filePath, path.extname(filePath));
    
    // Get category from directory structure
    const relativePath = path.relative(contentDirectory, filePath);
    const pathParts = relativePath.split(path.sep);
    const category = pathParts.length > 0 ? pathParts[0] : 'blog';
    
    // Create a BlogPost object
    return {
      id: data.id || parseInt(String(data.id)) || generateNumericId(filePath),
      slug: data.slug || fileName,
      title: data.title || 'Untitled',
      subtitle: data.subtitle || undefined,
      date: data.date ? new Date(data.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      excerpt: data.excerpt || '',
      content: content,
      category: data.category || category,
      tags: data.tags || [],
      series: data.series || []
    };
  } catch (error) {
    console.error(`Error reading MDX file ${filePath}:`, error);
    return null;
  }
}

// Get all MDX files in a directory and its subdirectories
export function getMDXFiles(dir: string = contentDirectory): string[] {
  let results: string[] = [];
  
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const itemPath = path.join(dir, item);
    const stat = fs.statSync(itemPath);
    
    if (stat.isDirectory()) {
      // Recursively search in subdirectories
      results = results.concat(getMDXFiles(itemPath));
    } else if (item.endsWith('.mdx')) {
      // Add MDX files to results
      results.push(itemPath);
    }
  }
  
  return results;
}

// Get all blog posts from MDX files
export function getAllMDXPosts(): BlogPost[] {
  try {
    // Get all MDX files
    const mdxFiles = getMDXFiles();
    
    // Parse each file and create BlogPost objects
    const posts = mdxFiles
      .map(filePath => readMDXFile(filePath))
      .filter((post): post is BlogPost => post !== null);
    
    // Sort posts by date in descending order
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error loading blog posts from MDX:', error);
    return [];
  }
}

// Get a single post by slug
export function getMDXPostBySlug(slug: string): BlogPost | null {
  try {
    const posts = getAllMDXPosts();
    return posts.find(post => post.slug === slug) || null;
  } catch (error) {
    console.error('Error getting post by slug:', error);
    return null;
  }
}

// Get posts by category
export function getMDXPostsByCategory(category: string): BlogPost[] {
  const posts = getAllMDXPosts();
  return posts.filter(post => post.category === category);
}

// Get posts by tag
export function getMDXPostsByTag(tag: string): BlogPost[] {
  const posts = getAllMDXPosts();
  return posts.filter(post => post.tags?.includes(tag));
}

// Get all categories
export function getAllMDXCategories(): string[] {
  const posts = getAllMDXPosts();
  const categories = posts
    .map(post => post.category)
    .filter((category, index, self) => 
      category && self.indexOf(category) === index
    ) as string[];
  
  return categories;
}

// Get all tags
export function getAllMDXTags(): string[] {
  const posts = getAllMDXPosts();
  const tagsWithDuplicates = posts
    .flatMap(post => post.tags || []);
  
  // Remove duplicates
  return [...new Set(tagsWithDuplicates)];
}

// Get all slugs for static generation
export function getAllMDXSlugs(): string[] {
  const posts = getAllMDXPosts();
  return posts.map(post => post.slug);
} 