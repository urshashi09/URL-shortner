import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { shortUrl, getOriginalUrl } from './controller/url.js';
import { Url } from './Models/Url.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000; 

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get('/', (req, res) => {
  res.render('index.ejs', { shortUrl: null });
});

app.post('/short', shortUrl);
app.get('/:shortCode', getOriginalUrl);

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected");

    app.listen(port, () => console.log(`Server is running on port ${port}`));
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
})();
