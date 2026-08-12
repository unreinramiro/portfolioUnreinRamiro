namespace PlantillaFullstack.Server.DTOs
{
    public class ProjectUpdateDto
    {
        public string ProTitle { get; set; }

        public string ProDescription { get; set; }

        public string ProGithubUrl { get; set; }

        public string ProProductionUrl { get; set; }

        public List<int> Technologies { get; set; }

        public IFormFile? ProImg1 { get; set; }

        public IFormFile? ProImg2 { get; set; }

        public IFormFile? ProImg3 { get; set; }

        public IFormFile? ProImg4 { get; set; }

    }
}