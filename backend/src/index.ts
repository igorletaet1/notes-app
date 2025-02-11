import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './routes';

const app = express();
const PORT = 5000;

app.use(cors({
    origin: 'http://localhost:3000', // Разрешить запросы только с этого домена
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Разрешить только определённые методы
    credentials: true, // Разрешить передачу куки и заголовков авторизации
}));

app.use(bodyParser.json());
app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});