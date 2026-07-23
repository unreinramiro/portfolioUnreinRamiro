using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PlantillaFullstack.Server.Models
{
    [Table("TECH_TYPES")]
    public class TechTypes
    {
        [Key]
        public int TCY_ID { get; set; }
        [Required]

        public string TCY_NAME { get; set; }
        [MaxLength(30)]
    }
}