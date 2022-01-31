using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebService.Controllers
{
    [RoutePrefix("API/Home")]
    public class HomeController : Controller
    {
        [HttpGet]
        public ActionResult Index()
        {
            Console.WriteLine( "hello");
            return View();
        }
        //[HttpGet]
        //public ActionResult Index()
        //{
        //    return File("angularProject/index.html", "text/html");
        //}

        //public ActionResult About()
        //{
        //    ViewBag.Message = "Your application description page.";

        //    return View();
        //}

        //public ActionResult Contact()
        //{
        //    ViewBag.Message = "Your contact page.";

        //    return View();
        //}
    }
}