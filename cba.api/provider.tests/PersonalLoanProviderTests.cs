using System;
using Domain;
using System.Collections.Generic;
using System.Linq;
using Moq;
using Xunit;

namespace Provider.Tests
{
    public class PersonalLoanProviderTests
    {
        private readonly PersonalLoanProvider _personalLoanProvider;
        private readonly Mock<IDataSourceProvider<PersonalLoan>> _mockDataSourceProvider = new Mock<IDataSourceProvider<PersonalLoan>>();

        public PersonalLoanProviderTests()
        {
            _personalLoanProvider = new PersonalLoanProvider(_mockDataSourceProvider.Object);
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
            _mockDataSourceProvider.Setup(s => s.GetAll()).Returns(expectedResult.AsQueryable());

            // Act
            var actualResult = _personalLoanProvider.GetAll().ToList();

            // Assert
            Assert.NotNull(actualResult);
            Assert.Equal(3, actualResult.Count);
            Assert.Equal("Test1", actualResult.First().Name);
            Assert.Equal("Test3", actualResult.Last().Name);
            Assert.Equal(1500, actualResult.ElementAt(1).PrincipalAmount);
        }

        [Fact]
        public void Insert_Execute_ReturnsTrue()
        {
            // Arrange
            var entities = new List<PersonalLoan>()
            {
                new PersonalLoan { Name = "Test1", CarryoverAmount = 1000, EarlyRepaymentFee = 300, InterestAmount = 10, IsClosed = false, PrincipalAmount = 1200 },
                new PersonalLoan { Name = "Test2", CarryoverAmount = 2000, EarlyRepaymentFee = 400, InterestAmount = 10, IsClosed = true, PrincipalAmount = 1500 },
                new PersonalLoan { Name = "Test3", CarryoverAmount = 3000, EarlyRepaymentFee = 500, InterestAmount = 10, IsClosed = false, PrincipalAmount = 2000 }
            };
            var newEntity = new PersonalLoan
            {
                Name = "Test4", CarryoverAmount = 4000, EarlyRepaymentFee = 1500, InterestAmount = 1000,
                IsClosed = false, PrincipalAmount = 4000
            };
            _mockDataSourceProvider.Setup(s => s.GetAll()).Returns(entities.AsQueryable());
            _mockDataSourceProvider.Setup(s => s.SaveAll(entities)).Verifiable();
            var expectedResult = new List<PersonalLoan>(entities) {newEntity};

            // Act
            var actualResult = _personalLoanProvider.Insert(newEntity);

            // Assert
            Assert.True(actualResult);
            _mockDataSourceProvider.Verify(x => x.SaveAll(expectedResult));
        }

        [Fact]
        public void Insert_SaveAllThrowsException_ThrowsException()
        {
            // Arrange
            var newEntity = new PersonalLoan
            {
                Name = "Test4", CarryoverAmount = 4000, EarlyRepaymentFee = 1500, InterestAmount = 1000,
                IsClosed = false, PrincipalAmount = 4000
            };
            _mockDataSourceProvider.Setup(s => s.GetAll()).Returns((new List<PersonalLoan>()).AsQueryable());
            _mockDataSourceProvider.Setup(s => s.SaveAll(It.IsAny<IEnumerable<PersonalLoan>>())).Throws(new Exception());

            // Act & Assert
            Assert.Throws<Exception>(() => _personalLoanProvider.Insert(newEntity));
        }

        [Fact]
        public void SaveAll_Execute_Success()
        {
            // Arrange
            _mockDataSourceProvider.Setup(s => s.SaveAll(It.IsAny<IEnumerable<PersonalLoan>>())).Verifiable();
            var list = new List<PersonalLoan>();

            // Act
            _personalLoanProvider.SaveAll(list);

            // Assert
            _mockDataSourceProvider.Verify(x => x.SaveAll(list));
        }

        [Fact]
        public void SaveAll_SaveAllThrowsException_ThrowsException()
        {
            // Arrange
            _mockDataSourceProvider.Setup(s => s.SaveAll(It.IsAny<IEnumerable<PersonalLoan>>())).Throws(new Exception());

            // Act & Assert
            Assert.Throws<Exception>(() => _personalLoanProvider.SaveAll(null));
        }
    }
}
