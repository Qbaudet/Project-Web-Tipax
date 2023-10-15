const rNameInput = document.getElementById("r_name");
const rLocalInput = document.getElementById("r_local");
const rCategorySelect = document.getElementById("r_category");
const rRatingInputs = document.querySelectorAll('input[name="rating"]');
const ratingValue = document.getElementById("rating-value");

let formData = {
r_name: "",
r_local: "",
r_category: "",
r_rating: ""
};

rNameInput.addEventListener("input", function () {
    formData.r_name = rNameInput.value;
});

rLocalInput.addEventListener("input", function () {
    formData.r_local = rLocalInput.value;
});

rCategorySelect.addEventListener("change", function () {
    formData.r_category = rCategorySelect.value;
});

rRatingInputs.forEach(function (input) {
    input.addEventListener("change", function () {
        formData.r_rating = input.value;
        // Update the displayed rating
         ratingValue.innerText = input.value;
    });
});


document.getElementById("r_submit").addEventListener("click", function () {
    // Send the data to the server using the Fetch API
    fetch("http://localhost:3000", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
        // Handle the server's response here
        console.log("Data sent successfully:", data);
    })
    .catch(error => console.error("Error:", error));
});
