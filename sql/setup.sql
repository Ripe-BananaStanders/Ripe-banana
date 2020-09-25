DROP TABLE IF EXISTS studios CASCADE;
DROP TABLE IF EXISTS actors CASCADE;
DROP TABLE IF EXISTS reviewers CASCADE;
DROP TABLE IF EXISTS films CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;

CREATE TABLE studios (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    country TEXT NOT NULL
);

CREATE TABLE actors (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    dob DATE NOT NULL,
    pob TEXT NOT NULL
);

CREATE TABLE reviewers (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL, 
    company TEXT NOT NULL
);

CREATE TABLE films (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    studio_id BIGINT NOT NULL REFERENCES studios(id),
    title TEXT NOT NULL, 
    released INT,
    filmcast JSONB
);

CREATE TABLE reviews (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    rating INT NOT NULL,
    reviewer_id BIGINT NOT NULL REFERENCES reviewers(id),
    review TEXT NOT NULL,
    film_id BIGINT NOT NULL REFERENCES films(id)

);
