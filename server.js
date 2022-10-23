const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const passport = require('passport');
const helmet = require('helmet');


// Require route path location
const paymentGatewayApi = require('./router/api/payment-gateway');
const serviceApi = require('./router/api/service');
const userApi = require('./router/api/user');
const clientsReviewApi = require('./router/api/clients-review');
const aboutUsApi = require('./router/api/about-us');
const pricePlanApi = require('./router/api/price-plan');


// express function in app keyword
const app = express();


// Third party middleware initial in app
app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Direct Passport initialized
require('./config/passport')(passport);

// connect to mongodb database with the help of mongoose
mongoose.connect('mongodb+srv://mean:mean12345@cluster0.aelmanv.mongodb.net/spagram?retryWrites=true&w=majority', {
    useNewUrlParser : true, useUnifiedTopology: true
}).then(() => {
    console.log('Connection Established')
}).catch(error => console.log(error));


// App Initial with environment port or static port
const PORT = process.env.PORT || 5000;
// App Listen
app.listen(PORT, () => console.log('App Listen'));


// Static path define app listening
app.use('/uploaded_image', express.static('uploaded_image'));


// use APIs path as a router path
app.use('/api/v1/payment-gateway', paymentGatewayApi);
app.use('/api/v1/service', serviceApi);
app.use('/api/v1/user', userApi);
app.use('/api/v1/clients-review', clientsReviewApi);
app.use('/api/v1/about-us', aboutUsApi);
app.use('/api/v1/price-plan', pricePlanApi);


// Server static assets if in production
if(process.env.NODE_ENV === 'production'){
    // Set static folder
    app.use(express.static('client/dist/spagram'));

    app.get('*', (req, res) => {
        res.sendfile(path.resolve(__dirname, 'client', 'dist', 'spagram', 'index.html'));
    })
}



