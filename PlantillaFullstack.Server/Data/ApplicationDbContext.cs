using Microsoft.EntityFrameworkCore;
namespace PlantillaFullstack.Server.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        // DbSets for your entities go here
    }
}
