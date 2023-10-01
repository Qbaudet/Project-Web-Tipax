CREATE TABLE Users(
	id_user SERIAL PRIMARY KEY,
	nickname VARCHAR(50) NOT NULL,
	First_login DATE
); 

CREATE TABLE Restaurants(
	id_restaurant SERIAL PRIMARY KEY,
	restaurant_name VARCHAR(50),
	address VARCHAR(150),
	grade REAL,
	category VARCHAR(20)
);

CREATE TABLE Checks(
	id_check SERIAL PRIMARY KEY,
	base_price REAL NOT NULL,
	tax_rate REAL NOT NULL,
	tip_rate REAL NOT NULL,
	total_price REAL NOT NULL,
	check_date DATE,
	id_user INTEGER NOT NULL,
	id_restaurant INTEGER NOT NULL,
	CONSTRAINT check_tax_range CHECK (tax_rate BETWEEN 0 AND 100),
	CONSTRAINT check_tip_range CHECK (tip_rate BETWEEN 0 AND 100),
	FOREIGN KEY (id_user) REFERENCES Users(id_user),
	FOREIGN KEY (id_restaurant) REFERENCES Restaurants(id_restaurant)
);

CREATE TABLE Meals(
	id_meal SERIAL PRIMARY KEY,
	meal_name VARCHAR(50) NOT NULL,
	price REAL
);

CREATE TABLE Menus(
	id_restaurant INTEGER,
	id_meal INTEGER,
	FOREIGN KEY (id_restaurant) REFERENCES Restaurants(id_restaurant),
	FOREIGN KEY (id_meal) REFERENCES Meals(id_meal)
);