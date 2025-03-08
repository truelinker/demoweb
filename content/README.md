# Content Directory

This directory contains all the Markdown content for the website. Files are organized by category into subdirectories.

## Directory Structure

```
content/
├── blog/        # Regular blog posts
├── portfolio/   # Portfolio projects
├── about/       # About page content
└── career/      # Career information
```

## Creating and Editing Content

Each content file is a Markdown file (`.md`) with YAML frontmatter containing metadata about the content.

### Frontmatter Structure

```yaml
---
id: 123
title: "Your Post Title"
date: 2024-05-01
excerpt: "A brief summary of your post that appears in listings"
category: blog
tags:
  - tag1
  - tag2
series:
  - series-name
---

Your content goes here in Markdown format.
```

### Required Fields

- `title`: The title of your post or page
- `date`: Publication date in YYYY-MM-DD format
- `excerpt`: A brief summary (shown in listings and previews)

### Optional Fields

- `id`: A unique identifier (will be auto-generated if not provided)
- `category`: Which section this belongs to (defaults to the directory name)
- `tags`: List of tags for categorization
- `series`: List of series this post belongs to

## Adding New Content

1. Create a new `.md` file in the appropriate directory
2. Add the required frontmatter fields
3. Write your content in Markdown format
4. Save the file with a descriptive filename (will be used as the URL slug if not specified)

## Adding Images

Place image files in the `public/images/blog/` directory and reference them in your Markdown:

```markdown
![Image description](/images/blog/your-image.jpg)
```

## Converting from JSON

If you have content in the old JSON format, you can convert it to Markdown files by running:

```
npm run json-to-markdown
```

This will read from `src/data/posts.json` and create individual Markdown files in the appropriate content directories. 