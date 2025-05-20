namespace DaytraderPlatformBackend.Dtos;

public class AutoTradeSettingsDto
{
    public bool AutoTradeEnabled { get; set; }

    public decimal? AutoTradeThreshold { get; set; }

    public bool NotificationsEnabled { get; set; }
}
