INSERT INTO Users (id_user, username, password) 
VALUES 
(1,'James', '@fqdsioufe44324JDFIC81&'),
(2,'Amy', 'jfdsq`@fjiroezPQDSFfmfefqjd'),
(3,'Kiara','fqoozze#dqfFrEQ&@');

INSERT INTO Restaurants (id_restaurant, restaurant_name, address, grade, category, associated_user)
VALUES
(1, 'Shake Shack', '512 Spectrum Center Dr Suite 512, Irvine, CA 92618', 4, 'Fast food';2),
(2, 'Mo''s Grill', '1322 Grant Ave, San Francisco, CA 94133', 5, 'Breakfast',3),
(3, 'Blaze Pizza', '4255 Campus Dr A120, Irvine, CA 92612', 4, 'Pizzeria',2),
(4, 'Antojitos Cocina Mexicana', '100 Universal City Plaza, Universal City, CA 91608', 4.5, 'Mexican',1);

INSERT INTO Checks (id_check, base_price, tax_rate, tip_rate, final_amount, check_date, associated_restaurant, associated_user)
VALUES
(1, 56, 10, 20, 72.80, '2022-12-17', 3,1),
(2, 47, 8, 15, 57.81, '2023-01-09', 1, 1),
(3, 79.6, 9.3, 18, 101.34, '2023-03-09', 2, 2),
(4, 103.56, 9.8, 20, 134.44,'2023-06-29', 4, 4),
(5, 37.5, 8, 0, 40.50, '2023-07-28', 1, 3);