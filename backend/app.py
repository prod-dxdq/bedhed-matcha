# BedHed Matcha Backend API
# This file handles all the data for your website (menu items, locations, etc.)
# Think of this as the "brain" that stores and sends information to your website

from flask import Flask, jsonify
from flask_cors import CORS

# Create the Flask app - this is what runs your backend server
app = Flask(__name__)

# CORS allows your frontend (website) to talk to this backend
# Without this, browsers would block the connection for security reasons
CORS(app)

# MENU DATA
# This is where all your matcha drink information lives!
# To add a new drink: copy one of these blocks and change the details
# To change prices: just edit the "price" number
# To change drink names/ingredients: edit the text in quotes
menu_items = [
    # Each drink needs: id (unique number), name, ingredients list, price, and image filename
    {
        "id": 1,  # Unique number for this drink (don't duplicate!)
        "name": "Strawberry Matcha",  # Name that appears on the menu
        "ingredients": ["Strawberry Puree", "Milk of Choice", "Matcha"],  # List of ingredients
        "price": 7.00,  # Price in dollars (change this to update pricing)
        "image": "/strawberry.png"  # Image filename (must match file in frontend/public folder)
    },
    {
        "id": 2,
        "name": "Earl Gray",
        "ingredients": ["Earl Gray Syrup", "Milk of Choice", "Matcha"],
        "price": 7.00,
        "image": "/earl-gray.png"
    },
    {
        "id": 3,
        "name": "Ein-Spanner",
        "ingredients": ["Milk of Choice", "Sweet Foam", "Matcha"],
        "price": 7.00,
        "image": "/ein-spanner.png"
    },
    {
        "id": 4,
        "name": "Orange Tonic",
        "ingredients": ["Orange Puree", "Tonic Water", "Matcha"],
        "price": 7.00,
        "image": "/orange-tonic.png"
    }
]

# Locations data
locations = [
    {
        "id": 1,
        "date": "2025-01-15",
        "venue": "Deep Ellum Market",
        "address": "123 Main St, Dallas, TX",
        "time": "10am - 4pm"
    },
    {
        "id": 2,
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
    """
    return jsonify(menu_items)

@app.route('/api/locations')
def get_locations():
    """Returns the pop-up locations to display on the website
    Developer note: This endpoint is called when the Locations section loads
    Business owner note: This sends your upcoming pop-up schedule to the website
    """
    return jsonify(locations)

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

