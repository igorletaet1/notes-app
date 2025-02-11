"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    user: 'postgres',
    host: 'db', // Внутреннее имя сервиса PostgreSQL из docker-compose.yml
    database: 'notes',
    password: 'root',
    port: 5432,
});
exports.default = pool;
