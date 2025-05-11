using DaytraderPlatformBackend.Configutations;
using DaytraderPlatformBackend.Contexts;
using DaytraderPlatformBackend.Entities;
using DaytraderPlatformBackend.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);



builder.Services.AddDbContext<DataContext>(x => x.UseSqlServer(builder.Configuration.GetConnectionString("SqlServer")));

builder.Services.AddIdentity<UserEntity, IdentityRole>()
    .AddEntityFrameworkStores<DataContext>()
    .AddDefaultTokenProviders();




builder.Services.AddEndpointsApiExplorer();
builder.Services.RegisterJwt(builder.Configuration);
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173")
                  .AllowAnyHeader()
                  .AllowAnyOrigin()
                  .AllowAnyMethod();
        });
});
builder.Services.RegisterSwagger();



builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<IStockService, StockService>();
builder.Services.AddControllers();

var app = builder.Build();

// Enable Swagger in dev
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "DaytraderPlatform API v1");
    });
}

app.UseHttpsRedirection();
app.UseCors("AllowReact");

app.UseAuthentication(); // must be before authorization
app.UseAuthorization();

app.MapControllers();
// 4. Map controllers sist

app.Run();