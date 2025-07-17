import express from 'express';
import vision from '@google-cloud/vision';

const router = express.Router();

const client = new vision.ImageAnnotatorClient({
    keyFilename: './vision-key.json',
});


router.post("/scan", async (req, res) => {
    try{
        const [result] = await client.labelDetection(req.body.imageURL);
        const labels = result.labelAnnotations;
        res.json(labels)
    } catch (error) {
        console.log(error);
    }
});
export default router;