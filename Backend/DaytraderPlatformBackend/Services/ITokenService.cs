using DaytraderPlatformBackend.Entities;

namespace DaytraderPlatformBackend.Services;

public interface ITokenService
{
    string CreateToken(UserEntity user);
}
