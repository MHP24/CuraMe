import express from 'express';
import dotenv from 'dotenv';
import { router } from './routes/router';

const app = express();
const PORT = 3000;
/* Front config */
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

/* Data processing config */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

dotenv.config();

/* Router configs */
app.use('/', router);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} - http://localhost:${PORT}`);
});