using Microsoft.AspNetCore.Mvc;
using DaytraderPlatformBackend.Services;

namespace DaytraderPlatformBackend.Controllers;

[ApiController]
[Route("api/stocks")]
public class StocksController(IStockService stockService) : ControllerBase
{

    [HttpGet("symbols")]
    public IActionResult GetSymbols()
    {
        var symbols = new[]
        {
            // 🇺🇸 USA (ingen suffix)
            "AAPL", "MSFT", "TSLA", "GOOGL", "AMZN", "NVDA",
            "META", "NFLX"
        };
        return Ok(symbols);
    }


    [HttpGet("candles/{symbol}")]
    public async Task<IActionResult> GetCandles(string symbol, [FromQuery] string interval = "1h")
    {
        var data = await stockService.GetCandlesAsync(symbol, interval);
        return Ok(data);
    }

    [HttpGet("history/{symbol}")]
    public async Task<IActionResult> GetHistory(string symbol)
    {
        var data = await stockService.GetHistoryAsync(symbol);
        return Ok(data);
    }

    [HttpGet("quote/{symbol}")]
    public async Task<IActionResult> GetQuote(string symbol)
    {
        var data = await stockService.GetQuoteAsync(symbol);
        return Ok(data);
    }

    [HttpGet("news/{symbol}")]
    public async Task<IActionResult> GetNews(string symbol)
    {
        var data = await stockService.GetNewsAsync(symbol);
        return Ok(data);
    }

    [HttpGet("winners-losers")]
    public async Task<IActionResult> GetWinnersLosers()
    {
        var data = await stockService.GetGainersAsync();
        return Ok(data);
    }
}
