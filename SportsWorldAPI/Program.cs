using Microsoft.EntityFrameworkCore;
using SportsWorldAPI.Context;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddDbContext<SportsWorldContext>(
    options => options.UseSqlite("Data Source = Databases/SportsWorld.db")
);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

DefaultFilesOptions options = new DefaultFilesOptions();
options.DefaultFileNames.Add("index.html");
app.UseDefaultFiles(options);

app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
