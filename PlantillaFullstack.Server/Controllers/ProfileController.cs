using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using PlantillaFullstack.Server.Models;
using PlantillaFullstack.Server.Data;
using PlantillaFullstack.Server.DTOs;

namespace PlantillaFullstack.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProfileController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProfileController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetProfile()
        {
            var profiles = _context.Profile.FirstOrDefault();
            return Ok(profiles);
        }

        [HttpPut("updProfile")]
        public async Task<IActionResult> UpdProfile([FromForm] ProfileData dtoPd)
        {
            try
            {
                if (dtoPd == null)
                    return BadRequest("Datos inválidos");

                var profile = await _context.Profile.FirstOrDefaultAsync();

                if (profile == null)
                    return NotFound("Perfil no encontrado");

                bool updated = false;
                string currentDir = Directory.GetCurrentDirectory();

                if (dtoPd.ProfileImg != null)
                {
                    string fileName = $"updProfileImg_{Guid.NewGuid()}{Path.GetExtension(dtoPd.ProfileImg.FileName)}";
                    string filePath = Path.Combine(currentDir, "wwwroot", "images", fileName);

                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await dtoPd.ProfileImg.CopyToAsync(stream);
                    }

                    profile.PRO_IMG = fileName;
                    updated = true;
                }

                if (profile.PRO_NAME != dtoPd.ProfileName)
                {
                    profile.PRO_NAME = dtoPd.ProfileName;
                    updated = true;
                }

                if(profile.PRO_SURNAME != dtoPd.ProfileSurname)
                {
                    profile.PRO_SURNAME = dtoPd.ProfileSurname;
                    updated = true;
                }

                if(profile.PRO_DESC != dtoPd.ProfileDesc)
                {
                    profile.PRO_DESC = dtoPd.ProfileDesc;
                    updated = true;
                }

                if (updated)
                {
                    await _context.SaveChangesAsync();
                    return Ok(new { Message = "Datos actualizados correctamente." });
                }
                else
                {
                    return Ok(new { Message = "No hubo cambios en los datos." });
                }
            }
            catch(Exception ex)
            {
                return StatusCode(500, $"Error al actualizar el perfil: {ex.Message}");
            }

        }
    }
}
