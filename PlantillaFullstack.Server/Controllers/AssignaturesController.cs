using Microsoft.AspNetCore.Mvc;
using PlantillaFullstack.Server.Models;
using PlantillaFullstack.Server.Data;

namespace PlantillaFullstack.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AssignaturesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AssignaturesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public IActionResult GetAcademicAssignatures(int id)
        {
            var assignatures = _context.Assignatures
                .Where(a => a.ASG_STD_ID == id)
                .ToList();
            return Ok(assignatures);
        }

    }
}