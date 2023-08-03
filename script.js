var name_field = document.querySelector('.name-field');
var num_field = document.querySelector('.num-field');
var month_field = document.querySelector('.month-field');
var year_field = document.querySelector('.year-field');
var cvc_field = document.querySelector('.cvc-field');

name_field.addEventListener('click', inputClick);
num_field.addEventListener('click', inputClick);
month_field.addEventListener('click', inputClick);
year_field.addEventListener('click', inputClick);
cvc_field.addEventListener('click', inputClick);

name_field.addEventListener('input', input_change);
num_field.addEventListener('input', input_change);
month_field.addEventListener('input', input_change);
year_field.addEventListener('input', input_change);
cvc_field.addEventListener('input', input_change);

name_field.addEventListener('keypress', ev => {
    if (ev.key === 'Enter') { num_field.focus(); }
});
num_field.addEventListener('keypress', inputKeyPress);
month_field.addEventListener('keypress', inputKeyPress);
year_field.addEventListener('keypress', inputKeyPress);
cvc_field.addEventListener('keypress', inputKeyPress);

function confirmBtnClick() {
    if (name_field.value === '') {
        document.querySelector('.name-warn').style.display = 'initial';
        name_field.style.borderColor = 'hsl(0, 100%, 66%)';
    }
    // Check for valid card number
    var cardNumber = num_field.value.replace(/\s/g, ''); // Remove spaces from the input
    if (cardNumber === '' || cardNumber.length !== 16 || isNaN(cardNumber)) {
        document.querySelector('.number-warn').style.display = 'initial';
        num_field.style.borderColor = 'hsl(0, 100%, 66%)';
    }
    if (month_field.value === '' || isNaN(month_field.value) || parseInt(month_field.value) < 1 || parseInt(month_field.value) > 12) {
        document.querySelector('.expire-month-year-warn').style.display = 'initial';
        month_field.style.borderColor = 'hsl(0, 100%, 66%)';
    }
    if (year_field.value === '' || isNaN(year_field.value) || parseInt(year_field.value) < new Date().getFullYear()) {
        document.querySelector('.expire-month-year-warn').style.display = 'initial';
        year_field.style.borderColor = 'hsl(0, 100%, 66%)';
    }
    if (cvc_field.value === '' || cvc_field.value.length !== 3 || isNaN(cvc_field.value)) {
        document.querySelector('.cvc-warn').style.display = 'initial';
        cvc_field.style.borderColor = 'hsl(0, 100%, 66%)';
    } else {
        document.querySelector('.form').style.display = 'none';
        document.querySelector('.completion-message').style.display = 'flex';
    }
}

function inputClick(ev) {
    ev.currentTarget.style.borderColor = 'hsl(279, 6%, 55%)';
    var warning = ev.currentTarget.parentElement.querySelector('.name-warn,.number-warn,.expire-month-year-warn,.cvc-warn');
    if (warning) {
        warning.style.display = 'none';
    }
}

function input_change(ev) {
    if (ev.currentTarget === name_field) {
        document.querySelector('.holder-name').innerHTML = name_field.value;
    } else if (ev.currentTarget === num_field) {
        num_field_process_value();
    } else if (ev.currentTarget === month_field || ev.currentTarget === year_field) {
        var monthValue = parseInt(month_field.value);
        var yearValue = parseInt(year_field.value);
        if (isNaN(monthValue) || isNaN(yearValue) || monthValue < 1 || monthValue > 12 || yearValue < new Date().getFullYear()) {
            document.querySelector('.expire-month-year-warn').style.display = 'initial';
            month_field.style.borderColor = 'hsl(0, 100%, 66%)';
            year_field.style.borderColor = 'hsl(0, 100%, 66%)';
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
    document.querySelector('.completion-message').style.display = 'none';
    document.querySelector('.form').style.display = 'flex';
    num_field.value = '';
    name_field.value = '';
    month_field.value = '';
    year_field.value = '';
    cvc_field.value = '';
}
