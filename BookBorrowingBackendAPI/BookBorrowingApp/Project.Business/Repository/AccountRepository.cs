using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Project.Business.LibraryDbContext;
using Project.Business.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Project.Business.Repository
{
    public class AccountRepository : IAccountRepository
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IConfiguration _configuration;
        private readonly AppDbContext _context;
       // private readonly BookRepository _bookRepository;


        public AccountRepository(UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            IConfiguration configuration,
             AppDbContext context
            )

        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
            _context = context;
            
        }
        public async Task<IdentityResult> CreateUserAsync(UserModel userModel)
        {
            var user = new ApplicationUser()
            {
                Name = userModel.Name,
                UserName = userModel.Username,
               // TokensAvailable = userModel.TokensAvailable, // Set initial TokensAvailable value
                                                             // PasswordHash = userModel.Password,
            };

            var answer = await _userManager.CreateAsync(user, userModel.Password);

            // Check if the user was created successfully
            if (answer.Succeeded)
            {
                // Set TokensAvailable to 5 for new users
                var tokensAvailable = new TokensAvailable
                {
                    Username = userModel.Username,
                    TotalTokensAvailable = 5
                };

                _context.Set<TokensAvailable>().Add(tokensAvailable);

                // Update the user with the new property value
                await _userManager.UpdateAsync(user);
            }

            return answer;
        }


        public async Task<string> PasswordSignInAsync(LoginModel signInModel)
        {
            var answer = await _signInManager.PasswordSignInAsync(signInModel.Username, signInModel.Password,false,false);
            if (!answer.Succeeded)
            {
                return null;
            }

            var authClaims = new List<Claim>
    {
        new Claim(ClaimTypes.Name , signInModel.Username),
        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
    };

            var authSigninKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Secret"]));

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:ValidIssuer"],
                audience: _configuration["Jwt:ValidAudience"],
                expires: DateTime.UtcNow.AddMinutes(60),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigninKey, SecurityAlgorithms.HmacSha256)
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }


        public async Task SignOutAsync()
        {
            await _signInManager.SignOutAsync();
        }
     

        


        public async Task<bool> BorrowBook(string userName, int bookId)
        {
            var user = await _userManager.FindByNameAsync(userName);
            var book = await _context.Books.FindAsync(bookId);
            var lentUser = await _userManager.FindByNameAsync(book.LentByUserName);
            if (user == null || user==lentUser)
            {
                return false; // User not found or not enough tokens
            }
            var userTokens = await _context.Set<TokensAvailable>()
        .FirstOrDefaultAsync(t => t.Username == user.UserName);

            if (userTokens == null || userTokens.TotalTokensAvailable < 1)
            {
                return false; // Not enough tokens
            }

            
            if (book == null || !book.IsBookAvailable)
            {
                return false; // Book not found or not available
            }

            // Decrement tokenAvailable for the user borrowing the book
            userTokens.TotalTokensAvailable--;
            _context.Set<TokensAvailable>().Update(userTokens);

            // Increment tokenAvailable for the user who lent the book
           
            if (lentUser != null)
            {
                var lentUserTokens = await _context.Set<TokensAvailable>()
            .FirstOrDefaultAsync(t => t.Username == lentUser.UserName);

                if (lentUserTokens != null)
                {
                    lentUserTokens.TotalTokensAvailable++;
                    _context.Set<TokensAvailable>().Update(lentUserTokens);
                }
            }

            // Update the book properties
            book.IsBookAvailable = false;

            // book.CurrentlyBorrowedByUserName = userName;
         

            var borrowedBookInfo = new BorrowedBooksInfo
            {
                BookId = book.Id,
                CurrentlyBorrowedByUserName = userName,
            };

            _context.BorrowedBooksInfo.Add(borrowedBookInfo);


            // Update user and book entities
            await _userManager.UpdateAsync(user);
            await _context.SaveChangesAsync(); // Save changes to the database

            return true; // Successfully borrowed the book
        }


        public async Task<IEnumerable<BookModel>> GetAllBooksBorrowedByUser(string userName)
        {
            var user = await _userManager.FindByNameAsync(userName);
            if (user == null)
            {
                return Enumerable.Empty<BookModel>(); // User not found
            }

            /* var borrowedBooks = await _context.Books
                 .Where(b => b.CurrentlyBorrowedByUserName == userName)
                 .ToListAsync();

             return borrowedBooks;*/
            var borrowedBookIds = await _context.BorrowedBooksInfo
         .Where(b => b.CurrentlyBorrowedByUserName == userName)
         .Select(b => b.BookId)
         .ToListAsync();

            var borrowedBooks = await _context.Books
                .Where(b => borrowedBookIds.Contains(b.Id))
                .ToListAsync();

            return borrowedBooks;
        }


        public async Task<IEnumerable<BookModel>> GetAllBooksAddedByUser(string userName)
        {
            var user = await _userManager.FindByNameAsync(userName);
            if (user == null)
            {
                return Enumerable.Empty<BookModel>(); // User not found
            }

            var lentBooks = await _context.Books
                .Where(b => b.LentByUserName == userName)
                .ToListAsync();

            return lentBooks;
        }

    }
}

