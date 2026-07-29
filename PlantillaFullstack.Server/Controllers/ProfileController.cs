using Microsoft.AspNetCore.Mvc;
using PlantillaFullstack.Server.Models;
using PlantillaFullstack.Server.Data;

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
    }
}
