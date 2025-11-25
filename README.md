# BedHed Matcha

Artisanal Matcha Pop-Up in Dallas, TX

A responsive single-page application for an artisanal matcha pop-up business using Next.js 16 and React 19, featuring dynamic menu displays and mobile-first design with custom fonts and hand-drawn aesthetic elements to match brand identity across desktop and mobile devices.

Built with a REST API using ASP.NET Core to manage menu items and pop-up locations, with CORS-enabled endpoints for seamless frontend-backend communication.

Deployed as a full-stack application to Render.com using Blueprint YAML configuration, implementing environment-based API routing for development and production environments.

**Now powered by Azure Cosmos DB and Azure Blob Storage for scalable, cloud-based data management.**

## Project Structure

- **frontend/** - Next.js 16 application with React 19 and Tailwind CSS 4
- **backend/** - ASP.NET Core C# API server with Azure Cosmos DB integration
- **public/** - Static assets (images, logo, drink photos)

## Prerequisites

- **Node.js** 18+ and npm (for frontend)
- **.NET SDK** 8.0+ (for backend)
- **Azure Account** (for database and storage - free student tier available)

## Getting Started

### Backend Setup (ASP.NET Core API with Azure Cosmos DB)

1. Navigate to the backend folder:
```bash
cd backend
```

2. Set up Azure resources (one-time setup):
   - Create Azure Cosmos DB account (serverless mode)
   - Create Azure Storage Account for images
   - See Azure Portal for credentials

3. Configure environment variables:
```bash
cp appsettings.example.json appsettings.json
# Edit appsettings.json and add your Azure credentials:
# - CosmosEndpoint: https://YOUR-ACCOUNT.documents.azure.com:443/
# - CosmosKey: YOUR_PRIMARY_KEY
```

4. **Add .NET to PATH (Windows PowerShell):**
```powershell
$env:PATH = "C:\Program Files\dotnet;$env:PATH"
```

5. Restore NuGet packages:
```bash
dotnet restore
```

6. Build the project:
```bash
dotnet build
```

7. Run the ASP.NET Core server:
```bash
dotnet run
```

The backend API will run on [http://localhost:3002](http://localhost:3002).

**Note:** On Windows, you may need to add .NET to your PATH in each new terminal session, or add it permanently via System Environment Variables.

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
dotnet run
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

2. **Make sure both servers are running** (backend on port 3002, frontend on port 3000)

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
- .NET 8.0
- ASP.NET Core (Minimal APIs)
- C# 12

**Azure Cloud Services:**
- **Azure Cosmos DB** - NoSQL database for menu items and locations (serverless mode)
- **Azure Blob Storage** - Image storage with CDN capabilities
- **Azure SDK for .NET**:
  - `Microsoft.Azure.Cosmos` 3.55.0
  - `Azure.Identity` 1.17.1
  - `Newtonsoft.Json` 13.0.4

## Architecture

```
Frontend (Next.js)
    ↓
ASP.NET Core REST API
    ↓
Azure Cosmos DB (Menu Items & Locations)
    ↓
Azure Blob Storage (Images - optional)
```

## Managing Data

**Add Menu Items:**
- Via Azure Portal Data Explorer (easiest)
- Via C# methods in `CosmosDbService.cs`
- Supports local images (frontend/public) or Azure Blob Storage

**Update Prices/Items:**
- Edit directly in Azure Portal
- Use C# service methods in the backend

## Deployment

See `DEPLOYMENT.md` for detailed deployment instructions including:
- Azure resource setup
- Render.com deployment
- Environment variable configuration
- Production best practices

## Documentation

- **`DEPLOYMENT.md`** - Production deployment guide
- Azure Portal - Manage database directly via Data Explorer

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [ASP.NET Core Documentation](https://learn.microsoft.com/en-us/aspnet/core/)
- [Azure Cosmos DB Documentation](https://learn.microsoft.com/en-us/azure/cosmos-db/)
- [Tailwind CSS](https://tailwindcss.com/docs)
