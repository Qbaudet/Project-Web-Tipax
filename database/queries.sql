SELECT * FROM Restaurants;

SELECT nickname, total_price, check_date FROM Checks c
JOIN Users u ON c.id_user = u.id_user 
WHERE u.nickname = 'Kiara';

SELECT restaurant_name, category, meal_name, Price FROM Restaurants r
JOIN Menus ON r.id_restaurant = Menus.id_restaurant
JOIN Meals ON Menus.id_meal = Meals.id_meal;

SELECT nickname, check_date, restaurant_name FROM Users u
JOIN Checks c ON u.id_user = c.id_user
JOIN Restaurants r ON c.id_restaurant = r.id_restaurant;