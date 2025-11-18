# BedHed Matcha Deployment Guide

## Deploy to Render.com (All-in-One Solution)

Both your frontend and backend will be hosted on Render.com for free.

### Step 1: Prepare Your Repository

1. Make sure all changes are pushed to GitHub ✅

### Step 2: Deploy to Render

1. **Sign up at [render.com](https://render.com)**
   - Use your GitHub account to sign in

2. **Create a New Blueprint**
   - Click "New +" → "Blueprint"
   - Connect your GitHub repository `prod-dxdq/bedhed-matcha`
   - Render will detect the `render.yaml` file

3. **Configure Environment Variables**
   
   After services are created, update the frontend service:
   - Go to your frontend service settings
   - Add environment variable:
     - Key: `NEXT_PUBLIC_API_URL`
     - Value: `https://bedhed-matcha-backend.onrender.com` (use your actual backend URL)

4. **Deploy!**
   - Render will automatically deploy both services
   - Frontend will be at: `https://bedhed-matcha-frontend.onrender.com`
   - Backend will be at: `https://bedhed-matcha-backend.onrender.com`

### Step 3: Update Backend URL

After your backend is deployed:

1. Get your backend URL from Render (e.g., `https://bedhed-matcha-backend.onrender.com`)
2. In Render dashboard, go to your **frontend service**
3. Go to "Environment" tab
4. Update `NEXT_PUBLIC_API_URL` to your actual backend URL
5. Redeploy frontend

### ⚠️ Important Notes

- **Free tier limitations**: Services may sleep after 15 minutes of inactivity
- **First load**: May take 30-60 seconds to wake up
- **Custom domain**: You can add your own domain in Render settings

### Alternative: Deploy to Single Platform

If you want everything on one simple platform, you can also use:
- **Railway.app** - Auto-detects both services
- **Fly.io** - Good for full-stack apps
- **DigitalOcean App Platform** - Similar to Render

### Testing Your Deployment

Once deployed:
1. Visit your frontend URL
2. Check that menu items load (backend is working)
3. Check that locations load (backend is working)
4. Test on mobile!

---

## Troubleshooting

**Site won't load:**
- Check Render logs for errors
- Verify environment variables are set
- Make sure backend URL in frontend is correct

**Images not showing:**
- Images must be in `frontend/public` folder
- Image paths in backend should start with `/`

**API calls failing:**
- Check CORS is enabled in backend (already done ✅)
- Verify `NEXT_PUBLIC_API_URL` points to your backend

---

Need help? Check the Render docs or let me know!
