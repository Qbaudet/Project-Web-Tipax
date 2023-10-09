let checkBasePrice;

document.addEventListener('DOMContentLoaded', function () {
    
    const calculateForm = document.getElementById('calculateForm');
    const result = document.getElementById('result');
    const addToHistoryButton = document.getElementById("addToHistory");


    calculateForm.addEventListener('submit', function (event) {
        event.preventDefault();
        checkBasePrice = parseFloat(document.getElementById('basePrice').value);
        const taxRate = parseFloat(document.getElementById('taxRate').value);
        const tipRate = parseFloat(document.getElementById('tipRate').value);
        const restaurantName = document.getElementById('restaurantName').value;

        fetch('/calculateFinalAmount', {method: 'POST', headers: {
                'Content-Type': 'application/json'},
            body: JSON.stringify({ checkBasePrice, taxRate, tipRate })})
        .then(response => response.json())
        .then(data => {result.textContent = `The final check amount including taxes and tips is: $${data.finalAmount.toFixed(2)}`;
        });

        addToHistoryButton.style.display = "block"; // Show the button
    });

     // Function to handle adding the check to history
     const addToHistory = () => {
        const taxRate = parseFloat(document.getElementById('taxRate').value);
        const tipRate = parseFloat(document.getElementById('tipRate').value);
        const restaurantName = document.getElementById('restaurantName').value;
        let responseStatus;
    
        // Fetch the finalAmount from the /calculateFinalAmount endpoint
        fetch('/calculateFinalAmount', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ checkBasePrice, taxRate, tipRate, restaurantName}),
        })
        .then((response) => {
            responseStatus = response.status; // Capture the status here
            return response.json();
        })
        .then((data) => {
            const finalAmount = data.finalAmount.toFixed(2);
    
            fetch('/add-to-history', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    checkBasePrice,
                    taxRate,
                    tipRate,
                    finalAmount,
                    restaurantName,
                }),
            })
            .then((response) => response.json())
            .then((result) => {
                if (responseStatus === 200) { // Check if the request was successful
                    // Display the success message and record in an alert
                    alert(`${result.message}\nRecord: ${JSON.stringify(result.record)}`);
                } else {
                    alert('Failed to add check to history.');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };
    
    
    

    // Event listener for the "Add to History" button
    document.getElementById('addToHistory').addEventListener('click', () => {
        // Ask the user for confirmation
        const confirmAdd = confirm('Do you want to add this check to history?');
        if (confirmAdd) {
            addToHistory();
        }
    });
});

