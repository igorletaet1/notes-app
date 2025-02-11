import { Pool } from 'pg';

const pool = new Pool({
    user: 'postgres',
    host: 'db', // Внутреннее имя сервиса PostgreSQL из docker-compose.yml
    database: 'notes',
    password: 'root',
    port: 5432,
});

export default pool;