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
    }
}