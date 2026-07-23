using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PlantillaFullstack.Server.Models
{
    [Table("ASSIGNATURES")]
    public class Assignatures
    {
        [Key]
        public int ASG_ID { get; set; }
        [Required]

        public int ASG_STD_ID { get; set; }
        [ForeignKey("ASG_STD_ID")]

        public string ASG_TITLE { get; set; }
        [MaxLength(30)]

        public float ASG_FIRST_NOTE { get; set; }

        public float ASG_SECOND_NOTE { get; set; }

        public bool ASG_PROMOTION { get; set; }

        public int ASG_SEMESTER { get; set; }

        public string ASG_STATUS { get; set; }
        [MaxLength(20)]
    }
}