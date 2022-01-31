using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
   public class fullNameToSuggest
    {
        public string groom { get; set; }
        public string bird { get; set; }
        public fullNameToSuggest(string groom,string bird)
        {
            this.groom = groom;
            this.bird = bird;
        }
    }
}
