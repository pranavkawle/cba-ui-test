using System;
using api.Controllers;
using Domain;
using Moq;
using Service;
using System.Collections.Generic;
using System.Linq;
using Xunit;

namespace Api.Tests
{
    public class PersonalLoanControllerTest
    {
        private readonly Mock<IPersonalLoanService> _mockPersonalLoanService = new Mock<IPersonalLoanService>();
        private readonly PersonalLoanController _personalLoanController;

        public PersonalLoanControllerTest()
        {
            _personalLoanController = new PersonalLoanController(_mockPersonalLoanService.Object);
        }

        [Fact]
        public void Get_WithoutParameter_ReturnsListOfLoans()
        {
            // Arrange
            var expectedResult = new List<PersonalLoan>()
            {
                new PersonalLoan { CarryoverAmount = 1000, EarlyRepaymentFee = 300, InterestAmount = 10, IsClosed = false, PrincipalAmount = 1200, IsTopUp = true },
                new PersonalLoan { CarryoverAmount = 2000, EarlyRepaymentFee = 400, InterestAmount = 10, IsClosed = true, PrincipalAmount = 1500, IsTopUp = false },
                new PersonalLoan { CarryoverAmount = 3000, EarlyRepaymentFee = 500, InterestAmount = 10, IsClosed = false, PrincipalAmount = 2000, IsTopUp = false }
            };
            _mockPersonalLoanService.Setup(s => s.GetAll()).Returns(expectedResult);

            // Act
            var actualResult = _personalLoanController.Get().ToList();

            // Assert
            Assert.NotNull(actualResult);
            Assert.Equal(3, actualResult.Count);
            Assert.Equal(1000, actualResult.First().CarryoverAmount);
            Assert.Equal(3000, actualResult.Last().CarryoverAmount);
            Assert.Equal(1500, actualResult.ElementAt(1).PrincipalAmount);
        }

        [Fact]
        public void Get_WithValidIdParameter_ReturnsValidLoanDetail()
        {
            // Arrange
            var expectedResult = new PersonalLoan { Name = "Test", CarryoverAmount = 1000, EarlyRepaymentFee = 300, InterestAmount = 10, IsClosed = false, PrincipalAmount = 1200, IsTopUp = true };
            _mockPersonalLoanService.Setup(s => s.Get(It.IsAny<string>())).Returns(expectedResult);

            // Act
            var actualResult = _personalLoanController.Get("Test");

            // Assert
            Assert.NotNull(actualResult);
            Assert.Equal("Test", actualResult.Name);
            Assert.Equal(1000, actualResult.CarryoverAmount);
            Assert.Equal(300, actualResult.EarlyRepaymentFee);
            Assert.Equal(10, actualResult.InterestAmount);
            Assert.False(actualResult.IsClosed);
            Assert.Equal(1200, actualResult.PrincipalAmount);
        }

        [Fact]
        public void Get_WithInvalidIdParameter_ReturnsNull()
        {
            // Arrange
            var expectedResult = new List<PersonalLoan>()
            {
                new PersonalLoan { Name = "Test1", CarryoverAmount = 1000, EarlyRepaymentFee = 300, InterestAmount = 10, IsClosed = false, PrincipalAmount = 1200 },
                new PersonalLoan { Name = "Test2", CarryoverAmount = 2000, EarlyRepaymentFee = 400, InterestAmount = 10, IsClosed = true, PrincipalAmount = 1500 },
                new PersonalLoan { Name = "Test3", CarryoverAmount = 3000, EarlyRepaymentFee = 500, InterestAmount = 10, IsClosed = false, PrincipalAmount = 2000 }
            };
            _mockPersonalLoanService.Setup(s => s.GetAll()).Returns(expectedResult);

            // Act
            var actualResult = _personalLoanController.Get("Test4");

            // Assert
            Assert.Null(actualResult);
        }

        [Fact]
        public void Post_WithValidParameter_ReturnsSuccessTrue()
        {
            // Arrange
            _mockPersonalLoanService.Setup(p => p.Add(It.IsAny<PersonalLoan>())).Returns(true);

            // Act
            var actualResult = _personalLoanController.Post(new PersonalLoan
            {
                Name = "Test1",
                CarryoverAmount = 4000,
                EarlyRepaymentFee = 1500,
                InterestAmount = 1000,
                IsClosed = false,
                PrincipalAmount = 4000
            });

            // Assert
            Assert.NotNull(actualResult);
            Assert.True(GetPropertyValue<bool>("IsSuccess", actualResult.Value));
        }

        [Fact]
        public void Post_ServiceThrowsException_ReturnsSuccessFalse()
        {
            // Arrange
            _mockPersonalLoanService.Setup(p => p.Add(It.IsAny<PersonalLoan>())).Returns(false);

            // Act
            var actualResult = _personalLoanController.Post(new PersonalLoan
            {
                Name = "Test1",
                CarryoverAmount = 4000,
                EarlyRepaymentFee = 1500,
                InterestAmount = 1000,
                IsClosed = false,
                PrincipalAmount = 4000
            });

            // Assert
            Assert.NotNull(actualResult);
            Assert.False(GetPropertyValue<bool>("IsSuccess", actualResult.Value));
        }

        private T GetPropertyValue<T>(string propertyName, object instance)
        {
            var properties = instance.GetType().GetProperties();
            return (T)properties.First(x => x.Name == propertyName).GetValue(instance);
        }
    }
}
