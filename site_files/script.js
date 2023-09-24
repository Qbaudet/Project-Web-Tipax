document.addEventListener('DOMContentLoaded', function () {
    const calculateForm = document.getElementById('calculateForm');
    const result = document.getElementById('resultDiv');

    calculateForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const checkBasePrice = parseFloat(document.getElementById('basePrice').value);
        const taxRate = parseFloat(document.getElementById('taxRate').value);

        fetch('/calculateFinalAmount', {method: 'POST', headers: {
                'Content-Type': 'application/json'},
            body: JSON.stringify({ checkBasePrice, taxRate })})
        .then(response => response.json())
        .then(data => {result.textContent = `The final check amount including tax is: $${data.finalAmount.toFixed(2)}`;
        });
    });
});