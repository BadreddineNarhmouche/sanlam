using Microsoft.AspNetCore.Mvc;

namespace SA.CheckTrackingPlatform.Services.LateralService.Controllers
{
    public class CheckesController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
