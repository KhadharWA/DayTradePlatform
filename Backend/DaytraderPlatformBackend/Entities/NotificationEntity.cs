namespace DaytraderPlatformBackend.Entities;

public class NotificationEntity
{
    public int Id { get; set; }

    public string Message { get; set; } = null!;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public string UserId { get; set; } = null!;

    public UserEntity User { get; set; } = null!;

    public bool IsRead { get; set; } = false;
}
