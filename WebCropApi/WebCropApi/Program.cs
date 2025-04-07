using Microsoft.EntityFrameworkCore;
using WebCropApi.Data;
using WebCropApi.Abstract;
using WebCropApi.Services;
using WebCrotApi.Data;
using Microsoft.AspNetCore.Identity;
using WebCropApi.Data.Entities.Identity;

var builder = WebApplication.CreateBuilder(args);


// Add services to the container.

builder.Services.AddDbContext<WebCrotDbContext>(opt =>
opt.UseNpgsql(builder.Configuration.GetConnectionString("CrotConnection")));

builder.Services.AddIdentity<UserEntity, RoleEntity>(options =>
{
    options.Password.RequireDigit = false;
    options.Password.RequiredLength = 5;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireUppercase = false;
    options.Password.RequireLowercase = false;
}).AddEntityFrameworkStores<WebCrotDbContext>().AddDefaultTokenProviders();

builder.Services.AddControllers();
builder.Services.AddScoped<IImageService, ImageService>();

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
//    app.MapOpenApi();
//}


app.UseSwagger();
app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Web Crot v1"));

app.UseAuthorization();

app.MapControllers();

await app.SeedAsync();

app.Run();