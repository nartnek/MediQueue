CREATE TABLE IF NOT EXISTS hospitals (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    province VARCHAR(2) NOT NULL DEFAULT 'BC',
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_hospitals_city
ON hospitals(city);

CREATE INDEX IF NOT EXISTS idx_hospitals_province
ON hospitals(province);


CREATE TABLE IF NOT EXISTS er_wait_times (
    id SERIAL PRIMARY KEY,
    hospital_id VARCHAR(50) NOT NULL REFERENCES hospitals(id) ON DELETE CASCADE,
    wait_time_minutes INTEGER NOT NULL,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_er_wait_times_hospital
ON er_wait_times(hospital_id);

CREATE INDEX IF NOT EXISTS idx_er_wait_times_recorded_at
ON er_wait_times(recorded_at);