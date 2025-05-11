using System.Text.Json;

namespace DaytraderPlatformBackend.Services;

public interface IStockService
{
    Task<JsonElement?> GetCandlesAsync(string symbol, string interval);
    Task<JsonElement?> GetHistoryAsync(string symbol);
    Task<JsonElement?> GetQuoteAsync(string symbol);
    Task<JsonElement?> GetNewsAsync(string symbol);
    Task<JsonElement?> GetGainersAsync();
    

}
