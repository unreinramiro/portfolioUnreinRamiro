using Microsoft.AspNetCore.Mvc;
using PlantillaFullstack.Server.Models;
using PlantillaFullstack.Server.Data;
using PlantillaFullstack.Server.DTOs;

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
    }
}