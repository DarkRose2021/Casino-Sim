$(document).ready(function() {
    let balance = 1000; // Initial balance

    $(document).ready(function() {

    // Withdraw Money
    $('#withdrawForm').submit(function(event) {
        event.preventDefault();
        const withdrawAmount = parseInt($('#withdrawAmount').val());

        if (withdrawAmount > 0 && withdrawAmount <= moneyAmountWithdraw) {
            moneyAmountWithdraw -= withdrawAmount;
            updateMoneyDisplay();
        } else {
            alert('Invalid withdrawal amount.');
        }
    });

    // Deposit Money
    $('#depositForm').submit(function(event) {
        event.preventDefault();
        const depositAmount = parseInt($('#depositAmount').val());

        if (depositAmount > 0) {
            moneyAmountDeposit += depositAmount;
            updateMoneyDisplay();
        } else {
            alert('Invalid deposit amount.');
        }
    });
        
        function updateMoneyDisplay() {
            $('#balance-display').text(`Balance: $${balance}`);
            $('#total-balance').text(balance);
            $('#moneyAmountWithdraw').text(balance); 
            $('#moneyAmountDeposit').text(balance);
        }
    });

   
});