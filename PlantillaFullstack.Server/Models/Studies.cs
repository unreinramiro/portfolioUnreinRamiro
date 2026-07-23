using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PlantillaFullstack.Server.Models
{
    [Table("STUDIES")]
    public class Studies
    {
        [Key]
        public int STD_ID { get; set; }
        [Required]

        public int STD_STY_ID { get; set; }
        [ForeignKey("STD_STY_ID")]

        public string STD_TITLE { get; set; }
        [MaxLength(100)]
        [Required]

        public string STD_DESCRIPTION { get; set; }
        [MaxLength(500)]

        public string STD_INSTITUTION { get; set; }
        [MaxLength(50)]

        public DateTime STD_START_DATE { get; set; }

        public DateTime STD_END_DATE { get; set; }

        public int STD_HOURS { get; set; }

        public string STD_CERTIFICATION_URL { get; set; }
        [MaxLength(100)]
    }
}