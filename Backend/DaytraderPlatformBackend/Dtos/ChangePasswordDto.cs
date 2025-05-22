using System.ComponentModel.DataAnnotations;

namespace DaytraderPlatformBackend.Dtos;

public class ChangePasswordDto
{
    [Required]
    public string? CurrentPassword { get; set; }

    [Required]
    [MinLength(6, ErrorMessage = "Det nya lösenordet måste vara minst 6 tecken långt.")]
    public string? NewPassword { get; set; }
}
