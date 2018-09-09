using SimpleInjector;
using System.Linq;

namespace Service
{
    public static class InjectorRegistration
    {
        public static void Register(Container container)
        {
            container.Register<IPersonalLoanService, PersonalLoanService>(Lifestyle.Scoped);
        }
    }
}
