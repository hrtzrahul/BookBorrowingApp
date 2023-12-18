using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project.Business.LibraryDbContext;
using Project.Business.Models;
using Project.Business.Repository;

namespace Project.web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IAccountRepository _accountRepository;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly AppDbContext _context;

        public AccountController(AppDbContext context,IAccountRepository accountRepository, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _accountRepository = accountRepository;
            _userManager = userManager;
        }

        [HttpPost]
        [Route("signup")]
        public async Task<IActionResult> SignUp([FromBody] UserModel user)
        {
            var result = await _accountRepository.CreateUserAsync(user);

            if (!result.Succeeded)
            {
                var errors = result.Errors.Select(e => e.Description).ToList();
                return BadRequest(errors);
            }

            return Ok(user);
        }

        [HttpPost]
        [Route("signin")]
        public async Task<IActionResult> Login(LoginModel user)
        {
            var token = await _accountRepository.PasswordSignInAsync(user);

            if (string.IsNullOrEmpty(token))
            {
                return Unauthorized("Invalid credentials");
            }

            var result = new LoginResponseModel
            {
                UserName = user.Username,
                Password = user.Password,
                Token = token
            };

            return Ok(result);
        }

        [HttpGet]
        [Route("signout")]
        public async Task<IActionResult> Logout()
        {
            await _accountRepository.SignOutAsync();
            return Ok(new { Message = "User logged out successfully" });
        }

        [HttpGet]
        [Route("getuser/{username}")]
        public IActionResult GetUserByUsername(string username)
        {
            var user = _userManager.FindByNameAsync(username).Result;

            if (user == null)
            {
                return NotFound("User not found");
            }


            // Transform user to UserModel or use it directly based on your needs
            var userModel = new UserModel
            {
                Name = user.Name,
                Username = user.UserName,
                // Map other properties as needed
            };

            return Ok(userModel);
        }

        // New logic for getting all users without relying on the repository method
        [HttpGet]
        [Route("getallusers")]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _userManager.Users.ToListAsync();

            if (users == null || !users.Any())
            {
                return NotFound("No users found");
            }

            // Transform users to a list of UserModel or use them directly based on your needs
            var userModels = users.Select(user => new UserModel
            {
                Name = user.Name,
                Username = user.UserName,
                // Map other properties as needed
            });

            return Ok(userModels);
        }
        [HttpPost]
        [Route("borrowbook/{userName}/{bookId}")]
        public async Task<IActionResult> BorrowBook(string userName, int bookId)
        {
            var result = await _accountRepository.BorrowBook(userName, bookId);

            if (!result)
            {
                return BadRequest("Failed to borrow the book");
            }

            return Ok(new { Message = "Book borrowed successfully" });
        }

        [HttpGet]
        [Route("getallbooksborrowedbyuser/{userName}")]
        public async Task<IActionResult> GetAllBooksBorrowedByUser(string userName)
        {
            var books = await _accountRepository.GetAllBooksBorrowedByUser(userName);
            return Ok(books);
        }

        [HttpGet]
        [Route("getallbooksaddedbyuser/{userName}")]
        public async Task<IActionResult> GetAllBooksAddedByUser(string userName)
        {
            var books = await _accountRepository.GetAllBooksAddedByUser(userName);
            return Ok(books);
        }
        [HttpGet]
        [Route("getTotalTokens/{username}")]
        public IActionResult GetTotalTokensAvailable(string username)
        {
            var tokensAvailable = _context.Set<TokensAvailable>()
                .FirstOrDefault(t => t.Username == username);

            if (tokensAvailable == null)
            {
                return NotFound("TokensAvailable not found for the user");
            }

            return Ok(new { TotalTokensAvailable = tokensAvailable.TotalTokensAvailable });
        }
    }

    
}
