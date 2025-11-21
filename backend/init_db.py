"""
Database Initialization Script
This script migrates your existing menu items and locations to Azure Cosmos DB.

Run this once after setting up your Azure resources:
    python init_db.py

This will:
1. Create the database and containers if they don't exist
2. Migrate your existing menu items and locations
3. Verify the data was inserted correctly
"""

from db_config import setup_database, CosmosDB

# Your existing menu items (copy from app.py)
MENU_ITEMS = [
    {
        "id": "1",  # Cosmos DB requires string IDs
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

# Your existing locations (copy from app.py)
LOCATIONS = [
    {
        "id": "1",  # Cosmos DB requires string IDs
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

def initialize_database():
    """
    Main initialization function.
    Creates database structure and migrates existing data.
    """
    print("=" * 60)
    print("BedHed Matcha - Database Initialization")
    print("=" * 60)
    
    # Step 1: Setup database and containers
    print("\n[1/3] Setting up database and containers...")
    try:
        database, menu_container, locations_container = setup_database()
        print("✓ Database setup complete")
    except Exception as e:
        print(f"✗ Error setting up database: {e}")
        return False
    
    # Step 2: Migrate menu items
    print("\n[2/3] Migrating menu items...")
    db = CosmosDB()
    
    for item in MENU_ITEMS:
        try:
            success = db.add_menu_item(item)
            if success:
                print(f"  ✓ Added: {item['name']}")
            else:
                print(f"  ✗ Failed to add: {item['name']}")
        except Exception as e:
            print(f"  ✗ Error adding {item['name']}: {e}")
    
    # Step 3: Migrate locations
    print("\n[3/3] Migrating locations...")
    
    for location in LOCATIONS:
        try:
            success = db.add_location(location)
            if success:
                print(f"  ✓ Added: {location['venue']} on {location['date']}")
            else:
                print(f"  ✗ Failed to add: {location['venue']}")
        except Exception as e:
            print(f"  ✗ Error adding {location['venue']}: {e}")
    
    # Verify data
    print("\n" + "=" * 60)
    print("Verification")
    print("=" * 60)
    
    menu_items = db.get_all_menu_items()
    locations = db.get_all_locations()
    
    print(f"\n✓ Total menu items in database: {len(menu_items)}")
    print(f"✓ Total locations in database: {len(locations)}")
    
    print("\nMenu Items:")
    for item in menu_items:
        print(f"  - {item['name']} (${item['price']})")
    
    print("\nLocations:")
    for loc in locations:
        print(f"  - {loc['venue']} on {loc['date']}")
    
    print("\n" + "=" * 60)
    print("✓ Database initialization complete!")
    print("=" * 60)
    
    return True

if __name__ == "__main__":
    """
    Run this script to initialize your database.
    Make sure you have set up your .env file with Azure credentials first!
    """
    try:
        success = initialize_database()
        if success:
            print("\n✓ You can now start your Flask app with: python app.py")
        else:
            print("\n✗ Initialization failed. Check the errors above.")
    except KeyboardInterrupt:
        print("\n\n✗ Initialization cancelled by user")
    except Exception as e:
        print(f"\n✗ Unexpected error: {e}")
        import traceback
        traceback.print_exc()
