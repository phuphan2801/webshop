const mongoose = require('mongoose');
mongoose.set('strictQuery', true);


var mongoURL ='mongodb+srv://phuphan28012001:phu123@cluster0.ajjinzm.mongodb.net/shop'

mongoose.connect(mongoURL,{useUnifiedTopology : true, useNewUrlParser:true})
var connection = mongoose.connection
connection.on('error', () => {
    console.log('Mongo DB Connection failed')
})
connection.on('connected', () => {
    console.log('Mongo DB Connection Successful')
})

module.exports = mongoose