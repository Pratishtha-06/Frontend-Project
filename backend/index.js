/*const express=require('express');
const cors=require('cors'); 
const bodyParser = require('body-parser');
const imageDownloader= require('image-downloader');
const path = require('path');

const app=express();
app.use(express.json());
app.use('/uploads',express.static(__dirname + '/uploads'));
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin:'http://localhost:5173'
}));


//add-image via link
console.log({__dirname});
app.post('/upload-via-link',async(req,res)=>{
 try{
 const {link} = req.body;
 console.log("Received link:", link);

 
 if (!link || link.trim() === "") {
    return res.status(400).json({ message: "No image URL provided" });
  }

 const urlPath = new URL(link).pathname;
 const ext = path.extname(urlPath) || ".jpg";
 const imgName = 'photo' + Date.now() + ext;
 console.log("Saving image as:", imgName);

 await imageDownloader.image({
    url:link,
    dest: path.join(__dirname ,'uploads'),
    filename:imgName
 })


 res.status(200).json(imgName);
}catch(err){
 console.log("Error found:",err);
 res.status(500).json({message:"Server Error"}) 
}
})

app.listen(3000,()=>{
    console.log("Server started at port 3000");
});*/
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:5173'
}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure uploads folder exists
const uploadsPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsPath)) {
    fs.mkdirSync(uploadsPath, { recursive: true });
}

// Upload image from URL
app.post('/upload-via-link', async (req, res) => {
    try {
        const { link } = req.body;
        if (!link || link.trim() === "") {
            return res.status(400).json({ message: "No image URL provided" });
        }

        const urlPath = new URL(link).pathname;
        const ext = path.extname(urlPath) || ".jpg";
        const imgName = 'photo' + Date.now() + ext;
        const filePath = path.join(uploadsPath, imgName);

        const response = await axios({
            method: 'GET',
            url: link,
            responseType: 'stream'
        });

        const writer = fs.createWriteStream(filePath);
        response.data.pipe(writer);

        writer.on('finish', () => {
            console.log("✅ Saved:", filePath);
            res.status(200).json(imgName);
        });

        writer.on('error', err => {
            console.error("Write error:", err);
            res.status(500).json({ message: "Failed to write image" });
        });

    } catch (err) {
        console.error("Download error:", err.message);
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

app.listen(3000, () => {
    console.log("🚀 Server running at http://localhost:3000");
});
