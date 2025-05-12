using DaytraderPlatformBackend.Dtos;
using System.Text.Json;

namespace DaytraderPlatformBackend.MockData;

public class MockDeposits
{
    public static string Json = @"[
        {
            ""date"": ""2025-05-10T14:30:00Z"",
            ""amount"": 1000,
            ""method"": ""Kort"",
            ""status"": ""Godkänd""
        },
        {
            ""date"": ""2025-05-08T09:15:00Z"",
            ""amount"": 300,
            ""method"": ""Swish"",
            ""status"": ""Väntar""
        },
        {
            ""date"": ""2025-05-01T11:00:00Z"",
            ""amount"": 500,
            ""method"": ""Bankgiro"",
            ""status"": ""Avvisad""
        }
    ]";

}
