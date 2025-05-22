using Microsoft.AspNetCore.Authorization;
using DaytraderPlatformBackend.Contexts;
using DaytraderPlatformBackend.Dtos;
using DaytraderPlatformBackend.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace DaytraderPlatformBackend.Controllers;


[Route("api/[controller]")]
[ApiController]
[Authorize]
public class ProfileController(DataContext context, UserManager<UserEntity> userManager) : ControllerBase
{
    private readonly DataContext _context = context;
    private readonly UserManager<UserEntity> _userManager = userManager;



    
    [HttpGet]
    [Route("details")]
    public async Task<IActionResult> GetProfile()
    {
        try
        {
            // Försök hämta userId från flera möjliga claim-namn
            var userId = User.FindFirst("nameid")?.Value ??
                         User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
                return Unauthorized("User ID not found in token.");

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
                return NotFound("User not found.");

            return Ok(new
            {
                user.FirstName,
                user.LastName,
                user.Email,
                user.PhoneNumber,
                user.Balance,
                user.AutoTradeEnabled,
                user.AutoTradeThreshold,
                user.ProfileImageUrl
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = ex.Message });
        }
    }

    [HttpPost]
    [Route("updateDetails")]
    public async Task<IActionResult> UpdateProfile([FromBody] UpdateProfileDto dto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState); // 🔍 This gives you detailed feedback if something is missing or invalid
        }

        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId == null)
            return Unauthorized();

        var user = await _userManager.FindByIdAsync(userId);
        if (user == null)
            return NotFound();

        user.FirstName = dto.FirstName;
        user.LastName = dto.LastName;
        user.PhoneNumber = dto.PhoneNumber;

        var result = await _userManager.UpdateAsync(user);
        if (!result.Succeeded)
            return BadRequest(result.Errors);

        return Ok(new { message = "Profile updated successfully" });
    }


    [HttpGet("address")]
    public async Task<IActionResult> GetAddress()
    {
        try
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
                return Unauthorized(new { error = "Unauthorized: Missing user ID" }); 

            var address = await _context.Addresses.FirstOrDefaultAsync(a => a.UserId == userId);

            if (address == null)
            {
                return Ok(new
                {
                    AddressLine_1 = "",
                    AddressLine_2 = "",
                    PostalCode = "",
                    City = ""
                }); 
            }

            return Ok(address); 
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = "Internal Server Error", details = ex.Message }); 
        }
    }

    [HttpPost]
    [Route("updateAddress")]
    public async Task<IActionResult> AddOrUpdateAddress([FromBody] UpdateAddressDto dto)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var existing = await _context.Addresses.FirstOrDefaultAsync(a => a.UserId == userId);

        if (existing != null)
        {
            existing.AddressLine_1 = dto.AddressLine_1;
            existing.AddressLine_2 = dto.AddressLine_2;
            existing.PostalCode = dto.PostalCode;
            existing.City = dto.City;
        }
        else
        {
            var newAddress = new AddressEntity
            {
                UserId = userId!,
                AddressLine_1 = dto.AddressLine_1,
                AddressLine_2 = dto.AddressLine_2,
                PostalCode = dto.PostalCode,
                City = dto.City
            };
            _context.Addresses.Add(newAddress);
        }

        await _context.SaveChangesAsync();
        return Ok(new { message = "Address saved" });
    }

    
    [HttpPut("Updatepassword")]
    public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto dto)
    {
        try
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized();

            var result = await _userManager.ChangePasswordAsync(user, dto.CurrentPassword!, dto.NewPassword!);
            if (!result.Succeeded)
            {
                var errors = string.Join(", ", result.Errors.Select(e => e.Description));
                return BadRequest(new { error = errors });
            }

            return Ok(new { message = "Lösenordet har ändrats." });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = "Ett fel uppstod", detail = ex.Message });
        }
    }

    [HttpDelete("delete-account")]
    public async Task<IActionResult> DeleteAccount()
    {
        try
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized();

            // 1. Hämta och ta bort relaterade adresser
            var addresses = await _context.Addresses
                .Where(a => a.UserId == user.Id)
                .ToListAsync();

            _context.Addresses.RemoveRange(addresses);

            // 2. Ta bort användaren
            var result = await _userManager.DeleteAsync(user);
            if (!result.Succeeded)
            {
                return BadRequest(new { error = string.Join(", ", result.Errors.Select(e => e.Description)) });
            }

            await _context.SaveChangesAsync();
            return Ok(new { message = "Konto raderat." });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = ex.Message });
        }
    }


    [HttpPost("upload")]
    public async Task<IActionResult> UploadImage(IFormFile file)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var user = await _userManager.FindByIdAsync(userId!);
        if (file == null || user == null) return BadRequest();

        var uploadsPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
        Directory.CreateDirectory(uploadsPath);

        var fileName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
        var filePath = Path.Combine(uploadsPath, fileName);

        using var stream = new FileStream(filePath, FileMode.Create);
        await file.CopyToAsync(stream);

        user.ProfileImageUrl = fileName;
        await _userManager.UpdateAsync(user);

        return Ok(new { imageUrl = fileName });
    }

}