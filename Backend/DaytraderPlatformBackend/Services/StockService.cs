using DaytraderPlatformBackend.MockData;
using Microsoft.AspNetCore.DataProtection.KeyManagement;
using System.Text.Json;

namespace DaytraderPlatformBackend.Services;

public class StockService(IConfiguration config) : IStockService
{
    private readonly HttpClient _http = new();

    private async Task<JsonElement?> FetchTwelveData(string endpoint)
    {
        var apiKey = config["TwelveData:ApiKey"];
        var separator = endpoint.Contains("?") ? "&" : "?";
        var url = $"https://api.twelvedata.com/{endpoint}{separator}apikey={apiKey}";
        var response = await _http.GetAsync(url);

        if (!response.IsSuccessStatusCode)
        {
            var errorText = await response.Content.ReadAsStringAsync();
            throw new Exception($"TwelveData error: {response.StatusCode} - {errorText}");
        }

        var content = await response.Content.ReadAsStringAsync();
        return JsonDocument.Parse(content).RootElement;
    }

    public async Task<JsonElement?> GetCandlesAsync(string symbol, string interval = "1h")
    {
        var outputsize = interval == "1h" ? 100 : 500; // större om veckodata
        return await FetchTwelveData($"time_series?symbol={symbol}&interval={interval}&outputsize={outputsize}");
    }

    public async Task<JsonElement?> GetHistoryAsync(string symbol)
    {
        return await FetchTwelveData($"time_series?symbol={symbol}&interval=1day&outputsize=30");
    }

    public async Task<JsonElement?> GetQuoteAsync(string symbol)
    {
        return await FetchTwelveData($"quote?symbol={symbol}");
    }

    public async Task<JsonElement?> GetNewsAsync(string symbol)
    {
        var list = new List<JsonElement>();

        try
        {
            var apiKey = config["Marketaux:ApiKey"];
            var res = await _http.GetStringAsync($"https://api.marketaux.com/v1/news/all?symbols={symbol}&limit=3&api_token={apiKey}");
            var data = JsonDocument.Parse(res).RootElement;
            foreach (var article in data.GetProperty("data").EnumerateArray())
            {
                list.Add(article);
            }
        }
        catch
        {
            // ignore Marketaux error and fall back to mock
        }

        var mockArticles = JsonDocument.Parse(MockNews.Json).RootElement.EnumerateArray();
        foreach (var mock in mockArticles)
        {
            if (list.Count >= 8) break;
            list.Add(mock);
        }

        var jsonText = "[" + string.Join(",", list.Select(x => x.GetRawText())) + "]";
        return JsonDocument.Parse(jsonText).RootElement;
    }


    public async Task<JsonElement?> GetGainersAsync()
    {
        var json = @"
    {
        ""winners"": [
            { ""symbol"": ""AAPL"", ""change_percent"": 2.34 },
            { ""symbol"": ""TSLA"", ""change_percent"": 1.78 }
        ],
        ""losers"": [
            { ""symbol"": ""INTC"", ""change_percent"": -1.21 },
            { ""symbol"": ""NFLX"", ""change_percent"": -2.95 }
        ]
    }";
        return JsonDocument.Parse(json).RootElement;
    }
}