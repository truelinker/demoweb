"use client";

import React, { useEffect, useState } from 'react';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { components } from './MDXComponents';

interface MDXContentProps {
  content: string;
}

export default function MDXContent({ content }: MDXContentProps) {
  const [mdxSource, setMdxSource] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const renderMDX = async () => {
      if (!content) {
        setError("No content provided");
        return;
      }
      
      try {
        // Step 1: Pre-process content to fix common markdown issues
        let processedContent = content
          // Add line breaks around tables
          .replace(/(\|[^\n]*\|)(?!\n)/g, '$1\n')
          // Make sure table lines are properly aligned
          .replace(/\n\s*\|/g, '\n|')
          // Add proper spacing around headings
          .replace(/\n(#{1,6})\s/g, '\n\n$1 ')
          // Ensure lists have line breaks before and after
          .replace(/\n([*\-+]|\d+\.)\s/g, '\n\n$1 ')
          // Fix indentation in nested lists
          .replace(/\n\s{2,}([*\-+]|\d+\.)\s/g, '\n  $1 ');
        
        // Step 2: Use serialize with enhanced options
        const mdxSource = await serialize(processedContent, {
          mdxOptions: {
            remarkPlugins: [
              [remarkGfm, { 
                tableCellPadding: true, 
                tablePipeAlign: true,
                stringLength: () => 1 // Ensure proper spacing
              }]
            ],
            rehypePlugins: [rehypeRaw],
            format: 'mdx'
          },
          parseFrontmatter: true
        });
        
        setMdxSource(mdxSource);
        setError(null);
      } catch (err) {
        console.error("Error serializing MDX content:", err);
        setError(`Error rendering MDX: ${err instanceof Error ? err.message : String(err)}`);
      }
    };
    
    renderMDX();
  }, [content]);
  
  if (error) {
    return (
      <div className="p-4 border-l-4 border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300">
        <h3 className="font-bold">Error rendering content</h3>
        <p>{error}</p>
      </div>
    );
  }
  
  if (!mdxSource) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
      </div>
    );
  }
  
  return (
    <div className="mdx-content">
      <MDXRemote {...mdxSource} components={components} />
    </div>
  );
} 