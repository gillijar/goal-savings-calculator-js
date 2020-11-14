window.addEventListener('DOMContentLoaded', savingsCalculator);

function savingsCalculator(){

    let amount;
    let start;

    // BUTTONS FOR APP FUNCTIONS
    const navBtn = document.querySelector('.burger');
    const clearStorageBtn = document.querySelector('#clearStorage');
    const openSettings = document.querySelectorAll('.settingsJS');
    const backgroundImages = document.querySelectorAll('.background-img');
    const fontSizeBtn = document.querySelectorAll('.size');
    const darkModeBtn = document.querySelector('.dark-mode-btn');
    const itemBtn = document.querySelector('#savingDescription').addEventListener('click', savingDescription);
    const depositBtn = document.querySelector('#depositSubmit').addEventListener('click', depositAmount);
    const closeModalBtn = document.querySelector('.close-modal-btn');

    // SCREEN DISPLAY
    const itemDisplay = document.querySelector('.savingItem');
    const amountDisplay = document.querySelector('.savingAmount');
    const navTotal = document.querySelector('#navTotal');
    const navDeposit = document.querySelector('#navDeposit');

    // LOCAL STORAGE
    let storageItem = localStorage.getItem('Saving Item');
    let storageAmount = localStorage.getItem('Saving Amount');
    let storageCurrent = localStorage.getItem('Current Amount');
    let navStorage = localStorage.getItem('Nav Amount');

    if(storageItem && storageAmount){
        itemDisplay.innerHTML = storageItem;
        amountDisplay.innerHTML = thousandsSeparator(`$${storageCurrent}`);
        navDeposit.innerHTML = thousandsSeparator(`$${navStorage}`);
        navTotal.innerHTML = thousandsSeparator(`$${storageAmount}`);
        start = parseFloat(navStorage);
        amount = parseFloat(storageCurrent);
    } 
    
    else {
        start = 0;
    }

    // REG EX TO ADD COMMAS TO NUMBERS IN THE THOUSANDS
    function thousandsSeparator(num){
        const numParts = num.toString().split(".");
        numParts[0] = numParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return numParts.join(".");
    }
    
// NAV FUNCTION
    const nav = document.querySelector('nav');

    navBtn.addEventListener('click', () => {
        nav.classList.toggle('open');
        navBtn.classList.toggle('rotate');
        settingsContainer.classList.remove('open');
    });

// CLEAR LOCAL STORAGE
    clearStorageBtn.addEventListener('click', () => {
        if(storageItem && storageAmount){
            if(confirm('Clicking OK will delete all current data and create a new file')) {
                localStorage.removeItem('Saving Item');
                localStorage.removeItem('Saving Amount');
                localStorage.removeItem('Current Amount');
                localStorage.removeItem('Nav Amount');
                location.reload();
            };
        };
    });

// SETTINGS
    const settingsContainer = document.querySelector('.settings-container');

    openSettings.forEach((button) => {
        button.addEventListener('click', () => {
            settingsContainer.classList.toggle('open');
        });
    });

    // CHANGE BACKGROUND
    const body = document.querySelector('body');

    backgroundImages.forEach((image) => {
        image.addEventListener('click', (e) => {
            backgroundImages.forEach((image) => {
                image.classList.remove('current');
            });

            const newBkg = body.style.backgroundImage = `url(img/${e.target.id}.jpeg)`;
            e.target.classList.add('current');

            localStorage.setItem('Background Image', newBkg);
            localStorage.setItem('Current', e.target.id);
        });
    });

    const storageBackgroundHover = localStorage.getItem('Current');

        if(storageBackgroundHover){
            const currentHover = document.querySelector(`#${storageBackgroundHover}`);
            currentHover.classList.add('current');
        } else {
            const defaultHover = document.querySelector('#bkg-1');
            defaultHover.classList.add('current');
        }

    const storageBackground = localStorage.getItem('Background Image');
    body.style.backgroundImage = storageBackground;

    // CHANGE FONT SIZE
    fontSizeBtn.forEach((button) => {
        button.addEventListener('click', (e) => {
            fontSizeBtn.forEach((button) => {
                itemDisplay.classList = 'savingItem';
                button.classList.remove('fontCurrent');
            });

            const changeFont = itemDisplay.classList.add(`${e.target.id}`);
            e.target.classList.add('fontCurrent');

            localStorage.setItem('Font Size', e.target.id);
        });
    });

    const storageFont = localStorage.getItem('Font Size');

        if(storageFont){
            const currentFont = document.querySelector(`#${storageFont}`);
            currentFont.classList.add('fontCurrent');
            itemDisplay.classList.add(storageFont);
        } else {
            const defaultFont = document.querySelector('#f1');
            defaultFont.classList.add('fontCurrent');
        }

    // DARK MODE
    const darkMode = document.querySelectorAll('.settings-color');

    darkModeBtn.addEventListener('click', () => {
        darkMode.forEach((element) => {
            const changeMode = element.classList.toggle('dark');
            localStorage.setItem('Dark Mode', changeMode);
        });
    });

    const darkModeStorage = localStorage.getItem('Dark Mode');

    if(darkModeStorage === 'true'){
        darkMode.forEach((element) => {
            element.classList.add('dark');
        });
    }

// SAVINGS ITEM AND AMOUNT FUNCTION
    function savingDescription(){
        const savingItem = document.querySelector('#saving');
        const savingAmount = document.querySelector('#savingsAmount');

        amount = savingAmount.value;
        const item = savingItem.value;
        const total = parseFloat(amount);

        // PREVENT NEW GOAL IF THERE IS LOCAL STORAGE ALREADY PRESENT
        if(storageItem && storageAmount){
            alert('You must clear current goal before entering new one');
            storageCurrent = localStorage.getItem('Current Amount');
            amount = storageCurrent;
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
        itemDisplay.innerHTML = item;
        amountDisplay.innerHTML = thousandsSeparator(`$${total.toFixed(2)}`);
        navTotal.innerHTML = thousandsSeparator(`$${total.toFixed(2)}`);

        savingItem.value = '';
        savingAmount.value = '';

        // LOCAL STORAGE
        localStorage.setItem('Saving Item', item);
        localStorage.setItem('Current Amount', total.toFixed(2));
        localStorage.setItem('Saving Amount', total.toFixed(2)); 
        localStorage.setItem('Nav Amount', 0);

        storageItem = localStorage.getItem('Saving Item');
        storageAmount = localStorage.getItem('Saving Amount');
    };

// DEPOSIT FUNCTION
    function depositAmount(){
        const deposit = document.querySelector('#savingsDeposit');
        const depInput = deposit.value;
        const navDeposit = document.querySelector('#navDeposit');
        const navDepositInput = parseFloat(depInput);

        // PREVENT DEPOSIT SUBMIT IF THERE IS NO GOAL OR AMOUNT
        if(itemDisplay.innerHTML === '' && amountDisplay.innerHTML === ''){
            alert('You must enter a goal item and amount first');
            deposit.value = '';
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
        const celebration = document.querySelector('.modal-completion');
        
        if(total <= 0.00){
            // MODAL POP UP
            const title = document.querySelector('header');
            nav.classList.remove('open');
            navBtn.classList.remove('rotate');
            navBtn.classList.add('close');
            celebration.classList.add('open');
            title.classList.add('center');

            // CLOSE MODAL
            closeModalBtn.addEventListener('click', () => {
                navBtn.classList.remove('close');
                celebration.classList.remove('open');
                title.classList.remove('center');
            });
        };
    };
};
