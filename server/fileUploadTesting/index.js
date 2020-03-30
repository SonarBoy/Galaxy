const express = require("express");
const path = require("path");
const multer = require("multer");
const app = express();
const fs = require('fs');
const dir = './tmp';


app.set("views",path.join(__dirname,"views"))
app.set("view engine","ejs")


/* 
* storage: Where to store the files
- the most bacis of which is the dest property 
which tells Multer where to upload the files. In case
you omit you omit the options object, the files will be 
kept in memory and never written to disk.

ALt: var storage = multer({dest:'uploads/'})


.array(fieldname[, maxCount]) = 

Accept an array of files, all with the name fieldname. Optionally
error out if more than maxCount files are uploaded. The array of files
will be stored in req.files
*/
var storage = multer.diskStorage({
    destination: function(request,file,cb){
        cb(null,"uploads")
    },
    filename: function(request,file,cb){
        cb(null,file.originalname + "-" + Date.now()+ ".jpg")
    }
})


const maxSize = 1 * 1000 * 1000;

var uploads = multer({
    storage: storage,
    limits: {fileSize: maxSize},
    fileFilter: function(request, file, cb){

        var filetypes = /jpeg|jpg|png/;
        var mimetype = filetypes.test(file.mimetype);

        var extname = filetypes.test(path.extname(
            file.originalname).toLowerCase());

        if(mimetype && extname){
            return cb(null,true);
        }

        cb("Error: File upload only supports the "
        + "following filetypes - " + filetypes);
    }
}).single('mypic');


app.get("/",function(request,response){
    response.render("Signup");
});

app.post("/uploadProfilePicture",function(request,response,next){

    uploads(request,response,function(error){

        if(error){
            response.send(error);
        }else{
            response.send("Success, Image uploads")
        }
    });

    //if(!fs.existsSync('fs')){
    //    fs.mkdirSync(dir);
    //}
});

app.listen(8080,function(error){
    if(error)throw error
        console.log("Server created Successfully");
});