# BedHed Matcha Deployment Guide

## Prerequisites: Set Up Azure Resources

Before deploying, you need to set up Azure Cosmos DB and Blob Storage for your menu items and locations.

### Azure Setup (One-Time)

1. **Create Azure Account**
   - Sign up at [portal.azure.com](https://portal.azure.com)
   - Free tier includes: 1000 RU/s Cosmos DB + 5GB Blob Storage

2. **Create Cosmos DB Account**
   - In Azure Portal, search for "Azure Cosmos DB"
   - Click "Create" → "Azure Cosmos DB for NoSQL"
   - Fill in:
     - Subscription: Your subscription
     - Resource Group: Create new "bedhed-matcha-rg"
     - Account Name: "bedhed-matcha-db" (must be unique)
     - Location: Choose closest to you (e.g., "East US")
     - Capacity mode: "Serverless" (best for small apps)
   - Click "Review + Create" → "Create"
   - Wait 5-10 minutes for deployment

3. **Get Cosmos DB Credentials**
   - Go to your Cosmos DB account
   - Left menu → "Keys"
   - Copy:
     - URI (e.g., `https://bedhed-matcha-db.documents.azure.com:443/`)
     - Primary Key (long string)

4. **Create Storage Account**
   - In Azure Portal, search for "Storage accounts"
   - Click "Create"
   - Fill in:
     - Resource Group: "bedhed-matcha-rg" (same as above)
     - Storage account name: "bedhedmatchastorage" (must be unique, lowercase)
     - Location: Same as your Cosmos DB
     - Performance: "Standard"
     - Redundancy: "LRS" (cheapest)
   - Click "Review + Create" → "Create"

5. **Get Storage Credentials**
   - Go to your Storage account
   - Left menu → "Access keys"
   - Copy:
     - Storage account name
     - Connection string (under "key1")
     - Blob service URL (e.g., `https://bedhedmatchastorage.blob.core.windows.net`)

6. **Initialize Database**
   - On your local machine:
     ```bash
     cd backend
     cp .env.example .env
     # Edit .env and paste your Azure credentials
     pip install -r requirements.txt
     python init_db.py
     ```
   - This will create the database structure and migrate your data

---

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
   
   After services are created, you need to add Azure credentials to the backend:
   
   **Frontend service:**
   - Go to your frontend service settings
   - Add environment variable:
     - Key: `NEXT_PUBLIC_API_URL`
     - Value: `https://bedhed-matcha-backend.onrender.com` (use your actual backend URL)
   
   **Backend service:**
   - Go to your backend service settings → "Environment" tab
   - Add these environment variables:
     - `COSMOS_ENDPOINT`: Your Cosmos DB URI
     - `COSMOS_KEY`: Your Cosmos DB Primary Key
     - `STORAGE_ACCOUNT_URL`: Your Blob Storage URL
     - `STORAGE_CONNECTION_STRING`: Your Storage connection string

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
- **Database**: Using Azure Cosmos DB (free tier: 1000 RU/s, 25GB storage)
- **Images**: Can be stored in Azure Blob Storage or keep in `frontend/public`
- **Secure credentials**: Never commit `.env` file to git!

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

## Managing Your Data

Now that you're using Azure Cosmos DB, here's how to manage your menu and locations:

### Adding New Menu Items

Option 1: Using Azure Portal (Easy)
1. Go to Azure Portal → Your Cosmos DB account
2. Navigate to "Data Explorer"
3. Find database "bedhed-matcha" → container "menu-items"
4. Click "New Item" and paste:
   ```json
   {
     "id": "5",
     "name": "New Drink Name",
     "ingredients": ["Ingredient 1", "Ingredient 2", "Matcha"],
     "price": 7.50,
     "image": "/new-drink.png"
   }
   ```

Option 2: Using Python (Advanced)
- Modify `init_db.py` to add new items
- Run `python init_db.py` to update database

### Updating Prices
1. Go to Azure Portal → Data Explorer
2. Find the menu item you want to update
3. Click on it, edit the price field
4. Click "Update"

### Adding New Locations
Same process as menu items, but in the "locations" container:
```json
{
  "id": "3",
  "date": "2025-02-15",
  "venue": "New Market",
  "address": "789 New St",
  "time": "12pm - 6pm"
}
```

### Migrating Images to Blob Storage (Optional)

If you want to serve images from Azure instead of your frontend:
1. Upload images to Azure Blob Storage container "images"
2. Update image URLs in menu items to blob URLs
3. Images will be served faster via Azure CDN

---

## Troubleshooting

**Site won't load:**
- Check Render logs for errors
- Verify environment variables are set
- Make sure backend URL in frontend is correct

**Database connection errors:**
- Verify `COSMOS_ENDPOINT` and `COSMOS_KEY` are correct
- Check Azure Portal → Cosmos DB → Networking (allow access from all networks for testing)
- Make sure database was initialized with `python init_db.py`

**No menu items showing:**
- Run `python init_db.py` to populate database
- Check Cosmos DB in Azure Portal → Data Explorer to verify data exists
- Check backend logs for database errors

**Images not showing:**
- Images must be in `frontend/public` folder
- Image paths in database should start with `/`

**API calls failing:**
- Check CORS is enabled in backend (already done ✅)
- Verify `NEXT_PUBLIC_API_URL` points to your backend

---

## Cost Estimation

**Current setup (Free tier):**
- Cosmos DB Serverless: First 1000 RU/s free, ~$0.25 per million operations after
- Blob Storage: First 5GB free, ~$0.02/GB after
- Render.com: Free (with sleep after inactivity)

**Expected monthly cost for small pop-up business:** $0-5/month

---

Need help? Check the Azure docs, Render docs, or let me know!
