using Newtonsoft.Json;

namespace backend_csharp.Models;

public class Location
{
    [JsonProperty("id")]
    public string Id { get; set; } = string.Empty;

    [JsonProperty("date")]
    public string Date { get; set; } = string.Empty;

    [JsonProperty("venue")]
    public string Venue { get; set; } = string.Empty;

    [JsonProperty("address")]
    public string Address { get; set; } = string.Empty;

    [JsonProperty("time")]
    public string Time { get; set; } = string.Empty;
}
