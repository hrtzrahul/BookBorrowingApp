using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.Business.Models
{

    public class UserModel
    {

        public string? Name { get; set; }
        [Key]
        public string? Username { get; set; }
        public string? Password { get; set; }
     
      
    }
}