using WebCropApi.Data.Entities.Identity;

namespace WebCropApi.Abstract;

public interface IJwtTokenService
{
    Task<string> CreateTokenAsync(UserEntity user);
}
