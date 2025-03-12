import fs from 'fs';
import path from 'path';

// Type definitions for our blog posts
export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  // Add new fields to support the converted content from old blog
  category?: string;
  tags?: string[];
  series?: string[];
  subtitle?: string;  // Add subtitle field for MDX frontmatter
}

// Get the data directory path
const dataDirectory = path.join(process.cwd(), 'src/data');

// Get all blog posts
export function getAllPosts(): BlogPost[] {
  try {
    // Read the JSON file
    const filePath = path.join(dataDirectory, 'posts.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const posts: BlogPost[] = JSON.parse(fileContents);
    
    // Sort posts by date in descending order
    return posts.sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return [];
  }
}

// Get a single post by slug
export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const posts = getAllPosts();
    return posts.find(post => post.slug === slug) || null;
  } catch (error) {
    console.error('Error getting post by slug:', error);
    return null;
  }
}

// Get all slugs for static generation
export function getAllSlugs(): string[] {
  const posts = getAllPosts();
  return posts.map(post => post.slug);
}

// Get posts by category
export function getPostsByCategory(category: string): BlogPost[] {
  const posts = getAllPosts();
  return posts.filter(post => post.category === category);
}

// Get posts by tag
export function getPostsByTag(tag: string): BlogPost[] {
  const posts = getAllPosts();
  return posts.filter(post => post.tags?.includes(tag));
}

// Get all categories
export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const categories = posts
    .map(post => post.category)
    .filter((category, index, self) => 
      category && self.indexOf(category) === index
    ) as string[];
  
  return categories;
}

// Get all tags
export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tagsWithDuplicates = posts
    .flatMap(post => post.tags || []);
  
  // Remove duplicates
  return [...new Set(tagsWithDuplicates)];
} 