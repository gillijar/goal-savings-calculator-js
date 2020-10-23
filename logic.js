window.addEventListener('DOMContentLoaded', savingsCalculator);

function savingsCalculator(){

        let amount;
        let start;

        // REG EX TO ADD COMMAS TO NUMBERS IN THE THOUSANDS
        function thousandsSeparator(num){
            const numParts = num.toString().split(".");
            numParts[0] = numParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return numParts.join(".");
        }

        // SCREEN DISPLAY
        const itemDisplay = document.querySelector('#savingItem');
        const amountDisplay = document.querySelector('#savingAmount');
        const navTotal = document.querySelector('#navTotal');
        const navDeposit = document.querySelector('#navDeposit');

        // LOCAL STORAGE
        if(localStorage.length > 0){
            const storageItem = localStorage.getItem('Saving Item');
            const storageAmount = localStorage.getItem('Saving Amount');
            let storageCurrent = localStorage.getItem('Current Amount');
            let navStorage = localStorage.getItem('Nav Amount');

            itemDisplay.innerHTML = `${storageItem}`;
            amountDisplay.innerHTML = thousandsSeparator(`$${storageCurrent}`);
            navDeposit.innerHTML = thousandsSeparator(`$${navStorage}`);
            navTotal.innerHTML = thousandsSeparator(`$${storageAmount}`);
            start = parseFloat(navStorage);
            amount = parseFloat(storageCurrent);
        } 
        
        else {
            start = 0;
        }

// NAV BUTTON AND FUNCTION
    const navBtn = document.querySelector('.burger');
    navBtn.addEventListener('click', () => {
        const nav = document.querySelector('nav');
        nav.classList.toggle('active');
        navBtn.classList.toggle('rotate');
    });

// CLEAR LOCAL STORAGE
    const clearStorageBtn = document.querySelector('#clearStorage');
    clearStorageBtn.addEventListener('click', () => {
        if(localStorage.length > 0){
            alert('Clicking OK will delete all current data and create a new file');
            localStorage.clear();
            location.reload();
        }
    });

// SAVINGS ITEM AND AMOUNT BUTTON AND FUNCTION
    const itemBtn = document.querySelector('#savingDescription');
    itemBtn.addEventListener('click', savingDescription);

    function savingDescription(){
        const savingItem = document.querySelector('#saving');
        const savingAmount = document.querySelector('#savingsAmount');

        amount = savingAmount.value;
        const item = savingItem.value;
        const total = parseFloat(amount);

        // PREVENT NEW GOAL IF THERE IS LOCAL STORAGE ALREADY PRESENT
        if(localStorage.length > 0){
            alert('You must clear current goal and amount before entering new one');
            return;
        }

        // PREVENT SUBMIT IF INPUT ITEM OR AMOUNT IS EMPTY
        if(item === ''){
            alert('Input field must involve a word or letters');
            return;
        }

        if(amount === '' || amount <= 0){
            alert('Number input cannot be empty and must be greater than zero');
            return;
        }

        // DISPLAY FOR GOAL ITEM AND AMOUNT
        itemDisplay.innerHTML = `${item}`;
        amountDisplay.innerHTML = thousandsSeparator(`$${total.toFixed(2)}`);
        navTotal.innerHTML = thousandsSeparator(`$${total.toFixed(2)}`);

        savingItem.value = '';
        savingAmount.value = '';

         // LOCAL STORAGE
         localStorage.setItem('Saving Item', item);
         localStorage.setItem('Current Amount', total.toFixed(2));
         localStorage.setItem('Saving Amount', total.toFixed(2)); 
         localStorage.setItem('Nav Amount', 0);
    };

// DEPOSIT BUTTON AND FUNCTION
    const depositBtn = document.querySelector('#depositSubmit');
    depositBtn.addEventListener('click', depositAmount);

    function depositAmount(){
        const deposit = document.querySelector('#savingsDeposit');
        const depInput = deposit.value;
        const navDeposit = document.querySelector('#navDeposit');
        const navDepositInput = parseFloat(depInput);

        // PREVENT DEPOSIT SUBMIT IF THERE IS NO GOAL OR AMOUNT
        if(itemDisplay.innerHTML === '' || amountDisplay.innerHTML === ''){
            alert('You must enter a goal item and amount first');
            return;
        }

        if(depInput === '' || depInput <= 0){
            alert('Number input cannot be empty and must be greater than zero');
            return;
        }

        let depTotal = start + navDepositInput;
        start = depTotal;
        navDeposit.innerHTML = thousandsSeparator(`$${depTotal.toFixed(2)}`);

        let total = amount - depInput;

        if(total <= 0){
            total = 0;
        }

        amount = total;
        amountDisplay.innerHTML = thousandsSeparator(`$${total.toFixed(2)}`);

        deposit.value = '';

        // LOCAL STORAGE
        localStorage.setItem('Current Amount', total.toFixed(2));
        localStorage.setItem('Nav Amount', depTotal.toFixed(2));
        navStorage = parseFloat(localStorage.getItem('Nav Amount'));

        // CELEBRATION DISPLAY MESSAGE UPON COMPLETING GOAL
        const msg = 'YOU DID IT! GO CHASE YOUR DREAMS!';
        const celebrate = document.querySelector('#celebrate');
        if(amount == 0){
            celebrate.classList.add('complete');
            celebrate.innerHTML = msg;
        };
    };
};
