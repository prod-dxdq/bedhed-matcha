# BedHed Matcha

Artisanal Matcha Pop-Up in Dallas, TX

A responsive single-page application for an artisanal matcha pop-up business using Next.js 16 and React 19, featuring dynamic menu displays and mobile-first design with custom fonts and hand-drawn aesthetic elements to match brand identity across desktop and mobile devices.

Built with a REST API using Flask 3.0 to manage menu items and pop-up locations, with CORS-enabled endpoints for seamless frontend-backend communication.

Deployed as a full-stack application to Render.com using Blueprint YAML configuration, implementing environment-based API routing for development and production environments.

**Now powered by Azure Cosmos DB and Azure Blob Storage for scalable, cloud-based data management.**

## Project Structure

- **frontend/** - Next.js 16 application with React 19 and Tailwind CSS 4
- **backend/** - Flask Python API server with Azure Cosmos DB integration
- **public/** - Static assets (images, logo, drink photos)

## Prerequisites

- **Node.js** 18+ and npm (for frontend)
- **Python** 3.8+ (for backend)
- **pip** (Python package manager)
- **Azure Account** (for database and storage - free student tier available)

## Getting Started

### Backend Setup (Flask API with Azure Cosmos DB)

1. Navigate to the backend folder:
```bash
cd backend
```

2. Set up Azure resources (one-time setup):
   - Create Azure Cosmos DB account (serverless mode)
   - Create Azure Storage Account for images
   - See `backend/AZURE_SETUP.md` for detailed instructions

3. Configure environment variables:
```bash
cp .env.example .env
# Edit .env and add your Azure credentials:
# - COSMOS_ENDPOINT
# - COSMOS_KEY
# - STORAGE_ACCOUNT_URL
# - STORAGE_CONNECTION_STRING
```

4. Create a virtual environment (recommended):
```bash
python -m venv venv
```

5. Activate the virtual environment:
   - **Windows (PowerShell)**:
     ```powershell
     .\venv\Scripts\Activate.ps1
     ```
   - **Windows (Command Prompt)**:
     ```cmd
     venv\Scripts\activate.bat
     ```
   - **macOS/Linux**:
     ```bash
     source venv/bin/activate
     ```

6. Install Python dependencies:
```bash
pip install -r requirements.txt
```

7. Initialize the database (first time only):
```bash
python init_db.py
```

8. Run the Flask server:
```bash
python app.py
```

The backend API will run on [http://localhost:3001](http://localhost:3001).

**Backend Endpoints:**
- `GET /api/health` - Health check
- `GET /api/menu` - Menu items from Azure Cosmos DB
- `GET /api/locations` - Upcoming pop-up locations from Azure Cosmos DB

### Frontend Setup (Next.js)

1. Navigate to the frontend folder:
```bash
cd frontend
```

2. Install Node.js dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

The frontend will run on [http://localhost:3000](http://localhost:3000).

### Running Both Servers

To run the full application, you need **both** servers running simultaneously:

1. Open **Terminal 1** for the backend:
```bash
cd backend
python app.py
```

2. Open **Terminal 2** for the frontend:
```bash
cd frontend
npm run dev
```

3. Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Testing on Mobile Devices

To test the mobile-responsive site on your actual phone:

1. **Find your computer's local IP address:**
   - Open PowerShell/Terminal and run:
     ```powershell
     ipconfig
     ```
   - Look for "IPv4 Address" under your active network adapter (e.g., `192.168.1.100`)

2. **Make sure both servers are running** (backend on port 3001, frontend on port 3000)

3. **Connect your phone to the same WiFi network** as your computer

4. **On your phone's browser, visit:**
   ```
   http://YOUR_IP_ADDRESS:3000
   ```
   Example: `http://192.168.1.100:3000`

**Note:** Replace `YOUR_IP_ADDRESS` with your actual local IP from step 1. The `localhost` URL only works on the same device, so you need the network IP address to access from your phone.

**Troubleshooting:** If the connection doesn't work, Next.js dev server may need to accept network connections:
```bash
npm run dev -- -H 0.0.0.0
```

## Features

- 🍵 **Menu Display** - Handcrafted matcha drinks with images stored in Azure Blob Storage
- 📍 **Location Finder** - Upcoming pop-up locations managed via Azure Cosmos DB
- 📱 **Mobile Responsive** - Optimized for all screen sizes
- 🎨 **Hand-drawn Design** - Cartoonish, minimalist aesthetic with yellow/blue theme
- 📧 **Contact** - Instagram and email integration
- ☁️ **Cloud-Powered** - Azure Cosmos DB for scalable NoSQL data storage
- 🖼️ **Image Storage** - Azure Blob Storage ready for CDN-delivered images
- 🔄 **Real-time Updates** - Add/edit menu items via Azure Portal or Python scripts

## Tech Stack

**Frontend:**
- Next.js 16.0.3
- React 19.2.0
- TypeScript 5
- Tailwind CSS 4
- Google Fonts (Permanent Marker, Indie Flower)

**Backend:**
- Python 3.x
- Flask 3.0.0
- Flask-CORS 4.0.0
- Gunicorn 21.2.0 (production server)

**Azure Cloud Services:**
- **Azure Cosmos DB** - NoSQL database for menu items and locations (serverless mode)
- **Azure Blob Storage** - Image storage with CDN capabilities
- **Azure SDK for Python**:
  - `azure-cosmos` 4.5.1
  - `azure-storage-blob` 12.19.0
  - `azure-identity` 1.15.0 (for Managed Identity)

**Development Tools:**
- python-dotenv 1.0.0 (environment management)

## Architecture

```
Frontend (Next.js)
    ↓
Flask REST API
    ↓
Azure Cosmos DB (Menu Items & Locations)
    ↓
Azure Blob Storage (Images - optional)
```

## Managing Data

**Add Menu Items:**
- Via Azure Portal Data Explorer (easiest)
- Via Python scripts (see `backend/ADDING_ITEMS_GUIDE.md`)
- Supports local images (frontend/public) or Azure Blob Storage

**Update Prices/Items:**
- Edit directly in Azure Portal
- Use Python helper functions in `db_config.py`

See `backend/ADDING_ITEMS_GUIDE.md` for complete documentation.

## Deployment

See `DEPLOYMENT.md` for detailed deployment instructions including:
- Azure resource setup
- Render.com deployment
- Environment variable configuration
- Production best practices

## Documentation

- **`backend/AZURE_SETUP.md`** - Azure resources setup guide
- **`backend/ADDING_ITEMS_GUIDE.md`** - How to add/update menu items and images
- **`backend/MIGRATION_SUMMARY.md`** - Database migration overview
- **`DEPLOYMENT.md`** - Production deployment guide

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Flask Documentation](https://flask.palletsprojects.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)
