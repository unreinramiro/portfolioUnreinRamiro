using Microsoft.AspNetCore.Mvc;
using PlantillaFullstack.Server.Models;
using PlantillaFullstack.Server.Data;
using PlantillaFullstack.Server.DTOs;
using Microsoft.EntityFrameworkCore;

namespace PlantillaFullstack.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StudiesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public StudiesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("academic")]
        public IActionResult GetAcademicStudies()
        {
            var studies = _context.Studies
                .Where(s => s.STD_STY_ID == 1)
                .ToList();

            return Ok(studies);
        }


        [HttpGet("courses-certifications")]
        public IActionResult GetCoursesCertifications()
        {
            var studies = _context.Studies
                .Where(s => s.STD_STY_ID == 2)
                .ToList();

            return Ok(studies);
        }

        [HttpGet("studiesAdm/{id}")]
        public IActionResult GetStudiesAdm(int id)
        {
            var university = _context.Studies
                    .Where(s => s.STD_STY_ID == 1)
                    .ToList();

            if (id != 1) {
                var course = _context.Studies
                    .Where(s => s.STD_STY_ID == 2)
                    .ToList();

                return Ok(course);
            }

            return Ok(university);
        }

        [HttpPost("studiesAdm/addStudy")]
        public async Task<IActionResult> AddStudyAdm([FromBody] StudyAddDto dto)
        {
            try
            {
                var study = new Study
                {
                    STD_STY_ID = dto.StdStyId,
                    STD_TITLE = dto.StdTitle,
                    STD_DESCRIPTION = dto.StdDesc,
                    STD_INSTITUTION = dto.StdInstitution,
                    STD_START_DATE = dto.StdStart,
                    STD_END_DATE = dto.StdEnd,
                    STD_HOURS = dto.StdHours,
                    STD_CERTIFICATION_URL = dto.StdCertification
                };

                _context.Studies.Add(study);
                await _context.SaveChangesAsync();

                return Ok(study);
            }
            catch(Exception ex)
            {
                Console.WriteLine($"Error al insertar un estudio: {ex.Message}");
                return StatusCode(500, "Hubo un error al insertar un nuevo estudio.");
            }
        }

        [HttpPut("studiesAdm/updStudy")]
        public async Task<IActionResult> UpdStudy([FromBody] StudyAddDto dto)
        {
            try
            {
                var study = await _context.Studies
                        .FirstOrDefaultAsync(s => s.STD_ID == dto.StdId);

                if (study == null) return BadRequest("No se encontro el estudio");

                study.STD_TITLE = dto.StdTitle;
                study.STD_DESCRIPTION = dto.StdDesc;
                study.STD_INSTITUTION = dto.StdInstitution;
                study.STD_START_DATE = dto.StdStart;
                study.STD_END_DATE = dto.StdEnd;
                study.STD_HOURS = dto.StdHours;
                study.STD_CERTIFICATION_URL = dto.StdCertification;

                await _context.SaveChangesAsync();

                return Ok("Estudio actualizado correctamente.");

            }
            catch(Exception ex)
            {
                Console.WriteLine($"Error al insertar un estudio: {ex.Message}");
                return StatusCode(500, "Hubo un error al insertar un nuevo estudio.");
            }
        }

        [HttpDelete("studiesAdm/delStudy/{id}")]
        public async Task<IActionResult> DeleteStudy(int id)
        {
            try
            {
                var study = await _context.Studies
                                 .FirstOrDefaultAsync(s => s.STD_ID == id);

                if (study == null) return NotFound("No se encontor el estudio a eliminar");

                _context.Studies.Remove(study);

                await _context.SaveChangesAsync();

                return Ok("Se elimino el estudio correctamente");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error al eliminar un estudio: {ex.Message}");
                return StatusCode(500, "Hubo un error al eliminar un estudio.");
            }
        }
    }
}