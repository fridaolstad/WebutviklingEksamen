using Microsoft.AspNetCore.Mvc;

namespace SportsWorldAPI.Controllers;

// For å laste opp bilde på side 2
[ApiController]
[Route("api/[controller]")]
public class ImageUploadController(IWebHostEnvironment webHostEnvironment) : ControllerBase
{

[HttpPost]
public async Task<IActionResult> Post(IFormFile file)// Bildet kommer inni IFormFile-objektet
    {
        if(file != null)
        {
            try
            {
                string webRootPath = webHostEnvironment.WebRootPath;
                string absolutePath = Path.Combine(
                    webRootPath,
                    "images",
                    file.FileName 
                );
                // Oppretter en filstrømblokk som sørger for å åpne og stenge strømmen til riktig tid 
                using (var fileStream = new FileStream(absolutePath, FileMode.Create))
                {
                    await file.CopyToAsync(fileStream);
                }

                return Created(); // Returnerer 201 Created = noe er blitt skapt (lagret)  


            }
            catch
            {
                return StatusCode(500);
            }
            
        }
        else
        {
            return BadRequest("Ingen fil lastet opp");
        }
        
    }
    
}
