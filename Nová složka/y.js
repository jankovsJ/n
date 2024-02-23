document.addEventListener('DOMContentLoaded', function() {
  const calculateButton = document.getElementById('calculate');
  calculateButton.addEventListener('click', function() {
    const initialAmount = parseFloat(document.getElementById('initialAmount').value);
    const monthlyDeposit = parseFloat(document.getElementById('monthlyDeposit').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value);
    const investmentPeriod = parseFloat(document.getElementById('investmentPeriod').value);
    if (!isNaN(initialAmount) && !isNaN(monthlyDeposit) && !isNaN(interestRate) && !isNaN(investmentPeriod)) {
      const monthlyInterestRate = interestRate / 100 / 12;
      const totalMonths = investmentPeriod * 12;
      let futureValue = initialAmount;
      for (let i = 0; i < totalMonths; i++) {
        futureValue += monthlyDeposit;
        futureValue *= (1 + monthlyInterestRate);
      }
      document.getElementById('futureValue').textContent = `$${futureValue.toFixed(2)}`;
    } else {
      alert('Pls enter valid numbers for all fields.');
    }
  });
});