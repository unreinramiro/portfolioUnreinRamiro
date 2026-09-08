namespace PlantillaFullstack.Server.DTOs
{
    public class StudyAddDto
    {
        public int StdStyId { get; set; }

        public string? StdTitle { get; set; }

        public string? StdDesc { get; set; }

        public string? StdInstitution { get; set; }

        public DateTime? StdStart { get; set; }

        public DateTime? StdEnd { get; set; }

        public int? StdHours { get; set; }

        public string? StdCertification { get; set; }
    }
}

