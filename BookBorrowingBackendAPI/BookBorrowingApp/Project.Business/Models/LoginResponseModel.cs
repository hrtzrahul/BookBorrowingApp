﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.Business.Models
{
    public class LoginResponseModel
    {   
        public string? UserName { get; set; }

    public string? Password { get; set; }

    public string? Token { get; set; }
     }
}
