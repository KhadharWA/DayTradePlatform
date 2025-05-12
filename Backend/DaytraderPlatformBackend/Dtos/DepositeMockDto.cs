namespace DaytraderPlatformBackend.Dtos;

public class DepositMockDto
{
    public DateTime Date { get; set; }
    public int Amount { get; set; }
    public string Method { get; set; } = null!;
    public string Status { get; set; } = null!;
}
