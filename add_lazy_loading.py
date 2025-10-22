#!/usr/bin/env python
"""
Script to add loading="lazy" attribute to img tags in template files.
Skips images that are "above the fold" (hero images, logos, etc.).
"""
import os
import re
from pathlib import Path

# Patterns to SKIP lazy loading (above-the-fold images)
SKIP_PATTERNS = [
    r'logo',  # Logos should load immediately
    r'preloader',  # Preloader images
    r'favicon',  # Favicons
]

def should_skip_lazy_loading(img_tag):
    """Determine if an image should skip lazy loading"""
    for pattern in SKIP_PATTERNS:
        if re.search(pattern, img_tag, re.IGNORECASE):
            return True
    return False

def add_lazy_loading_to_file(file_path):
    """Add loading="lazy" to img tags in a single file"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content
    changes_made = 0

    # Find all img tags that don't already have loading attribute
    pattern = r'<img\s+(?![^>]*loading=)([^>]+)>'

    def replacer(match):
        nonlocal changes_made
        img_tag = match.group(0)

        # Skip if this image should not be lazy loaded
        if should_skip_lazy_loading(img_tag):
            return img_tag

        # Add loading="lazy" before the closing >
        if img_tag.endswith('/>'):
            new_tag = img_tag[:-2] + ' loading="lazy"/>'
        else:
            new_tag = img_tag[:-1] + ' loading="lazy">'

        changes_made += 1
        return new_tag

    content = re.sub(pattern, replacer, content)

    if content != original_content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"[OK] Added lazy loading to {changes_made} images in {file_path.name}")
        return changes_made

    return 0

def main():
    """Main function to process all template files"""
    templates_dir = Path(__file__).parent / 'templates'
    total_fixes = 0
    files_processed = 0

    print("Starting to add lazy loading to images...")
    print(f"Templates directory: {templates_dir}\n")

    # Process all HTML files recursively
    for html_file in templates_dir.rglob('*.html'):
        fixes = add_lazy_loading_to_file(html_file)
        if fixes > 0:
            total_fixes += fixes
            files_processed += 1

    print(f"\n{'='*60}")
    print(f"Summary:")
    print(f"Files processed: {files_processed}")
    print(f"Total images with lazy loading added: {total_fixes}")
    print(f"{'='*60}")

if __name__ == '__main__':
    main()
