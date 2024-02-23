document.addEventListener('DOMContentLoaded', function() {
    const transactions = [];
    const addTransactionButton = document.getElementById('addTransaction');
    const descriptionInput = document.getElementById('description');
    const amountInput = document.getElementById('amount');
    const categoryInput = document.getElementById('category');
    const transactionsList = document.getElementById('transactions');
    const balanceElement = document.getElementById('balance');
    const filterCategoryInput = document.getElementById('filterCategory');
    const filterPriceInput = document.getElementById('filterPrice');
    const priceWithoutTaxInput = document.getElementById('priceWithoutTax');
    const taxRateInput = document.getElementById('taxRate');
    const calculateTaxButton = document.getElementById('calculateTax');
    const totalPriceWithTaxElement = document.getElementById('totalPriceWithTax');
    const taxAmountElement = document.getElementById('taxAmount');
  
    addTransactionButton.addEventListener('click', function() {
      const description = descriptionInput.value;
      const amount = parseFloat(amountInput.value);
      const category = categoryInput.value;
  
      if (description.trim() !== '' && !isNaN(amount)) {
        const transaction = { description, amount, category };
        transactions.push(transaction);
        renderTransactions();
        updateBalance();
        descriptionInput.value = '';
        amountInput.value = '';
      } else {
        alert('Pls enter valid description and amount.');
      }
    });
  
    function renderTransactions() {
      const filteredCategory = filterCategoryInput.value;
      const filteredPrice = parseFloat(filterPriceInput.value);
  
      transactionsList.innerHTML = '';
      transactions.forEach(transaction => {
        if ((filteredCategory === 'all' || transaction.category === filteredCategory) &&
            (isNaN(filteredPrice) || transaction.amount <= filteredPrice)) {
          const li = document.createElement('li');
          li.textContent = `${transaction.description}: $${transaction.amount} (${transaction.category})`;
          transactionsList.appendChild(li);
        }
      });
    }
  
    function updateBalance() {
      const total = transactions.reduce((acc, transaction) => {
        return transaction.category === 'income' ? acc + transaction.amount : acc - transaction.amount;
      }, 0);
      balanceElement.textContent = `Balance: $${total.toFixed(2)}`;
    }
  
    filterCategoryInput.addEventListener('change', renderTransactions);
    filterPriceInput.addEventListener('input', renderTransactions);
  
    calculateTaxButton.addEventListener('click', function() {
      const priceWithoutTax = parseFloat(priceWithoutTaxInput.value);
      const taxRate = parseFloat(taxRateInput.value);
      
      if (!isNaN(priceWithoutTax) && !isNaN(taxRate)) {
        const taxAmount = priceWithoutTax * taxRate;
        const totalPriceWithTax = priceWithoutTax + taxAmount;
        taxAmountElement.textContent = `$${taxAmount.toFixed(2)}`;
        totalPriceWithTaxElement.textContent = `$${totalPriceWithTax.toFixed(2)}`;
      } else {
        alert('Pls enter valid price without tax and tax rate.');
      }
    });
  });
  