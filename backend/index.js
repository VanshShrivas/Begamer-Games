import express from "express";
import cors from "cors";
import fs from "fs";
import mongoose from "mongoose";
import multer from "multer";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import Game from "./models/gameModel.js";
import sendMail from "./helpers/mailer.js"

dotenv.config();

const allowedOrigins=process.env.ORIGINS.split(","); //this is string though you think ki maine toh array likha hai env mein we always have strings as the value for any key.


console.log(allowedOrigins);

const corsOptions = {
    origin: allowedOrigins,
    optionsSuccessStatus: 200,
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

const port = process.env.PORT||3000;

// MongoDB connect
try {
    await mongoose.connect(process.env.MONGO_CONNECTION_STRING + "/BG");
    console.log("✅ MongoDB connected");
} catch (err) {
    console.error("❌ DB connection failed:", err.message);
}

// 
const storage = multer.diskStorage({});
const upload = multer({ storage, limits: { fileSize: 500 * 1024 * 1024 } });

// Cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET,
});

// Upload helper
function uploadToCloudinary(buffer, folder, resourceType, originalname) {
    return new Promise((resolve, reject) => {
        const ext = originalname.split(".").pop(); // extension nikal lo
        const baseName = originalname.replace(/\.[^/.]+$/, ""); // extension ke bina name

        const stream = cloudinary.uploader.upload_stream(
            {
                folder,
                resource_type: resourceType,
                public_id: baseName,   // apna file ka naam use karo
                format: ext            // extension force karo
            },
            (err, result) => {
                if (err) reject(err);
                else resolve(result.secure_url);
            }
        );
        stream.end(buffer);
    });
}



// Routes
app.get("/get_games", async (req, res) => {
    const games = await Game.find();
    res.json(games);
});


app.post(
    "/receive",
    upload.fields([
        { name: "image", maxCount: 1 },
        { name: "link", maxCount: 1 },
    ]),
    async (req, res) => {
        try {
            console.log("BODY:", req.body);
            console.log("FILES:", req.files);

            const { title, description } = req.body;

            if (!req.files?.image?.[0] || !req.files?.link?.[0]) {
                return res.status(400).json({ error: "Image and file are required" });
            }

            // Read file from disk (convert to buffer)
            const imagePath = req.files.image[0].path;
            const imageBuffer = fs.readFileSync(imagePath);

            const filePath = req.files.link[0].path;
            const fileBuffer = fs.readFileSync(filePath);

            //  Upload to Cloudinary
            const imageUrl = await uploadToCloudinary(
                imageBuffer,
                "games/images",
                "auto",
                req.files.image[0].originalname
            );

            const fileUrl = await uploadToCloudinary(
                fileBuffer,
                "games/files",
                "raw",
                req.files.link[0].originalname
            );

            // After upload
            fs.unlinkSync(imagePath);
            fs.unlinkSync(filePath);



            const newGame = new Game({
                title,
                description,
                image: imageUrl,
                link: fileUrl,
            });

            await newGame.save();
            res.json({ message: "Game added successfully ✅", game: newGame });
            console.log(newGame);
        } catch (err) {
            console.error("❌ Error:", err.message);
            res.status(500).send({message:`Error saving game : ${err.message}`});
        }
    }
);


app.post("/mail",(req,res)=>{
    console.log(req.body);
    try{
    const {email,message}=req.body;
    const info = sendMail(email,message);
    console.log("done");
    res.status(200).json({message:"Message Sent."});
    }catch(err){
        console.log("failed");
        res.status(500).json({ message: "Failed to send message", error: err.message });
    }
})

app.delete("/delete",(req,res)=>{
    console.log(req.body);
    const _id=req.body._id;
    Game.findByIdAndDelete(_id)
  .then(() => {console.log("Deleted");res.status(200).json({message:"DELETED SUCCESSFULLY !"})});
})




app.listen(port, () => {
    console.log(" Server running on port", port);
});
