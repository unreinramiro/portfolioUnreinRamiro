using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PlantillaFullstack.Server.Models
{
    [Table("TECHNOLOGIES")]
    public class Technology
    {
        [Key]
        [Required]
        public int TEC_ID { get; set; }

        [ForeignKey("TEC_TCY_ID")]
        public int TEC_TCY_ID { get; set; }

        [MaxLength(30)]
        public string TEC_NAME { get; set; }
    }
}