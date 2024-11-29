require("dotenv").config();
const express = require("express");
const path = require('path');
const mongoose = require("mongoose");
const session = require("express-session");

const app = express();
const PORT = process.env.PORT || 4000;


//database connection
// mongoose.connect(process.env.DB_URI, {useNewParser: true});
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true, // Correct option for connection
  useUnifiedTopology: true // Recommended option for modern MongoDB servers
});

const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', ()=> console.log("Connected to database..!!"));

//middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(
    session({
        secret: 'my secret key',
        saveUninitialized: true,
        resave: false
    })
);

app.use((req, res, next) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
});

// app.use(express.static("uploads"));
app.use('/uploads', express.static('uploads'));


//set template engine
app.set("view engine", "ejs");


// app.get("/", (req,res) => {
//     res.send("Hello World");
// });

app.use("", require("./routes/routes"));

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});