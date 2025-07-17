import express from 'express';
import multer from 'multer';
import cloudinary from '../utils/cloudinary.js';




const router = express.Router();

const storage = multer.diskStorage({
    filename: function (req,file,cb) {
      cb(null, file.originalname)
    }
  });

const upload = multer({storage: storage});


router.post('/upload', upload.single('image'), function (req, res) {
    cloudinary.uploader.upload(req.file.path, function (err, result){
        if(err) {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: "Error"
            })
        }
      
        res.status(200).json({
        success: true,
        message:"Uploaded!",
        data: result
        })
        console.log('Image Uploaded')
    })
});

export default router;