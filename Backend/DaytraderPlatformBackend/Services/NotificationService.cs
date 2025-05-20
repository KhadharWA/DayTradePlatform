
using DaytraderPlatformBackend.Contexts;
using DaytraderPlatformBackend.Dtos;
using DaytraderPlatformBackend.Entities;
using DaytraderPlatformBackend.Hubs;
using Microsoft.AspNetCore.SignalR;

namespace DaytraderPlatformBackend.Services;

public class NotificationService(IHubContext<NotificationHub> hub, DataContext context) : INotificationService
{
    private readonly IHubContext<NotificationHub> _hub = hub;
    private readonly DataContext _context = context;

    public async Task CreateAsync(string userId, string message)
    {
        Console.WriteLine($"[NotificationService] Creating notification for: {userId}");

        // 1️⃣ Hämta användare först
        var user = await _context.Users.FindAsync(userId);

        // 2️⃣ Stoppa direkt om notiser är avstängda
        if (user == null || !user.NotificationsEnabled)
        {
            Console.WriteLine($"Notiser är avstängda för {userId}, skippar.");
            return;
        }

        var notification = new NotificationEntity
        {
            UserId = userId,
            Message = message,
            CreatedAt = DateTime.UtcNow,
            IsRead = false
        };

        _context.Notifications.Add(notification);
        await _context.SaveChangesAsync();

        var dto = new NotificationDto
        {
            Id = notification.Id,
            Message = notification.Message,
            CreatedAt = notification.CreatedAt
        };

        try
        {
            Console.WriteLine($"Sending via SignalR to user: {userId}");
            await _hub.Clients.User(userId).SendAsync("ReceiveNotification", dto);
            Console.WriteLine("SignalR notification sent");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"SignalR send failed: {ex.Message}");
        }
    }
}
