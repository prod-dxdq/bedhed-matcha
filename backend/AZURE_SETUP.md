# Azure Database Migration - Setup Guide

## Quick Start

This guide will help you migrate your BedHed Matcha menu items and locations from in-memory data to Azure Cosmos DB.

## What You'll Need

1. **Azure Account** (free tier available)
2. **10 minutes** for setup
3. **Azure Cosmos DB** for storing menu/location data
4. **Azure Blob Storage** for images (optional but recommended)

## Step-by-Step Setup

### 1. Create Azure Resources

Follow the instructions in `DEPLOYMENT.md` under "Prerequisites: Set Up Azure Resources"

You'll create:
- Azure Cosmos DB account (serverless mode)
- Azure Storage account (for images)

### 2. Configure Local Environment

```bash
cd backend

# Copy environment template
cp .env.example .env

# Edit .env file and add your Azure credentials:
# - COSMOS_ENDPOINT
# - COSMOS_KEY
# - STORAGE_ACCOUNT_URL
# - STORAGE_CONNECTION_STRING
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

New packages installed:
- `azure-cosmos` - Cosmos DB SDK
- `azure-storage-blob` - Blob Storage SDK
- `azure-identity` - For Managed Identity (production)
- `python-dotenv` - For environment variables

### 4. Initialize Database

```bash
python init_db.py
```

This script will:
- Create the database and containers in Cosmos DB
- Migrate your existing menu items (4 drinks)
- Migrate your existing locations (2 pop-ups)
- Verify all data was inserted correctly

### 5. Test Locally

```bash
python app.py
```

Visit:
- http://localhost:3001/api/menu - Should show menu from database
- http://localhost:3001/api/locations - Should show locations from database
- http://localhost:3001/api/health - Health check

## What Changed?

### Files Modified:
- `backend/requirements.txt` - Added Azure SDK packages
- `backend/app.py` - Now queries Cosmos DB instead of in-memory lists

### Files Created:
- `backend/db_config.py` - Database connection and helper functions
- `backend/init_db.py` - Database initialization script
- `backend/.env.example` - Environment variable template
- `backend/AZURE_SETUP.md` - This guide

### Architecture:
```
Before:
Flask App → In-memory Python lists → JSON response

After:
Flask App → Azure Cosmos DB → JSON response
           ↓
        Azure Blob Storage (for images - optional)
```

## Managing Data

### Add a New Menu Item

**Option 1: Azure Portal (Easiest)**
1. Go to Azure Portal → Cosmos DB → Data Explorer
2. Navigate to `bedhed-matcha` database → `menu-items` container
3. Click "New Item"
4. Paste JSON:
```json
{
  "id": "5",
  "name": "Lavender Matcha",
  "ingredients": ["Lavender Syrup", "Milk of Choice", "Matcha"],
  "price": 7.50,
  "image": "/lavender.png"
}
```

**Option 2: Python Script**
```python
from db_config import CosmosDB

db = CosmosDB()
new_item = {
    "id": "5",
    "name": "Lavender Matcha",
    "ingredients": ["Lavender Syrup", "Milk of Choice", "Matcha"],
    "price": 7.50,
    "image": "/lavender.png"
}
db.add_menu_item(new_item)
```

### Update a Price

1. Azure Portal → Data Explorer → Find item
2. Edit the `price` field
3. Click "Update"

### Add a New Location

Same as menu items, but in the `locations` container:
```json
{
  "id": "3",
  "date": "2025-02-15",
  "venue": "Frisco Food Truck Park",
  "address": "789 Main St, Frisco, TX",
  "time": "11am - 8pm"
}
```

## Production Deployment

When deploying to Azure (App Service, Container Apps, etc.):

1. **Use Managed Identity** (more secure than keys)
   - Enable System-assigned Managed Identity on your app
   - Grant it access to Cosmos DB and Blob Storage
   - Remove `COSMOS_KEY` from environment variables
   - The app will use Managed Identity automatically

2. **Set Environment Variables** in Azure:
   - `COSMOS_ENDPOINT`
   - `STORAGE_ACCOUNT_URL`
   - (No keys needed with Managed Identity!)

## Benefits of This Setup

✅ **Scalable**: Handles growth from 4 drinks to 400+  
✅ **Persistent**: Data survives app restarts  
✅ **Global**: Fast access from anywhere  
✅ **Flexible**: Easy to add/update items  
✅ **Free tier**: Generous limits for small businesses  
✅ **Secure**: Uses Azure's security features  
✅ **Professional**: Industry-standard database  

## Costs

**Free tier includes:**
- 1000 RU/s Cosmos DB throughput
- 25 GB storage
- 5 GB Blob Storage

**Expected cost for small pop-up:**
- $0-5/month (well within free tier)

## Troubleshooting

**Error: "COSMOS_ENDPOINT environment variable is not set"**
- Make sure you created `.env` file from `.env.example`
- Check that `.env` has the correct values

**Error: "Failed to connect to Cosmos DB"**
- Verify endpoint URL is correct
- Check that Cosmos DB firewall allows your IP
- Go to Azure Portal → Cosmos DB → Networking → Allow access from "All networks" (for testing)

**No data showing after init_db.py**
- Check Azure Portal → Data Explorer
- Verify items exist in containers
- Check for error messages in init_db.py output

**App works locally but not in production**
- Verify environment variables are set in production
- Check production logs for errors
- Ensure Cosmos DB firewall allows production app IP

## Next Steps

1. ✅ Set up Azure resources
2. ✅ Configure `.env` file
3. ✅ Run `python init_db.py`
4. ✅ Test locally with `python app.py`
5. 📦 Deploy to production (see DEPLOYMENT.md)
6. 🎨 (Optional) Migrate images to Blob Storage

Need help? Check the main `DEPLOYMENT.md` or Azure documentation!
