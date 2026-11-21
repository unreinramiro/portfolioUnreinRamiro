using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders; // 👈 Requerido para PhysicalFileProvider
using Microsoft.IdentityModel.Tokens;
using PlantillaFullstack.Server.Data;
using PlantillaFullstack.Server.Services;
using System.IO; // 👈 Requerido para Path y Directory
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var dataDir = Path.Combine(
    Environment.GetEnvironmentVariable("HOME") ?? builder.Environment.ContentRootPath,
    "data");
Directory.CreateDirectory(dataDir);
var dbPath = Path.Combine(dataDir, "portfolio.db");

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite($"Data Source={dbPath}"));

// Configuración de Autenticación con JWT
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!)),
            ValidateIssuer = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidateAudience = true,
            ValidAudience = builder.Configuration["Jwt:Audience"],
            ValidateLifetime = true,
            ClockSkew = TimeSpan.Zero
        };
    });

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader());
});

builder.Services.AddScoped<IEmailService, EmailService>();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles(); // Habilita wwwroot estándar

// 🟢 CONFIGURACIÓN PARA SERVIR LA CARPETA DE IMÁGENES DENTRO DE /api/images
var imagesPath = Path.Combine(builder.Environment.ContentRootPath, "wwwroot", "images");

// Asegurar que el directorio exista en Azure App Service si está recién creado
if (!Directory.Exists(imagesPath))
{
    Directory.CreateDirectory(imagesPath);
}

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(imagesPath),
    RequestPath = "/api/images"
});

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowAll");

// Importante: Authentication antes de Authorization
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapFallbackToFile("/index.html");

app.Run();