window.addEventListener('DOMContentLoaded', savingsCalculator);

function savingsCalculator(){

        let item;
        let amount;
        let start = 0;

        const savingItem = document.querySelector('#saving');
        const savingAmount = document.querySelector('#savingsAmount');

        const itemDisplay = document.querySelector('#savingItem');
        const amountDisplay = document.querySelector('#savingAmount');

// NAV BUTTON AND FUNCTION
    const navBtn = document.querySelector('.burger');
    navBtn.addEventListener('click', () => {
        const nav = document.querySelector('nav');
        nav.classList.toggle('active');
        navBtn.classList.toggle('rotate');
    });

// SAVINGS ITEM AND AMOUNT BUTTON AND FUNCTION
    const itemBtn = document.querySelector('#savingDescription');
    itemBtn.addEventListener('click', savingDescription);

    function savingDescription(){
        item = savingItem.value;
        amount = savingAmount.value;
        let total = parseFloat(amount);
        const navTotal = document.querySelector('#navTotal');

        if(item === ''){
            alert('Input field must involve a word or letters');
            return;
        }

        if(amount === '' || amount == 0){
            alert('Number input cannot be empty and must be greater than zero');
            return;
        }

        itemDisplay.innerHTML = `${item}`;
        amountDisplay.innerHTML = `$${total.toFixed(2)}`;
        navTotal.innerHTML = `$${total.toFixed(2)}`;

        savingItem.value = '';
        savingAmount.value = '';
    };

// DEPOSIT BUTTON AND FUNCTION
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

        if(total <= 0){
            total = 0;
        }

        amount = total;
        amountDisplay.innerHTML = `$${total.toFixed(2)}`;

        deposit.value = '';

        const msg = 'YOU DID IT! GO CHASE YOUR DREAMS!';
        const celebrate = document.querySelector('#celebrate');
        if(amount == 0){
            celebrate.innerHTML = msg;
        };
    };
};
