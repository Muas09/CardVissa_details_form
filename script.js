var name_field = document.querySelector('.name-field');
var num_field = document.querySelector('.num-field');
var month_field = document.querySelector('.month-field');
var year_field = document.querySelector('.year-field');
var cvc_field = document.querySelector('.cvc-field');

// Add event listeners for input clicks
name_field.addEventListener('click', inputClick);
num_field.addEventListener('click', inputClick);
month_field.addEventListener('click', inputClick);
year_field.addEventListener('click', inputClick);
cvc_field.addEventListener('click', inputClick);

// Add event listeners for input changes
name_field.addEventListener('input', input_change);
num_field.addEventListener('input', input_change);
month_field.addEventListener('input', input_change);
year_field.addEventListener('input', input_change);
cvc_field.addEventListener('input', input_change);

// Add event listeners for keypress
name_field.addEventListener('keypress', ev => {
    if (ev.key === 'Enter') {
        num_field.focus();
    }
});
num_field.addEventListener('keypress', inputKeyPress);
month_field.addEventListener('keypress', inputKeyPress);
year_field.addEventListener('keypress', inputKeyPress);
cvc_field.addEventListener('keypress', inputKeyPress);

function confirmBtnClick(event) {
    // Reset the warning styles and messages
    resetWarnings();

    // Check for valid cardholder name
    if (!name_field.checkValidity() || name_field.value === '') {
        showWarning(name_field, 'CAN\'T BE BLANK');
        alert('Invalid or missing cardholder name');
    }

    // Check for valid card number
    if (!num_field.checkValidity() || num_field.value === '') {
        showWarning(num_field, 'VALUE MUST BE 16 DIGITS');
        alert('Invalid or missing card number');
    }

    // Check for valid expiration date
    var monthValue = parseInt(month_field.value);
    var yearValue = parseInt(year_field.value);
    if (isNaN(monthValue) || isNaN(yearValue) || monthValue < 1 || monthValue > 12 || yearValue <= 0) {
        showWarning(month_field, 'MONTH AND YEAR FIELDS CAN\'T BE BLANK');
        showWarning(year_field, 'MONTH AND YEAR FIELDS CAN\'T BE BLANK');
        alert('Invalid or missing expiration date');
    }

    // Check for valid CVC
    if (!cvc_field.checkValidity() || cvc_field.value === '' || cvc_field.value === '0') {
        showWarning(cvc_field, 'CAN\'T BE BLANK');
        alert('Invalid or missing CVC');
    }

    // If any of the input fields are invalid, prevent confirmation
    if (!name_field.checkValidity() || name_field.value === '' || !num_field.checkValidity() || num_field.value === '' || isNaN(monthValue) || isNaN(yearValue) || monthValue < 1 || monthValue > 12 || yearValue <= 0 || !cvc_field.checkValidity() || cvc_field.value === '' || cvc_field.value === '0') {
        event.preventDefault(); // Prevent form submission
        return;
    }

    // Show completion message and hide the form
    document.querySelector('.form').style.display = 'none';
    document.querySelector('.completion-message').style.display = 'flex';
}

function resetWarnings() {
    var warnings = document.querySelectorAll('.name-warn, .number-warn, .expire-month-year-warn, .cvc-warn');
    var inputFields = document.querySelectorAll('.name-field, .num-field, .month-field, .year-field, .cvc-field');

    warnings.forEach(warning => warning.style.display = 'none');
    inputFields.forEach(field => {
        field.classList.remove('invalid-input'); // Remove the CSS class for invalid input fields
        field.style.borderColor = 'hsl(279, 6%, 55%)'; // Set the default border color
    });
}

function showWarning(inputField, message) {
    var warning = inputField.parentElement.querySelector('.name-warn, .number-warn, .expire-month-year-warn, .cvc-warn');
    if (warning) {
        warning.style.display = 'initial';
    }
    inputField.classList.add('invalid-input'); // Add the CSS class for invalid input fields
    inputField.style.borderColor = 'hsl(0, 100%, 66%)'; // Set the red border color
}

function inputClick(ev) {
    resetWarnings();
    ev.currentTarget.style.borderColor = 'hsl(279, 6%, 55%)';
}

function input_change(ev) {
    if (ev.currentTarget === name_field) {
        document.querySelector('.holder-name').innerHTML = name_field.value;
    } else if (ev.currentTarget === num_field) {
        num_field_process_value();
    } else if (ev.currentTarget === month_field || ev.currentTarget === year_field) {
        var monthValue = parseInt(month_field.value);
        var yearValue = parseInt(year_field.value);
        if (isNaN(monthValue) || isNaN(yearValue) || monthValue < 1 || monthValue > 12 || yearValue <= 0) {
            showWarning(month_field, 'MONTH AND YEAR FIELDS CAN\'T BE BLANK');
            showWarning(year_field, 'MONTH AND YEAR FIELDS CAN\'T BE BLANK');
        } else {
            document.querySelector('.expire-month-year-warn').style.display = 'none';
            month_field.style.borderColor = 'hsl(279, 6%, 55%)';
            year_field.style.borderColor = 'hsl(279, 6%, 55%)';
            document.querySelector('.expire-date').innerHTML = monthValue + '/' + yearValue;
        }
    } else if (ev.currentTarget === cvc_field) {
        document.querySelector('.cvc').innerHTML = cvc_field.value;
    }
}

function num_field_process_value() {
    var value = num_field.value.replace(/\s/g, ''); // Remove spaces from the input
    var newValue = '';
    for (var i = 0; i < value.length; i++) {
        if (i > 0 && i % 4 === 0) {
            newValue += ' '; // Add a space after every 4 characters
        }
        newValue += value.charAt(i);
    }
    document.querySelector('.card-num').innerHTML = newValue;
}

function inputKeyPress(ev) {
    if (ev.key === 'Enter') {
        if (ev.currentTarget === num_field) {
            month_field.focus();
        } else if (ev.currentTarget === month_field) {
            year_field.focus();
        } else if (ev.currentTarget === year_field) {
            cvc_field.focus();
        } else if (ev.currentTarget === cvc_field) {
            confirmBtnClick();
        }
    } else if (!/[0-9.]/.test(ev.key)) {
        ev.preventDefault(); // Prevent input of non-numeric characters
    } else if ((ev.currentTarget === num_field && num_field.value.length >= 19) ||
        (ev.currentTarget === month_field && month_field.value.length >= 2) ||
        (ev.currentTarget === year_field && year_field.value.length >= 2) ||
        (ev.currentTarget === cvc_field && cvc_field.value.length >= 3)) {
        ev.preventDefault(); // Prevent input beyond the maximum length
    }
}

function continueBtn() {
    // Hide completion message and show the form
    document.querySelector('.completion-message').style.display = 'none';
    document.querySelector('.form').style.display = 'flex';

    // Reset input fields
    num_field.value = '';
    name_field.value = '';
    month_field.value = '';
    year_field.value = '';
    cvc_field.value = '';

    // Reset card details
    document.querySelector('.card-num').innerHTML = '0000 0000 0000 0000';
    document.querySelector('.holder-name').innerHTML = 'Jane Appleseed';
    document.querySelector('.expire-date').innerHTML = '00/00';
    document.querySelector('.cvc').innerHTML = '000';
}