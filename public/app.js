const keys = document.querySelectorAll('button');
const display = document.querySelector('#display');
const enter = document.querySelector('#enter');
const numKeys = document.querySelectorAll('.valKey');
let clearInput = false;

// restrict input function
// based on https://stackoverflow.com/a/469362/12446618
function setInputFilter(textbox, inputFilter) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"]
        .forEach(function (event) {
            textbox.addEventListener(event, function () {
                if (inputFilter(this.value)) {
                    this.oldValue = this.value;
                    this.oldSelectionStart = this.selectionStart;
                    this.oldSelectionEnd = this.selectionEnd;
                } else if (this.hasOwnProperty("oldValue")) {
                    this.value = this.oldValue;
                    this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
                } else {
                    this.value = "";
                }
            });
        });
}

// Allow digits and math chars, currently excluding "!"
setInputFilter(display, function (value) {
    return /^[\d\.+-\/\*%]*$/.test(value);
});

for (key of numKeys) {
    key.addEventListener('click', function () {
        if (clearInput) {
            display.value = this.textContent;
            clearInput = false;
        } else {
            display.value = display.value + this.textContent;
        }
    });
}

clear.addEventListener('click', () => {
    display.value = null;
});

// evaluate display on enter click
enter.addEventListener('click', () => {
    // test that not all chars are non-numbers
    if (/\d/.test(display.value)) {
        percentPattern = /^\d+(\.\d+)?%([+-\/\*]\d+(\.\d+)?%)+$/;
        isPercent = percentPattern.test(display.value.replaceAll(' ', ''));
        if (isPercent) {
            tmp = display.value.replaceAll('%', '')
            display.value = eval(tmp) + '%';

            clearInput = true;
        } else if (eval(display.value) || eval(display.value) === 0) {
            display.value = eval(display.value);
            clearInput = true;
        }
    } else {  // if entery is just symbols, clean input
        display.value = null; // clear.click() was returning undefined?
    }
});

// listen for enter key
display.addEventListener("keydown", function (e) {
    // Number 13 is the "Enter" key on the keyboard
    if (e.keyCode === 13) {
        enter.click();
    }
});
