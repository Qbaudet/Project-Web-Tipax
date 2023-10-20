let checkBasePrice;

document.addEventListener('DOMContentLoaded', function () {

    const restaurantSelect = document.getElementById('restaurantName');
    const addRestaurantButton = document.getElementById('addRestaurantButton');

    // Fetch restaurant names from the server
    fetch('/getRestaurantNames')
        .then(response => response.json())
        .then(data => {
            data.forEach(restaurant => {
                const option = document.createElement('option');
                option.value = restaurant.restaurant_name;
                option.textContent = restaurant.restaurant_name;
                restaurantSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error:', error));

        
    addRestaurantButton.addEventListener('click', function () {
        // Redirect to the "restaurants.html" page
        window.location.href = 'restaurants.html';
    });

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
            console.log(latestRecord);
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

     
    // Event listener for the "Add to History" button
    document.getElementById('addToHistory').addEventListener('click', () => {
        // Ask the user for confirmation
        const confirmAdd = confirm('Do you want to add this check to history?');
        if (confirmAdd) {
            addToHistory();
        }
    });
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
            alert("Check added to history successfully.");
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


//Function to handle the creation of the card containing the latest check
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

  const cardText3 = document.createElement('p');
  cardText3.classList.add('card-text');
  if (record.associated_restaurant == null) {

  }else {
      cardText3.textContent = `Restaurant: ${record.associated_restaurant}`;
  }


  cardTitle.style.textAlign = 'center';
  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardText2);
  cardBody.appendChild(cardText3);
  card.appendChild(cardBody);
  card.style.width = '100%';
  card.style.backgroundColor = '#ebd9bf';
  card.style.borderStyle = 'dashed solid dashed solid';
  card.style.borderColor = 'black';
  card.style.borderWidth = "1px 2px 3px 4px";

  return card;
}


