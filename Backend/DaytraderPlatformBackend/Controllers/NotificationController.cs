using DaytraderPlatformBackend.Contexts;
using DaytraderPlatformBackend.Dtos;
using DaytraderPlatformBackend.Entities;
using DaytraderPlatformBackend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace DaytraderPlatformBackend.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class NotificationController(DataContext context, UserManager<UserEntity> userManager, INotificationService notificationService) : ControllerBase
{
    private readonly DataContext _context = context;
    private readonly UserManager<UserEntity> _userManager = userManager;
    private readonly INotificationService _notificationService = notificationService;

    // GET: api/notification
    [HttpGet]
    public async Task<IActionResult> Get()
    {
        try
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized();

            var notifications = await _context.Notifications
                .Where(n => n.UserId == user.Id)
                .OrderByDescending(n => n.CreatedAt)
                .Select(n => new NotificationDto
                {
                    Id = n.Id,
                    Message = n.Message,
                    CreatedAt = n.CreatedAt,
                    IsRead = n.IsRead,
                    FirstName = n.User.FirstName,
                    ProfileImageUrl = n.User.ProfileImageUrl
                })
                .ToListAsync();

            return Ok(notifications);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = ex.Message });
        }
    }

    [HttpGet("status")]
    public async Task<IActionResult> GetNotificationStatus()
    {
        try
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized();

            return Ok(new { enabled = user.NotificationsEnabled });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = ex.Message });
        }
    }

    // POST: api/notification
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] string message)
    {
        try
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized();

            await _notificationService.CreateAsync(user.Id, message);

            return Ok(new { message = "Notification created" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = ex.Message });
        }
    }

    [HttpPut("toggle")]
    public async Task<IActionResult> ToggleNotifications([FromBody] bool enabled)
    {
        try
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized();

            user.NotificationsEnabled = enabled;
            await _context.SaveChangesAsync();
            return Ok(new { enabled });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = ex.Message });
        }
    }

    [HttpPut("mark-all-as-read")]
    public async Task<IActionResult> MarkAllAsRead()
    {
        try
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized();

            var notifs = await _context.Notifications
                .Where(n => n.UserId == user.Id && !n.IsRead)
                .ToListAsync();

            foreach (var notif in notifs)
            {
                notif.IsRead = true;
            }

            await _context.SaveChangesAsync();
            return Ok(new { message = "Alla notiser markerades som lästa." });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = "Ett fel uppstod vid markering av notiser.", detail = ex.Message });
        }
    }

    // DELETE api/notification/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized();

            var notif = await _context.Notifications.FirstOrDefaultAsync(n => n.Id == id && n.UserId == user.Id);
            if (notif == null)
                return NotFound();

            _context.Notifications.Remove(notif);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Notis raderad" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = ex.Message });
        }
    }

    // DELETE api/notification (ta bort alla)
    [HttpDelete]
    public async Task<IActionResult> DeleteAll()
    {
        try
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized();

            var notifs = _context.Notifications.Where(n => n.UserId == user.Id);

            _context.Notifications.RemoveRange(notifs);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Alla notiser raderade" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = ex.Message });
        }
    }

    [HttpPost("ping")]
    public async Task<IActionResult> SendTestNotification()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId == null)
            return Unauthorized("Ingen användare identifierad.");

        var message = $"🔔 Testnotis skickad {DateTime.Now:T}";
        await _notificationService.CreateAsync(userId, message);

        return Ok(new { message = "Testnotis skickad via SignalR." });
    }

}
