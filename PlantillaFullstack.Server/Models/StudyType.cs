using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PlantillaFullstack.Server.Models
{
    [Table("STUDY_TYPE")]
    public class StudyType
    {
        [Key]
        public int STY_ID { get; set; }
        [Required]

        public string STY_NAME { get; set; }
        [MaxLength(15)]
    }
}