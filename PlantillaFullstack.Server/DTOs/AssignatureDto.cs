namespace PlantillaFullstack.Server.DTOs
{
    public class AssignatureDto
    {
        public int AsgId { get; set; }

        public int AsgStdId { get; set; }

        public string AsgTitle { get; set; }

        public double? AsgFirstNote { get; set; }

        public double? AsgSecondNote { get; set; }

        public bool? AsgPromotion { get; set; }

        public int AsgSemester { get; set; }

        public string AsgStatus { get; set; }

        public int? AsgYear { get; set; }
    }
}

