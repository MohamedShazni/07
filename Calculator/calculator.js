document.addEventListener('DOMContentLoaded', () => {
    const display = document.querySelector('.display');
    const buttons = document.querySelectorAll('button');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');

            switch (value) {
                case 'AC':
                    display.value = '';
                    break;
                case 'DEL':
                    display.value = display.value.slice(0, -1);
                    break;
                case '%':
                    display.value = display.value/100;    
                case '=':
                    try {
                        // Replace x with * to evaluate multiplication
                        display.value = eval(display.value.replace(/x/g, '*'));
                    } catch (e) {
                        display.value = 'Error';
                    }
                    break;
                default:
                    display.value += value;
            }
        });
    });
});
