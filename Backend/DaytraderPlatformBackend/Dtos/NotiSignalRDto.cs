namespace DaytraderPlatformBackend.Dtos;

public class NotiSignalRDto
{
    public int Id { get; set; }
    public string Message { get; set; } = null!;
    public DateTime CreatedAt { get; set; }
}
