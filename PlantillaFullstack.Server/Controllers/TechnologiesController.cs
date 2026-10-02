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
    }
}