# Blog Conversion Scripts

This directory contains scripts to help you integrate content from the old Hugo-based blog into the Next.js application.

## convert-blog.js

This script converts Markdown content from the Hugo blog to JSON format compatible with the Next.js blog system.

### What it does

1. Reads Markdown files from `oldblog/MyungBlog/content`
2. Parses the frontmatter and content using gray-matter
3. Converts the content to the required JSON format for Next.js
4. Copies images to the appropriate location in the public directory
5. Saves the converted content to `src/data/posts.json`

### How to use

1. Make sure you have the old blog content available at `oldblog/MyungBlog`
2. Install the required dependencies:
   ```bash
   npm install
   ```
3. Run the conversion script:
   ```bash
   npm run convert-blog
   ```

### Content Integration Details

The script handles the following content types:

- **Portfolio items**: Will be converted to blog posts with the "portfolio" category
- **About content**: Will be converted to a blog post with the "about" category
- **Career content**: Will be converted to a blog post with the "career" category

All of these can be accessed through the new navigation links added to the site.

### Images

Images from the old blog will be copied to `public/images/blog/`. The script automatically updates image references in the Markdown content to point to the new locations.

### Troubleshooting

If you encounter issues with the conversion:

1. Check that the old blog directory structure is correct
2. Verify that you have the required dependencies installed
3. Check the console output for any error messages
4. If images are missing, check their paths in the original blog posts

## Next Steps After Conversion

After running the conversion script:

1. Check that your content appears correctly on the site
2. Review and adjust any image paths that may not have been properly converted
3. Test all pages to ensure they display the imported content correctly
4. Make any manual adjustments to the layout or styling as needed 