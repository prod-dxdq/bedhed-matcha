using Microsoft.Azure.Cosmos;
using Azure.Identity;
using backend_csharp.Models;

namespace backend_csharp.Services;

public class CosmosDbService
{
    private readonly CosmosClient _client;
    private readonly Container _menuContainer;
    private readonly Container _locationsContainer;

    public CosmosDbService(IConfiguration configuration)
    {
        Console.WriteLine("=== CosmosDbService Initialization ===");
        
        string endpoint = configuration["CosmosEndpoint"] ?? 
                         Environment.GetEnvironmentVariable("COSMOS_ENDPOINT") ?? 
                         throw new InvalidOperationException("COSMOS_ENDPOINT is required");
        
        Console.WriteLine($"Cosmos Endpoint: {endpoint}");
        
        string? key = configuration["CosmosKey"] ?? 
                     Environment.GetEnvironmentVariable("COSMOS_KEY");

        Console.WriteLine($"Cosmos Key present: {!string.IsNullOrEmpty(key)}");

        // Use key-based auth if available, otherwise use DefaultAzureCredential
        if (!string.IsNullOrEmpty(key))
        {
            Console.WriteLine("Using key-based authentication");
            _client = new CosmosClient(endpoint, key);
        }
        else
        {
            Console.WriteLine("Using DefaultAzureCredential");
            var credential = new DefaultAzureCredential();
            _client = new CosmosClient(endpoint, credential);
        }

        var database = _client.GetDatabase("bedhed-matcha");
        _menuContainer = database.GetContainer("menu-items");
        _locationsContainer = database.GetContainer("locations");
    }

    public async Task<List<MenuItem>> GetAllMenuItemsAsync()
    {
        var query = _menuContainer.GetItemQueryIterator<MenuItem>();
        var results = new List<MenuItem>();

        while (query.HasMoreResults)
        {
            var response = await query.ReadNextAsync();
            results.AddRange(response);
        }

        return results;
    }

    public async Task<List<Location>> GetAllLocationsAsync()
    {
        var query = _locationsContainer.GetItemQueryIterator<Location>();
        var results = new List<Location>();

        while (query.HasMoreResults)
        {
            var response = await query.ReadNextAsync();
            results.AddRange(response);
        }

        return results;
    }

    // Fallback data (same as Python backend)
    public static readonly List<MenuItem> FallbackMenuItems = new()
    {
        new MenuItem 
        { 
            Id = "matcha-latte", 
            Name = "Matcha Latte", 
            Ingredients = new[] { "ceremonial matcha", "oat milk" },
            Price = 5.50m,
            Image = "/images/matcha-latte.jpg"
        },
        new MenuItem 
        { 
            Id = "iced-matcha", 
            Name = "Iced Matcha", 
            Ingredients = new[] { "ceremonial matcha", "cold water", "ice" },
            Price = 5.00m,
            Image = "/images/iced-matcha.jpg"
        },
        new MenuItem 
        { 
            Id = "matcha-frappe", 
            Name = "Matcha Frappé", 
            Ingredients = new[] { "matcha", "milk", "ice", "whipped cream" },
            Price = 6.50m,
            Image = "/images/matcha-frappe.jpg"
        },
        new MenuItem 
        { 
            Id = "matcha-smoothie", 
            Name = "Matcha Smoothie", 
            Ingredients = new[] { "matcha", "banana", "spinach", "almond milk" },
            Price = 7.00m,
            Image = "/images/matcha-smoothie.jpg"
        }
    };

    public static readonly List<Location> FallbackLocations = new()
    {
        new Location 
        { 
            Id = "loc1",
            Date = "2024-03-20",
            Venue = "Downtown Market",
            Address = "123 Main St",
            Time = "9:00 AM - 2:00 PM"
        },
        new Location 
        { 
            Id = "loc2",
            Date = "2024-03-27",
            Venue = "Campus Green",
            Address = "456 University Ave",
            Time = "10:00 AM - 3:00 PM"
        }
    };
}
