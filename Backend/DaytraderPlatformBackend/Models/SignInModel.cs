using System.ComponentModel.DataAnnotations;

namespace DaytraderPlatformBackend.Models;

public class SignInModel
{
    [DataType(DataType.EmailAddress)]
    [Required(ErrorMessage = "Email is required")]

    public string Email { get; set; } = null!;



    [DataType(DataType.Password)]
    [Required(ErrorMessage = "Password required")]

    public string Password { get; set; } = null!;


    public bool RememberMe { get; set; }

}
