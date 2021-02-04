using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;

namespace JenifferGuañuna_Final.Controllers
{
    [Produces("application/json")]
    [Route("api/J")]
    public class JirafaController : Controller
    {
        private static List<J> jirafa = new List<J>()
        {
            new J{ Id= 11, Name= "nubecita" },
          
        };

        [HttpGet]
        public IActionResult GetJirafa([FromQuery] string name)
        {
            List<J> jirafa= jirafas;
            if (!string.IsNullOrEmpty(name?.Trim()))
            {
                jirafa= Jirafa.Where(h => h.Name.ToLowerInvariant().Contains(name.ToLowerInvariant()))
                               .ToList();
            }
            return Ok(jirafa.OrderByDescending(h => h.Id));
        }

        [HttpGet]
        [Route("top")]
        public IActionResult GetTopHeroes()
        {
            return Ok(Jirafa.Take(4));
        }

        [HttpGet("{id}", Name = "GetJirafa")]
        public IActionResult GetHero([FromRoute] int id)
        {
            var jirafa = Jirafa.FirstOrDefault(h => h.Id == id);
            if (jirafa == null)
            {
                return NotFound();
            }
            return Ok(jirafa);
        }

        [HttpPost]
        public IActionResult CreateJirafa([FromBody] J newJirafa)
        {
            if (newJirafa == null)
            {
                return BadRequest();
            }
            newJirafa.Id = Jirafa.Max(h => h.Id) + 1;
            Jirafa.Add(newJirafa);
            return CreatedAtRoute("GetJirafa", new { id = newJirafa.Id }, newJirafa);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateJirafa(int id, [FromBody] J input)
        {
            if (input == null || input.Id != id)
            {
                return BadRequest();
            }

            var jirafa = Jirafa.FirstOrDefault(t => t.Id == id);
            if (jirafa == null)
            {
                return NotFound();
            }

            jirafa.Name = input.Name;

            return new NoContentResult();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteHero(int id)
        {
            var jirafa = Jirafa.FirstOrDefault(t => t.Id == id);
            if (jirafa == null)
            {
                return NotFound();
            }

            Jirafa.Remove(jirafa);
            return new NoContentResult();
        }
    }
}