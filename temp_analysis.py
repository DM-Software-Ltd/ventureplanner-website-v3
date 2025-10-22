#!/usr/bin/env python3
"""Compare partials with 'Decorative image' against actively used partials"""

# Partials that are actively included in page templates
actively_used = {
    'partials/about-consultants-partial.html',
    'partials/about-partial.html',
    'partials/about-us-marketing-partial.html',
    'partials/about-us-overview-partial.html',
    'partials/actionable-planning-partial.html',
    'partials/advanced-financial-forecasting-partial.html',
    'partials/beyond-the-template-partial.html',
    'partials/blog-partial.html',
    'partials/business-hero-partial.html',
    'partials/case-study-partial.html',
    'partials/case-study-single-partial.html',
    'partials/contact-us-partial.html',
    'partials/created-by-experts-partial.html',
    'partials/faq-elite-partial.html',
    'partials/faqs-about-partial.html',
    'partials/faqs-partial.html',
    'partials/faq-v2-partial.html',
    'partials/generic-header.html',
    'partials/hero-elite.html',
    'partials/homepage-hero-partial.html',
    'partials/how-it-works-business-partial.html',
    'partials/how-it-works-marketing-partial.html',
    'partials/how-it-works-partial.html',
    'partials/intro-video-box-partial.html',
    'partials/intro-video-partial.html',
    'partials/marketing-hero-partial.html',
    'partials/marketing-testimonials-partial.html',
    'partials/multi-channel-marketing-partial.html',
    'partials/our-achievements-partial.html',
    'partials/our-approach-partial.html',
    'partials/our-creative-engine-partial.html',
    'partials/our-plans-partial.html',
    'partials/our-services-partial.html',
    'partials/our-story-elite-partial.html',
    'partials/our-team-partial.html',
    'partials/pricing-partial.html',
    'partials/proven-principles-partial.html',
    'partials/services-partial.html',
    'partials/sitewide/generic-hero.html',
    'partials/support-partial.html',
    'partials/testimonials-partial.html',
    'partials/testimonials-v2-partial.html',
    'partials/what-we-do-partial.html',
    'partials/why-choose-elite-partial.html',
    'partials/why-choose-partial.html',
}

# Partials that contain "Decorative image" alt text
decorative_image_partials = {
    'partials/homepage-hero-partial.html',
    'partials/why-choose-elite-partial.html',
    'partials/sitewide/footer.html',
    'partials/what-we-do-partial.html',
    'partials/why-choose-partial.html',
    'partials/testimonials-partial.html',
    'partials/testimonials-v2-partial.html',
    'partials/proven-principles-partial.html',
    'partials/our-plans-partial.html',
    'partials/our-services-partial.html',
    'partials/our-team-partial.html',
    'partials/our-approach-partial.html',
    'partials/our-creative-engine-partial.html',
    'partials/our-feature-partial.html',
    'partials/multi-channel-marketing-partial.html',
    'partials/our-achievements-partial.html',
    'partials/intro-video-partial.html',
    'partials/marketing-hero-partial.html',
    'partials/marketing-testimonials-partial.html',
    'partials/hero-listbox-partial.html',
    'partials/how-it-works-marketing-partial.html',
    'partials/faq-v2-partial.html',
    'partials/faqs-partial.html',
    'partials/hero-elite.html',
    'partials/created-by-experts-partial.html',
    'partials/faq-elite-partial.html',
    'partials/case-study-single-sidebar-partial.html',
    'partials/contact-us-partial.html',
    'partials/created-by-experts-marketing-partial.html',
    'partials/business-hero-video-partial.html',
    'partials/case-study-partial.html',
    'partials/case-study-single-partial.html',
    'partials/beyond-the-template-partial.html',
    'partials/about-us-overview-partial.html',
    'partials/actionable-planning-partial.html',
    'partials/advanced-financial-forecasting-partial.html',
    'partials/about-consultants-partial.html',
    'partials/about-partial.html',
    'partials/about-us-marketing-partial.html',
}

# Find partials with decorative images that ARE used
used_decorative = decorative_image_partials & actively_used

# Find partials with decorative images that are NOT used
unused_decorative = decorative_image_partials - actively_used

print("=" * 70)
print("PARTIALS WITH 'DECORATIVE IMAGE' ALT TEXT - USAGE ANALYSIS")
print("=" * 70)
print()

print(f"Total partials with 'Decorative image' alt text: {len(decorative_image_partials)}")
print(f"Total actively used partials in pages: {len(actively_used)}")
print()

print(f"Partials with 'Decorative image' that ARE USED in pages: {len(used_decorative)}")
print(f"Partials with 'Decorative image' that are NOT USED in pages: {len(unused_decorative)}")
print()

if unused_decorative:
    print("=" * 70)
    print("UNUSED PARTIALS (with 'Decorative image' alt text):")
    print("=" * 70)
    for partial in sorted(unused_decorative):
        print(f"  - {partial}")
    print()
else:
    print("All partials with 'Decorative image' are actively used in pages!")
    print()

print("=" * 70)
print("ACTIVELY USED PARTIALS (with 'Decorative image' alt text):")
print("=" * 70)
for partial in sorted(used_decorative):
    print(f"  - {partial}")
print()

print("=" * 70)
print("SUMMARY")
print("=" * 70)
print(f"Out of {len(decorative_image_partials)} partials with 'Decorative image' alt text:")
print(f"  - {len(used_decorative)} ARE being used in pages (SHOULD UPDATE)")
print(f"  - {len(unused_decorative)} are NOT being used in pages (LOW PRIORITY)")
print()

# Calculate percentage
if len(decorative_image_partials) > 0:
    pct_used = (len(used_decorative) / len(decorative_image_partials)) * 100
    pct_unused = (len(unused_decorative) / len(decorative_image_partials)) * 100
    print(f"Usage rate: {pct_used:.1f}% used, {pct_unused:.1f}% unused")
