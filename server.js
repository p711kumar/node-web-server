const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 5000;
let app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper("getCurrentYear", () => {
    new Date().getFullYear();
});
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    let log = `${new Date().toString} ${req.method}  ${req.path}  \n`;
    fs.appendFile('server.log', log, (error) => {
        console.log("can not write to the file");
    });
    next();
});

// app.use((req, res,next) => {
//     res.render('maintenance', {
//         maintenanceMessage: "This site is under maintenance"
//     });
//     next();
// });

app.get('/', function (req, res) {
    res.render('home.hbs', {
        welcomeMessage: 'Home Page',
        pageTitle: 'Home Page',
        currentYear: new Date().getFullYear()
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Project Page',
        currentYear: new Date().getFullYear()
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errror: "Bad request",
    });
});

app.listen(port);