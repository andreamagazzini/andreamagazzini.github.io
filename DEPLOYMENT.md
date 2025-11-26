# Deployment Guide

## Local Development

### Using pnpm (Recommended)
```bash
# Install pnpm if you don't have it
npm install -g pnpm

# Install dependencies
pnpm install

# Start development server
pnpm start
```

### Using yarn (Alternative)
```bash
yarn install
yarn start
```

## Deployment Options

### Option 1: Vercel (Recommended) ⭐

**Why Vercel?**
- Automatic deployments on every push
- Preview deployments for pull requests
- Better performance with global CDN
- Free tier is very generous
- Zero configuration needed

**Setup:**
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Vercel will auto-detect React and deploy
5. Done! Your site will be live at `your-repo.vercel.app`

**Custom Domain:**
- Add your domain in Vercel dashboard
- Update DNS records as instructed
- Free SSL certificate included

### Option 2: GitHub Pages

**Setup:**
```bash
# Build and deploy
pnpm run deploy
```

**Note:** You'll need to update `homepage` in `package.json` if using a custom domain.

### Option 3: Netlify

Similar to Vercel:
1. Push to GitHub
2. Connect repo to Netlify
3. Auto-deploys on push

## Environment Variables

If you need environment variables:
- **Vercel/Netlify:** Add them in the dashboard
- **GitHub Pages:** Not supported (use build-time replacements)


