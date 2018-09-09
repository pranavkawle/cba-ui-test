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
                new PersonalLoan { Id = 1, CarryoverAmount = 1000, EarlyRepaymentFee = 300, InterestRate = 10, IsClosed = false, Principle = 1200 },
                new PersonalLoan { Id = 2, CarryoverAmount = 2000, EarlyRepaymentFee = 400, InterestRate = 10, IsClosed = true, Principle = 1500 },
                new PersonalLoan { Id = 3, CarryoverAmount = 3000, EarlyRepaymentFee = 500, InterestRate = 10, IsClosed = false, Principle = 2000 }
            };
            _mockPersonalLoanService.Setup(s => s.GetAll()).Returns(expectedResult);

            // Act
            var actualResult = _personalLoanController.Get();

            // Assert
            Assert.NotNull(actualResult);
            Assert.Equal(3, actualResult.Count());
            Assert.Equal(1, actualResult.First().Id);
            Assert.Equal(3, actualResult.Last().Id);
            Assert.Equal(1500, actualResult.ElementAt(1).Principle);
        }

        [Fact]
        public void Get_WithValidIdParameter_ReturnsValidLoanDetail()
        {
            // Arrange
            var expectedResult = new PersonalLoan { Id = 1, CarryoverAmount = 1000, EarlyRepaymentFee = 300, InterestRate = 10, IsClosed = false, Principle = 1200 };
            _mockPersonalLoanService.Setup(s => s.Get(It.IsAny<int>())).Returns(expectedResult);

            // Act
            var actualResult = _personalLoanController.Get(1);

            // Assert
            Assert.NotNull(actualResult);
            Assert.Equal(1, actualResult.Id);
            Assert.Equal(1000, actualResult.CarryoverAmount);
            Assert.Equal(300, actualResult.EarlyRepaymentFee);
            Assert.Equal(10, actualResult.InterestRate);
            Assert.False(actualResult.IsClosed);
            Assert.Equal(1200, actualResult.Principle);
        }

        [Fact]
        public void Get_WithInvalidIdParameter_ReturnsNull()
        {
            // Arrange
            var expectedResult = new List<PersonalLoan>()
            {
                new PersonalLoan { Id = 1, CarryoverAmount = 1000, EarlyRepaymentFee = 300, InterestRate = 10, IsClosed = false, Principle = 1200 },
                new PersonalLoan { Id = 2, CarryoverAmount = 2000, EarlyRepaymentFee = 400, InterestRate = 10, IsClosed = true, Principle = 1500 },
                new PersonalLoan { Id = 3, CarryoverAmount = 3000, EarlyRepaymentFee = 500, InterestRate = 10, IsClosed = false, Principle = 2000 }
            };
            _mockPersonalLoanService.Setup(s => s.GetAll()).Returns(expectedResult);

            // Act
            var actualResult = _personalLoanController.Get(4);

            // Assert
            Assert.Null(actualResult);
        }
    }
}
