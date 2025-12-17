@echo off
echo "Attempting to merge 'development' into 'main' and push to origin."

git checkout main
git pull origin main
git merge development
git push origin main

echo "If there were no errors, your main branch is updated. Vercel should trigger a new production deployment."
echo "Please check your Vercel dashboard."
