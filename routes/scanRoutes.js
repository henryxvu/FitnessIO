import express from 'express';
import vision from '@google-cloud/vision';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

const client = new vision.ImageAnnotatorClient({
    credentials: {
        client_email: process.env.VISION_CLIENT_EMAIL,
        private_key: process.env.VISION_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      projectId: process.env.VISION_PROJECT_ID,
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