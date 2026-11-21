using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using PlantillaFullstack.Server.DTOs;

namespace PlantillaFullstack.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public AuthController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDto dto)
        {
            var adminUser = _configuration["AdminCredentials:Username"];
            var adminPass = _configuration["AdminCredentials:Password"];

            if (dto.Username == adminUser && dto.Password == adminPass)
            {
                var token = GenerarJwtToken(dto.Username);
                var expireMinutes = double.Parse(_configuration["Jwt:ExpireMinutes"]!);
                var expiresAt = DateTime.UtcNow.AddMinutes(expireMinutes);

                return Ok(new { token, expiresAt });
            }

            return Unauthorized("Usuario o contraseña incorrectos.");
        }

        private string GenerarJwtToken(string username)
        {
            var jwtSettings = _configuration.GetSection("Jwt");
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Key"]!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, username),
                new Claim(ClaimTypes.Role, "Admin"),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var token = new JwtSecurityToken(
                issuer: jwtSettings["Issuer"],
                audience: jwtSettings["Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(double.Parse(jwtSettings["ExpireMinutes"]!)),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}