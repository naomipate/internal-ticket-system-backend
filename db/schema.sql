DROP DATABASE IF EXISTS tickets_dev;
CREATE DATABASE tickets_dev;
\c tickets_dev

DROP TABLE IF EXISTS tickets;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE tickets (
    id SERIAL PRIMARY KEY NOT NULL, 
    date TEXT, 
    title TEXT NOT NULL, 
    description TEXT NOT NULL, 
    priority TEXT NOT NULL, 
    assigned TEXT, 
    resolution BOOLEAN, 
    username TEXT NOT NULL, 
    unique_id uuid DEFAULT uuid_generate_v4()
);