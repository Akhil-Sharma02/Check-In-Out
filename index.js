const express = require('express');
const app = express();
const mongoose = require('mongoose');
const seedDB = require('./seed');
const path = require('path');
const routes = require('./routes/routes');
const methodOverride = require('method-override');
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('DB Connected'))
    .catch((err) => console.log(err));

// seedDB();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


app.use(routes);

app.listen(process.env.PORT || 2323, (req, res) => {
    console.log("Server Started");
});