#!/usr/bin/env python
"""
Script to fix empty alt="" attributes in template files.
Adds descriptive alt text based on image filename and context.
"""
import os
import re
from pathlib import Path

# Mapping of common image patterns to descriptive alt text
ALT_TEXT_MAPPING = {
    r'author-\d+': 'Team member profile',
    r'VP_Homepage_hero_doc': 'Business planning document',
    r'contact-us-circle': 'Contact us icon',
    r'favicon': 'Venture Planner logo',
    r'testimonial': 'Client testimonial',
    r'service': 'Service illustration',
    r'marketing': 'Marketing strategy',
    r'business-plan': 'Business plan document',
    r'case-study': 'Case study',
    r'consultant': 'Business consultant',
    r'team': 'Team member',
    r'hero': 'Banner illustration',
    r'about': 'About us',
    r'feature': 'Feature illustration',
    r'achievement': 'Achievement badge',
}

def get_descriptive_alt(img_src):
    """Generate descriptive alt text based on image source"""
    for pattern, alt_text in ALT_TEXT_MAPPING.items():
        if re.search(pattern, img_src, re.IGNORECASE):
            return alt_text

    # Default fallback
    return "Decorative image"

def fix_alt_tags_in_file(file_path):
    """Fix empty alt tags in a single file"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content
    changes_made = 0

    # Find all img tags with empty alt
    pattern = r'<img\s+([^>]*?)alt=""\s*([^>]*?)>'

    def replacer(match):
        nonlocal changes_made
        before_alt = match.group(1)
        after_alt = match.group(2)

        # Extract src attribute if present
        src_match = re.search(r'src=["\']([^"\']+)["\']', before_alt + after_alt)
        if src_match:
            img_src = src_match.group(1)
            alt_text = get_descriptive_alt(img_src)
        else:
            alt_text = "Decorative image"

        changes_made += 1
        return f'<img {before_alt}alt="{alt_text}" {after_alt}>'

    content = re.sub(pattern, replacer, content)

    if content != original_content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"[OK] Fixed {changes_made} empty alt tags in {file_path.name}")
        return changes_made

    return 0

def main():
    """Main function to process all template files"""
    templates_dir = Path(__file__).parent / 'templates'
    total_fixes = 0
    files_processed = 0

    print("Starting to fix empty alt tags in templates...")
    print(f"Templates directory: {templates_dir}\n")

    # Process all HTML files recursively
    for html_file in templates_dir.rglob('*.html'):
        fixes = fix_alt_tags_in_file(html_file)
        if fixes > 0:
            total_fixes += fixes
            files_processed += 1

    print(f"\n{'='*60}")
    print(f"Summary:")
    print(f"Files processed: {files_processed}")
    print(f"Total empty alt tags fixed: {total_fixes}")
    print(f"{'='*60}")

if __name__ == '__main__':
    main()
