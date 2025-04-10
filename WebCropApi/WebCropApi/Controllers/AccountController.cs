﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WebCropApi.Abstract;
using WebCropApi.Data.Entities.Identity;
using WebCropApi.Models.Account;

namespace WebCropApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController(UserManager<UserEntity> userManager,
    IJwtTokenService jwtTokenService) : ControllerBase
    {
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginViewModel model)
        {
            try
            {
                var user = await userManager.FindByEmailAsync(model.Email);
                if (user == null) return BadRequest(new { error = "Дані вказано не вірно!" });

                if (!await userManager.CheckPasswordAsync(user, model.Password))
                    return BadRequest(new { error = "Не вірно вказано дані!" });
                var token = await jwtTokenService.CreateTokenAsync(user);
                return Ok(new { token });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }
    }
}
