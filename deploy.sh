#!/bin/bash
# Qapitol website — push latest changes to GitHub → Vercel auto-deploys
cd "$(dirname "$0")"
git add .
git commit -m "Update — $(date '+%Y-%m-%d %H:%M')"
git push origin main
echo "✅ Pushed to GitHub. Vercel will deploy in ~30 seconds."
