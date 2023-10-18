document.addEventListener('DOMContentLoaded', function () {      
    
    //Get the database data for the restaurants
    fetch('/restaurants/data')
        .then(response => response.json())
        .then(data => {
            data.forEach(record => {
                addRestaurantCard(record.restaurant_name, record.address, record.category, record.grade)
            });
        })
        .catch(error => console.error('Error:', error));

    
    const rNameInput = document.getElementById("r_name");
    const rLocalInput = document.getElementById("r_local");
    const rCategorySelect = document.getElementById("r_category");
    const rRatingInputs = document.querySelectorAll('input[name="rating"]');
    const ratingValue = document.getElementById("rating-value");

    /* Get the information enteredd by a user in the form */
    let restaurantInfo = {
    r_name: "",
    r_local: "",
    r_category: "",
    r_rating: ""
    };

    /* Display the logo corresponding to the category */
    rCategorySelect.addEventListener("change", function () {
        restaurantInfo.r_category = rCategorySelect.value; 
    });
    
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
        // Check if all required fields are filled out
        if (!restaurantInfo.r_name || !restaurantInfo.r_local || !restaurantInfo.r_category || !restaurantInfo.r_rating) {
            // Display a pop-up alert to inform the user
            window.alert("Please fill out all fields before submitting the form.");
        } else {
            // If all fields are filled out, we can proceed with form submission
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
        
                const MessageElement = document.getElementById("message");
                if (data.success) {
                    // Restaurant was added successfull
                    MessageElement.innerText = "Your restaurant was successfully added!";
                } else {
                    // There was an error
                    MessageElement.innerText = "There was an error while adding your restaurant.";
                }
                MessageElement.style.display = "block";
            })

            .catch(error => console.error("Error:", error));
            
            // Add the restaurant card to the page
            addRestaurantCard(restaurantInfo.r_name, restaurantInfo.r_local, restaurantInfo.r_category, restaurantInfo.r_rating);
            
            // Reset the form and restaurantInfo object
           document.getElementById("r_form").reset();
            restaurantInfo = {
                r_name: "",
                r_local: "",
                r_category: "",
                r_rating: ""
            };
        }
    }) ;
    
});




function addRestaurantCard(name, address, category, rating){
    const restaurantList = document.getElementById("restaurant-list");
    const categoryImages = {
        "American": "/img/american.png",
        "Japanese": "/img/japanese.png",
        "Mexican": "/img/mexican.png",
        "Chinese": "/img/chinese.png",
        "French": "/img/french.png",
        "Italian": "/img/italian.png",
        "Truck": "/img/food_truck.png",
        "Pizzeria": "/img/pizza.png",
        "Bar": "/img/bar.png",
    };
    const categoryImageSrc = categoryImages[category] || '';

    const newCard = document.createElement("div");
    newCard.className = "cards";

    const cardHeader = document.createElement("h3");
    cardHeader.className = "card_header";
    cardHeader.textContent = name;
    
    const logoImg = document.createElement("img");
    logoImg.src = categoryImageSrc;
    logoImg.alt = `${category} Image`;
    logoImg.className = "logo";

    const cardBody = document.createElement("div");
    cardBody.className = "card_body";

    const addressText = document.createElement("p");
    addressText.className = "address";
    addressText.textContent = address;

    const categoryText = document.createElement("p");
    categoryText.className = "category";
    categoryText.textContent = category;

    const rankingText = document.createElement("p");
    rankingText.className = "ranking";
    rankingText.textContent = `${rating} stars`;

    cardBody.appendChild(logoImg);
    cardBody.appendChild(addressText);
    cardBody.appendChild(categoryText);
    cardBody.appendChild(rankingText);
    newCard.appendChild(cardHeader);
    newCard.appendChild(cardBody);

    restaurantList.appendChild(newCard);
};