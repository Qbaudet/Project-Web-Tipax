document.addEventListener('DOMContentLoaded', function () {    
    fetch('/history/data')
        .then(response => response.json())
        .then(data => {
            const recordsDiv = document.getElementById('records');
            data.forEach(record => {
                const recordJson = JSON.stringify(record, null, 2);
                recordsDiv.innerHTML += `<div>${recordJson}</div>`;
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

            const checkDetailsJson = JSON.stringify(checkDetails, null, 2);

            checkDetailsDiv.innerHTML = `Here are the details about the check you chose :\n<pre>${checkDetailsJson}</pre>`;
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