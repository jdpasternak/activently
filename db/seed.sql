INSERT INTO user (username, email, password, zip) VALUES
 ("bob", "bob@example.com", "secret123","96789"),
 ("joe", "joe@example.com", "secret123","96789"),
 ("steve", "steve@example.com", "secret123","96789"),
 ("susan", "susan@example.com", "secret123","96797"),
 ("martha", "martha@example.com", "secret123","96797"),
 ("carl", "carl@example.com", "secret123","96814"),
 ("kim", "kim@example.com", "secret123","96825"),
 ("wong", "wong@example.com", "secret123","96797"),
 ("careen", "careen@example.com", "secret123","96817"),
 ("oscar", "oscar@example.com", "secret123","96789");

 INSERT INTO dietary_pref (name) VALUES
    ("Vegan"),
    ("Vegetarian"),
    ("Paleo"),
    ("Dairy-free"),
    ("Wheat-free");

INSERT INTO user_dietary_pref (user_id, dietary_pref_id) VALUES
    (1, 4),
    (2, 5),
    (3, 5),
    (4, 1),
    (5, 2),
    (6, 2),
    (7, 4),
    (8, 5),
    (9, 1),
    (10, 1);