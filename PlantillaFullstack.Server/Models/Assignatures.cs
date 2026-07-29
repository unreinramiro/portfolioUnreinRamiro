using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PlantillaFullstack.Server.Models
{
    [Table("ASSIGNATURES")]
    public class Assignature
    {
        [Key]
        [Required]
        public int ASG_ID { get; set; }

        [ForeignKey("ASG_STD_ID")]
        public int ASG_STD_ID { get; set; }

        [MaxLength(30)]
        public string ASG_TITLE { get; set; }

        public double? ASG_FIRST_NOTE { get; set; }

        public double? ASG_SECOND_NOTE { get; set; }

        public bool? ASG_PROMOTION { get; set; }

        public int ASG_SEMESTER { get; set; }

        [MaxLength(20)]
        public string ASG_STATUS { get; set; }

        public int? ASG_YEAR { get; set; }
    }
}