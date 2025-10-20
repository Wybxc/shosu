# Deployment Guide for Shosu Web App

This guide covers various deployment options for the Shosu React web application.

## Building for Production

```bash
cd web
npm run build
```

This creates an optimized production build in the `dist/` directory.

## Deployment Options

### 1. Static Hosting Services

The app is a static single-page application (SPA) and can be deployed to any static hosting service.

#### Vercel

```bash
npm install -g vercel
cd web
vercel
```

#### Netlify

```bash
npm install -g netlify-cli
cd web
npm run build
netlify deploy --prod --dir=dist
```

#### GitHub Pages

1. Build the app: `npm run build`
2. Copy contents of `dist/` to your GitHub Pages repository
3. Ensure the repository is configured for GitHub Pages

#### Cloudflare Pages

1. Connect your GitHub repository to Cloudflare Pages
2. Set build command: `cd web && npm install && npm run build`
3. Set output directory: `web/dist`

### 2. Self-Hosted Options

#### Using a Web Server (nginx, Apache, etc.)

After building, serve the `dist/` directory with any web server.

Example nginx configuration:

```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    root /path/to/shosu/web/dist;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|wav)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

#### Using Docker

Create a `Dockerfile` in the `web/` directory:

```dockerfile
# Build stage
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Build and run:

```bash
docker build -t shosu-web .
docker run -p 80:80 shosu-web
```

## Environment Configuration

The app currently uses hardcoded configuration. For production, you may want to:

1. Use environment variables for API endpoints (if added in the future)
2. Configure analytics
3. Set up error tracking (e.g., Sentry)

Example `.env` configuration:

```env
VITE_APP_NAME=処刑
VITE_VERSION=1.2
```

Access in code:

```typescript
const appName = import.meta.env.VITE_APP_NAME;
```

## Performance Optimization

The build is already optimized, but for better performance:

1. Enable gzip/brotli compression on your server
2. Set appropriate cache headers for static assets
3. Consider using a CDN for asset delivery
4. Enable HTTP/2 or HTTP/3 on your server

## Monitoring

Consider adding:

- Google Analytics or similar for usage tracking
- Error tracking (Sentry, LogRocket, etc.)
- Performance monitoring (Web Vitals)

## Security Considerations

1. Serve over HTTPS in production
2. Set appropriate security headers:
   - `Content-Security-Policy`
   - `X-Frame-Options`
   - `X-Content-Type-Options`
3. Keep dependencies updated regularly

## Troubleshooting

### Assets not loading

Make sure the base path in `vite.config.ts` is correct for your deployment environment.

### Audio not playing

Some browsers require user interaction before playing audio. The app handles this, but ensure HTTPS is used in production.

### Blank page after deployment

Check browser console for errors. Ensure all asset paths are correct and the build was successful.
