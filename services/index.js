document.addEventListener('DOMContentLoaded', function () {
    console.log("ok");
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
});