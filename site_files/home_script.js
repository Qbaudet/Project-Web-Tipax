let checkBasePrice;

function createCard(record) {
    const card = document.createElement('div');
    card.classList.add('card');

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = `Final Price : $${record.final_amount}`;


    const cardText2 = document.createElement('p');
    cardText2.classList.add('card-text');
    const dateObject = new Date(record.check_date);
    const formattedDate = dateObject.toISOString().split('T')[0];
    cardText2.textContent = `Date: ${formattedDate}`;


    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText2);
    card.appendChild(cardBody);

    return card;
}


document.addEventListener('DOMContentLoaded', function () {
    
    const calculateForm = document.getElementById('calculateForm');
    const result = document.getElementById('result');
    const addToHistoryButton = document.getElementById("addToHistory");

    fetch('/history/data')
        .then(response => response.json())
        .then(data => {
            console.log(data); // Log the data to the console to inspect its structure

            // Find the record with the largest ID using reduce
            const latestRecord = data.reduce((prev, current) => (prev.id > current.id ? prev : current), {});

            const recordsDiv = document.getElementById('records');
            const card = createCard(latestRecord);
            recordsDiv.appendChild(card);
        })
        .catch(error => console.error('Error:', error));




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
      body: JSON.stringify({ checkBasePrice, taxRate, tipRate, restaurantName }),
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
            if (responseStatus === 200) {
              alert(`${result.message}\nRecord: ${JSON.stringify(result.record)}`);
                location.reload();
            } else {
              alert('Failed to add check to history.');
              location.reload();
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


