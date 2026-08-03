namespace PlantillaFullstack.Server.DTOs
{
    public class ProfileData
    {
        public string ProfileName { get; set; }
        public string ProfileSurname { get; set; }
        public string ProfileDesc { get; set; }
        public IFormFile? ProfileImg { get; set; }
    }
}
