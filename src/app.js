const path = require('path');
const express  = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const { request } = require('http');

console.log(__dirname)
console.log(path.join(__dirname, '../public'));

const app = express();
// Define path for express configuration
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location 
app.set('view engine', 'hbs');
app.set('views',viewPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
   res.render('index',{
     title: 'Home',
     name: 'Demo Home'
   })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About',
        name: 'Demo About'
      });
})

app.get('/help',(req,res)=>{
    res.render('help',{
        message: 'Demo Message',
        title: 'Help',
        name: 'Demo Help'
      });
})



// app.get('/help',(req,res)=>{
//     res.send({
//         name: 'help',
//         age : '28'
//     });
// });

// app.get('/about',(req,res)=>{
//     res.send('Welcome about!');
// });

app.get('/weather',(req,res)=>{
    if(!req.query.latitude || !req.query.longitude){
      return res.send({
        error: 'Please enter lat and long'
      });
    }

    forecast(req.query.latitude, req.query.longitude, (error, forecastData)=>{
        if(error) {
           return res.send({ error });
        }

        res.send({
           forecast: forecastData,
           location:'Boston,USA',
           address: 'Philladelphia, USA',
        })

      })

    // geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{
    //    if(error){
    //     return res.send({
    //         error
    //     });
    //    }

    //    forecast(latitude, longitude, (error, forecastData)=>{
    //      if(error) {
    //         return res.send({ error });
    //      }

    //      request.send({
    //         forecast: forecastData,
    //         location,
    //         address: req.query.address
    //      })

    //    })
    // })

    // res.send({
    //     forecast:'Forecast',
    //     location: 'location',
    //     address: req.query.address,
    // });


});

app.get('/products',(req,res)=>{
    if(!req.query.search){
       return res.send({
            error:'You must provide a search query before you can search for products.'
        });
    }
    console.log(req.query.search)
    res.send({
        products:[]
    });
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        msg: 'Help for this route not found!'
    })
})
app.get('*',(req,res)=>{
   res.render('404',{
    msg: 'My 404 page',
   });
})

app.listen('3000', () =>{
    console.log('Listening on port 3000');
});