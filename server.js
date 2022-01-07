const express       = require('express')
const mongoose      = require('mongoose')
const dotenv        = require('dotenv')
const authRoute     = require("./routes/auth")
const userRoute     = require("./routes/users")
const postRoute     = require('./routes/posts')
const CategoryRoute = require("./routes/categories")
const homeRoute     =  require("./routes/home")
const multer        = require("multer")


dotenv.config()


const app = express()

app.use(express.json())

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('Connected successfully')
}).catch((err) => {
    console.log(err)
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,"images")
    },
    filename: (req, file, cb) => {
        cb(null,"martin.jpeg")
    }
})

const upload = multer({
    storage:storage
})
app.post("/api/v1/upload",upload.single("file"), (req, res) => {
    res.status(200).json("File uploaded successfully")
})

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/posts", postRoute);
app.use("/api/v1/categories", CategoryRoute)
app.use("/api/v1",homeRoute)


app.listen(3080, () => {
    console.log('server is running on port 3080')
})