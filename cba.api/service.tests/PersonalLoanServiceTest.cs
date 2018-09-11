using System;
using Domain;
using Moq;
using Provider;
using System.Collections.Generic;
using System.Linq;
using Xunit;

namespace Service.Tests
{
    public class PersonalLoanServiceTest
    {
        private readonly Mock<ILogProvider> _mockLogProvider = new Mock<ILogProvider>();
        private readonly Mock<IPersonalLoanProvider> _mockPersonalLoanProvider = new Mock<IPersonalLoanProvider>();
        private readonly PersonalLoanService _personalLoanService;

        public PersonalLoanServiceTest()
        {
            _personalLoanService = new PersonalLoanService(_mockLogProvider.Object, _mockPersonalLoanProvider.Object);
            _mockLogProvider.Setup(p => p.Format(It.IsAny<Exception>())).Returns("Test");
            _mockLogProvider.Setup(p => p.Append(It.IsAny<string>())).Verifiable();
        }

        [Fact]
        public void GetAll_Execute_ReturnsListOfLoans()
        {
            // Arrange
            var expectedResult = new List<PersonalLoan>()
            {
                new PersonalLoan { Name = "Test1", CarryoverAmount = 1000, EarlyRepaymentFee = 300, InterestAmount = 10, IsClosed = false, PrincipalAmount = 1200 },
                new PersonalLoan { Name = "Test2", CarryoverAmount = 2000, EarlyRepaymentFee = 400, InterestAmount = 10, IsClosed = true, PrincipalAmount = 1500 },
                new PersonalLoan { Name = "Test3", CarryoverAmount = 3000, EarlyRepaymentFee = 500, InterestAmount = 10, IsClosed = false, PrincipalAmount = 2000 }
            };
            _mockPersonalLoanProvider.Setup(s => s.GetAll()).Returns(expectedResult.AsQueryable());

            // Act
            var actualResult = _personalLoanService.GetAll().ToList();

            // Assert
            Assert.NotNull(actualResult);
            Assert.Equal(3, actualResult.Count);
            Assert.Equal("Test1", actualResult.First().Name);
            Assert.Equal("Test3", actualResult.Last().Name);
            Assert.Equal(1500, actualResult.ElementAt(1).PrincipalAmount);
        }

        [Fact]
        public void Get_WithValidNameParameter_ReturnsValidLoanDetail()
        {
            // Arrange
            var expectedResult = new List<PersonalLoan>()
            {
                new PersonalLoan { Name = "Test1", CarryoverAmount = 1000, EarlyRepaymentFee = 300, InterestAmount = 10, IsClosed = false, PrincipalAmount = 1200 },
                new PersonalLoan { Name = "Test2", CarryoverAmount = 2000, EarlyRepaymentFee = 400, InterestAmount = 10, IsClosed = true, PrincipalAmount = 1500 },
                new PersonalLoan { Name = "Test3", CarryoverAmount = 3000, EarlyRepaymentFee = 500, InterestAmount = 10, IsClosed = false, PrincipalAmount = 2000 }
            };
            _mockPersonalLoanProvider.Setup(s => s.GetAll()).Returns(expectedResult.AsQueryable());

            // Act
            var actualResult = _personalLoanService.Get("Test1");

            // Assert
            Assert.NotNull(actualResult);
            Assert.Equal("Test1", actualResult.Name);
            Assert.Equal(1000, actualResult.CarryoverAmount);
            Assert.Equal(300, actualResult.EarlyRepaymentFee);
            Assert.Equal(10, actualResult.InterestAmount);
            Assert.False(actualResult.IsClosed);
            Assert.Equal(1200, actualResult.PrincipalAmount);
        }

        [Fact]
        public void Get_WithInvalidNameParameter_ReturnsNull()
        {
            // Arrange
            var expectedResult = new List<PersonalLoan>()
            {
                new PersonalLoan { Name = "Test1", CarryoverAmount = 1000, EarlyRepaymentFee = 300, InterestAmount = 10, IsClosed = false, PrincipalAmount = 1200 },
                new PersonalLoan { Name = "Test2", CarryoverAmount = 2000, EarlyRepaymentFee = 400, InterestAmount = 10, IsClosed = true, PrincipalAmount = 1500 },
                new PersonalLoan { Name = "Test3", CarryoverAmount = 3000, EarlyRepaymentFee = 500, InterestAmount = 10, IsClosed = false, PrincipalAmount = 2000 }
            };
            _mockPersonalLoanProvider.Setup(s => s.GetAll()).Returns(expectedResult.AsQueryable());

            // Act
            var actualResult = _personalLoanService.Get("Test4");

            // Assert
            Assert.Null(actualResult);
        }

        [Fact]
        public void Add_WithValidParameter_ReturnsTrue()
        {
            // Arrange
            _mockPersonalLoanProvider.Setup(p => p.Insert(It.IsAny<PersonalLoan>())).Returns(true);

            // Act
            var actualResult = _personalLoanService.Add(new PersonalLoan
            {
                Name = "Test1",
                CarryoverAmount = 4000,
                EarlyRepaymentFee = 1500,
                InterestAmount = 1000,
                IsClosed = false,
                PrincipalAmount = 4000
            });

            // Assert
            Assert.True(actualResult);
        }

        [Fact]
        public void Add_ProviderThrowsException_ReturnsFalse()
        {
            // Arrange
            _mockPersonalLoanProvider.Setup(p => p.Insert(It.IsAny<PersonalLoan>())).Throws(new Exception());

            // Act
            var actualResult = _personalLoanService.Add(new PersonalLoan
            {
                Name = "Test1",
                CarryoverAmount = 4000,
                EarlyRepaymentFee = 1500,
                InterestAmount = 1000,
                IsClosed = false,
                PrincipalAmount = 4000
            });

            // Assert
            Assert.False(actualResult);
            _mockLogProvider.VerifyAll();
        }
    }
}
