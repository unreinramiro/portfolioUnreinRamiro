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
    public class TechnologiesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TechnologiesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTechnologies()
        {
            var technologies = await _context.Technologies.ToListAsync();
            return Ok(technologies);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTechnologies(int id)
        {
            var technology = await _context.ProjectTechnologies
                                   .Include(pt => pt.Technology)
                                   .Where(pt => pt.PRT_PRO_ID == id)
                                   .Select(pt => new
                                   {
                                       pt.Technology.TEC_ID,
                                       pt.Technology.TEC_NAME
                                   })
                                   .ToListAsync();

            return Ok(technology);
        }

        [HttpGet("techAdm/{id}")]
        public IActionResult GetTechsAdm(int id)
        {
            var front = _context.Technologies
                    .Where(f => f.TEC_TCY_ID == 1)
                    .ToList();

            if (id == 2)
            {
                var back = _context.Technologies
                    .Where(b => b.TEC_TCY_ID == 2)
                    .ToList();

                return Ok(back);
            }else if (id == 3)
            {
                var bd = _context.Technologies
                    .Where(bd => bd.TEC_TCY_ID == 3)
                    .ToList();
                return Ok(bd);
            }else if (id == 4)
            {
                var tool = _context.Technologies
                    .Where(t => t.TEC_TCY_ID == 4)
                    .ToList();
                return Ok(tool);
            }

            return Ok(front);
        }

        [HttpPost("techAdm/addTech")]
        public async Task<IActionResult> AddTechnology([FromBody] TechnologyDto dto)
        {
            try
            {
                var tec = new Technology
                {
                    TEC_TCY_ID = dto.TecTcyId,
                    TEC_NAME = dto.TecName
                };

                _context.Technologies.Add(tec);
                await _context.SaveChangesAsync();

                return Ok(tec);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error al insertar un estudio: {ex.Message}");
                return StatusCode(500, "Hubo un error al insertar un nuevo estudio.");
            }
        }

        [HttpDelete("techAdm/deleteTech/{id}")]
        public async Task<IActionResult> DeleteTechnology(int id)
        {
            try
            {
                var tec = await _context.Technologies
                                 .FirstOrDefaultAsync(t => t.TEC_ID == id);

                if (tec == null) return NotFound("No se encontro la tecnologia a eliminar");

                _context.Technologies.Remove(tec);

                await _context.SaveChangesAsync();

                return Ok("Se elimino la tecnologia correctamente");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error al eliminar la tecnologia: {ex.Message}");
                return StatusCode(500, "Hubo un error al eliminar la tecnologia.");
            }
        }
    }
}