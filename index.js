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

    let score = Math.random() * 100;
    score = Math.floor(score) + 1;

    const { name, crush } = req.body;

    let response = "";

    if (score > 70 && score <= 100) {
        response = "🎉 Congratulations! There's a strong connection. Go for it!";
    } else if (score <= 70 && score > 60) {
        response = "😊 Looking good! There's definitely some potential there.";
    } else if (score <= 60  && score && score >= 30) {
        response = "💡 You still have a chance! Give it a try and see where it goes.";
    } else {
        response = "😅 Maybe it's time to look for another crush. Keep your heart open!";
    }

    res.render('response', {
        name: name,
        crush: crush,
        score: score,
        response: response
    });
});

app.listen(PORT, (req, res) =>{
    console.log(`Server running on port ${PORT}`);
    //console.log('__dirname: ', __dirname);
});