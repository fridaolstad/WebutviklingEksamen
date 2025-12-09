using Microsoft.AspNetCore.Mvc;

namespace SportsWorldAPI.Controllers;


// for å laste opp bilde på side 2
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
                    file.FileName // TODO: bruk GUID for tilfeldig navn - Guid.NewGuid??? om tid? rolando har iike vist oss dette, bare nevt det
                );
                // Oppretter en filstrømblokk som sørger for å åpne og stenge strømmen til riktig tid. -Rolando / lagrer filen til disk via Filestream -F
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
