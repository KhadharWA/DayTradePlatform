using DaytraderPlatformBackend.Contexts;
using DaytraderPlatformBackend.MockData;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Text.Json;

namespace DaytraderPlatformBackend.Controllers;

[Authorize]
[ApiController]
[Route("api/money")]
public class DepositController(DataContext context) : ControllerBase
{
    private readonly DataContext _context = context;

    [HttpGet]
    [Route("deposits")]
    public async Task<JsonElement?> GetUserDepositsAsync()
    {
        var deposits = new List<JsonElement>();
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        // Lägg till mockdata om det behövs
        var mockDeposits = JsonDocument.Parse(MockDeposits.Json).RootElement.EnumerateArray();
        foreach (var mock in mockDeposits)
        {
            if (deposits.Count >= 10) break;
            deposits.Add(mock);
        }

        var combined = "[" + string.Join(",", deposits.Select(d => d.GetRawText())) + "]";
        return JsonDocument.Parse(combined).RootElement;
    }


    [HttpGet]
    [Route("withdrawal")]
    public async Task<JsonElement?> GetUserWithdrawals()
    {
        var list = new List<JsonElement>();
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        var mock = JsonDocument.Parse(MockWithdrawals.Json).RootElement.EnumerateArray();
        foreach (var w in mock)
        {
            if (list.Count >= 10) break;
            list.Add(w);
        }

        var text = "[" + string.Join(",", list.Select(x => x.GetRawText())) + "]";
        return JsonDocument.Parse(text).RootElement;
    }
}
