require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const router = require("./routes/router");
const cookieSession = require("cookie-session");
const port = process.env.PORT || 8000
const app = express();
const bodyParser = require('body-parser');
const {initializeApp} = require('firebase/app');
const {getStorage} = require('firebase/storage');
const {ref} = require('firebase/storage');
const {getDownloadURL} = require('firebase/storage');
const {uploadBytesResumable} = require('firebase/storage');
const {getAnalaytics} = require("firebase/analytics");

//config to firebase cloud
const firebaseConfig = {
    apiKey: "AIzaSyDfq6kKiVAUtFgxU9xaKUCA-qUTu8t4YU0",
    authDomain: process.env.PROJECT_ID_CLOUD.firebaseapp.com,
    projectId: process.env.PROJECT_ID_CLOUD,
    storageBucket: process.env.PROJECT_ID_CLOUD.appspot.com,
    messagingSenderId: "1072877720834",
    appId: "1:1072877720834:web:c251069cd4ac7fd0b01e1b",
    measurementId: "G-9C8ENG19NY"
};

// Initialize Firebase
const appCloud = initializeApp(firebaseConfig);
const analytics = getAnalytics(appCloud);

const multer = require('multer');
const cookieParser = require("cookie-parser");

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + '-' + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image'));

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
        message: message,
        data: data
    })
})

app.listen(port, () => console.log(`Listenting on port ${port}..., server up n running`));
app.use("/", router);