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

INSERT INTO interest (name) VALUES
    ("Hiking"),
    ("Cycling"),
    ("Knitting"),
    ("Poker"),
    ("Skiing");

INSERT INTO user_interest (user_id, interest_id) VALUES
    (1, 1),
    (2, 3),
    (3, 4),
    (4, 2),
    (5, 3),
    (6, 3),
    (7, 1),
    (8, 4),
    (9, 3),
    (10, 4);

INSERT INTO activity (title, description, location, occurrence, organizer_id, is_private, seats, interest_id) VALUES 
    ("Activity 1","Act 1 Description","The Town",20220214, 1, false, 10, 1),
    ("Activity 2","Act 2 Description","The Pier",20220216, 2, false, 10, 2),
    ("Activity 3","Act 3 Description","The Mountains",20220218, 3, false, 10, 5),
    ("Activity 4","Act 4 Description","The Beach",20220219, 4, false, 10, 4),
    ("Activity 5","Act 5 Description","The Community Center",20220217, 5, false, 10, 3);

INSERT INTO attendance (user_id, activity_id) VALUES 
    (1, 2),
    (1, 3),
    (1, 5),
    (2, 1),
    (2, 4),
    (2, 5),
    (2, 3),
    (3, 1),
    (3, 2);
