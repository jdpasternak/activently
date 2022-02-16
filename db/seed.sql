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

INSERT INTO activity (title, description, location, occurrence, organizer_id, created_at, updated_at) VALUES 
    ("Activity 1","Act 1 Description","The Town","2021-01-01 00:00:00", 1, "2021-01-01 00:00:00", "2021-01-01 00:00:00"),
    ("Activity 2","Act 1 Description","The other Town","2021-01-01 00:00:00", 2, "2021-01-01 00:00:00", "2021-01-01 00:00:00"),
    ("Activity 3","Act 1 Description","The Downtown","2021-01-01 00:00:00", 2, "2021-01-01 00:00:00", "2021-01-01 00:00:00"),
    ("Activity 4","Act 1 Description","The border","2021-01-01 00:00:00", 3, "2021-01-01 00:00:00", "2021-01-01 00:00:00"),
    ("Activity 5","Act 1 Description","The village","2021-01-01 00:00:00", 4, "2021-01-01 00:00:00", "2021-01-01 00:00:00");

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