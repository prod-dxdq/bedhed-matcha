# BedHed Matcha Backend API
# This file handles all the data for your website (menu items, locations, etc.)
# Now using Azure Cosmos DB for data storage instead of in-memory data

from flask import Flask, jsonify
from flask_cors import CORS
from db_config import CosmosDB
import os

# Create the Flask app - this is what runs your backend server
app = Flask(__name__)

# CORS allows your frontend (website) to talk to this backend
# Without this, browsers would block the connection for security reasons
CORS(app)

# Initialize database connection
# This connects to Azure Cosmos DB to fetch menu items and locations
try:
    db = CosmosDB()
    print("✓ Connected to Azure Cosmos DB")
except Exception as e:
    print(f"✗ Warning: Could not connect to database: {e}")
    print("  The app will still run but won't have data until database is configured.")
    db = None

# LEGACY DATA (kept for reference and fallback)
# This data is now stored in Azure Cosmos DB
# To update menu/locations, use the database or create an admin interface
# For fallback when database is not configured:
FALLBACK_MENU_ITEMS = [
    {
        "id": "1",
        "name": "Strawberry Matcha",
        "ingredients": ["Strawberry Puree", "Milk of Choice", "Matcha"],
        "price": 7.00,
        "image": "/strawberry.png"
    },
    {
        "id": "2",
        "name": "Earl Gray",
        "ingredients": ["Earl Gray Syrup", "Milk of Choice", "Matcha"],
        "price": 7.00,
        "image": "/earl-gray.png"
    },
    {
        "id": "3",
        "name": "Ein-Spanner",
        "ingredients": ["Milk of Choice", "Sweet Foam", "Matcha"],
        "price": 7.00,
        "image": "/ein-spanner.png"
    },
    {
        "id": "4",
        "name": "Orange Tonic",
        "ingredients": ["Orange Puree", "Tonic Water", "Matcha"],
        "price": 7.00,
        "image": "/orange-tonic.png"
    }
]

FALLBACK_LOCATIONS = [
    {
        "id": "1",
        "date": "2025-01-15",
        "venue": "Deep Ellum Market",
        "address": "123 Main St, Dallas, TX",
        "time": "10am - 4pm"
    },
    {
        "id": "2",
        "date": "2025-01-28",
        "venue": "Plano Asian Night Market",
        "address": "456 Oak St",
        "time": "5pm - 11pm"
    }
]

@app.route('/')
def home():
    return jsonify({"message": "BedHed Matcha API", "version": "1.0"})

# API ENDPOINTS
# These are the "doors" that your website uses to get data from this backend
# The website calls these URLs to fetch menu items, locations, etc.

@app.route('/api/menu')
def get_menu():
    """Returns the menu items to display on the website
    Developer note: This endpoint is called when the Menu section loads
    Business owner note: This sends your drink menu to the website
    Now fetches from Azure Cosmos DB instead of in-memory data
    """
    if db:
        try:
            menu_items = db.get_all_menu_items()
            return jsonify(menu_items)
        except Exception as e:
            print(f"Error fetching menu from database: {e}")
            # Fallback to static data if database fails
            return jsonify(FALLBACK_MENU_ITEMS)
    else:
        # Database not configured, use fallback data
        return jsonify(FALLBACK_MENU_ITEMS)

@app.route('/api/locations')
def get_locations():
    """Returns the pop-up locations to display on the website
    Developer note: This endpoint is called when the Locations section loads
    Business owner note: This sends your upcoming pop-up schedule to the website
    Now fetches from Azure Cosmos DB instead of in-memory data
    """
    if db:
        try:
            locations = db.get_all_locations()
            return jsonify(locations)
        except Exception as e:
            print(f"Error fetching locations from database: {e}")
            # Fallback to static data if database fails
            return jsonify(FALLBACK_LOCATIONS)
    else:
        # Database not configured, use fallback data
        return jsonify(FALLBACK_LOCATIONS)

@app.route('/api/health')
def health():
    """Health check endpoint to verify the backend is running
    Developer note: Use this for monitoring and debugging
    Business owner note: This is just a technical check - you can ignore it
    """
    return jsonify({"status": "healthy"})

# START THE SERVER
# This runs the backend on your computer (and makes it accessible on your network)
if __name__ == '__main__':
    # debug=True: Shows helpful error messages (turn off for production)
    # host='0.0.0.0': Allows access from other devices (like your phone)
    # port=3001: The backend runs on port 3001 (frontend is on 3000)
    app.run(debug=True, host='0.0.0.0', port=3001)

