using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PlantillaFullstack.Server.Models
{
    [Table("PROJECTS")]
    public class Projects
    {
        [Key]
        public int PRO_ID { get; set; }
        [Required]

        public string PRO_TITLE { get; set; }
        [MaxLength(50)]

        public string PRO_IMG_1 { get; set; }
        [MaxLength(100)]

        public string PRO_IMG_2 { get; set; }
        [MaxLength(100)]

        public string PRO_IMG_3 { get; set; }
        [MaxLength(100)]

        public string PRO_IMG_4 { get; set; }
        [MaxLength(100)]

        public string PRO_DESCRIPTION { get; set; }
        [MaxLength(500)]

        public string PRO_GITHUB_URL { get; set; }
        [MaxLength(100)]

        public string PRO_PRODUCTION_URL { get; set; }
        [MaxLength(100)]
    }
}