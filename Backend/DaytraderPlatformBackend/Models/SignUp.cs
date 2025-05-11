using DaytraderPlatformBackend.Helpers;
using System.ComponentModel.DataAnnotations;

namespace DaytraderPlatformBackend.Models;

public class SignUp
{
    [Required(ErrorMessage = "First name is required")]

    public string FirstName { get; set; } = null!;



    [Required(ErrorMessage = "Last name is required")]

    public string LastName { get; set; } = null!;



    [DataType(DataType.EmailAddress)]
    [Required(ErrorMessage = "Email is required")]
    [RegularExpression("^[^@\\s]+@[^@\\s]+\\.[^@\\s]{2,}$", ErrorMessage = "Your email address is invalid")]

    public string Email { get; set; } = null!;


    [DataType(DataType.Password)]
    [Required(ErrorMessage = "Password required")]
    [RegularExpression("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^\\da-zA-Z]).{8,}$", ErrorMessage = "Invalid Password, must be a strong password")]

    public string Password { get; set; } = null!;


    [DataType(DataType.Password)]
    [Required(ErrorMessage = "Password must be confirmed")]
    [Compare(nameof(Password), ErrorMessage = "Password does not match")]

    public string ConfirmPassword { get; set; } = null!;


    [CheckBoxRequired(ErrorMessage = "You must accept the terms and condtitions to proceed.")]

    public bool TermsAndConditions { get; set; } = false;
}

