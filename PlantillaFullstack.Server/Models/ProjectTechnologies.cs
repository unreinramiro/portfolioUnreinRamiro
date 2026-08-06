using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PlantillaFullstack.Server.Models
{
    [Table("PROJECT_TECHNOLOGIES")]
    public class ProjectTechnology
    {
        [Key]
        [Required]
        public int PRT_ID { get; set; }

        public int PRT_PRO_ID { get; set; }

        public int PRT_TEC_ID { get; set; }

        [ForeignKey("PRT_TEC_ID")]
        public Technology Technology { get; set; }

        [ForeignKey("PRT_PRO_ID")]
        public Project Project { get; set; }
    }
}