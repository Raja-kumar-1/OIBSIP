// Get elements
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
let currentInput = '';
let resultDisplayed = false;
let powerMode = false; // Power mode toggle for x^y
let nthRootMode = false; // Nth root mode toggle

// Function to update display
function updateDisplay(value) {
    display.textContent = value || '0';
}

// Handle button clicks
buttons.forEach(button => {
    button.addEventListener('click', function() {
        const value = this.value;

        // Clear Button
        if (this.id === 'clear') {
            currentInput = '';
            powerMode = false;
            nthRootMode = false;
            updateDisplay('0');
            return;
        }

        // Delete Button (Backspace)
        if (this.id === 'delete') {
            currentInput = currentInput.slice(0, -1);
            updateDisplay(currentInput || '0');
            return;
        }

        // Square Root Button
        if (this.id === 'sqrt') {
            currentInput = Math.sqrt(parseFloat(currentInput)).toString();
            updateDisplay(currentInput);
            return;
        }

        // Power Button (x^y)
        if (this.id === 'power') {
            powerMode = true;
            currentInput += ' ^ '; // Displaying symbol for user clarity
            updateDisplay(currentInput);
            return;
        }

        // Nth Root Button
        if (this.id === 'nthRoot') {
            nthRootMode = true;
            let n = prompt("Enter the root value (e.g., 3 for cube root):");
            if (!isNaN(n) && currentInput) {
                currentInput = Math.pow(parseFloat(currentInput), 1 / parseFloat(n)).toString();
                nthRootMode = false;
                updateDisplay(currentInput);
            } else {
                updateDisplay('Error');
                currentInput = '';
            }
            return;
        }

        // Percentage Button
        if (value === '%') {
            currentInput = (parseFloat(currentInput) / 100).toString();
            updateDisplay(currentInput);
            return;
        }

        // Equal Button (Evaluate expression)
        if (this.id === 'equal') {
            try {
                if (powerMode) {
                    let parts = currentInput.split(' ^ ');
                    if (parts.length === 2) {
                        currentInput = Math.pow(parseFloat(parts[0]), parseFloat(parts[1])).toString();
                    }
                    powerMode = false;
                } else {
                    const result = eval(currentInput);
                    currentInput = result.toString();
                }
                updateDisplay(currentInput);
                resultDisplayed = true;
            } catch (error) {
                updateDisplay('Error');
                currentInput = '';
            }
            return;
        }

        // Append clicked value to the current input
        if (resultDisplayed) {
            currentInput = value;
            resultDisplayed = false;
        } else {
            currentInput += value;
        }

        // Update the display with the full expression
        updateDisplay(currentInput);
    });
});
