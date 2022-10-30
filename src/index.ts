import express from 'express';
import { router } from './routes/router';
import dotenv from 'dotenv';
const app = express();
const PORT = 3000;
/* Front config */
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

/* Data processing config */
app.use(express.urlencoded({extended:true}));
app.use(express.json());
dotenv.config({ path: './env/.env' });

/* Router configs */
app.use('/', router);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} - http://localhost:${PORT}`);
});