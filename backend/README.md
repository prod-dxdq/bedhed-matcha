# BedHed Matcha Backend

Flask API backend for BedHed Matcha website, now using Azure Cosmos DB for data storage.

## 🚀 Quick Start

### Local Development

1. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

2. **Set up Azure credentials**
   ```bash
   cp .env.example .env
   # Edit .env and add your Azure Cosmos DB and Blob Storage credentials
   ```

3. **Initialize database** (first time only)
   ```bash
   python init_db.py
   ```

4. **Run the server**
   ```bash
   python app.py
   ```

Server runs on http://localhost:3001

## 📁 Project Structure

```
backend/
├── app.py              # Main Flask application
├── db_config.py        # Azure Cosmos DB configuration
├── init_db.py          # Database initialization script
├── requirements.txt    # Python dependencies
├── .env.example        # Environment variables template
├── .env               # Your credentials (DO NOT COMMIT!)
├── AZURE_SETUP.md     # Detailed Azure setup guide
└── README.md          # This file
```

## 🔌 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | API info |
| `/api/menu` | GET | Get all menu items |
| `/api/locations` | GET | Get all pop-up locations |
| `/api/health` | GET | Health check |

## 🗄️ Database Schema

### Menu Items (Cosmos DB: `menu-items` container)
```json
{
  "id": "1",
  "name": "Strawberry Matcha",
  "ingredients": ["Strawberry Puree", "Milk of Choice", "Matcha"],
  "price": 7.00,
  "image": "/strawberry.png"
}
```

### Locations (Cosmos DB: `locations` container)
```json
{
  "id": "1",
  "date": "2025-01-15",
  "venue": "Deep Ellum Market",
  "address": "123 Main St, Dallas, TX",
  "time": "10am - 4pm"
}
```

## 🔧 Configuration

Required environment variables in `.env`:

```bash
# Azure Cosmos DB
COSMOS_ENDPOINT=https://your-account.documents.azure.com:443/
COSMOS_KEY=your-primary-key-here

# Azure Blob Storage (for images)
STORAGE_ACCOUNT_URL=https://your-storage.blob.core.windows.net
STORAGE_CONNECTION_STRING=DefaultEndpointsProtocol=...
```

See `AZURE_SETUP.md` for detailed setup instructions.

## 🐛 Troubleshooting

**Database not connecting:**
- Check `.env` file exists and has correct values
- Verify Azure Cosmos DB firewall settings
- Run `python init_db.py` to test connection

**No data showing:**
- Run `python init_db.py` to populate database
- Check Azure Portal → Data Explorer to verify data exists

## 📚 Resources

- [Azure Setup Guide](AZURE_SETUP.md) - Detailed setup instructions
- [Deployment Guide](../DEPLOYMENT.md) - Production deployment
- [Azure Cosmos DB Docs](https://docs.microsoft.com/azure/cosmos-db/)
- [Flask Documentation](https://flask.palletsprojects.com/)
