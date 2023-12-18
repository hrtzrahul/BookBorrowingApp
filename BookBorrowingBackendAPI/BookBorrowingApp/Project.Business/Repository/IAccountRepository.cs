using Microsoft.AspNetCore.Identity;
using Project.Business.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.Business.Repository
{
    public interface IAccountRepository
    {
        Task<IdentityResult> CreateUserAsync(UserModel userModel);
        Task<string> PasswordSignInAsync(LoginModel signInModel);
        Task SignOutAsync();
     

      //  Task UpdateUser(UserModel user);
        Task<bool> BorrowBook(string userName, int bookId);
        Task<IEnumerable<BookModel>> GetAllBooksBorrowedByUser(string userName);
        Task<IEnumerable<BookModel>> GetAllBooksAddedByUser(string userName);
    }
}
//  UserModel GetUserByUsername(string username);
//  Task<IEnumerable<UserModel>> GetAllUsers();