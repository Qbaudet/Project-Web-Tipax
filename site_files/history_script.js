
function createCard(record) {


    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card');

    const card = document.createElement('div');
    card.classList.add('card-body');


    const cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = `Final Price : $${record.final_amount}`;

    const cardText1 = document.createElement('p');
    cardText1.classList.add('card-text');
    if (record.associated_restaurant == null) {

    }else {
        cardText1.textContent = `Restaurant: ${record.associated_restaurant}`;
    }


    const cardText3 = document.createElement('p');
    cardText3.classList.add('card-text');
    cardText3.textContent = `Base Price: $${record.base_price}`;

    const cardText2 = document.createElement('p');
    cardText2.classList.add('card-text');
    const dateObject = new Date(record.check_date);
    const formattedDate = dateObject.toISOString().split('T')[0];
    cardText2.textContent = `Date: ${formattedDate}`;

    cardTitle.style.textAlign = 'center';
    card.appendChild(cardTitle);
    card.appendChild(cardText1);
    card.appendChild(cardText2);
    card.appendChild(cardText3);
    cardContainer.appendChild(card);

    card.style.width = '100%';
    card.style.backgroundColor = '#ebd9bf';
    card.style.borderStyle = 'dashed solid dashed solid';
    card.style.borderColor = 'black';
    card.style.borderWidth = "1px 2px 3px 4px";

    return cardContainer;
}



document.addEventListener('DOMContentLoaded', function () {
    fetch('/history/data')
        .then(response => response.json())
        .then(data => {
            const recordsDiv = document.getElementById('records');
            data.forEach(record => {

                const card = createCard(record);
                recordsDiv.appendChild(card);
            });
        })
        .catch(error => console.error('Error:', error));

    document.getElementById('checkDetailsForm').addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the default form submission
        const finalAmount = document.getElementById('checkFA').value.toString();
        fetchCheckDetails(finalAmount);
    });

    async function fetchCheckDetails(finalAmount) {
        try {
            const isValidIdResponse = await fetch(`/history/check/validate/${finalAmount}`);
            const isValidFA = await isValidIdResponse.json();

            if (!isValidFA) {
                alert('Invalid final amount. Please enter a valid one.');
                return;
            }
            const response = await fetch(`/history/check/${finalAmount}`);

            if (!response.ok) {
                throw new Error('Failed to fetch check details');
            }
            const checkDetails = await response.json();
            const checkDetailsDiv = document.getElementById('checkDetails');

            checkDetailsDiv.innerHTML = ''; // Clear any previous content

            // Create a card element for displaying the check details
            const cardContainer = document.createElement('div');
            cardContainer.classList.add('card');

            const card = document.createElement('div');
            card.classList.add('card-body');

            const cardTitle = document.createElement('h5');
            cardTitle.classList.add('card-title');
            cardTitle.textContent = `Check Details`;

            const properties = ["id_check", "base_price", "tax_rate", "tip_rate", "final_amount", "check_date", "associated_restaurant", "associated_user"];

            properties.forEach(property => {
                let value = checkDetails[property];

                // Check if the value is falsy (null, undefined, empty string, etc.), and skip it
                if (!value) {
                    return; // Skip this property
                }

                if (property === 'check_date') {
                    const dateObject = new Date(value);
                    const formattedDate = dateObject.toISOString().split('T')[0];
                    value = formattedDate;
                }



                const cardText = document.createElement('p');
                cardText.classList.add('card-text');
                cardText.textContent = `${property.replace('_', ' ')}: ${value}`;
                card.appendChild(cardText);

            });



            cardContainer.appendChild(card);
            checkDetailsDiv.appendChild(cardContainer);

        } catch (error) {
            console.error('Error:', error);
            alert('Failed to fetch check details.');
        }
    }

    /*
    document.getElementById('updateCheckForm').addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the default form submission
        const id_check = document.getElementById('updateId').value;
        const newRestaurantName = document.getElementById('updateRestaurant').value;

        // Send an HTTP POST request to update the check
        try {
            const response = await fetch(`/history/check/update/${id_check}/${newRestaurantName}`, {
                method: 'POST',
            });

            if (!response.ok) {
                throw new Error('Failed to update check');
            }

            const updateCheckResult = await response.json();
            const updateCheckResultDiv = document.getElementById('updateCheckResult');

            updateCheckResultDiv.innerText = JSON.stringify(updateCheckResult);
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to update check.');
        }
    });*/

    document.getElementById('deleteCheckForm').addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the default form submission
        const id_check = document.getElementById('deleteId').value;

        // Send an HTTP POST request to delete the check
        try {
            const response = await fetch(`/history/check/delete/${id_check}`, {
                method: 'POST',
            });

            if (!response.ok) {
                throw new Error('Failed to delete check');
            }

            const deleteCheckResult = await response.json();
            const deleteCheckResultDiv = document.getElementById('deleteCheckResult');

            deleteCheckResultDiv.innerText = JSON.stringify(deleteCheckResult);
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to delete check.');
        }
    });
});