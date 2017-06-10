const express = require('express');
const hbs = require('hbs');

let port = process.env.PORT || 8080;
let maintainenceMode = true;

let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next)=> {
  if ( maintainenceMode ) res.render('maintainence.hbs');
  else next();
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('makeItBig', (text)=>{
    return text.toUpperCase();
});

app.get('/', (req, res) => {
  let pageValues = {
    pageTitle : 'Home',
    currentYear : new Date().getFullYear(),
    welcomeMsg: 'Welcome to my site'
  }
  res.render('home.hbs', pageValues);
});

app.get('/bad', (req, res) => {
  res.send({
    code: 69,
    message: 'Dude, something went wrong. I will figure it out once I am sober. Chao',
    drinksConsumed: ['Smack', 'Vodka', 'All']
  })
});

app.get('/about', (req, res)=> {
  let pageValues = {
    pageTitle : 'About',
    currentYear : new Date().getFullYear()
  }
  res.render('about.hbs', pageValues);
})

app.listen(port,()=>{
  console.log(`Server is up and running on port ${port}`);
});
