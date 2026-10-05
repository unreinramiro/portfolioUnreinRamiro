using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PlantillaFullstack.Server.DTOs;
using PlantillaFullstack.Server.Services;

namespace PlantillaFullstack.Server.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private readonly IEmailService _emailService;

        public ContactController(IEmailService emailService)
        {
            _emailService = emailService;
        }

        [HttpPost("send")]
        public async Task<IActionResult> SendMail([FromBody] ContactDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Email) ||
                string.IsNullOrWhiteSpace(dto.Subject) ||
                string.IsNullOrWhiteSpace(dto.Message))
            {
                return BadRequest("Todos los campos (Email, Asunto y Mensaje) son obligatorios.");
            }

            try
            {
                await _emailService.SendContactEmailAsync(dto);
                return Ok("Mensaje enviado con éxito.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error al enviar correo: {ex.Message}");
                return StatusCode(500, "Ocurrió un error al intentar enviar el correo.");
            }
        }
    }
}