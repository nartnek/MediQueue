CREATE TABLE IF NOT EXISTS er_wait_times (
    id SERIAL PRIMARY KEY,
    hospital_id VARCHAR(50) NOT NULL,
    wait_time_minutes INTEGER NOT NULL,
    recorded_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_hospital
        FOREIGN KEY (hospital_id)
        REFERENCES hospitals(id)
        ON DELETE CASCADE,

    CONSTRAINT valid_wait_time
        CHECK (wait_time_minutes >= 0)
);

CREATE INDEX IF NOT EXISTS idx_er_wait_times_hospital
ON er_wait_times(hospital_id);

CREATE INDEX IF NOT EXISTS idx_er_wait_times_recorded
ON er_wait_times(recorded_at DESC);

INSERT INTO er_wait_times (
    hospital_id,
    wait_time_minutes,
    recorded_at
)
VALUES
    ('vgh', 47, CURRENT_TIMESTAMP),
    ('stpauls', 32, CURRENT_TIMESTAMP),
    ('msj', 58, CURRENT_TIMESTAMP),
    ('burnaby', 41, CURRENT_TIMESTAMP),
    ('surrey', 73, CURRENT_TIMESTAMP);