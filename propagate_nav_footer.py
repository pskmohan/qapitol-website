#!/usr/bin/env python3
"""Propagate canonical header+footer from index.html to all other HTML pages."""
import os, re, sys

BASE = '/sessions/sweet-intelligent-franklin/mnt/html'

# ── 1. Extract canonical header and footer from index.html ────────────────
with open(f'{BASE}/index.html', encoding='utf-8') as f:
    source = f.read()

def extract_block(html, open_tag_re, close_tag):
    """Extract first block matching open_tag_re...close_tag (inclusive)."""
    m = re.search(open_tag_re, html)
    if not m:
        return None
    start = m.start()
    end = html.find(close_tag, start)
    if end == -1:
        return None
    end += len(close_tag)
    return html[start:end]

HEADER = extract_block(source, r'<header\s[^>]*class="[^"]*site-header[^"]*"', '</header>')
FOOTER = extract_block(source, r'<footer\s[^>]*class="[^"]*site-footer[^"]*"', '</footer>')

if not HEADER or not FOOTER:
    print("ERROR: Could not extract header or footer from index.html")
    sys.exit(1)

print(f"Extracted header ({len(HEADER)} chars) and footer ({len(FOOTER)} chars)")

# ── 2. Process all HTML files ─────────────────────────────────────────────
html_files = sorted(f for f in os.listdir(BASE) if f.endswith('.html') and f != 'index.html')
updated = skipped = no_header = no_footer = 0

for filename in html_files:
    path = f'{BASE}/{filename}'
    with open(path, encoding='utf-8') as f:
        content = f.read()

    # Skip redirect stubs (tiny files)
    if len(content) < 500:
        skipped += 1
        continue

    original = content

    # Replace header block
    header_m = re.search(r'<header\b[^>]*>', content)
    if header_m:
        h_start = header_m.start()
        h_end = content.find('</header>', h_start)
        if h_end != -1:
            h_end += len('</header>')
            content = content[:h_start] + HEADER + content[h_end:]
        else:
            no_header += 1
    else:
        no_header += 1

    # Replace footer block
    footer_m = re.search(r'<footer\b[^>]*>', content)
    if footer_m:
        f_start = footer_m.start()
        f_end = content.rfind('</footer>')
        if f_end != -1:
            f_end += len('</footer>')
            content = content[:f_start] + FOOTER + content[f_end:]
        else:
            no_footer += 1
    else:
        no_footer += 1

    if content != original:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        updated += 1
    else:
        skipped += 1

print(f"\nResults:")
print(f"  Updated:           {updated}")
print(f"  Already up-to-date / skipped: {skipped}")
print(f"  No header found:   {no_header}")
print(f"  No footer found:   {no_footer}")
