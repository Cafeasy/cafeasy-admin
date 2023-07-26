require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const router = require("./routes/router");
const cookieSession = require("cookie-session");
const port = process.env.PORT || 8000
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");

const multer = require('multer');

// const fileStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, '../images');
//     },
//     filename: (req, file, cb) => {
//         cb(null, new Date().getTime() + '-' + file.originalname)
//     }
// })

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

app.use(multer({storage: multer.memoryStorage(), fileFilter: fileFilter}).single('image'));

//connect ke db
require('./config/database');

app.use(cookieParser());

app.use(
    cookieSession({
        name: "session",
        keys: ["cyberwolve"],
        maxAge: 24 * 60 * 60 * 100,

    })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(
    cors({
        origin: process.env.CLIENT_URL,
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
    })
);

app.use(express.json());

app.use((error, req, res, next) => {
    const status = error.errorStatus || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({
        success: false,
        message: message,
        data: data
    })
})

app.listen(port, () => console.log(`Listenting on port ${port}..., server up n running`));
app.use("/", router);