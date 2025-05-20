namespace DaytraderPlatformBackend.Dtos;

public class AutoTradeDto : TradeRequestDto
{
    public decimal ChangePercent { get; set; }
}
