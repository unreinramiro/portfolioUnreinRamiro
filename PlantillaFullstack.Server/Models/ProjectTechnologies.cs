using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PlantillaFullstack.Server.Models
{
    [Table("PROJECT_TECHNOLOGIES")]
    public class ProjectTechnology
    {
        [Key]
        public int PRT_ID { get; set; }
        [Required]

        public int PRT_PRO_ID { get; set; }
        [ForeignKey("PRT_PRO_ID")]

        public int PRT_TEC_ID { get; set; }
        [ForeignKey("PRT_TEC_ID")]
    }
}