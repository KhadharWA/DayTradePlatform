using DaytraderPlatformBackend.Configutations;
using DaytraderPlatformBackend.Contexts;
using DaytraderPlatformBackend.Entities;
using DaytraderPlatformBackend.Hubs;
using DaytraderPlatformBackend.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// DbContext
builder.Services.AddDbContext<DataContext>(x =>
    x.UseSqlServer(builder.Configuration.GetConnectionString("SqlServer")));

// Identity
builder.Services.AddIdentityCore<UserEntity>(options =>
    options.SignIn.RequireConfirmedAccount = true)
    .AddEntityFrameworkStores<DataContext>()
    .AddDefaultTokenProviders();

// JWT
builder.Services.RegisterJwt(builder.Configuration);

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact", policy =>
    {
        policy.WithOrigins("http://localhost:5173") // ✅ måste vara specifik, inte "*"
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials(); // ✅ krävs för tokens med SignalR
    });
});

// Swagger
builder.Services.RegisterSwagger();

// Services
builder.Services.AddScoped<INotificationService, NotificationService>();
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<IStockService, StockService>();
builder.Services.AddSingleton<IUserIdProvider, NameIdentifierProvider>();
// SignalR
builder.Services.AddSignalR();

// Controllers
builder.Services.AddControllers();

var app = builder.Build();

// Swagger UI
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "DaytraderPlatform API v1");
    });
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting(); // ✅ lägg till routing före CORS

app.UseCors("AllowReact"); // ✅ rätt CORS-policy

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapHub<NotificationHub>("/notificationHub"); // ✅ SignalR

app.Run();