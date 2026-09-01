-- ============================================
-- MediQueue Hospital Seed Data
-- British Columbia
-- ============================================

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

-- ============================================
-- VANCOUVER
-- ============================================

(
    'vgh',
    'Vancouver General Hospital',
    '920 W 10th Ave',
    'Vancouver',
    'BC',
    49.2631,
    -123.1220
),

(
    'stpauls',
    'St. Paul''s Hospital',
    '1081 Burrard St',
    'Vancouver',
    'BC',
    49.2807,
    -123.1305
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
    'ubc',
    'UBC Hospital',
    '2211 Wesbrook Mall',
    'Vancouver',
    'BC',
    49.2647,
    -123.2459
),

-- ============================================
-- BURNABY / NEW WESTMINSTER / TRI-CITIES
-- ============================================

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
    'royal_columbian',
    'Royal Columbian Hospital',
    '330 E Columbia St',
    'New Westminster',
    'BC',
    49.2290,
    -122.8905
),

(
    'eagle_ridge',
    'Eagle Ridge Hospital',
    '475 Guildford Way',
    'Port Moody',
    'BC',
    49.2797,
    -122.8380
),

-- ============================================
-- FRASER VALLEY
-- ============================================

(
    'surrey',
    'Surrey Memorial Hospital',
    '13750 96 Ave',
    'Surrey',
    'BC',
    49.1770,
    -122.8420
),

(
    'abbotsford',
    'Abbotsford Regional Hospital and Cancer Centre',
    '32900 Marshall Rd',
    'Abbotsford',
    'BC',
    49.0504,
    -122.3108
),

(
    'chilliwack',
    'Chilliwack General Hospital',
    '45600 Menholm Rd',
    'Chilliwack',
    'BC',
    49.1666,
    -121.9537
),

(
    'langley',
    'Langley Memorial Hospital',
    '22051 Fraser Hwy',
    'Langley',
    'BC',
    49.0997,
    -122.6504
),

(
    'ridge_meadows',
    'Ridge Meadows Hospital',
    '11666 Laity St',
    'Maple Ridge',
    'BC',
    49.2194,
    -122.6007
),

(
    'peace_arch',
    'Peace Arch Hospital',
    '15521 Russell Ave',
    'White Rock',
    'BC',
    49.0320,
    -122.8020
),

(
    'delta',
    'Delta Hospital',
    '5800 Mountain View Blvd',
    'Delta',
    'BC',
    49.0847,
    -123.0585
),

-- ============================================
-- VANCOUVER COASTAL
-- ============================================

(
    'lions_gate',
    'Lions Gate Hospital',
    '231 E 15th St',
    'North Vancouver',
    'BC',
    49.3208,
    -123.0696
),

(
    'richmond',
    'Richmond Hospital',
    '7000 Westminster Hwy',
    'Richmond',
    'BC',
    49.1680,
    -123.1370
),

(
    'squamish',
    'Squamish General Hospital',
    '38140 Behrner Dr',
    'Squamish',
    'BC',
    49.7016,
    -123.1558
),

(
    'sechelt',
    'Sechelt Hospital',
    '5544 Sunshine Coast Hwy',
    'Sechelt',
    'BC',
    49.4750,
    -123.7540
),

-- ============================================
-- VANCOUVER ISLAND
-- ============================================

(
    'victoria_general',
    'Victoria General Hospital',
    '1 Hospital Way',
    'Victoria',
    'BC',
    48.4650,
    -123.3710
),

(
    'royal_jubilee',
    'Royal Jubilee Hospital',
    '1952 Bay St',
    'Victoria',
    'BC',
    48.4280,
    -123.3260
),

(
    'nanaimo',
    'Nanaimo Regional General Hospital',
    '1200 Dufferin Cres',
    'Nanaimo',
    'BC',
    49.1750,
    -123.9460
),

(
    'campbell_river',
    'North Island Hospital Campbell River and District',
    '375 2nd Ave',
    'Campbell River',
    'BC',
    50.0200,
    -125.2470
),

(
    'comox_valley',
    'North Island Hospital Comox Valley',
    '101 Lerwick Rd',
    'Courtenay',
    'BC',
    49.6870,
    -124.9940
),

-- ============================================
-- OKANAGAN / INTERIOR
-- ============================================

(
    'kelowna',
    'Kelowna General Hospital',
    '2268 Pandosy St',
    'Kelowna',
    'BC',
    49.8740,
    -119.4910
),

(
    'penticton',
    'Penticton Regional Hospital',
    '550 Carmi Ave',
    'Penticton',
    'BC',
    49.4860,
    -119.5860
),

(
    'vernon',
    'Vernon Jubilee Hospital',
    '2101 32 St',
    'Vernon',
    'BC',
    50.2680,
    -119.2730
),

(
    'salmon_arm',
    'Shuswap Lake General Hospital',
    '601 10 St NE',
    'Salmon Arm',
    'BC',
    50.7010,
    -119.2840
),

-- ============================================
-- KOOTENAY
-- ============================================

(
    'cranbrook',
    'East Kootenay Regional Hospital',
    '13 24th Ave N',
    'Cranbrook',
    'BC',
    49.5150,
    -115.7650
),

(
    'nelson',
    'Kootenay Lake Hospital',
    '3 View St',
    'Nelson',
    'BC',
    49.4920,
    -117.2940
),

(
    'trail',
    'Kootenay Boundary Regional Hospital',
    '1200 Hospital Bench',
    'Trail',
    'BC',
    49.0950,
    -117.7100
),

-- ============================================
-- NORTHERN BC
-- ============================================

(
    'prince_george',
    'University Hospital of Northern British Columbia',
    '1475 Edmonton St',
    'Prince George',
    'BC',
    53.9150,
    -122.7500
),

(
    'fort_st_john',
    'Fort St. John Hospital',
    '8407 112 Ave',
    'Fort St. John',
    'BC',
    56.2530,
    -120.8460
),

(
    'dawson_creek',
    'Dawson Creek and District Hospital',
    '11100 13 St',
    'Dawson Creek',
    'BC',
    55.7590,
    -120.2360
),

(
    'terrace',
    'Mills Memorial Hospital',
    '4720 Haugland Ave',
    'Terrace',
    'BC',
    54.5140,
    -128.5960
)

ON CONFLICT (id)
DO UPDATE SET
    name = EXCLUDED.name,
    address = EXCLUDED.address,
    city = EXCLUDED.city,
    province = EXCLUDED.province,
    latitude = EXCLUDED.latitude,
    longitude = EXCLUDED.longitude,
    updated_at = CURRENT_TIMESTAMP;