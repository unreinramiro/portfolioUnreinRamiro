using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using PlantillaFullstack.Server.DTOs;

namespace PlantillaFullstack.Server.Services
{
    public interface IEmailService
    {
        Task SendContactEmailAsync(ContactDto dto);
    }

    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;

        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task SendContactEmailAsync(ContactDto dto)
        {
            var smtpSection = _configuration.GetSection("SmtpSettings");

            var email = new MimeMessage();

            // Remitente configurado en appsettings (ej. tu correo de Gmail/Outlook)
            email.From.Add(new MailboxAddress(smtpSection["SenderName"], smtpSection["SenderEmail"]));

            // Destinatario: Tu casilla personal donde recibirás los avisos de tu portfolio
            email.To.Add(new MailboxAddress("Ramiro Unrein", smtpSection["SenderEmail"]));

            // Permite responder directamente al email ingresado por el reclutador
            email.ReplyTo.Add(new MailboxAddress(dto.Email, dto.Email));

            // Asunto enviado desde el formulario de React
            email.Subject = $"[Portfolio] {dto.Subject}";

            // Cuerpo del correo con el contenido formateado
            var bodyBuilder = new BodyBuilder
            {
                HtmlBody = $@"
                    <h3>Nuevo mensaje de contacto desde tu Portfolio</h3>
                    <p><strong>De:</strong> {dto.Email}</p>
                    <p><strong>Asunto:</strong> {dto.Subject}</p>
                    <hr />
                    <p><strong>Mensaje:</strong></p>
                    <p style='white-space: pre-wrap;'>{dto.Message}</p>"
            };

            email.Body = bodyBuilder.ToMessageBody();

            using var smtp = new SmtpClient();

            // Conexión segura al servidor SMTP
            await smtp.ConnectAsync(
                smtpSection["Server"],
                int.Parse(smtpSection["Port"]!),
                SecureSocketOptions.StartTls
            );

            await smtp.AuthenticateAsync(smtpSection["Username"], smtpSection["Password"]);
            await smtp.SendAsync(email);
            await smtp.DisconnectAsync(true);
        }
    }
}