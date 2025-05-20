namespace DaytraderPlatformBackend.Entities;

public class TradeEntity
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public string UserId { get; set; } = null!;

    public UserEntity User { get; set; } = null!;

    public string Symbol { get; set; } = null!;

    public decimal Quantity { get; set; }

    public decimal Price { get; set; }

    public string Type { get; set; } = null!; // "buy" eller "sell"

    public DateTime Timestamp { get; set; } = DateTime.UtcNow;

}
