"use client";

import React from 'react';
import { MDXProvider } from '@mdx-js/react';

// Custom Table Components
const Table = (props: React.TableHTMLAttributes<HTMLTableElement>) => (
  <div className="overflow-x-auto my-8 rounded-lg border border-gray-300 dark:border-gray-700 shadow-sm">
    <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700" {...props} />
  </div>
);

const TableHead = (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <thead className="bg-gray-100 dark:bg-gray-800" {...props} />
);

const TableBody = (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700" {...props} />
);

const TableRow = (props: React.HTMLAttributes<HTMLTableRowElement>) => (
  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800" {...props} />
);

const TableHeader = (props: React.ThHTMLAttributes<HTMLTableHeaderCellElement>) => (
  <th 
    className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider" 
    {...props} 
  />
);

const TableCell = (props: React.TdHTMLAttributes<HTMLTableDataCellElement>) => (
  <td className="px-6 py-4 whitespace-normal text-sm text-gray-600 dark:text-gray-300" {...props} />
);

// Heading components with proper spacing
const H1 = (props: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />
);

const H2 = (props: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2 className="text-2xl font-bold mt-8 mb-4" {...props} />
);

const H3 = (props: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className="text-xl font-bold mt-6 mb-3" {...props} />
);

const H4 = (props: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h4 className="text-lg font-bold mt-5 mb-2" {...props} />
);

const H5 = (props: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h5 className="text-base font-bold mt-4 mb-2" {...props} />
);

// List components with better indentation
const UL = (props: React.HTMLAttributes<HTMLUListElement>) => (
  <ul className="list-disc pl-6 mb-4 space-y-2" {...props} />
);

const OL = (props: React.HTMLAttributes<HTMLOListElement>) => (
  <ol className="list-decimal pl-6 mb-4 space-y-2" {...props} />
);

const LI = (props: React.LiHTMLAttributes<HTMLLIElement>) => (
  <li className="pl-2" {...props} />
);

// Paragraph with proper spacing
const P = (props: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className="mb-4" {...props} />
);

// Define custom components for MDX
const components = {
  // Table components
  table: Table,
  thead: TableHead,
  tbody: TableBody,
  tr: TableRow,
  th: TableHeader,
  td: TableCell,
  
  // Heading components
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  
  // List components
  ul: UL,
  ol: OL,
  li: LI,
  
  // Paragraph component
  p: P,
};

export function MDXComponentsProvider({ children }: { children: React.ReactNode }) {
  return <MDXProvider components={components}>{children}</MDXProvider>;
}

export { components }; 