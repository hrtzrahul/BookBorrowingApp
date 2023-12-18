using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Project.Business.LibraryDbContext;
using Project.Business.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.Business.Repository
{
    public class BookRepository : IBookRepository
    {
        private readonly AppDbContext _context;

        private readonly UserManager<ApplicationUser> _userManager;

        public BookRepository(AppDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        public BookRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<int> AddBook(BookModel book)
        {
            await _context.Books.AddAsync(book);
            await _context.SaveChangesAsync();
            return book.Id;
        }
       
        public async Task<IEnumerable<BookModel>> GetAllBook()
        {
            return await _context.Books
               .Where(book => book.IsBookAvailable == true)
               .ToListAsync();
        }

        public async Task<BookModel> GetBookById(int id)
        {
            return await _context.Books.FindAsync(id);
        }

        public async Task<IEnumerable<BookModel>> GetBooksByName(string bookName)
        {
            return await _context.Books
               .Where(book => book.Name == bookName)
               .ToListAsync();
        }
        public async Task<IEnumerable<BookModel>> SearchBookByAuthor(string author)
        {
            return await _context.Books
                .Where(book => book.Author == author)
                .ToListAsync();
        }

        public async Task<BookModel> SearchBookByName(string name)
        {
            return await _context.Books
                .FirstOrDefaultAsync(book => book.Name == name);
        }

        public async Task<IEnumerable<BookModel>> SearchBookByGenre(string genre)
        {
            return await _context.Books
                .Where(book => book.Genre == genre)
                .ToListAsync();
        }


    }
}

