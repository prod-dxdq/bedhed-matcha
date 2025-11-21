"""
Azure Cosmos DB and Blob Storage Configuration
This file handles the connection to Azure services for storing menu items and locations.

Security Note: Uses DefaultAzureCredential which supports multiple auth methods:
- Managed Identity (when deployed to Azure)
- Azure CLI (for local development)
- Environment variables (for CI/CD)
"""

import os
from azure.cosmos import CosmosClient, exceptions, PartitionKey
from azure.storage.blob import BlobServiceClient
from azure.identity import DefaultAzureCredential
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Azure Cosmos DB Configuration
COSMOS_ENDPOINT = os.getenv("COSMOS_ENDPOINT")
COSMOS_KEY = os.getenv("COSMOS_KEY")  # For development; use Managed Identity in production
DATABASE_NAME = "bedhed-matcha"
MENU_CONTAINER = "menu-items"
LOCATIONS_CONTAINER = "locations"

# Azure Blob Storage Configuration
STORAGE_ACCOUNT_URL = os.getenv("STORAGE_ACCOUNT_URL")
STORAGE_CONTAINER = "images"

# Initialize Cosmos DB client
def get_cosmos_client():
    """
    Creates and returns a Cosmos DB client.
    Uses connection string for simplicity, but Managed Identity is recommended for production.
    """
    if not COSMOS_ENDPOINT:
        raise ValueError("COSMOS_ENDPOINT environment variable is not set")
    
    # For development: using key-based auth
    # For production: switch to DefaultAzureCredential() for Managed Identity
    if COSMOS_KEY:
        client = CosmosClient(COSMOS_ENDPOINT, credential=COSMOS_KEY)
    else:
        # Use Managed Identity in production
        credential = DefaultAzureCredential()
        client = CosmosClient(COSMOS_ENDPOINT, credential=credential)
    
    return client

# Initialize Blob Storage client
def get_blob_service_client():
    """
    Creates and returns a Blob Service client.
    Uses Managed Identity when available, falls back to connection string.
    """
    if not STORAGE_ACCOUNT_URL:
        raise ValueError("STORAGE_ACCOUNT_URL environment variable is not set")
    
    # Prefer Managed Identity for production
    try:
        credential = DefaultAzureCredential()
        blob_service_client = BlobServiceClient(
            account_url=STORAGE_ACCOUNT_URL,
            credential=credential
        )
    except Exception as e:
        print(f"Failed to use Managed Identity, falling back to connection string: {e}")
        connection_string = os.getenv("STORAGE_CONNECTION_STRING")
        if connection_string:
            blob_service_client = BlobServiceClient.from_connection_string(connection_string)
        else:
            raise ValueError("No valid authentication method for Blob Storage")
    
    return blob_service_client

# Database and container setup
def setup_database():
    """
    Creates the database and containers if they don't exist.
    Run this once during initial setup or deployment.
    """
    client = get_cosmos_client()
    
    try:
        # Create database if it doesn't exist
        database = client.create_database_if_not_exists(id=DATABASE_NAME)
        print(f"Database '{DATABASE_NAME}' ready")
        
        # Create menu items container with 'id' as partition key
        # Note: Serverless mode doesn't use offer_throughput
        menu_container = database.create_container_if_not_exists(
            id=MENU_CONTAINER,
            partition_key=PartitionKey(path="/id")
        )
        print(f"Container '{MENU_CONTAINER}' ready")
        
        # Create locations container with 'id' as partition key
        locations_container = database.create_container_if_not_exists(
            id=LOCATIONS_CONTAINER,
            partition_key=PartitionKey(path="/id")
        )
        print(f"Container '{LOCATIONS_CONTAINER}' ready")
        
        return database, menu_container, locations_container
        
    except exceptions.CosmosHttpResponseError as e:
        print(f"Error setting up database: {e}")
        raise

# Setup blob storage container
def setup_blob_storage():
    """
    Creates the blob container for images if it doesn't exist.
    """
    blob_service_client = get_blob_service_client()
    
    try:
        container_client = blob_service_client.create_container(STORAGE_CONTAINER)
        print(f"Blob container '{STORAGE_CONTAINER}' created")
    except Exception as e:
        # Container might already exist
        print(f"Blob container setup: {e}")
        container_client = blob_service_client.get_container_client(STORAGE_CONTAINER)
    
    return container_client

# Helper functions for database operations
class CosmosDB:
    """Helper class for Cosmos DB operations with error handling and retry logic"""
    
    def __init__(self):
        self.client = get_cosmos_client()
        self.database = self.client.get_database_client(DATABASE_NAME)
    
    def get_menu_container(self):
        """Get menu items container"""
        return self.database.get_container_client(MENU_CONTAINER)
    
    def get_locations_container(self):
        """Get locations container"""
        return self.database.get_container_client(LOCATIONS_CONTAINER)
    
    def get_all_menu_items(self):
        """
        Retrieve all menu items from the database.
        Returns a list of menu item dictionaries.
        """
        container = self.get_menu_container()
        try:
            items = list(container.read_all_items())
            # Remove Cosmos DB metadata fields for cleaner response
            return [{k: v for k, v in item.items() if not k.startswith('_')} 
                    for item in items]
        except exceptions.CosmosHttpResponseError as e:
            print(f"Error reading menu items: {e}")
            return []
    
    def get_all_locations(self):
        """
        Retrieve all locations from the database.
        Returns a list of location dictionaries.
        """
        container = self.get_locations_container()
        try:
            items = list(container.read_all_items())
            # Remove Cosmos DB metadata fields for cleaner response
            return [{k: v for k, v in item.items() if not k.startswith('_')} 
                    for item in items]
        except exceptions.CosmosHttpResponseError as e:
            print(f"Error reading locations: {e}")
            return []
    
    def add_menu_item(self, item):
        """Add a new menu item to the database"""
        container = self.get_menu_container()
        try:
            container.create_item(body=item)
            return True
        except exceptions.CosmosHttpResponseError as e:
            print(f"Error adding menu item: {e}")
            return False
    
    def add_location(self, location):
        """Add a new location to the database"""
        container = self.get_locations_container()
        try:
            container.create_item(body=location)
            return True
        except exceptions.CosmosHttpResponseError as e:
            print(f"Error adding location: {e}")
            return False
    
    def update_menu_item(self, item_id, updated_item):
        """Update an existing menu item"""
        container = self.get_menu_container()
        try:
            container.upsert_item(body=updated_item)
            return True
        except exceptions.CosmosHttpResponseError as e:
            print(f"Error updating menu item: {e}")
            return False
    
    def delete_menu_item(self, item_id):
        """Delete a menu item by ID"""
        container = self.get_menu_container()
        try:
            container.delete_item(item=str(item_id), partition_key=str(item_id))
            return True
        except exceptions.CosmosHttpResponseError as e:
            print(f"Error deleting menu item: {e}")
            return False
