using AutoMapper;
using WebCropApi.Data.Entities.Identity;
using WebCropApi.Models.Account;

namespace WebCropApi.Mapper
{
    public class AccountMapper : Profile
    {
        public AccountMapper()
        {
            CreateMap<RegisterViewModel, UserEntity>()
                .ForMember(x => x.UserName, opt => opt.MapFrom(x => x.Email));
        }
    }
}
