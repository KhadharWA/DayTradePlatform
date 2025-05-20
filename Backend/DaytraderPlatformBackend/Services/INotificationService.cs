namespace DaytraderPlatformBackend.Services;

public interface INotificationService
{
    Task CreateAsync(string userId, string message);
}
