INSERT INTO hospitals (
    id,
    name,
    address,
    city,
    province,
    latitude,
    longitude
)
VALUES
(
    'vgh',
    'Vancouver General Hospital',
    '899 W 12th Ave',
    'Vancouver',
    'BC',
    49.2610,
    -123.1230
),
(
    'stpauls',
    'St. Paul''s Hospital',
    '1081 Burrard St',
    'Vancouver',
    'BC',
    49.2800,
    -123.1300
),
(
    'msj',
    'Mount Saint Joseph Hospital',
    '3080 Prince Edward St',
    'Vancouver',
    'BC',
    49.2560,
    -123.0960
),
(
    'burnaby',
    'Burnaby Hospital',
    '3935 Kincaid St',
    'Burnaby',
    'BC',
    49.2480,
    -123.0140
),
(
    'surrey',
    'Surrey Memorial Hospital',
    '13750 96 Ave',
    'Surrey',
    'BC',
    49.1770,
    -122.8420
)

INSERT INTO er_wait_times (
    hospital_id,
    wait_time_minutes
)
VALUES
    ('vgh', 38),
    ('stpauls', 52),
    ('msj', 27),
    ('burnaby', 44),
    ('surrey', 61);

    
ON CONFLICT (id)
DO UPDATE SET
    name = EXCLUDED.name,
    address = EXCLUDED.address,
    city = EXCLUDED.city,
    province = EXCLUDED.province,
    latitude = EXCLUDED.latitude,
    longitude = EXCLUDED.longitude,
    updated_at = CURRENT_TIMESTAMP;

