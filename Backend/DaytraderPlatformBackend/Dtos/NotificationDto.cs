namespace DaytraderPlatformBackend.Dtos;

public class NotificationDto
{
    public int Id { get; set; }
    public string Message { get; set; } = null!;
    public DateTime CreatedAt { get; set; }
    public bool IsRead { get; set; }

    public string FirstName { get; set; } = null!;

    public string? ProfileImageUrl { get; set; }


}
