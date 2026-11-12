const form = document.querySelector('.form');
const billInput = document.querySelector('#bill-amount');
const peopleInput = document.querySelector('#person-count');
const customTip = document.querySelector('.custom-tip');
const radioButtons = document.querySelectorAll('input[name="tip"]');
const resetButton = document.querySelector('.reset');
const error = document.querySelector('.error');

// Allow only 2 digits for people count
peopleInput.addEventListener('input', () => {
    peopleInput.value = peopleInput.value.replace(/\D/g, '').slice(0, 10);
});

// Form validation
function checkForm() {

    const billFilled = billInput.value !== '';
    const peopleInvalid = peopleInput.value === '0';

    const tipSelected =
        [...radioButtons].some(radio => radio.checked) ||
        customTip.value !== '';

        

    // Show error
    peopleInput.classList.toggle('active', peopleInvalid);
    error.classList.toggle('active', peopleInvalid);

    // Enable reset button
    resetButton.classList.toggle(
        'active',
        billFilled && !peopleInvalid && tipSelected
    );
}

form.addEventListener('input', () => {
    checkForm();
    calculateTip();
});

form.addEventListener('change', () => {
    checkForm();
    calculateTip();
});

const tipOutput = document.querySelector('#tip');
const totalOutput = document.querySelector('#total');

function calculateTip() {
  const selectedTip = document.querySelector('input[name="tip"]:checked');

  let tipPercentage;

  if (selectedTip) {
    tipPercentage=Number(selectedTip.value);
  }
  else{
    tipPercentage=Number(customTip.value);
  }
  const bill = Number(billInput.value);
  const people = Number(peopleInput.value);

  if (
    billInput.value === '' ||
    peopleInput.value === '' ||
    people <= 0 ||
    bill <= 0 ||
    tipPercentage <= 0
) {
    tipOutput.textContent = '$0.00';
    totalOutput.textContent = '$0.00';
    return;
}

  // Calculate total tip
  const tipAmount = bill * tipPercentage / 100;

  // Calculate tip per person
  const tipPerPerson = tipAmount / people;
  
  // Calculate total per person
  const totalPerPerson = (bill + tipAmount) / people;

  // Display results
  
  tipOutput.textContent = `$${tipPerPerson.toFixed(2)}`;
  totalOutput.textContent = `$${totalPerPerson.toFixed(2)}`;

}
customTip.addEventListener('input', () => {
    let value = customTip.value;

    // Allow only numbers and one decimal point
    value = value.replace(/[^\d.]/g, '');

    // Allow only 2 decimal digits
    if (value.includes('.')) {
        const parts = value.split('.');
        value = parts[0] + '.' + parts[1].slice(0, 2);
    }

    // Remove unnecessary leading zeros
    value = value.replace(/^0+(?=\d)/, '');

    customTip.value = value;
    radioButtons.forEach(radio => {
        radio.checked = false;
    });
});
radioButtons.forEach(radio => {
    radio.addEventListener('change', () => {
        customTip.value = '';
    });
});


// Reset form
resetButton.addEventListener('click', () => {
    form.reset();
    checkForm();
});

