using Microsoft.AspNetCore.Mvc;
using PlantillaFullstack.Server.Models;
using PlantillaFullstack.Server.Data;
using PlantillaFullstack.Server.DTOs;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace PlantillaFullstack.Server.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class AssignaturesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AssignaturesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public IActionResult GetAcademicAssignatures(int id)
        {
            var assignatures = _context.Assignatures
                .Where(a => a.ASG_STD_ID == id)
                .ToList();
            return Ok(assignatures);
        }

        [HttpPost("addAssignature")]
        public async Task<IActionResult> AddAssignature([FromBody] AssignatureDto dto)
        {
            try
            {
                var assignatura = new Assignature
                {
                    ASG_STD_ID = dto.AsgStdId,
                    ASG_TITLE = dto.AsgTitle,
                    ASG_FIRST_NOTE = dto.AsgFirstNote,
                    ASG_SECOND_NOTE = dto.AsgSecondNote,
                    ASG_PROMOTION = dto.AsgPromotion,
                    ASG_SEMESTER = dto.AsgSemester,
                    ASG_STATUS = dto.AsgStatus,
                    ASG_YEAR = dto.AsgYear
                };

                _context.Assignatures.Add(assignatura);
                await _context.SaveChangesAsync();

                return Ok(assignatura);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error al agregar la asignatura: {ex.Message}");
                return StatusCode(500, "Hubo un error al agregar la asignatura");
            }
        }

        [HttpPut("updAssignature")]
        public async Task<IActionResult> UpdAssignature([FromBody] AssignatureDto dto)
        {
            try
            {
                var assignature = await _context.Assignatures
                                                .FirstOrDefaultAsync(a => a.ASG_ID == dto.AsgId);
                if (assignature == null) return BadRequest("No se encontrol a asignatura a actualizar");

                assignature.ASG_TITLE = dto.AsgTitle;
                assignature.ASG_FIRST_NOTE = dto.AsgFirstNote;
                assignature.ASG_SECOND_NOTE = dto.AsgSecondNote;
                assignature.ASG_PROMOTION = dto.AsgPromotion;
                assignature.ASG_SEMESTER = dto.AsgSemester;
                assignature.ASG_STATUS = dto.AsgStatus;
                assignature.ASG_YEAR = dto.AsgYear;

                await _context.SaveChangesAsync();

                return Ok("Se actualizo la asignatura correctamente");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error al actualizar la asignatura: {ex.Message}");
                return StatusCode(500, "Hubo un error  al actualizar la asignatura");
            }
        }

        [HttpDelete("deleteAsignature/{id}")]
        public async Task<IActionResult> DeleteAssignature(int id)
        {
            try
            {
                var assignature = await _context.Assignatures
                                                .FirstOrDefaultAsync(a => a.ASG_ID == id);
                if (assignature == null) return NotFound("No se encontrol a asignatura a eliminar");

                _context.Assignatures.Remove(assignature);

                await _context.SaveChangesAsync();

                return Ok("Se elimino la asignatura correctamente");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error al eliminar la asignatura: {ex.Message}");
                return StatusCode(500, "Hubo un error  al eliminar la asignatura");
            }
        }
    }
}