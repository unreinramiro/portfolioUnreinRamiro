using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PlantillaFullstack.Server.Models
{
    [Table("TECHNOLOGIES")]
    public class Technology
    {
        [Key]
        public int TEC_ID { get; set; }
        [Required]

        public int TEC_TCY_ID { get; set; }
        [ForeignKey("TEC_TCY_ID")]

        public string TEC_NAME { get; set; }
        [MaxLength(30)]
    }
}