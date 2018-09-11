using SimpleInjector;

namespace Provider
{
    public static class InjectorRegistration
    {
        public static void Register(Container container)
        {
            container.Register(typeof(IDataSourceProvider<>), typeof(DataSourceProvider<>), Lifestyle.Singleton);
            container.Register<ILogProvider, LogProvider>(Lifestyle.Scoped);
            container.Register<IPersonalLoanProvider, PersonalLoanProvider>(Lifestyle.Scoped);
        }
    }
}
