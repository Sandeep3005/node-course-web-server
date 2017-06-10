const express = require('express');
const hbs = require('hbs');
const axios = require('axios');

let port = process.env.PORT || 8080;
let maintainenceMode = false;

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

app.get('/profile', (req, res)=> {
  let repoUrl = `https://api.github.com/users/sandeep3005/repos`;
  let pageValues = {
    pageTitle : 'Profile',
    currentYear : new Date().getFullYear()
  };
  let repoLists = axios.get(repoUrl).then((response)=>{
    if (response.status === 200) {
      pageValues.repos = response.data;
      res.render('profile.hbs', pageValues);
    } else {
      throw new Error('Some problem with code, show it to code doctor')
    }
  }).catch((error) =>{
    error = 'Some problem with code, show it to code doctor';
    console.log(error);
  })
})

app.listen(port,()=>{
  console.log(`Server is up and running on port ${port}`);
});
