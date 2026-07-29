using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PlantillaFullstack.Server.Models
{
    [Table("STUDY_TYPE")]
    public class StudyType
    {
        [Key]
        [Required]
        public int STY_ID { get; set; }

        [MaxLength(15)]
        public string STY_NAME { get; set; }
    }
}