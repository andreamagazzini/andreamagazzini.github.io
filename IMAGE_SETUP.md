# Profile Image Setup

## Current Issue
The Google Photos URL in `profile.json` is not publicly accessible. Google Photos URLs often require authentication or expire.

## Solution Options

### Option 1: Use a Local Image (Recommended)
1. Add your profile image to the `public` folder:
   ```bash
   # Place your image in public/profile.jpg (or .png)
   ```

2. Update `src/data/profile.json`:
   ```json
   "profileImage": "/profile.jpg"
   ```

### Option 2: Use a CDN Service
- **Imgur**: Upload to imgur.com and use the direct image link
- **Cloudinary**: Free tier available, great for image optimization
- **GitHub**: Commit image to your repo and use GitHub's raw URL

### Option 3: Use a Public Image Hosting Service
- Upload your image to any public image hosting service
- Copy the direct image URL
- Update `profileImage` in `profile.json`

## Current Fallback
If the image fails to load, the site will show your initials in a gradient circle as a placeholder.

## Image Recommendations
- **Format**: JPG or PNG
- **Size**: 400x400px to 800x800px (square)
- **File size**: Keep under 500KB for fast loading
- **Aspect ratio**: 1:1 (square) works best


