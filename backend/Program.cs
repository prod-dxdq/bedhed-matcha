using Microsoft.AspNetCore.Mvc;
using backend_csharp.Services;

var builder = WebApplication.CreateBuilder(args);

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Register Cosmos DB service as singleton
builder.Services.AddSingleton<CosmosDbService>();

var app = builder.Build();

app.UseCors();

// GET /api/menu - Get all menu items
app.MapGet("/api/menu", async ([FromServices] CosmosDbService db) =>
{
    try
    {
        var menuItems = await db.GetAllMenuItemsAsync();
        return Results.Ok(menuItems);
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error fetching from Cosmos DB: {ex.Message}");
        return Results.Ok(CosmosDbService.FallbackMenuItems);
    }
});

// GET /api/locations - Get all locations
app.MapGet("/api/locations", async ([FromServices] CosmosDbService db) =>
{
    try
    {
        var locations = await db.GetAllLocationsAsync();
        return Results.Ok(locations);
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error fetching from Cosmos DB: {ex.Message}");
        return Results.Ok(CosmosDbService.FallbackLocations);
    }
});

// Use PORT environment variable from Render, or default to 3002
var port = Environment.GetEnvironmentVariable("PORT") ?? "3002";
app.Run($"http://0.0.0.0:{port}");
