namespace DaytraderPlatformBackend.Dtos;

public class TradeRequestDto
{
    public string Symbol { get; set; } = null!;

    public decimal Quantity { get; set; }

    public decimal Price { get; set; }

}
