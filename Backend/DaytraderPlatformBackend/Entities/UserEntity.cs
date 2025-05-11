using System.ComponentModel.DataAnnotations.Schema;


using Microsoft.AspNetCore.Identity;

namespace DaytraderPlatformBackend.Entities;

public class UserEntity : IdentityUser
{
    [ProtectedPersonalData]
    public string FirstName { get; set; } = null!;

    [ProtectedPersonalData]
    public string LastName { get; set; } = null!;


    public string? ProfileImageUrl { get; set; }

    [Column(TypeName = "decimal(12,2)")]
    public decimal Balance { get; set; } = 0m;

    public bool AutoTradeEnabled { get; set; } = false;

    [Column(TypeName = "decimal(5,2)")]
    public decimal? AutoTradeThreshold { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<PortfolioItemEntity> Portfolio { get; set; } = [];
    public ICollection<TransactionEntity> Transactions { get; set; } = [];
    public ICollection<AddressEntity> Addresses { get; set; } = [];
}
