using DaytraderPlatformBackend.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DaytraderPlatformBackend.Contexts;

public class DataContext(DbContextOptions<DataContext> options) : IdentityDbContext<UserEntity>(options)
{
    public DbSet<PortfolioItemEntity> PortfolioItems { get; set; }

    public DbSet<TransactionEntity> Transactions { get; set; }

    public DbSet<AddressEntity> Addresses { get; set; }

    public DbSet<TradeEntity> Trades { get; set; }

    public DbSet<NotificationEntity> Notifications { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        // User → Addresses
        builder.Entity<UserEntity>()
            .HasMany(u => u.Addresses)
            .WithOne(a => a.User)
            .HasForeignKey(a => a.UserId)
            .OnDelete(DeleteBehavior.Restrict);

        // User → PortfolioItems
        builder.Entity<UserEntity>()
            .HasMany(u => u.Portfolio)
            .WithOne(p => p.User)
            .HasForeignKey(p => p.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        // User → Transactions
        builder.Entity<UserEntity>()
            .HasMany(u => u.Transactions)
            .WithOne(t => t.User)
            .HasForeignKey(t => t.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        // User → Trades
        builder.Entity<UserEntity>()
            .HasMany(u => u.Trades)
            .WithOne(t => t.User)
            .HasForeignKey(t => t.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        // User → Notifications
        builder.Entity<UserEntity>()
            .HasMany(u => u.Notifications)
            .WithOne(n => n.User)
            .HasForeignKey(n => n.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        // Keys (optional if already inferred by conventions)
        builder.Entity<PortfolioItemEntity>()
            .HasKey(p => p.Id);

        builder.Entity<TransactionEntity>()
            .HasKey(t => t.Id);

        builder.Entity<AddressEntity>()
            .HasKey(a => a.Id);

        builder.Entity<TradeEntity>()
            .HasKey(t => t.Id);

        builder.Entity<NotificationEntity>()
            .HasKey(n => n.Id);
    }
}
