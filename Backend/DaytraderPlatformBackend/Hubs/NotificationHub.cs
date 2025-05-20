using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace DaytraderPlatformBackend.Hubs;

[Authorize]
public class NotificationHub : Hub
{
    public override Task OnConnectedAsync()
    {
        Console.WriteLine($"✅ [HUB] Connected: UserIdentifier = {Context.UserIdentifier ?? "❌ null"}");
        return base.OnConnectedAsync();
    }

    public override Task OnDisconnectedAsync(Exception? exception)
    {
        Console.WriteLine($"🔌 [HUB] Disconnected: {Context.UserIdentifier}, Reason: {exception?.Message}");
        return base.OnDisconnectedAsync(exception);
    }
}
