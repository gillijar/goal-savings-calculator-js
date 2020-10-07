// Add JS for nav bar containing input fields with animations

window.addEventListener('DOMContentLoaded', savingsCalculator);

function savingsCalculator(){
    const itemBtn = document.querySelector('#savingDescription');
    
    itemBtn.addEventListener('click', savingDescription);

        let item;
        let amount;
        let start = 0;

        const savingItem = document.querySelector('#saving');
        const savingAmount = document.querySelector('#savingsAmount');

        const itemDisplay = document.querySelector('#savingItem');
        const amountDisplay = document.querySelector('#savingAmount');

        const msg = 'YOU DID IT! GO CHASE YOUR DREAMS!';
    
    // Text inpunt field
    function textAlert(text){
        if(text === ''){
            return true;
        }
    };
    
    // Number input field
    function numberAlert(number){
        if(number === '' || number == 0){
            return true;
        }
    };

    function savingDescription(){
        item = savingItem.value;
        amount = savingAmount.value;
        let total = parseFloat(amount);
        const navTotal = document.querySelector('#navTotal');

        if(textAlert(item) === true){
            alert('Text input must involve a word or letters');
            return false;
        }
        
        if(numberAlert(amount) === true){
            alert('Number input cannot be left empty, and must be greater than zero.');
            return false;
        }

        itemDisplay.innerHTML = `${item}`;
        amountDisplay.innerHTML = `$${total.toFixed(2)}`;
        navTotal.innerHTML = `$${total.toFixed(2)}`;

        savingItem.value = '';
        savingAmount.value = '';
    };

    const depositBtn = document.querySelector('#depositSubmit');
    
    depositBtn.addEventListener('click', depositAmount);

    function depositAmount(){
        const deposit = document.querySelector('#savingsDeposit');
        const depInput = deposit.value;
        const navDeposit = document.querySelector('#navDeposit');
        const navDepositInput = parseFloat(depInput);

        let depTotal = start + navDepositInput;
        start = depTotal;
        navDeposit.innerHTML = `$${depTotal.toFixed(2)}`;

        let total = amount - depInput;
        amount = total;
        amountDisplay.innerHTML = `$${total.toFixed(2)}`;

        deposit.value = '';

        const celebrate = document.querySelector('#celebrate');
        if(amount == 0){
            celebrate.innerHTML = msg;
        };
    };
};
