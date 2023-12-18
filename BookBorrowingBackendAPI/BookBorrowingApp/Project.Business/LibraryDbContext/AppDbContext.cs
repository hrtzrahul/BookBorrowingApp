using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Project.Business.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.Business.LibraryDbContext
{
    public class AppDbContext : IdentityDbContext<ApplicationUser>
    {
        public DbSet<BookModel> Books { get; set; }
        public DbSet<UserModel> Users { get; set; }
        public DbSet<BorrowedBooksInfo> BorrowedBooksInfo { get; set; }
        public DbSet<TokensAvailable> Tokens { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    
    }

   
}
