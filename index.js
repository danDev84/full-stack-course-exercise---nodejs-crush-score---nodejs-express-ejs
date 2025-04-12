import express from 'express';
import url from 'url';
import path from 'path';
import bodyParser from 'body-parser';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// This serves all static files like CSS and images
app.use('/static', express.static(path.join(__dirname, 'static')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './views/index.html'));
});

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/submit', (req, res) => {

    let n = Math.random();
    let percentage = n * 100;
    percentage = Math.floor(percentage);

    const { name, crush } = req.body;

    res.render('response', {
        name: name,
        crush: crush,
        percentage: percentage
    });
});

app.listen(PORT, (req, res) =>{
    console.log(`Server running on port ${PORT}`);
    //console.log('__dirname: ', __dirname);
});