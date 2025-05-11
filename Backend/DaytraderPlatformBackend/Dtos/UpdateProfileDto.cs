namespace DaytraderPlatformBackend.Dtos;

public class UpdateProfileDto
{
        public string FirstName { get; set; } = null!;

        public string LastName { get; set; } = null!;

        public string Email { get; set; } = null!;

        public string? ProfileImageUrl { get; set; }

        public string? PhoneNumber { get; set; }

}
