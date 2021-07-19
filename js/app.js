const buttonIds = ['b5', 'b10', 'b15', 'b25', 'b50'];
let currentCustomTip = 0;
let currentButtonTip = 0;

buttonIds.forEach(
    (id) => {
        addButtonListener(id);
    }
);
addInputListeners();
addCustomInputListener();
addResetButtonListener();

function updateState(tipPercent) {

    const billInput = document.getElementById('billInput');
    const peopleInput = document.getElementById('peopleInput');

    const billInputValue = +billInput.value;
    const peopleInputValue = +peopleInput.value;

    let __billAmount = peopleInputValue > 0 ? (billInputValue / peopleInputValue) : 0;
    let __tipAmount = __billAmount * tipPercent / 100;

    let totalAmount = document.getElementById('totalAmount');
    let tipAmount = document.getElementById('tipAmount');
    totalAmount.innerHTML = '$' + __billAmount.toFixed(2);
    tipAmount.innerHTML = '$' + __tipAmount.toFixed(2);

    if (peopleInputValue == 0) {
        peopleInput.classList.add('error');
        document.getElementById('error-label').classList.add('error');
    } else {
        peopleInput.classList.remove('error');
        document.getElementById('error-label').classList.remove('error');
    }

    if (__billAmount > 0 || __tipAmount > 0){
        document.getElementById('reset-button').disabled = false;
    } else {
        document.getElementById('reset-button').disabled = true;
    }

}

function addButtonListener(buttonId) {
    let currentElement = document.getElementById(buttonId);
    currentElement.addEventListener(
        'click', (event) => {
            resetButtonClasses();
            currentElement.classList.add('btn-selected');
            const tipPercent = +buttonId.substring(1);
            currentButtonTip = tipPercent;
            currentCustomTip = 0;
            document.getElementById('customInput').value = 0;
            updateState(tipPercent);
        }
    )
}

function resetButtonClasses() {
    buttonIds.forEach(
        (id) => {
            document.getElementById(id).classList.remove('btn-selected');
        }
    );
}

function addCustomInputListener() {
    const customInputElement = document.getElementById('customInput');
    customInputElement.addEventListener(
        'input', (event) => {
            let inputValue = +customInputElement.value;
            if (inputValue > 0 && inputValue <= 100) {
                currentCustomTip = inputValue;
                currentButtonTip = 0;
                resetButtonClasses();
                resetButtonClasses();
                updateState(currentCustomTip);
            } else if (inputValue > 100) {
                customInputElement.value = currentCustomTip;
            } else if (inputValue < 0) {
                // Show Error.
            }
        }
    )
}

function addInputListeners() {
    let billInput = document.getElementById('billInput');
    let peopleInput = document.getElementById('peopleInput');
    billInput.addEventListener(
        'input', (event) => {
            let tipAmount = Math.max(currentCustomTip, currentButtonTip);
            updateState(tipAmount);
        }
    );
    peopleInput.addEventListener(
        'input', (event) => {
            let tipAmount = Math.max(currentCustomTip, currentButtonTip);
            updateState(tipAmount);
        }
    );
    peopleInput.addEventListener(
        'focus', (event) => {
           let value = +peopleInput.value;
           if (value == 0){
               peopleInput.classList.add('error');
               document.getElementById('error-label').classList.add('error');
           }
        }
    )
}

function addResetButtonListener(){
    
    const resetButton = document.getElementById('reset-button');

    // Input Controls.
    const __billInput = document.getElementById('billInput');
    const __peopleInput = document.getElementById('peopleInput');
    const __customInput = document.getElementById('customInput');
    const __errorLabel = document.getElementById('error-label');
    const __totalAmount = document.getElementById('totalAmount');
    const __tipAmount = document.getElementById('tipAmount');

    resetButton.addEventListener(
        'click', () => {
            resetButtonClasses();
            currentCustomTip = 0;
            currentButtonTip = 0;
            __customInput.value = 0;
            __billInput.value = 0;
            __peopleInput.value = 0;
            __peopleInput.classList.remove('error');
            __errorLabel.classList.remove('error');
            __totalAmount.innerHTML = '$' + (0).toFixed(2);
            __tipAmount.innerHTML = '$' + (0).toFixed(2);
            resetButton.disabled = true;
        }
    )
}