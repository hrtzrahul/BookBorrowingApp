using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project.Business.Models;
using Project.Business.Repository;
using System.Data;

namespace Project.web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly IBookRepository _bookRepository;
        public BookController(IBookRepository bookRepository)
        {
            _bookRepository = bookRepository;
        }
        [HttpGet]
        [Route("getBooks")]
        public async Task<IActionResult> GetAllBooks()
        {
            var cars = await _bookRepository.GetAllBook();

            return Ok(cars);
        }
        [HttpPost]
        [Route("addBooks")]
        
        public async Task<IActionResult> AddBooks([FromBody] BookModel book)
        {
            book.Id = 0; // Id is an auto-incremented integer field in the database


            var addedBookId = await _bookRepository.AddBook(book);

            return Ok(new { BookId = addedBookId, Message = "Book added successfully." });
        }
        [HttpGet]
        [Route("getBookById/{id}")]
        public async Task<IActionResult> GetBookById(int id)
        {
            var book = await _bookRepository.GetBookById(id);

            if (book == null)
            {
                return NotFound();
            }

            return Ok(book);
        }

        [HttpGet]
        [Route("getBooksByName/{bookName}")]
        public async Task<IActionResult> GetBooksByName(string bookName)
        {
            var books = await _bookRepository.GetBooksByName(bookName);
            return Ok(books);
        }

        [HttpGet]
        [Route("searchBookByGenre/{genre}")]
        public async Task<IActionResult> SearchBookByGenre(string genre)
        {
            var books = await _bookRepository.SearchBookByGenre(genre);
            return Ok(books);
        }

        [HttpGet]
        [Route("searchBookByAuthor/{author}")]
        public async Task<IActionResult> SearchBookByAuthor(string author)
        {
            var books = await _bookRepository.SearchBookByAuthor(author);
            return Ok(books);
        }


    }

}
