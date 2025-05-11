using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace DaytraderPlatformBackend.Entities;

public class TransactionEntity
{
    [Key]
    public int Id { get; set; }

    [Required]
    public string Symbol { get; set; } = null!;

    [Column(TypeName = "decimal(10,2)")]
    public decimal Quantity { get; set; }

    [Column(TypeName = "decimal(10,2)")]
    public decimal Price { get; set; }

    [Required]
    public string Type { get; set; } = null!; // "buy" or "sell"

    public DateTime ExecutedAt { get; set; } = DateTime.UtcNow;

    [Required]
    public string UserId { get; set; } = null!;

    [ForeignKey(nameof(UserId))]
    public UserEntity User { get; set; } = null!;
}