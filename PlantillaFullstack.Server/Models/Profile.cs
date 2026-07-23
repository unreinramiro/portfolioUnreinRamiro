using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PlantillaFullstack.Server.Models
{
    [Table("PROFILE")]
    public class Profile
    {
        [Key]
        public int PRO_ID { get; set; }
        [Required]

        public string PRO_NAME { get; set; }
        [Required]
        [MaxLength(15)]

        public string PRO_SURNAME { get; set; }
        [Required]
        [MaxLength(15)]

        public string PRO_DESC { get; set; }
        [MaxLength(700)]

        public string PRO_IMG { get; set; }
        [MaxLength(100)]
    }
}