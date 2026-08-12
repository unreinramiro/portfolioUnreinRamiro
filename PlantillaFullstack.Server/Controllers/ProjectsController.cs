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
    public class ProjectsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProjectsController(ApplicationDbContext context)
        {
            _context = context;
        }

        private async Task<string?> SaveImageIfPresent(IFormFile? image)
        {
            if (image == null) return null;

            string fileName = $"updProjectImg_{Guid.NewGuid()}{Path.GetExtension(image.FileName)}";
            string filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", fileName);

            using var stream = new FileStream(filePath, FileMode.Create);
            await image.CopyToAsync(stream);

            return fileName;
        }

        [HttpGet]
        public async Task<IActionResult> GetProjects()
        {
            var projects = _context.Projects.ToList();

            return Ok(projects);     
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProject(int id, [FromForm] ProjectUpdateDto dto)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var project = await _context.Projects.FindAsync(id);
                if (project == null) return NotFound();

                project.PRO_TITLE = dto.ProTitle;
                project.PRO_DESCRIPTION = dto.ProDescription;
                project.PRO_GITHUB_URL = dto.ProGithubUrl;
                project.PRO_PRODUCTION_URL = dto.ProProductionUrl;

                project.PRO_IMG_1 = await SaveImageIfPresent(dto.ProImg1) ?? project.PRO_IMG_1;
                project.PRO_IMG_2 = await SaveImageIfPresent(dto.ProImg2) ?? project.PRO_IMG_2;
                project.PRO_IMG_3 = await SaveImageIfPresent(dto.ProImg3) ?? project.PRO_IMG_3;
                project.PRO_IMG_4 = await SaveImageIfPresent(dto.ProImg4) ?? project.PRO_IMG_4;

                var existing = _context.ProjectTechnologies.Where(pt => pt.PRT_PRO_ID == id);
                
                _context.ProjectTechnologies.RemoveRange(existing);

                foreach (var techId in dto.Technologies)
                {
                    _context.ProjectTechnologies.Add(new ProjectTechnology
                    {
                        PRT_PRO_ID = id,
                        PRT_TEC_ID = techId
                    });
                }

                await _context.SaveChangesAsync();
                await transaction.CommitAsync();
                return Ok();
            }
            catch
            {
                await transaction.RollbackAsync();
                return StatusCode(500, "Error al actualizar el proyecto");
            }
        }
    }
}