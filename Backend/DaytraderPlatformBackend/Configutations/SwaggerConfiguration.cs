using Microsoft.OpenApi.Models;

namespace DaytraderPlatformBackend.Configutations;

public static class SwaggerConfiguration
{
    public static void RegisterSwagger(this IServiceCollection services)
    {
        services.AddSwaggerGen(x =>
        {
            x.SwaggerDoc("v1", new OpenApiInfo { Title = "DayTraderPlatform Web Api", Version = "v1" });
           
            // Bearer Token (JWT) konfiguration
            x.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
            {
                Name = "Authorization",
                Type = SecuritySchemeType.Http,
                Scheme = "Bearer",
                BearerFormat = "JWT",
                In = ParameterLocation.Header,
                Description = "Enter AccessToken ",
            });


            x.AddSecurityRequirement(new OpenApiSecurityRequirement
        {
              {
                new OpenApiSecurityScheme
                {
                    Reference = new OpenApiReference
                    {
                        Type = ReferenceType.SecurityScheme,
                        Id = "Bearer"
                    },
                    In = ParameterLocation.Header,
                },
                Array.Empty<string>()
            }
        });
        });
    }
}
