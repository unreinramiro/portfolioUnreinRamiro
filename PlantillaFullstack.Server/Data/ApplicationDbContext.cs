using Microsoft.EntityFrameworkCore;
using PlantillaFullstack.Server.Models;

namespace PlantillaFullstack.Server.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        // DbSets for your entities go here
        public DbSet<Technology> Technologies { get; set; }
        public DbSet<TechTypes> TechTypes { get; set; }
        public DbSet<ProjectTechnology> ProjectTechnologies { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<Study> Studies { get; set; }
        public DbSet<StudyType> StudyTypes { get; set; }
        public DbSet<Assignature> Assignatures { get; set; }
        public DbSet<Profile> Profile { get; set; }
    }
}
