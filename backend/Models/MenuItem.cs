using Newtonsoft.Json;

namespace backend_csharp.Models;

public class MenuItem
{
    [JsonProperty("id")]
    public string Id { get; set; } = string.Empty;

    [JsonProperty("name")]
    public string Name { get; set; } = string.Empty;

    [JsonProperty("ingredients")]
    public string[] Ingredients { get; set; } = Array.Empty<string>();

    [JsonProperty("price")]
    public decimal Price { get; set; }

    [JsonProperty("image")]
    public string Image { get; set; } = string.Empty;
}
