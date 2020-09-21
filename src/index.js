// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { ObjectId } = require('mongodb');
const { v4: uuidv4 } = require('uuid');

const mongoose = require('mongoose');
const { Ad } = require('../models/ad');
const { User } = require('../models/user');
//const dburi =


mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/adsdatabase', {

    userNewUrlParser: true,
    useUnifiedTopology: true
});

// defining the Express app
const app = express();
const port = process.env.PORT || 3001

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

app.post('/auth', async(req, res) => {
    const user = await User.findOne({ username: req.body.username })
    if (!user) {
        return res.sendStatus(401)
    }
    if (req.body.password !== user.password) {
        return res.sendStatus(403)
    }
    user.token = uuidv4()
    await user.save()
    res.send({ token: user.token })
})

app.use(async(req, res, next) => {
    const authHeader = req.headers['authorization']
    const user = await User.findOne({ token: authHeader })
    if (user) {
        next()
    } else {
        res.sendStatus(403)
    }
})

// defining an endpoint to return all ads
app.get('/', async(req, res) => {
    res.send(await Ad.find());
});

app.post('/', async(req, res) => {
    const newAd = req.body;
    const ad = new Ad(newAd);
    await ad.save();
    res.send({ message: 'New ad inserted.' });
});

app.delete('/:id', async(req, res) => {
    await Ad.deleteOne({ _id: ObjectId(req.params.id) })
    res.send({ message: 'Ad removed.' });
});

app.put('/:id', async(req, res) => {
    await Ad.findOneAndUpdate({ _id: ObjectId(req.params.id) }, req.body)
    res.send({ message: 'Ad updated.' });
});

// starting the server
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    console.log("Remote Database Connected")
});
