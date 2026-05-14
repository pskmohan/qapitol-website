redirects = {
    'blog.html': 'insights.html',
    'whitepapers.html': 'insights.html',
    'gcc-offerings.html': 'gcc.html',
    'partners.html': 'partnerships.html',
    'bfsi.html': 'solution-bfsi-ai.html',
    'healthcare.html': 'solution-healthcare-ai.html',
    'manufacturing.html': 'industries.html',
    'retail.html': 'industries.html',
    'telecom.html': 'industries.html',
}

for filename, target in redirects.items():
    html = f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="refresh" content="0; url={target}">
<link rel="canonical" href="{target}">
<title>Redirecting…</title>
</head>
<body>
<p>Redirecting to <a href="{target}">{target}</a>...</p>
<script>window.location.replace('{target}');</script>
</body>
</html>'''
    with open(f'/sessions/sweet-intelligent-franklin/mnt/html/{filename}', 'w') as f:
        f.write(html)
    print(f"Created redirect: {filename} → {target}")
