import hbs from "express-handlebars";
import express from "express";
import routeForm from "./routes/form.js"

const PORT = 3000;
const app = express();

//creating global (locals) variables for all views
app.locals.sendMailFeedback = 'no messages yet'

//express-hbs config
app.engine(".hbs", hbs.engine({extname: "hbs"}));// we change extension name just because "express-handlebars" is too large//
app.set('view engine', 'hbs'); // we set the view engine like itself (seteamos el motor de plantillas como tal)
app.set('views', './views'); // indicate where views are

// defining public file
app.use(express.static('public'));
// enable read body request data
app.use(express.urlencoded());
//creating route for form
app.use('/form', routeForm);
// creating route for home
app.get('/', (req, res) => {
    res.render('home')
})

//launch server
app.listen(PORT, (err) => {
    !err ? console.log(`Running on http://localhost:${PORT}`) : console.log(err)
});

