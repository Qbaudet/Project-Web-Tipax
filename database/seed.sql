INSERT INTO Users (id_user, nickname, first_login) 
VALUES 
(1,'James', '2022-11-28'),
(2,'Amy', '2023-02-26'),
(3,'Kiara','2023-06-16');

INSERT INTO Restaurants (id_restaurant, restaurant_name, address, grade, category)
VALUES
(1, 'Shake Shack', '512 Spectrum Center Dr Suite 512, Irvine, CA 92618', 4, 'Fast food'),
(2, 'Mo''s Grill', '1322 Grant Ave, San Francisco, CA 94133', 5, 'Breakfast'),
(3, 'Blaze Pizza', '4255 Campus Dr A120, Irvine, CA 92612', 4, 'Pizzeria'),
(4, 'Antojitos Cocina Mexicana', '100 Universal City Plaza, Universal City, CA 91608', 4.5, 'Mexican');

INSERT INTO Checks (id_check, base_price, tax_rate, tip_rate, total_price, check_date, id_user, id_restaurant)
VALUES
(1, 56, 10, 20, 72.80, '2022-12-17', 1, 3),
(2, 47, 8, 15, 57.81, '2023-01-09', 1, 1),
(3, 79.6, 9.3, 18, 101.34, '2023-03-09', 2, 2),
(4, 103.56, 9.8, 20, 134.44,'2023-06-29', 3, 4),
(5, 37.5, 8, 0, 40.50, '2023-07-28', 3, 1);

INSERT INTO Meals (id_meal, meal_name, price)
VALUES 
(1, 'ShackBurger', 7.8),
(2, 'SmokeShack', 9.3),
(3, 'Cheese Omelette', 16),
(4, 'Bacon Pancakes', 12),
(5, 'Meat Eater', 12.3),
(6, 'Cheese Pizza', 10.2),
(7, 'Chicken Fajitas', 14.7),
(8, 'Chili Tacos', 16);

INSERT INTO Menus (id_restaurant, id_meal)
VALUES
(1,1),
(1,2),
(2,3),
(2,4),
(3,5),
(3,6),
(4,7),
(4,8);