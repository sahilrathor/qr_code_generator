const express = require("express")
const bodyParser = require("body-parser")
const qr = require("qr-image")
const fs = require("fs")
const port = "9999"

const app = express()
// app.engine('ejs', require('ejs').__express);

app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))


// DEFAULT SETTINGS 
let imgFormat = "svg";
let fileName = "qr-code.svg"


// Showing pages 
app.get("/", (req, res) => {
    
    // res.render("index", {
    //     imgName: fileName,
    // }) 
    res.render("index") 
})

// GETTING USER INPUT
app.post("/", (req, res) => {
    const url = req.body.url;
    imgFormat = req.body.fileFormat;


    // FILE DETAILS
    fileName = createCode(url, imgFormat)
    console.log("\nURL: " + url)
    console.log("File format: " + imgFormat)
    console.log("File Name: " + fileName)
    // res.redirect("/")
    res.render("index", {
        imgName: fileName,
    }) 
})

// LISTENING FOR BROWSESR REQUESTS
app.listen(port, () => {
    console.log(`Server has started on http://localhost:${port}`)
})


// USING NPM MOD. TO MAKE QR IMAGE
function createCode(text, format) {
    // NEW NAME 
    imageName = "qr-image-" + currentTime() + "." + format;

    var qr_svg = qr.image(text, {type: format, margin: 1});
    qr_svg.pipe(fs.createWriteStream(__dirname + "/public/images/" + imageName));
    // qr_svg.pipe(fs.createWriteStream( imageName));
    return imageName;
}

function currentTime() {
    let date = new Date()
    let yr = date.getFullYear()
    let mon = date.getMonth()+1
    let dt = date.getDate()
    let hr = date.getHours()
    let min = date.getMinutes()
    let sec = date.getSeconds()
    if(mon <10) {
        mon = "0" + mon
    }
    if(dt < 10) {
        dt = "0" + dt
    }
    if(hr < 10) {
        hr = "0" + hr
    }
    if(min < 10) {
        min = "0" + min
    }
    if(sec < 10) {
        sec = "0" + sec
    }
    return (yr - 2000) + mon + dt + hr + min + sec;
}
