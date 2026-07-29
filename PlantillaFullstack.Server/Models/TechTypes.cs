using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PlantillaFullstack.Server.Models
{
    [Table("TECH_TYPES")]
    public class TechTypes
    {
        [Key]
        [Required]
        public int TCY_ID { get; set; }

        [MaxLength(30)]
        public string TCY_NAME { get; set; }
    }
}