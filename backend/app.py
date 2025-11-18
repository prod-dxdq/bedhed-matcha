from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend requests

# Menu data
menu_items = [
    {
        "id": 1,
        "name": "Strawberry Matcha",
        "ingredients": ["Strawberry Puree", "Milk of Choice", "Matcha"],
        "price": 7.00,
        "image": "/strawberry.png"
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

@app.route('/api/menu')
def get_menu():
    return jsonify(menu_items)

@app.route('/api/locations')
def get_locations():
    return jsonify(locations)

@app.route('/api/health')
def health():
    return jsonify({"status": "healthy"})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=3001)

