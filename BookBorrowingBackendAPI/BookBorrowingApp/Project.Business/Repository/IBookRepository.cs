using Project.Business.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.Business.Repository
{
    public interface IBookRepository
    {
        Task<int> AddBook(BookModel book);
     
        Task<IEnumerable<BookModel>> GetAllBook();
        Task<BookModel> GetBookById(int id);
       // Task UpdateBook(BookModel book);
        Task<IEnumerable<BookModel>> GetBooksByName(string bookName);
        Task<IEnumerable<BookModel>> SearchBookByAuthor(string author);
        Task<BookModel> SearchBookByName(string name);
        Task<IEnumerable<BookModel>> SearchBookByGenre(string genre);
    }

}
