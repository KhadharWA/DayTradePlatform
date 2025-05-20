using DaytraderPlatformBackend.Contexts;
using DaytraderPlatformBackend.Dtos;
using DaytraderPlatformBackend.Entities;
using DaytraderPlatformBackend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace DaytraderPlatformBackend.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class TradeController(DataContext context, UserManager<UserEntity> userManager, INotificationService notificationService) : ControllerBase
{
    private readonly DataContext _context = context;
    private readonly UserManager<UserEntity> _userManager = userManager;
    private readonly INotificationService _notificationService = notificationService;


    [HttpPost("buy")]
    public async Task<IActionResult> BuyStock([FromBody] TradeRequestDto dto)
    {
        try
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
                return Unauthorized();

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
                return NotFound("Användare hittades inte.");

            var totalCost = dto.Price * dto.Quantity;
            if (user.Balance < totalCost)
                return BadRequest("Otillräckligt saldo.");

            user.Balance -= totalCost;

            _context.Trades.Add(new TradeEntity
            {
                UserId = userId,
                Symbol = dto.Symbol,
                Quantity = dto.Quantity,
                Price = dto.Price,
                Type = "buy"
            });

            await _context.SaveChangesAsync();
            await _notificationService.CreateAsync(userId, $"Du har köpt {dto.Quantity} st {dto.Symbol} för totalt {totalCost:C}.");
            return Ok("Köp genomfört.");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Ett fel inträffade vid köp: {ex.Message}");
        }
    }

    [HttpPost("sell")]
    public async Task<IActionResult> SellStock([FromBody] TradeRequestDto dto)
    {
        try
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
                return Unauthorized();

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
                return NotFound("Användare hittades inte.");

            var totalValue = dto.Price * dto.Quantity;
            user.Balance += totalValue;

            _context.Trades.Add(new TradeEntity
            {
                UserId = userId,
                Symbol = dto.Symbol,
                Quantity = dto.Quantity,
                Price = dto.Price,
                Type = "sell"
            });

            await _context.SaveChangesAsync();
            await _notificationService.CreateAsync(userId, $"Du har sålt {dto.Quantity} st {dto.Symbol} och fått {totalValue:C}.");
            return Ok("Försäljning genomförd.");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Ett fel inträffade vid försäljning: {ex.Message}");
        }
    }

    [HttpPost("autotrade")]
    public async Task<IActionResult> AutoTrade([FromBody] AutoTradeDto dto)
    {
        try
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
                return Unauthorized();

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
                return NotFound("Användaren hittades inte.");

            if (!user.AutoTradeEnabled || user.AutoTradeThreshold == null)
                return BadRequest("AutoTrade är inte aktiverad.");

            if (Math.Abs(dto.ChangePercent) >= user.AutoTradeThreshold)
            {
                var type = dto.ChangePercent > 0 ? "buy" : "sell";
                var totalAmount = dto.Price * dto.Quantity;

                if (type == "buy" && user.Balance < totalAmount)
                    return BadRequest("Otillräckligt saldo för AutoTrade-köp.");

                _context.Trades.Add(new TradeEntity
                {
                    UserId = userId,
                    Symbol = dto.Symbol,
                    Quantity = dto.Quantity,
                    Price = dto.Price,
                    Type = type
                });

                user.Balance += type == "sell" ? totalAmount : -totalAmount;

                await _context.SaveChangesAsync();
                await _notificationService.CreateAsync(userId, $"AutoTrade {type} genomfördes för {dto.Symbol} ({dto.Quantity} st, {dto.Price:C}).");
                return Ok($"AutoTrade {type} genomförd.");
            }

            return Ok("Ingen AutoTrade kördes (tröskel ej nådd).");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"[AutoTrade Error] {ex.Message}");
            return StatusCode(500, $"AutoTrade-fel: {ex.Message}");
        }
    }


    [HttpPost("update-settings")]
    public async Task<IActionResult> UpdateAutoTradeSettings([FromBody] AutoTradeSettingsDto dto)
    {
        try
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Unauthorized();

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null) return NotFound("Användaren hittades inte.");

            // 🔍 Kontrollera om något faktiskt ändrats
            bool changed = false;

            if (user.AutoTradeEnabled != dto.AutoTradeEnabled)
            {
                user.AutoTradeEnabled = dto.AutoTradeEnabled;
                changed = true;
            }

            if ((user.AutoTradeThreshold.HasValue != dto.AutoTradeThreshold.HasValue) ||
                (user.AutoTradeThreshold.HasValue &&
                 Math.Abs(user.AutoTradeThreshold.Value - dto.AutoTradeThreshold!.Value) > 0.001m))
            {
                user.AutoTradeThreshold = dto.AutoTradeThreshold;
                changed = true;
            }

            if (user.NotificationsEnabled != dto.NotificationsEnabled)
            {
                user.NotificationsEnabled = dto.NotificationsEnabled;
                changed = true;
            }

            if (changed)
            {
                await _userManager.UpdateAsync(user);

                await _notificationService.CreateAsync(userId,
                    $"Dina AutoTrade-inställningar har uppdaterats: {(user.AutoTradeEnabled ? "Aktiverad" : "Avaktiverad")}, tröskel {user.AutoTradeThreshold}%.");
            }

            return Ok(new { message = changed ? "Inställningar uppdaterade." : "Inga ändringar att spara." });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = "Något gick fel", detail = ex.Message });
        }
    }
}

