document.addEventListener('DOMContentLoaded', function () {      
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
    let restaurantCategory;
    rCategorySelect.addEventListener("change", function () {
        restaurantInfo.r_category = rCategorySelect.value;
        restaurantCategory = rCategorySelect.value; 
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

    const restaurantList = document.getElementById("restaurant-list");

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

            const categoryImages = {
                "American food": "/img/american.png",
                "Japanese food": "/img/japanese.png",
                "Mexican food": "/img/mexican.png",
                "Chinese food": "/img/chinese.png",
                "French food": "/img/french.png",
                "Italian food": "/img/italian.png",
                "Food_truck": "/img/food_truck.png",
                "Pizzeria": "/img/pizza.png",
                "Bar": "/img/bar.png",
            };


            /* We add the value of the form in a new div that we will create dynamically */
            const categoryImageSrc = categoryImages[restaurantCategory] || '';

            const newCard = document.createElement("div");
            newCard.className = "cards";

            const cardHeader = document.createElement("h3");
            cardHeader.className = "card_header";
            cardHeader.textContent = restaurantInfo.r_name;
            
            const logoImg = document.createElement("img");
            logoImg.src = categoryImageSrc;
            logoImg.alt = `${restaurantCategory} Image`;
            logoImg.className = "logo";

            const cardBody = document.createElement("div");
            cardBody.className = "card_body";

            const address = document.createElement("p");
            address.className = "address";
            address.textContent = restaurantInfo.r_local;

            const category = document.createElement("p");
            category.className = "category";
            category.textContent = restaurantInfo.r_category;
  
            const ranking = document.createElement("p");
            ranking.className = "ranking";
            ranking.textContent = `${restaurantInfo.r_rating} stars`;

            cardBody.appendChild(logoImg);
            cardBody.appendChild(address);
            cardBody.appendChild(category);
            cardBody.appendChild(ranking);
            
            newCard.appendChild(cardHeader);

            newCard.appendChild(cardBody);

            restaurantList.appendChild(newCard);

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