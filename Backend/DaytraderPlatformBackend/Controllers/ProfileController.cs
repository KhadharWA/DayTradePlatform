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
    [Route("test")]
    public IActionResult Test()
    {
        return Ok("ProfileController fungerar!");
    }


    
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
    public async Task<IActionResult> UpdateProfile(UpdateProfileDto dto)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId == null)
            return Unauthorized();

        var user = await _userManager.FindByIdAsync(userId);
        if (user == null)
            return NotFound();

        user.FirstName = dto.FirstName;
        user.LastName = dto.LastName;
        user.PhoneNumber = dto.PhoneNumber;
        user.ProfileImageUrl = dto.ProfileImageUrl;

        var result = await _userManager.UpdateAsync(user);
        if (!result.Succeeded)
            return BadRequest(result.Errors);

        return Ok(new { message = "Profile updated successfully" });
    }


    [HttpGet]
    [Route("address")]
    public async Task<IActionResult> GetAddress()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var address = await _context.Addresses.FirstOrDefaultAsync(a => a.UserId == userId);

        if (address == null)
            return NotFound();

        return Ok(address);
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

    [HttpPost]
    [Route("phone")]
    public async Task<IActionResult> UpdatePhone([FromBody] string phone)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var user = await _userManager.FindByIdAsync(userId!);
        if (user == null) return NotFound();

        user.PhoneNumber = phone;
        await _userManager.UpdateAsync(user);

        return Ok(new { message = "Phone updated" });
    }
}