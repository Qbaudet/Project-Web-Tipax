document.addEventListener('DOMContentLoaded', function () {      
    const rNameInput = document.getElementById("r_name");
    const rLocalInput = document.getElementById("r_local");
    const rCategorySelect = document.getElementById("r_category");
    const rRatingInputs = document.querySelectorAll('input[name="rating"]');
    const ratingValue = document.getElementById("rating-value");

    let restaurantInfo = {
    r_name: "",
    r_local: "",
    r_category: "",
    r_rating: ""
    };

    rNameInput.addEventListener("input", function () {
        restaurantInfo.r_name = rNameInput.value;
    });

    rLocalInput.addEventListener("input", function () {
        restaurantInfo.r_local = rLocalInput.value;
    });

    rCategorySelect.addEventListener("change", function () {
        restaurantInfo.r_category = rCategorySelect.value;
    });

    rRatingInputs.forEach(function (input) {
        input.addEventListener("change", function () {
            restaurantInfo.r_rating = input.value;
            
        });
    });

    
    document.getElementById("r_submit").addEventListener("click", function () {
        event.preventDefault();
        // Send the data to the server using the Fetch API
        fetch("/add-restaurant", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(restaurantInfo),
        })
        .then(response => response.json())
        .then(data => {
            // Handle the server's response here
    
            if (data.success) {
                // Restaurant was added successfully
                const successMessageElement = document.getElementById("success-message");
                successMessageElement.style.display = "block";
                successMessageElement.innerText = "Your restaurant was successfully added!";
            } else {
                // There was an error
                const errorMessageElement = document.getElementById("error-message");
                errorMessageElement.style.display = "block";
                errorMessageElement.innerText = "There was an error while adding your restaurant.";
            }
        })
        .catch(error => console.error("Error:", error));
    });
    
});