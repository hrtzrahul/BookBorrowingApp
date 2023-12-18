using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.Business.Models
{
    public class BookModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string? Name { get; set; }
        public int Rating { get; set; }
        public string? Author { get; set; }
        public string? Genre { get; set; }
        public bool IsBookAvailable { get; set; }
        public string? Description { get; set; }

       
        public string LentByUserName { get; set; }
        
     
        


    }
}

// Navigation properties
//public ApplicationUser LentByUser { get; set; }
//public ApplicationUser BorrowedByUser { get; set; }