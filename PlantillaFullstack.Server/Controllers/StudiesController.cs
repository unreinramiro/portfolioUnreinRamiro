using Microsoft.AspNetCore.Mvc;
using PlantillaFullstack.Server.Models;
using PlantillaFullstack.Server.Data;

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
    }
}