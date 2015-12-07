var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/todo';

var client = new pg.Client(connectionString);
client.connect();
var query = client.query('CREATE TABLE items(id SERIAL PRIMARYKEY, firstname VARCHAR(20) not null, lastname VARCHAR(20) not null, email VARCHAR(20) not null');

	